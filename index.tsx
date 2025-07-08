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
    document.documentElement.style.setProperty('--font-scale', String(appConfig.fontScale));
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
}
