/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

type LearningUnitLayoutProps = {
    children: React.ReactNode;
    sidebar: React.ReactNode;
};

const LearningUnitLayout = ({ children, sidebar }: LearningUnitLayoutProps) => {
    return (
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12">
                <main className="lg:col-span-8">
                    {children}
                </main>
                <aside className="lg:col-span-4 py-10 lg:py-0">
                    {sidebar}
                </aside>
            </div>
        </div>
    );
};

export default LearningUnitLayout;