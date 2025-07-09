/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './index.css';
import { appConfig } from './src/config/appConfig';


// --- Mount Application to the DOM ---
const rootElement = document.getElementById('root');
if (rootElement) {
    // Map the 1-10 font scale to a gentle CSS scaling factor.
    const computedScale = 1 + (appConfig.fontScale - 3) * 0.1;
    document.documentElement.style.setProperty('--font-scale', String(computedScale));
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
}
