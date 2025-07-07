/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import PageSection from './layout/PageSection';
import Card from './ui/Card';
import RemixIcon from './ui/RemixIcon';

const TeamSection = () => {
    const teamMembers = [
        {
            name: "Dra. Sofia Santos",
            role: "Especialista em Ética de IA",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            social: {
                twitter: "#",
                linkedin: "#",
            }
        },
        {
            name: "Eng. Rui Costa",
            role: "Engenheiro de Machine Learning",
            image: "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            social: {
                github: "#",
                linkedin: "#",
            }
        },
        {
            name: "Prof. Joana Mendes",
            role: "Investigadora de PLN",
            image: "https://images.unsplash.com/photo-1580894732444-84cf70b6b582?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            social: {
                twitter: "#",
                github: "#",
            }
        },
    ];

    const title = <>Conheça os Nossos <span className="text-pcd-accent">Especialistas</span></>;
    const subtitle = "A nossa equipa é composta por líderes de pensamento e profissionais experientes, dedicados a fornecer a melhor educação em IA.";
    
    return (
        <PageSection id="team" className="bg-pcd-card-bg" title={title} subtitle={subtitle}>
            <div className="grid md:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                    <Card key={member.name} delay={`${index * 0.1}s`} className="text-center items-center">
                        <img src={member.image} alt={`Foto de ${member.name}`} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                        <h3 className="text-xl font-semibold mb-1 text-gray-900">{member.name}</h3>
                        <p className="text-pcd-accent font-medium mb-4">{member.role}</p>
                        <div className="flex space-x-4">
                            {member.social.twitter && <a href={member.social.twitter} className="text-gray-400 hover:text-pcd-accent"><RemixIcon name="twitter-line" className="text-2xl" /></a>}
                            {member.social.linkedin && <a href={member.social.linkedin} className="text-gray-400 hover:text-pcd-accent"><RemixIcon name="linkedin-line" className="text-2xl" /></a>}
                            {member.social.github && <a href={member.social.github} className="text-gray-400 hover:text-pcd-accent"><RemixIcon name="github-line" className="text-2xl" /></a>}
                        </div>
                    </Card>
                ))}
            </div>
        </PageSection>
    );
};

export default TeamSection;