/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useRef } from 'react';
import RemixIcon from '../../ui/RemixIcon';
import Card from '../../ui/Card';

type SuggestionFormProps = {
  onSubmitSuggestion: (suggestionText: string, author?: string) => Promise<void>;
  prefilledText?: string;
};

const SuggestionForm = ({ onSubmitSuggestion, prefilledText }: SuggestionFormProps) => {
    const [suggestion, setSuggestion] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [showSignaturePopup, setShowSignaturePopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (prefilledText) {
            setSuggestion(prefilledText);
            setIsSubmitted(false);
            setTimeout(() => {
                if (textareaRef.current) {
                    textareaRef.current.focus();
                    textareaRef.current.setSelectionRange(prefilledText.length, prefilledText.length);
                }
            }, 100);
        }
    }, [prefilledText]);

    const handleInitialSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!suggestion.trim()) return;
        setError(null);
        setIsSubmitted(false);
        setShowSignaturePopup(true);
    };

    const handleFinalSubmit = async (isAnonymous: boolean = false) => {
        if (isLoading) return;

        setShowSignaturePopup(false);
        setIsLoading(true);
        setError(null);

        try {
            const author = isAnonymous ? undefined : authorName.trim();
            await onSubmitSuggestion(suggestion, author);
            setIsSubmitted(true);
            setSuggestion('');
            setAuthorName('');
        } catch (err) {
            console.error("Error submitting suggestion:", err);
            setError("Ocorreu um erro. Por favor, tente novamente mais tarde.");
        } finally {
            setIsLoading(false);
        }
    };

    const renderFormContent = () => {
        if (isSubmitted) {
            return (
                <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg fade-in-down text-center">
                    <h4 className="font-semibold text-green-800 flex items-center justify-center gap-2"><RemixIcon name="check-double-line" /> Sugestão Enviada!</h4>
                    <p className="text-green-700 mt-1">Obrigado pela sua valiosa contribuição! A sua ideia foi registada e será revista pela comunidade.</p>
                    <button onClick={() => setIsSubmitted(false)} className="mt-4 text-sm text-pcd-accent font-semibold hover:underline">Submeter outra ideia</button>
                </div>
            );
        }

        if (showSignaturePopup) {
            return (
                <div className="fade-in-down text-center">
                    <h4 className="text-xl font-bold text-pcd-text-dark mb-2">Quer assinar a sua sugestão?</h4>
                    <p className="text-pcd-text-light mb-4">É opcional, mas ajuda a dar crédito às boas ideias da comunidade.</p>
                    <input
                        type="text"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        placeholder="O seu nome (opcional)"
                        className="w-full text-center p-3 border-2 border-pcd-border rounded-lg focus:border-pcd-accent focus:ring-1 focus:ring-pcd-accent transition"
                        disabled={isLoading}
                    />
                    <div className="mt-4 flex flex-col sm:flex-row gap-3">
                        <button onClick={() => handleFinalSubmit(false)} disabled={isLoading} className="w-full py-2 px-4 bg-pcd-accent text-white font-semibold rounded-lg hover:bg-opacity-90 transition flex items-center justify-center gap-2 disabled:bg-gray-400">
                            {isLoading ? <RemixIcon name="loader-4-line" className="animate-spin" /> : <RemixIcon name="quill-pen-line" />}
                            Submeter com Assinatura
                        </button>
                        <button onClick={() => handleFinalSubmit(true)} disabled={isLoading} className="w-full py-2 px-4 bg-pcd-bg-soft text-pcd-text-dark font-semibold rounded-lg hover:bg-gray-200 transition border border-pcd-border flex items-center justify-center gap-2 disabled:bg-gray-400">
                            Submeter Anonimamente
                        </button>
                    </div>
                </div>
            );
        }
        
        return (
            <form onSubmit={handleInitialSubmit}>
                <textarea
                    ref={textareaRef}
                    value={suggestion}
                    onChange={(e) => setSuggestion(e.target.value)}
                    placeholder="Escreva aqui a sua sugestão para um novo princípio..."
                    className="w-full h-32 p-3 border-2 border-pcd-border rounded-lg focus:border-pcd-accent focus:ring-1 focus:ring-pcd-accent transition"
                />
                <button
                    type="submit"
                    disabled={!suggestion.trim()}
                    className="w-full mt-4 py-3 px-6 bg-pcd-accent text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    <RemixIcon name="send-plane-2-line" />
                    Enviar Sugestão
                </button>
            </form>
        );
    };

    return (
        <Card className="!shadow-2xl border-pcd-accent">
            <div className="text-center">
                <RemixIcon name="quill-pen-line" className="text-5xl text-pcd-accent mb-3" />
                <h3 className="text-2xl font-bold text-pcd-text-dark">A Sua Voz Conta</h3>
                <p className="text-pcd-text-light mt-2 mb-6">Falta algum princípio? Tem uma ideia para melhorar um existente? Partilhe-a connosco.</p>
            </div>

            {renderFormContent()}
            
            {error && (
                 <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                    <p className="text-red-700">{error}</p>
                </div>
            )}
        </Card>
    );
};

export default SuggestionForm;