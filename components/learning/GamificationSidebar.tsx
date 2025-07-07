/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import RemixIcon from '../ui/RemixIcon';
import PageSection from '../layout/PageSection';

type GamificationSidebarProps = {
    displayMode?: 'sidebar' | 'section';
};

const GamificationSidebar = ({ displayMode = 'sidebar' }: GamificationSidebarProps) => {
    
    const sidebarContent = (
        <>
            <div>
                <h2 className="font-lexend text-xl font-semibold mb-4 text-pcd-text-dark">A Minha Jornada</h2>
                <div className="p-5 bg-gradient-to-br from-pcd-blue to-pcd-roxo rounded-2xl text-center shadow-lg">
                    <div className="relative w-36 h-36 mx-auto">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                            <circle className="text-white/40" cx="18" cy="18" r="15.9155" fill="none" stroke="currentColor" strokeWidth="3"></circle>
                            <circle className="text-white" cx="18" cy="18" r="15.9155" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="75, 100" strokeLinecap="round" style={{ transition: 'stroke-dasharray 0.5s ease' }}></circle>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl">🚀</span>
                            <span className="font-bold text-white text-3xl">75</span>
                            <span className="text-xs text-purple-200 tracking-wider mt-0.5">PONTOS</span>
                        </div>
                    </div>
                    <p className="mt-4 font-semibold text-white text-lg">Nível 1: Explorador Digital</p>
                </div>
            </div>
            <div className="bg-pcd-card-bg p-6 rounded-2xl shadow-card">
                <h2 className="font-lexend text-xl font-semibold text-pcd-text-dark mb-5">Feed de Atividades</h2>
                <ul className="space-y-5">
                    <li className="flex items-start space-x-4">
                        <span className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-green-100 text-lg">🏆</span>
                        <div>
                            <p className="text-sm text-pcd-text-dark">Concluiu a "Missão 1" e ganhou <span className="font-bold">100 pontos!</span></p>
                            <p className="text-xs text-pcd-text-light mt-0.5">há 5 minutos</p>
                        </div>
                    </li>
                    <li className="flex items-start space-x-4">
                         <img className="h-10 w-10 rounded-full flex-shrink-0 object-cover" src="https://placehold.co/100x100/17A2B8/FFFFFF?text=A" alt="Avatar da Ana" />
                        <div>
                            <p className="text-sm text-pcd-text-dark"><span className="font-semibold">Ana</span> atribuiu-lhe o badge <span className="font-semibold text-pcd-roxo">"Ótima Ajuda"</span>.</p>
                            <p className="text-xs text-pcd-text-light mt-0.5">há 2 horas</p>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );

    if (displayMode === 'section') {
        return (
            <PageSection title={<>Gamificação & <span className="text-pcd-blue">Comunidade</span></>} className="bg-pcd-card-bg">
                <div className="max-w-md mx-auto space-y-12">
                    {sidebarContent}
                </div>
            </PageSection>
        )
    }

    return (
        <div className="sticky top-28 space-y-12">
            {sidebarContent}
        </div>
    );
};

export default GamificationSidebar;