/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import useSupabaseHeroContent from '../../hooks/useSupabaseHeroContent';

type FloatingEmoji = {
    id: number;
    emoji: string;
    left: string;
    animationDuration: string;
    animationDelay: string;
    fontSize: string;
};

type PromptFactoryHeroProps = {
    onStart: () => void;
};

const PromptFactoryHero = ({ onStart }: PromptFactoryHeroProps) => {
    const { content, isLoading } = useSupabaseHeroContent();
    const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);

    useEffect(() => {
        if (content?.emojis && content.emojis.length > 0) {
            const themeEmoji = content.emojis[0];

            const emojisToRender: FloatingEmoji[] = Array.from({ length: 15 }).map((_, i) => ({
                id: i,
                emoji: themeEmoji,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 8 + 7}s`,
                animationDelay: i < 3 ? '0s' : `${Math.random() * 12 + 1}s`,
                fontSize: `${Math.random() * 24 + 20}px`
            }));
            setFloatingEmojis(emojisToRender);
        }
    }, [content]);

    return (
        <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-pcd-roxo via-pcd-pink to-pcd-orange border-b border-pcd-border overflow-hidden">
            <div className="absolute inset-0 z-0">
                {floatingEmojis.map(emoji => (
                    <span
                        key={emoji.id}
                        className="absolute bottom-0 emoji-float opacity-0"
                        style={{
                            left: emoji.left,
                            animationDuration: emoji.animationDuration,
                            animationDelay: emoji.animationDelay,
                            fontSize: emoji.fontSize,
                        }}
                    >
                        {emoji.emoji}
                    </span>
                ))}
            </div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                {isLoading ? (
                    <h1 className="text-4xl md:text-5xl font-bold text-white font-lexend drop-shadow-lg">
                        A carregar...
                    </h1>
                ) : content && (
                    <>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-lexend drop-shadow-lg flex items-center justify-center gap-x-4">
                           <span>{content.title}</span>
                           {content.emojis && content.emojis.length > 0 && (
                             <span className="hidden md:inline-block">{content.emojis[0]}</span>
                           )}
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mt-6 leading-relaxed drop-shadow-md">
                            {content.subtitle}
                        </p>
                        <div className="mt-10">
                            <button
                                onClick={onStart}
                                className="px-8 py-3 bg-white text-pcd-roxo rounded-full font-semibold hover:bg-opacity-90 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                            >
                                Começar a Criar
                            </button>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default PromptFactoryHero;