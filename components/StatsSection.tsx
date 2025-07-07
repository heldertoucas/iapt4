/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import AnimatedSection from './AnimatedSection';
import useAnimatedSection from '../hooks/useAnimatedSection';
import useCountUp from '../hooks/useCountUp';
import RemixIcon from './ui/RemixIcon';

const StatItem = ({ value, label, icon }: { value: number, label: string, icon: string }) => {
    const [ref, isVisible] = useAnimatedSection({ threshold: 0.5 });
    const count = useCountUp(value, isVisible);

    return (
        <div ref={ref} className="text-center">
            <RemixIcon name={icon} className="text-5xl mx-auto text-pcd-accent mb-2" />
            <p className="text-4xl font-bold text-gray-800">{count.toLocaleString('pt-PT')}+</p>
            <p className="text-gray-500 mt-1 text-lg">{label}</p>
        </div>
    );
};

const StatsSection = () => {
    const stats = [
        { value: 1200, label: 'Alunos Satisfeitos', icon: 'group-line' },
        { value: 40, label: 'Cursos Disponíveis', icon: 'book-open-line' },
        { value: 95, label: 'Taxa de Conclusão', icon: 'line-chart-line' },
        { value: 25, label: 'Instrutores Especialistas', icon: 'award-line' },
    ];
    
    return (
        <AnimatedSection tag="section" className="py-20 bg-pcd-card-bg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map(stat => (
                        <StatItem key={stat.label} {...stat} />
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

export default StatsSection;