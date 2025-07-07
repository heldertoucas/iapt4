/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import StaticLogo from '../StaticLogo';
import type { PageProps } from '../App';

// --- Footer Component ---
const AppFooter = ({ navigateTo }: PageProps) => {
    const currentYear = new Date().getFullYear();

    const handleBackClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (navigateTo) {
            navigateTo('#/');
        }
    };
    
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
                <div className="inline-flex items-center justify-center mb-4 cursor-default">
                    <StaticLogo className="h-8 mr-3" />
                    <h3 className="text-2xl font-bold text-white">IA para Todos</h3>
                </div>
                <p className="text-gray-400 text-base mb-2">&copy; {currentYear} IA para Todos. Conteúdo sob licença Creative Commons.</p>
                <p className="text-gray-400 text-base">
                    <a href="#/" onClick={handleBackClick} className="text-pcd-accent hover:underline">
                        Voltar à Página Principal
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default AppFooter;