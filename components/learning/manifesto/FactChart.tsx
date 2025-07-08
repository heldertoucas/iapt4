/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import useAnimatedSection from '../../../hooks/useAnimatedSection';

interface ChartDataPoint {
    label: string;
    value: number;
    color?: string;
}

interface FactChartProps {
    chartData: {
        type: 'donut' | 'bar';
        data: ChartDataPoint[];
        unit?: string;
    };
}

const DonutChart = ({ data, unit = '%' }: { data: ChartDataPoint[]; unit?: string }) => {
    const [ref, isVisible] = useAnimatedSection({ threshold: 0.5 });
    const point = data[0];
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const offset = isVisible ? circumference - (point.value / 100) * circumference : circumference;

    return (
        <div ref={ref} className="relative w-48 h-48">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                <circle
                    className="text-gray-200"
                    strokeWidth="12"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="60"
                    cy="60"
                />
                <circle
                    className={point.color || 'text-pcd-accent'}
                    strokeWidth="12"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="60"
                    cy="60"
                    style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-bold text-pcd-text-dark">{point.value}{unit}</span>
                <span className="text-xs text-pcd-text-light max-w-[80px]">{point.label}</span>
            </div>
        </div>
    );
};

const BarChart = ({ data, unit = '%' }: { data: ChartDataPoint[]; unit?: string }) => {
    const [ref, isVisible] = useAnimatedSection({ threshold: 0.5 });
    const maxValue = Math.max(...data.map(d => d.value), 100);

    return (
        <div ref={ref} className="w-full space-y-3">
            {data.map((point, index) => {
                const width = isVisible ? (point.value / maxValue) * 100 : 0;
                return (
                    <div key={index}>
                        <div className="flex justify-between items-center mb-1 text-sm">
                            <span className="text-pcd-text-light">{point.label}</span>
                            <span className="font-semibold text-pcd-text-dark">{point.value}{unit}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                            <div
                                className={`h-4 rounded-full ${point.color || 'bg-pcd-accent'}`}
                                style={{ width: `${width}%`, transition: `width 1.5s ${index * 0.2}s ease-out` }}
                            ></div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const FactChart = ({ chartData }: FactChartProps) => {
    return (
        <div className="mt-6 flex items-center justify-center bg-pcd-card-bg p-4 rounded-lg border border-pcd-border shadow-sm">
            {chartData.type === 'donut' ? (
                <DonutChart data={chartData.data} unit={chartData.unit} />
            ) : (
                <BarChart data={chartData.data} unit={chartData.unit} />
            )}
        </div>
    );
};

export default FactChart;
