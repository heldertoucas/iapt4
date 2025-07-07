/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import AnimatedSection from './AnimatedSection';
import RemixIcon from './ui/RemixIcon';
import Card from './ui/Card';

// --- ParticipateSection Component ---
const ParticipateSection = () => {
    return (
        <AnimatedSection tag="section" id="participate" className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-teal-500 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Junte-se ao Movimento</h2>
                    <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12">Faça parte da construção de um futuro onde a IA sirva a humanidade. A sua voz é importante.</p>
                </div>
                <AnimatedSection tag="div" className="max-w-lg mx-auto text-center" delay="0.2s">
                    <a href="https://forms.cloud.microsoft/e/dJ6L5vNCwU" target="_blank" rel="noopener noreferrer" className="inline-block px-10 py-4 bg-white text-pcd-accent rounded-full font-semibold text-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-pcd-accent-light focus:ring-opacity-50">
                        Assinar o Manifesto
                    </a>
                </AnimatedSection>
                <AnimatedSection tag="div" className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto" delay="0.4s">
                    <Card className="!bg-white/10 backdrop-blur-sm p-6 hover:!bg-white/15 transition-colors flex flex-col justify-between !border-0 !shadow-lg">
                        <div>
                            <div className="flex items-center justify-center h-16 w-16 bg-white/20 rounded-lg mb-4">
                                <RemixIcon name="mail-line" className="text-3xl text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-white">Mantenha-se Informado</h3>
                            <p className="text-white/80 mb-4 text-base">Receba atualizações sobre os mais recentes desenvolvimentos em IA, explicados em linguagem simples.</p>
                        </div>
                        <a href="#" className="mt-auto inline-block bg-transparent border border-white/50 text-white/90 px-5 py-2 rounded-full text-base font-medium hover:bg-white/10 hover:text-white transition-colors text-center">
                            Subscrever
                        </a>
                    </Card>
                    <Card className="!bg-white/10 backdrop-blur-sm p-6 hover:!bg-white/15 transition-colors flex flex-col justify-between !border-0 !shadow-lg">
                        <div>
                            <div className="flex items-center justify-center h-16 w-16 bg-white/20 rounded-lg mb-4">
                                <RemixIcon name="group-line" className="text-3xl text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-white">Participe nas Discussões</h3>
                            <p className="text-white/80 mb-4 text-base">Participe em fóruns comunitários e molde a conversa em torno de uma IA humana.</p>
                        </div>
                        <a href="#" className="mt-auto inline-block bg-transparent border border-white/50 text-white/90 px-5 py-2 rounded-full text-base font-medium hover:bg-white/10 hover:text-white transition-colors text-center">
                            Comunidade
                        </a>
                    </Card>
                    <Card className="!bg-white/10 backdrop-blur-sm p-6 hover:!bg-white/15 transition-colors flex flex-col justify-between !border-0 !shadow-lg">
                        <div>
                            <div className="flex items-center justify-center h-16 w-16 bg-white/20 rounded-lg mb-4">
                                <RemixIcon name="award-line" className="text-3xl text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-white">Aja</h3>
                            <p className="text-white/80 mb-4 text-base">Envolva-se em iniciativas que promovem uma IA ética e acessível para todos.</p>
                        </div>
                        <a href="#" className="mt-auto inline-block bg-transparent border border-white/50 text-white/90 px-5 py-2 rounded-full text-base font-medium hover:bg-white/10 hover:text-white transition-colors text-center">
                            Contribuir
                        </a>
                    </Card>
                </AnimatedSection>
            </div>
        </AnimatedSection>
    );
};

export default ParticipateSection;