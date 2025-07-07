/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './index.css';


// --- Mount Application to the DOM ---
const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
}
