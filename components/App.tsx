/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, ComponentType } from 'react';
import HomePage from './pages/HomePage';
import HomePage_Archive from './pages/HomePage_Archive';
import PromptFactoryPage from './pages/PromptFactoryPage';
import CopilotCoursePage from './pages/CopilotCoursePage';
import MicrosoftCopilotCoursePage from './pages/MicrosoftCopilotCoursePage';
import ManifestoCoCreationPage from './pages/ManifestoCoCreationPage';
import ComponentLibraryPage from './pages/ComponentLibraryPage';
import MicrosoftCopilotCoursePage2 from './pages/MicrosoftCopilotCoursePage2'; // Import the new course page
import MicrosoftCopilotCoursePage3 from './pages/MicrosoftCopilotCoursePage3';
import { appConfig } from '../src/config/appConfig';

// Define the shape of a page definition, used for routing and navigation.
export type PageDefinition = {
    label: string;
    path: string;
    component: ComponentType<PageProps>;
    featureFlag?: keyof (typeof appConfig.featureFlags);
};

// Define the props that will be passed to every page component.
export type PageProps = {
  navigateTo: (path: string) => void;
  pages?: PageDefinition[];
  activePath?: string;
};

// Define all possible pages with their feature flags.
const allPages: PageDefinition[] = [
    { label: "Página Principal", path: '#/', component: HomePage },
    { label: "arquivo main", path: '#/home-archive', component: HomePage_Archive },
    { label: "Co-criar o Manifesto", path: '#/manifesto-cocreate', component: ManifestoCoCreationPage, featureFlag: 'enableManifestoCoCreation' },
    { label: "Fábrica de Prompts", path: '#/prompt-factory', component: PromptFactoryPage },
    { label: "Curso ✨Descobrir a IA", path: '#/copilot-course', component: CopilotCoursePage },
    { label: "Curso MS Copilot", path: '#/mscopilot-course', component: MicrosoftCopilotCoursePage },
    { label: "Curso MS Copilot V2", path: '#/mscopilot-course-v2', component: MicrosoftCopilotCoursePage2 }, // Add the new course page
    { label: "Curso MS Copilot V3", path: '#/mscopilot-course-v3', component: MicrosoftCopilotCoursePage3 },
    { label: "Biblioteca de Componentes", path: '#/component-library', component: ComponentLibraryPage, featureFlag: 'enableComponentLibrary' },
];

// Filter pages based on the feature flags in the config.
const pages = allPages.filter(p => !p.featureFlag || appConfig.featureFlags[p.featureFlag]);

const App = () => {
    const [route, setRoute] = useState(window.location.hash || '#/');

    const navigateTo = (path: string) => {
        if (window.location.hash !== path) {
            window.location.hash = path;
        }
        setRoute(path);
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        const handleHashChange = () => {
            setRoute(window.location.hash || '#/');
        };
        
        window.addEventListener('hashchange', handleHashChange, false);
        handleHashChange();

        return () => {
            window.removeEventListener('hashchange', handleHashChange, false);
        };
    }, []);

    const pageDefinition = pages.find(p => p.path === route);
    const PageComponent = pageDefinition ? pageDefinition.component : HomePage;
    const theme = appConfig.pageThemes[route as keyof typeof appConfig.pageThemes] || '';

    return (
        <div className={theme}>
            {/* The StudioNav is no longer rendered here; its logic is now inside Header.tsx */}
            <div key={route}>
                <PageComponent navigateTo={navigateTo} pages={pages} activePath={route} />
            </div>
        </div>
    );
};

export default App;