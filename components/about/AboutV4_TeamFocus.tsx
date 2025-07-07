/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import PageSection from '../layout/PageSection';
import Card from '../ui/Card';
import RemixIcon from '../ui/RemixIcon';

const AboutV4_TeamFocus = () => {
    const teamMembers = [
        {
            name: "Sofia Almeida",
            role: "Coordenadora & Estratega",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop",
            bio: "Apaixonada por tecnologia e impacto social, Sofia lidera a visão estratégica do programa."
        },
        {
            name: "Rui Costa",
            role: "Especialista em Tecnologia",
            image: "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format=fit=crop",
            bio: "Engenheiro de IA com um foco em ética, Rui garante que as nossas ferramentas são responsáveis e acessíveis."
        },
        {
            name: "Joana Mendes",
            role: "Designer de Aprendizagem",
            image: "https://images.unsplash.com/photo-1580894732444-84cf70b6b582?q=80&w=1887&auto=format&fit=crop",
            bio: "Joana desenha as experiências de aprendizagem que tornam a IA compreensível e divertida para todos."
        },
    ];

    return (
        <PageSection
            id="about-v4"
            title={<>Sobre Nós V4: <span className="text-pcd-accent">A Nossa Equipa</span></>}
            subtitle="O 'IA para Todos' é impulsionado por uma equipa dedicada de especialistas apaixonados por criar um impacto positivo."
            className="bg-pcd-bg-soft"
        >
            <div className="grid md:grid-cols-3 gap-8 mt-12">
                {teamMembers.map((member, index) => (
                    <Card key={member.name} delay={`${index * 0.1}s`} className="text-center items-center !p-6">
                        <img src={member.image} alt={`Foto de ${member.name}`} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover ring-4 ring-pcd-accent-light" />
                        <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                        <p className="text-pcd-accent font-semibold mb-3">{member.role}</p>
                        <p className="text-base text-gray-600 flex-grow">{member.bio}</p>
                    </Card>
                ))}
            </div>
        </PageSection>
    );
};

export default AboutV4_TeamFocus;
