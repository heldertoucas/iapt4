/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { GoogleGenAI } from "@google/genai";
import { getApiKey } from './apiConfig';
import { supabase } from './supabaseClient';


const SYSTEM_INSTRUCTION_ANALYZE = `You are an AI assistant for a public manifesto on ethical AI. Your role is to analyze user suggestions for new principles. Analyze the user's suggestion. Respond ONLY with a valid JSON object with the following structure: { "summary": "A one-sentence summary in Portuguese of the user's idea.", "category": "Categorize the suggestion into one of these: Fairness, Transparency, Accountability, Human-centric, Safety, Education, Other.", "feedback_to_user": "A short, encouraging, and personalized feedback message in Portuguese for the user, acknowledging their contribution." }`;

export type SuggestionAnalysis = {
    summary: string;
    category: string;
    feedback_to_user: string;
};

export type NewsAnalysis = {
    questionTitle: string;
    statementHeadline: string;
    keyStatistic: string;
    facts: string[];
    sources: { uri: string; title: string; }[];
}


async function analyzeSuggestion(suggestionText: string): Promise<SuggestionAnalysis> {
    const apiKey = getApiKey('GEMINI');
    if (!apiKey || apiKey.includes('COLOQUE')) {
        throw new Error("Gemini API Key not configured.");
    }
    
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-04-17',
        contents: `Analisa a seguinte sugestão para um manifesto de IA: "${suggestionText}"`,
        config: {
            systemInstruction: SYSTEM_INSTRUCTION_ANALYZE,
            responseMimeType: "application/json",
        }
    });

    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }
    
    try {
        return JSON.parse(jsonStr) as SuggestionAnalysis;
    } catch (e) {
        console.error("Failed to parse JSON from Gemini:", e);
        console.error("Received text:", jsonStr);
        // Fallback in case of parsing error
        return {
            summary: 'A sua sugestão foi recebida e será analisada.',
            category: 'Other',
            feedback_to_user: 'Obrigado pela sua valiosa contribuição! A sua ideia foi registada e será revista pela comunidade.'
        };
    }
}

async function summarizeNewsForPrinciple(principleTitle: string): Promise<NewsAnalysis> {
    const apiKey = getApiKey('GEMINI');
    if (!apiKey || apiKey.includes('COLOQUE')) {
        throw new Error("Gemini API Key not configured.");
    }
    
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `Encontra notícias e artigos de alta qualidade e fidedignos, publicados nos últimos 12 meses, que demonstrem a importância do princípio de "${principleTitle}" em Inteligência Artificial.
Responde EXCLUSIVAMENTE no seguinte formato, em português, preenchendo cada campo:
QuestionTitle: [Escreve um título em formato de pergunta. Ex: "Porque é que a Literacia em IA é importante?"]
StatementHeadline: [Escreve uma manchete declarativa curta e impactante. Ex: "A Literacia em IA permite navegar num mundo em rápida transformação digital."]
Statistic: [Extrai uma estatística ou dado chave e impactante. Ex: "56% de aumento nos incidentes de IA."]
Fact1: [Escreve um facto conciso sobre um evento ou desenvolvimento que suporte o princípio, incluindo a organização ou fonte (ex: 'A União Europeia implementou o AI Act para proteger os cidadãos...').]
Fact2: [Escreve um segundo facto conciso e distinto.]
Fact3_Positive: [Escreve um terceiro facto conciso que represente uma visão otimista ou uma aplicação positiva do princípio (ex: 'Hospitais no Reino Unido usam IA para detetar cancro mais cedo, melhorando os resultados dos pacientes.').]
`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-04-17',
        contents: prompt,
        config: {
            tools: [{ googleSearch: {} }],
        }
    });

    const responseText = response.text;
    const lines = responseText.split('\n').filter(l => l.trim() !== '');

    const getValue = (key: string) => lines.find(l => l.startsWith(key))?.replace(key, '').trim() || '';

    const questionTitle = getValue('QuestionTitle:');
    const statementHeadline = getValue('StatementHeadline:');
    const keyStatistic = getValue('Statistic:');
    const fact1 = getValue('Fact1:');
    const fact2 = getValue('Fact2:');
    const fact3_Positive = getValue('Fact3_Positive:');

    const facts = [fact1, fact2, fact3_Positive].filter(Boolean); // Filter out any empty facts

    const rawChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    const sourcesMap = (rawChunks as { web?: { uri: string; title: string } }[]).reduce((acc: Map<string, { uri: string; title: string }>, chunk) => {
        const web = chunk?.web;
        if (web && web.uri && web.title) {
            if (!acc.has(web.uri)) {
                acc.set(web.uri, { uri: web.uri, title: web.title });
            }
        }
        return acc;
    }, new Map<string, { uri: string; title: string }>());

    const uniqueSources = Array.from(sourcesMap.values());

    if (facts.length < 2) {
        throw new Error("Não foi possível gerar factos suficientes a partir das notícias.");
    }

    return { questionTitle, statementHeadline, keyStatistic, facts, sources: uniqueSources };
}


export const manifestoApi = {
    analyzeSuggestion,
    summarizeNewsForPrinciple,
};