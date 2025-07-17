/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import type { Category } from '../../../types/prompt-factory';
import RemixIcon from '../../ui/RemixIcon';
import AnimatedSection from '../../AnimatedSection';

type CategorySelectorProps = {
  categories: Category[];
  onSelectCategory: (categoryId: string) => void;
};

const CategorySelectorV2 = ({ categories, onSelectCategory }: CategorySelectorProps) => {
  return (
    <div className="flex flex-col items-center text-center">
        <RemixIcon name="pencil-ruler-2-line" className="text-4xl text-pcd-accent mb-2" />
        <h2 className="text-3xl font-bold text-gray-800">Vamos Começar a Criar?</h2>
        <p className="text-gray-600 mt-1 mb-8 text-lg max-w-md">O primeiro passo é simples: selecione o tipo de tarefa que tem em mente.</p>

        <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((category, index) => (
                <AnimatedSection
                    key={category.id}
                    tag="button"
                    onClick={() => onSelectCategory(category.id)}
                    className="p-6 bg-pcd-bg-soft rounded-lg text-left hover:bg-pcd-accent-light hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pcd-accent h-full flex flex-col justify-center"
                    delay={`${index * 0.05}s`}
                >
                    <RemixIcon name={category.icon_name} className="text-3xl text-pcd-accent mb-3" />
                    <h3 className="font-semibold text-gray-800 text-lg">{category.title}</h3>
                </AnimatedSection>
            ))}
        </div>
    </div>
  );
};

export default CategorySelectorV2;