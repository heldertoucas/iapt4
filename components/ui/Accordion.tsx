/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import RemixIcon from './RemixIcon';

type AccordionProps = {
    title: React.ReactNode;
    children: React.ReactNode;
};

const Accordion = ({ title, children }: AccordionProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center w-full py-4 text-left text-xl font-medium text-gray-800 hover:bg-gray-50 focus:outline-none"
                aria-expanded={isOpen}
            >
                <span>{title}</span>
                <RemixIcon name={isOpen ? 'arrow-up-s-line' : 'arrow-down-s-line'} className="h-6 w-6 transition-transform duration-300" />
            </button>
            <div
                className={`grid overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
            >
                <div className="overflow-hidden">
                    <div className="p-4 text-lg text-gray-600">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Accordion;