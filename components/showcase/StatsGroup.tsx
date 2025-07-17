/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

const statsData = [
  {
    title: 'Page views',
    stats: '456,133',
    description: '24% more than in the same month last year, 33% more that two years ago',
  },
  {
    title: 'New users',
    stats: '2,175',
    description: '13% less compared to last month, new user engagement up by 6%',
  },
  {
    title: 'Completed orders',
    stats: '1,994',
    description: '1994 orders were completed this month, 97% satisfaction rate',
  },
];

const StatsGroup = () => {
    return (
        <div className="flex flex-col sm:flex-row bg-pcd-gradient-accent text-white p-8 md:p-10 rounded-2xl shadow-lg">
            {statsData.map((stat, index) => (
                <div key={stat.title} className={`flex-1 ${index > 0 ? 'sm:pl-8 sm:ml-8 sm:border-l sm:border-white/30 mt-8 sm:mt-0 pt-8 sm:pt-0 border-t sm:border-t-0 border-white/30' : ''}`}>
                    <p className="text-4xl font-bold text-white font-lexend">{stat.stats}</p>
                    <p className="text-sm font-bold text-white uppercase mt-2">{stat.title}</p>
                    <p className="text-base text-white/80 mt-1">{stat.description}</p>
                </div>
            ))}
        </div>
    );
};

export default StatsGroup;