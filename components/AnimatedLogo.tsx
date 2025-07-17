/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

// --- Reusable SVG Logo Component (Animated Version for Navbar) ---
const AnimatedLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 2014 2014" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="paint0_animated" x1="211.02" y1="1344.54" x2="1912.2" y2="1339.6" gradientUnits="userSpaceOnUse">
        <stop stopColor="#5EE8D1"/>
        <stop offset="1" stopColor="#D2FFF6"/>
        <animateTransform attributeName="gradientTransform" type="rotate" from="0 1007 1007" to="360 1007 1007" dur="5s" repeatCount="indefinite" />
      </linearGradient>
      <linearGradient id="paint1_animated" x1="1360.31" y1="465.982" x2="2056.25" y2="463.962" gradientUnits="userSpaceOnUse">
        <stop stopColor="#5EE8D1"/>
        <stop offset="1" stopColor="#D2FFF6"/>
        <animateTransform attributeName="gradientTransform" type="rotate" from="0 1007 1007" to="360 1007 1007" dur="5s" repeatCount="indefinite" />
      </linearGradient>
    </defs>
    <path d="M10.3322 1121.97C-3.54966 1119.2 -3.39872 1094.51 10.5159 1091.92C163.765 1063.29 478.262 988.075 633.937 832.41C787.289 679.068 862.574 371.62 892.147 215.997C894.816 201.953 920.793 201.965 923.45 216.011C952.888 371.631 1027.9 679.048 1181.13 832.41C1334.4 985.805 1641.77 1061 1797.69 1090.57C1811.75 1093.23 1811.74 1119.29 1797.68 1121.94C1641.76 1151.37 1334.42 1226.3 1181.13 1379.57C1025.49 1535.2 950.63 1849.66 922.159 2003.16C919.577 2017.09 894.832 2017.26 892.055 2003.37C860.951 1847.84 781.588 1527.12 633.937 1379.57C486.367 1232.1 165.627 1152.94 10.3322 1121.97Z" fill="url(#paint0_animated)"/>
    <path d="M1278.21 374.933C1272.53 373.8 1272.59 363.7 1278.28 362.637C1340.98 350.928 1469.63 320.157 1533.32 256.475C1596.05 193.745 1626.85 67.9704 1638.95 4.30654C1640.04 -1.43879 1650.67 -1.4341 1651.76 4.31214C1663.8 67.975 1694.49 193.737 1757.17 256.475C1819.87 319.228 1945.62 349.991 2009.4 362.085C2015.15 363.176 2015.15 373.834 2009.4 374.919C1945.61 386.958 1819.88 417.611 1757.17 480.314C1693.5 543.981 1662.88 672.622 1651.23 735.419C1650.17 741.116 1640.05 741.188 1638.91 735.506C1626.19 671.877 1593.72 540.676 1533.32 480.314C1472.95 419.984 1341.74 387.603 1278.21 374.933Z" fill="url(#paint1_animated)"/>
  </svg>
);

export default AnimatedLogo;