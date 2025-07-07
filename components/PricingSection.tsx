/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import PageSection from './layout/PageSection';
import RemixIcon from './ui/RemixIcon';
import AnimatedSection from './AnimatedSection';

const PricingCard = ({ plan, popular }: { plan: any, popular: boolean }) => {
    const cardClasses = `relative bg-pcd-card-bg p-8 rounded-2xl shadow-lg border flex flex-col ${popular ? 'border-pcd-accent' : 'border-gray-200'}`;
    const buttonClasses = `w-full mt-auto py-3 px-6 rounded-full font-semibold transition-transform transform hover:scale-105 ${popular ? 'bg-pcd-accent text-white hover:bg-opacity-90' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`;

    return (
        <AnimatedSection tag="div" className={cardClasses}>
            {popular && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-pcd-accent text-white text-sm font-semibold rounded-full">MAIS POPULAR</span>
                </div>
            )}
            <h3 className="text-2xl font-bold text-gray-800 text-center">{plan.name}</h3>
            <p className="text-center text-gray-500 mt-2 text-base">{plan.description}</p>
            <div className="my-8 text-center">
                <span className="text-5xl font-extrabold text-gray-900">{plan.price}</span>
                <span className="text-lg text-gray-500">/{plan.period}</span>
            </div>
            <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center">
                        <RemixIcon name="checkbox-circle-line" className="h-6 w-6 text-green-500 mr-3" />
                        <span className="text-gray-700 text-base">{feature}</span>
                    </li>
                ))}
            </ul>
            <button className={buttonClasses}>
                {plan.buttonText}
            </button>
        </AnimatedSection>
    )
}

const PricingSection = () => {
    const plans = [
        {
            name: "Básico",
            description: "Para indivíduos que estão a começar.",
            price: "Grátis",
            period: "sempre",
            features: [
                "Acesso a 5 cursos introdutórios",
                "Quizzes e exercícios básicos",
                "Apoio da comunidade",
            ],
            buttonText: "Comece Agora",
        },
        {
            name: "Pro",
            description: "Para aprendizes sérios e profissionais.",
            price: "19€",
            period: "mês",
            features: [
                "Acesso ilimitado a todos os cursos",
                "Projetos práticos e estudos de caso",
                "Certificados de conclusão",
                "Sessões de Q&A com instrutores",
                "Apoio prioritário",
            ],
            buttonText: "Escolher o Plano Pro",
            popular: true,
        },
        {
            name: "Equipas",
            description: "Para organizações e empresas.",
            price: "Contacto",
            period: " ",
            features: [
                "Todas as funcionalidades do Pro",
                "Painel de controlo da equipa",
                "Faturação centralizada",
                "Percursos de aprendizagem personalizados",
            ],
            buttonText: "Contactar Vendas",
        },
    ];
    
    const title = <>Planos Flexíveis para <span className="text-pcd-accent">Todos</span></>;
    const subtitle = "Escolha o plano que melhor se adapta às suas necessidades de aprendizagem, quer esteja a começar ou a liderar uma equipa.";

    return (
        <PageSection id="pricing" className="bg-pcd-bg-soft" title={title} subtitle={subtitle}>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto pt-8">
                {plans.map((plan, index) => (
                    <PricingCard key={plan.name} plan={plan} popular={!!plan.popular} />
                ))}
            </div>
        </PageSection>
    );
};

export default PricingSection;