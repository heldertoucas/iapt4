/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import StaticLogo from './StaticLogo';
import RemixIcon from './ui/RemixIcon';

type FooterProps = {
    onShowAllResources: () => void;
};

// --- Footer Component ---
const Footer = ({ onShowAllResources }: FooterProps) => {
    const currentYear = new Date().getFullYear();

    const handleShowResourcesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        onShowAllResources();
    };
    
    return (
        <footer id="footer" className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-2">
                        <div className="flex items-center mb-4">
                            <StaticLogo className="h-8 mr-3" />
                            <h3 className="text-2xl font-bold">IA para Todos</h3>
                        </div>
                        <p className="text-gray-400 mb-6 max-w-md text-base">Um Programa Municipal e um Movimento de Cidadãos para garantir que a tecnologia de IA serve todas as pessoas com transparência, justiça e empatia.</p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter"><RemixIcon name="twitter-line" className="text-xl"/></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Github"><RemixIcon name="github-line" className="text-xl"/></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn"><RemixIcon name="linkedin-line" className="text-xl"/></a>
                            <a href="mailto:info@example.com" className="text-gray-400 hover:text-white transition-colors" aria-label="Email"><RemixIcon name="mail-line" className="text-xl"/></a>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Explorar</h4>
                        <ul className="space-y-3">
                            <li><a href="#manifesto" className="text-gray-400 hover:text-white transition-colors text-base">Manifesto</a></li>
                            <li><a href="#about" className="text-gray-400 hover:text-white transition-colors text-base">O Programa</a></li>
                            <li><a href="#learn" className="text-gray-400 hover:text-white transition-colors text-base">Aprender</a></li>
                            <li><a href="#resources" onClick={handleShowResourcesClick} className="text-gray-400 hover:text-white transition-colors text-base">Recursos</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Participe</h4>
                        <ul className="space-y-3">
                            <li><a href="https://forms.cloud.microsoft/e/dJ6L5vNCwU" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-base">Assinar o Manifesto</a></li>
                            <li><a href="#participate" className="text-gray-400 hover:text-white transition-colors text-base">Junte-se à Comunidade</a></li>
                            <li><a href="mailto:info@example.com" className="text-gray-400 hover:text-white transition-colors text-base">Contacto</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-12 pt-8 text-center">
                    <p className="text-gray-400 text-base mb-2">&copy; {currentYear} IA para Todos. Conteúdo sob licença Creative Commons.</p>
                    <p className="text-gray-400 text-base">Uma iniciativa do Programa Municipal para a Literacia em Inteligência Artificial da Câmara Municipal de Lisboa.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
