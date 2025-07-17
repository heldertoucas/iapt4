/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import RemixIcon from '../ui/RemixIcon';

const features = [
  {
    icon: 'creative-commons-by-line',
    title: 'Free and open source',
    description: 'All packages are published under MIT license, you can use Mantine in any project',
  },
  {
    icon: 'file-code-line',
    title: 'TypeScript based',
    description: 'Build type safe applications, all components and hooks export types',
  },
  {
    icon: 'focus-3-line',
    title: 'No annoying focus ring',
    description: 'With new :focus-visible selector focus ring will appear only when user navigates with keyboard',
  },
  {
    icon: 'temp-hot-line',
    title: 'Flexible',
    description: 'Customize colors, spacing, shadows, fonts and many other settings with global theme object',
  },
];

const FeatureGridSection = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
        {/* Left Column */}
        <div className="md:col-span-5">
          <h2 className="text-4xl font-bold text-gray-900 font-lexend">
            A fully featured React components library for your next project
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Build fully functional accessible web applications faster than ever – Mantine includes more than 120 customizable components and hooks to cover you in any situation
          </p>
          <button className="mt-8 px-8 py-3 bg-pcd-gradient-accent text-white font-semibold rounded-lg shadow-lg hover:scale-105 transform transition-transform">
            Get started
          </button>
        </div>
        {/* Right Column */}
        <div className="md:col-span-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
            {features.map((feature) => (
              <div key={feature.title}>
                <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-pcd-gradient-accent text-white">
                  <RemixIcon name={feature.icon} className="text-4xl" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-1 text-base text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureGridSection;