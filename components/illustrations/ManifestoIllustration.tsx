/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

const ManifestoIllustration = ({ className = '' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 552 384" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title>Ilustração de um documento de manifesto</title>
        <rect width="384" height="552" rx="48" transform="matrix(0 -1 -1 0 552 384)" fill="#fff" />
        <rect width="384" height="552" rx="48" transform="matrix(0 -1 -1 0 552 384)" fill="var(--pcd-accent-color)" fillOpacity=".05" />
        <rect x="48" y="272" width="160" height="16" rx="8" fill="var(--pcd-accent-color)" fillOpacity=".1" />
        <rect x="48" y="216" width="320" height="16" rx="8" fill="var(--pcd-accent-color)" fillOpacity=".1" />
        <rect x="48" y="160" width="352" height="16" rx="8" fill="var(--pcd-accent-color)" fillOpacity=".1" />
        <rect x="48" y="104" width="224" height="16" rx="8" fill="var(--pcd-accent-color)" fillOpacity=".1" />
        <rect x="424" y="240" width="80" height="80" rx="40" fill="#fff" />
        <rect x="424" y="240" width="80" height="80" rx="40" fill="var(--pcd-accent-color)" fillOpacity=".05" />
        <path d="m455 264-16.142 16.142a4 4 0 0 0 0 5.657L455 302M473 264l16.142 16.142a4 4 0 0 1 0 5.657L473 302" stroke="var(--pcd-accent-color)" strokeWidth="6" strokeLinecap="round" />
        <path d="m390 142 16-16 16 16m-16-16v64" stroke="var(--pcd-accent-color)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m390 142 16-16 16 16m-16-16v64" stroke="#fff" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m390 142 16-16 16 16m-16-16v64" stroke="var(--pcd-accent-color)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
export default ManifestoIllustration;
