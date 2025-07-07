/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import type { Category, Recipe } from '../../../types/prompt-factory';
import RemixIcon from '../../ui/RemixIcon';
import AnimatedSection from '../../AnimatedSection';

type RecipeSelectorProps = {
  recipes: Recipe[];
  category: Category | undefined;
  onSelectRecipe: (recipe: Recipe) => void;
};

const RecipeSelector = ({ recipes, category, onSelectRecipe }: RecipeSelectorProps) => {

  const calculateAverageRating = (recipe: Recipe) => {
    if (recipe.vote_count === 0) return 0;
    return (recipe.total_score / recipe.vote_count);
  }

  return (
     <div className="flex flex-col items-center text-center">
        <RemixIcon name="award-line" className="text-4xl text-pcd-accent mb-2" />
        <h2 className="text-3xl font-bold text-gray-800">
            Receitas de Sucesso para <span className="text-pcd-accent">{category?.title || 'a sua Tarefa'}</span>
        </h2>
        <p className="text-gray-600 mt-1 mb-8 text-lg max-w-lg">Escolha um ponto de partida. Cada receita é um atalho para um resultado fantástico.</p>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            {recipes.map((recipe, index) => {
                const rating = calculateAverageRating(recipe);
                const isPopular = rating >= 4.0 && recipe.vote_count >= 3;
                return (
                     <AnimatedSection
                        key={recipe.id}
                        tag="button"
                        onClick={() => onSelectRecipe(recipe)}
                        className="w-full p-6 bg-pcd-card-bg rounded-xl text-left border border-pcd-border hover:border-pcd-accent hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pcd-accent flex flex-col h-full"
                        delay={`${index * 0.05}s`}
                    >
                        <div className="flex-grow">
                            <div className="flex items-start gap-4">
                                <div className="bg-pcd-accent-light p-4 rounded-lg flex-shrink-0">
                                   <RemixIcon name={recipe.icon_name} className="text-3xl text-pcd-accent" />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-semibold text-gray-800 text-xl leading-tight">{recipe.title}</h3>
                                    {isPopular && <span className="text-xs font-bold text-pcd-accent bg-pcd-accent-light px-2 py-0.5 rounded-full mt-2 inline-block">POPULAR</span>}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center text-sm mt-4 pt-4 border-t border-pcd-border">
                            {[...Array(5)].map((_, i) => (
                                <RemixIcon key={i} name="star-fill" className={`h-5 w-5 ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                            ))}
                            <span className="text-gray-500 ml-2">({recipe.vote_count} avaliações)</span>
                        </div>
                    </AnimatedSection>
                )
            })}
        </div>
    </div>
  );
};

export default RecipeSelector;