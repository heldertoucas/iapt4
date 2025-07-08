/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { getApiKey } from './apiConfig';
import { supabase } from './supabaseClient';


const SYSTEM_INSTRUCTION = "És um assistente de IA divertido e pedagógico. Responde de forma sucinta, cordial e com um toque de humor. Usa alguns emojis apropriados para tornar a conversa mais leve. No final da tua resposta, faz sempre uma ou duas questões de desenvolvimento ou reflexão sobre o tema.";

// --- Private functions for each AI provider ---

async function _generateWithGemini(prompt: string, onTextChunk: (chunk: string) => void): Promise<void> {
    const apiKey = getApiKey('GEMINI');
    if (!apiKey || apiKey.includes('COLOQUE')) throw new Error("Gemini API Key not configured.");
    
    const ai = new GoogleGenAI({ apiKey });
    const responseStream = await ai.models.generateContentStream({
        model: 'gemini-2.5-flash-preview-04-17',
        contents: prompt,
        config: { systemInstruction: SYSTEM_INSTRUCTION }
    });
    for await (const chunk of responseStream) {
        onTextChunk(chunk.text);
    }
}

async function _generateImageWithGemini(prompt: string): Promise<string> {
    const apiKey = getApiKey('GEMINI');
    if (!apiKey || apiKey.includes('COLOQUE')) throw new Error("Gemini API Key not configured.");

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateImages({
        model: 'imagen-3.0-generate-002',
        prompt: prompt,
        config: { numberOfImages: 1, outputMimeType: 'image/png' },
    });
    if (response.generatedImages && response.generatedImages.length > 0) {
        const base64ImageBytes = response.generatedImages[0].image.imageBytes;
        return `data:image/png;base64,${base64ImageBytes}`;
    }
    throw new Error("Gemini image generation failed.");
}


async function _generateWithOpenRouter(prompt: string, onTextChunk: (chunk: string) => void): Promise<void> {
    const apiKey = getApiKey('OPENROUTER');
    if (!apiKey || apiKey.includes('COLOQUE')) throw new Error("OpenRouter API Key not configured.");
    
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": location.href,
        },
        body: JSON.stringify({
            "model": "mistralai/mistral-7b-instruct:free",
            "messages": [{ "role": "user", "content": prompt }],
            "stream": true
        })
    });
    
    if (!response.body) throw new Error("OpenRouter response has no body.");
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value);
        const lines = text.split('\n').filter(line => line.startsWith('data: '));
        for (const line of lines) {
            const jsonStr = line.replace('data: ', '');
            if (jsonStr === '[DONE]') continue;
            try {
                const parsed = JSON.parse(jsonStr);
                const content = parsed.choices[0]?.delta?.content;
                if (content) {
                    onTextChunk(content);
                }
            } catch (e) {
                console.error("Error parsing OpenRouter stream chunk:", e);
            }
        }
    }
}

async function _generateWithHuggingFace(prompt: string, onTextChunk: (chunk: string) => void): Promise<void> {
     const apiKey = getApiKey('HUGGINGFACE');
    if (!apiKey || apiKey.includes('COLOQUE')) throw new Error("Hugging Face API Key not configured.");

    const response = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2", {
        method: "POST",
        headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ "inputs": prompt, "parameters": { "max_new_tokens": 250 }, "stream": true })
    });

    if (!response.body) throw new Error("Hugging Face response has no body.");
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
     while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value);
        const lines = text.split('\n').filter(line => line.startsWith('data: '));
        for (const line of lines) {
             try {
                const jsonStr = line.replace('data: ', '');
                const parsed = JSON.parse(jsonStr);
                if(parsed.token?.text) {
                    onTextChunk(parsed.token.text);
                }
            } catch (e) {
                console.error("Error parsing Hugging Face stream chunk:", e);
            }
        }
    }
}


export const api = {
    async generate(prompt: string, type: 'text' | 'image', onTextChunk: (chunk: string) => void): Promise<string> {
        if (type === 'image') {
            try {
                return await _generateImageWithGemini(prompt);
            } catch (error) {
                console.warn("Gemini image generation failed. Error:", error);
                // In a real scenario, you could add OpenRouter/HuggingFace image fallbacks here.
                // For now, we return an empty string to trigger the recipe's fallback URL.
                return '';
            }
        }

        // Text generation with fallback chain
        try {
            await _generateWithGemini(prompt, onTextChunk);
        } catch (error1) {
            console.warn("Gemini failed, trying OpenRouter... Error:", error1);
            try {
                await _generateWithOpenRouter(prompt, onTextChunk);
            } catch (error2) {
                console.warn("OpenRouter failed, trying Hugging Face... Error:", error2);
                try {
                    await _generateWithHuggingFace(prompt, onTextChunk);
                } catch (error3) {
                    console.error("All AI providers failed. Error:", error3);
                    throw new Error("All AI providers failed.");
                }
            }
        }
        return ''; // Text is streamed
    },

    async rateRecipe(recipeId: string, rating: number): Promise<void> {
        if (!supabase) {
            console.warn("Supabase not configured. Skipping recipe rating.");
            return;
        }

        const { error } = await supabase.rpc('increment_recipe_rating', {
            recipe_id: recipeId,
            rating_value: rating,
        });

        if (error) {
            const errorMessage = `Supabase RPC Error: ${error.message}. Details: ${error.details}. Hint: ${error.hint || 'Check if the RPC function name and parameters are correct and if the anon role has EXECUTE permission.'}`;
            console.error("Error updating recipe rating:", errorMessage);
        } else {
            console.log(`Rating of ${rating} for recipe ${recipeId} submitted successfully.`);
        }
    },
};
