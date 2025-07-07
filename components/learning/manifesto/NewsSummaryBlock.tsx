/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import useAnimatedSection from '../../../hooks/useAnimatedSection';
import { manifestoApi, NewsAnalysis } from '../../../services/manifestoApi';
import RemixIcon from '../../ui/RemixIcon';
import StatInfographic from './StatInfographic';

type NewsSummaryBlockProps = {
    principleTitle: string;
    principleIcon: string;
};

const NewsSummaryBlock = ({ principleTitle, principleIcon }: NewsSummaryBlockProps) => {
    const [elementRef, isVisible] = useAnimatedSection({ threshold: 0.5 });
    const [news, setNews] = useState<NewsAnalysis | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
            if (!isVisible || news) return;

            setIsLoading(true);
            setError(null);
            try {
                const result = await manifestoApi.summarizeNewsForPrinciple(principleTitle);
                setNews(result);
            } catch (err) {
                console.error(`Failed to fetch news for ${principleTitle}:`, err);
                setError('Não foi possível carregar as notícias mais recentes.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchNews();
    }, [isVisible, principleTitle, news]);

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex items-center justify-center gap-2 text-pcd-text-light">
                    <RemixIcon name="loader-4-line" className="animate-spin" />
                    A procurar as notícias mais recentes...
                </div>
            );
        }
        if (error) {
            return <p className="text-red-500 text-sm text-center">{error}</p>;
        }
        if (news) {
            return (
                <div className="space-y-4">
                    <h5 className="font-bold text-xl text-pcd-text-dark text-center">{news.questionTitle}</h5>
                    <p className="text-pcd-accent font-semibold text-center -mt-2">"{news.statementHeadline}"</p>
                    
                    <StatInfographic statisticText={news.keyStatistic} iconName={principleIcon} />
                    
                    <div>
                        <ul className="space-y-3">
                            {news.facts.map((fact, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <RemixIcon name="check-line" className="text-pcd-accent mt-1" />
                                    <p className="text-pcd-text-dark text-base">{fact}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    {news.sources.length > 0 && (
                        <div className="pt-3 border-t border-dashed border-gray-300">
                            <h6 className="font-semibold text-sm text-pcd-text-dark mb-2">Fontes Consultadas pela IA:</h6>
                            <ul className="space-y-1">
                                {news.sources.slice(0, 2).map((source, index) => (
                                    <li key={index}>
                                        <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-xs text-pcd-blue hover:underline flex items-center gap-1.5">
                                            <RemixIcon name="external-link-line" className="flex-shrink-0"/>
                                            <span className="truncate">{source.title || new URL(source.uri).hostname}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            );
        }
        return null; // Don't render anything if not visible/triggered
    };

    return (
        <div ref={elementRef} className="my-6 p-4 bg-pcd-bg-soft rounded-lg border border-pcd-border min-h-[16rem]">
            {renderContent()}
        </div>
    );
};

export default NewsSummaryBlock;