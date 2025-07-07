# Reverting AI Studio Preview Changes for Production

To restore the application to its production-ready state with URL-based routing, you will need to instruct me to modify the following files as described below. These changes will replace the temporary tab-based navigation with a functional router and re-enable all inter-page links.

---

### 1. Restore the Router in `components/App.tsx`

The main `App.tsx` component needs to be changed from a tab-based system back to a URL hash-based router.

**Instruction:** "Update `components/App.tsx` to implement a URL hash-based router instead of the tab navigation."

**Target Code (`components/App.tsx`):**
```tsx
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import PromptFactoryPage from './pages/PromptFactoryPage';
import CopilotCoursePage from './pages/CopilotCoursePage';

// Simple hash-based router
const App = () => {
    const [route, setRoute] = useState(window.location.hash);

    useEffect(() => {
        const handleHashChange = () => {
            setRoute(window.location.hash);
            window.scrollTo(0, 0); // Scroll to top on page change
        };

        window.addEventListener('hashchange', handleHashChange);
        // Set initial route
        handleHashChange();

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    const renderPage = () => {
        switch (route) {
            case '#/prompt-factory':
                return <PromptFactoryPage />;
            case '#/copilot-course':
                return <CopilotCoursePage />;
            default:
                return <HomePage />;
        }
    };

    return (
        <div>
            {renderPage()}
        </div>
    );
};

export default App;
```

---

### 2. Re-enable Links in `components/LearnSection.tsx`

The disabled links in the "Aprender" section need to be converted back into functional `<a>` tags.

**Instruction:** "Re-enable the navigation links in `components/LearnSection.tsx`."

**Target Code (`components/LearnSection.tsx`):**
```tsx
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import AnimatedSection from './AnimatedSection';
import RemixIcon from './ui/RemixIcon';
import PageSection from './layout/PageSection';
import Card from './ui/Card';

// --- LearnSection Component ---
const LearnSection = ({ onShowResources }: { onShowResources: () => void }) => {
    const resources = [
        { icon: "book-line", title: "Curso rápido ✨Descobrir a IA", level: "Iniciante", levelColorClass: "bg-green-100 text-green-800", description: "Comece a sua jornada com conceitos fundamentais explicados em linguagem simples.", href: "#/copilot-course" },
        { icon: "award-line", title: "Certificação IA para Todos", level: "Todos os Níveis", levelColorClass: "bg-pcd-accent-light text-pcd-accent", description: "Desbloqueie todo o potencial da IA, desde o nível inicial ao avançado.", href: "#" },
        { icon: "computer-line", title: "Fábrica de Prompts IA", level: "Interativo", levelColorClass: "bg-purple-100 text-purple-800", description: "Descubra ferramentas acessíveis que lhe permitem experienciar a IA em primeira mão.", href: "#/prompt-factory"},
        { icon: "windows-line", title: "Descobrir a IA Microsoft Copilot", level: "Iniciante", levelColorClass: "bg-orange-100 text-orange-800", description: "Um curso prático para dominar o assistente de IA da Microsoft e aumentar a sua produtividade.", href: "#/copilot-course"},
    ];
    
    const title = <>Aprender Sobre <span className="text-pcd-accent">IA</span></>;
    const subtitle = "Explore os nossos recursos concebidos para tornar a IA compreensível para todos.";

    return (
        <PageSection id="learn" className="bg-pcd-bg-soft" title={title} subtitle={subtitle}>
            <div className="grid md:grid-cols-2 gap-8">
                {resources.map((resource, index) => (
                    <Card key={resource.title} delay={`${index * 0.1}s`} className="h-full">
                        <a href={resource.href} className="flex items-start flex-col h-full">
                            <div className="flex-grow">
                                <div className="flex items-start">
                                     <div className={`flex-shrink-0 flex items-center justify-center h-20 w-20 bg-pcd-accent-light rounded-lg mr-5`}><RemixIcon name={resource.icon} className={`text-5xl text-pcd-accent`} /></div>
                                    <div className="flex-grow">
                                        <h3 className="text-2xl font-semibold text-gray-900">{resource.title}</h3>
                                        <span className={`inline-block mt-2 mb-2 text-sm px-2 py-1 rounded-full ${resource.levelColorClass}`}>{resource.level}</span>
                                        <p className="text-lg text-gray-600">{resource.description}</p>
                                    </div>
                                </div>
                            </div>
                            <span className="inline-block mt-4 text-pcd-accent font-medium text-base group-hover:underline">Explorar Recursos →</span>
                        </a>
                    </Card>
                ))}
            </div>
            <AnimatedSection tag="div" className="mt-16 text-center" delay="0.4s">
                <a onClick={onShowResources} href="#resources" className="inline-block px-8 py-4 bg-pcd-accent text-white rounded-full font-medium hover:bg-opacity-90 transition-colors shadow-lg text-lg">
                    Ver Todos os Recursos
                </a>
            </AnimatedSection>
        </PageSection>
    );
};

export default LearnSection;
```

---

### 3. Re-enable Links in `components/ResourcesSection.tsx`

The call-to-action buttons in the "Recursos" section must be restored to functional `<a>` tags.

**Instruction:** "Re-enable the links in `components/ResourcesSection.tsx`."

**Target Code (`components/ResourcesSection.tsx`):**
```tsx
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import RemixIcon from './ui/RemixIcon';
import PageSection from './layout/PageSection';
import AnimatedSection from './AnimatedSection';

// --- ResourcesSection Component ---
const ResourcesSection = () => {
    const resources = [
        {
            icon: "book-line",
            title: "Fundamentos de IA: Curso rápido ✨Descobrir a IA",
            description: "Domine os conceitos centrais de IA. Cobrimos tudo, desde algoritmos fundamentais e o papel dos dados na IA até às distinções entre IA Restrita, IA Geral e Superinteligência.",
            topics: ["Modelos de Aprendizagem Automática", "Arquiteturas de Redes Neuronais", "Pré-processamento de Dados"],
            buttonText: "Inscrever-se no Curso ✨Descobrir a IA",
            href: "#/copilot-course"
        },
        // ... (other resources)
    ];

    const title = <><span className="text-pcd-accent">Recursos Aprofundados</span></>;
    const subtitle = "Mergulhe mais fundo no mundo da IA com os nossos guias, ferramentas e discussões.";


    return (
         <PageSection id="resources" className="bg-pcd-card-bg" title={title} subtitle={subtitle}>
            <div className="grid md:grid-cols-2 gap-10">
                {resources.map((resource, index) => (
                    <AnimatedSection key={resource.title} tag="div" className="bg-pcd-card-bg p-8 rounded-xl shadow-lg border-t-2 border-pcd-accent-light hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col" delay={`${index * 0.1}s`}>
                        {/* ... (resource content) */}
                        <a href={resource.href} className="mt-auto inline-block bg-pcd-accent text-white text-center px-6 py-3 rounded-lg font-medium shadow-md hover:bg-opacity-90 transition text-lg">{resource.buttonText}</a>
                    </AnimatedSection>
                ))}
            </div>
        </PageSection>
    );
};

export default ResourcesSection;
```

---

### 4. Restore Links in Headers and Footers

The "back" links in the sub-page layouts and main footer must be restored to be functional `<a>` tags pointing to `#/`.

**Instruction:** "Restore the navigation links in `AppHeader`, `AppFooter`, and `Footer` components."

**Target Code (`components/layout/AppHeader.tsx`):**
```tsx
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import RemixIcon from '../ui/RemixIcon';
import StaticLogo from '../StaticLogo';
import PromptFactoryIcon from '../icons/PromptFactoryIcon'; // Ensure this import if needed

type NavLink = {
    href: string;
    label: string;
};

type AppHeaderProps = {
    title: string;
    navLinks: NavLink[];
    titleIcon?: React.ReactNode;
};

const AppHeader = ({ title, navLinks, titleIcon }: AppHeaderProps) => {
    // ... (useState for mobile menu)
    
    return (
        <header className="sticky top-0 w-full z-40 transition-all duration-300 bg-pcd-card-bg/95 backdrop-blur-lg shadow-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                       <a href="#/" className="flex items-center text-gray-700 hover:text-pcd-accent transition-colors">
                           <RemixIcon name="arrow-left-line" className="h-5 w-5 mr-2" />
                           <span className="text-base font-medium hidden sm:inline">Página Principal</span>
                           <StaticLogo className="h-7 ml-3" />
                       </a>
                       <div className="h-6 w-px bg-gray-200 mx-4"></div>
                       <div className="flex items-center cursor-default gap-x-3">
                          {titleIcon}
                          <span className="text-2xl font-bold text-gray-800">
                            {title}
                          </span>
                       </div>
                    </div>
                    {/* ... (rest of the header JSX) */}
                </div>
            </div>
            {/* ... (mobile menu JSX) */}
        </header>
    );
};

export default AppHeader;
```
**Target Code (`components/layout/AppFooter.tsx`):**
```tsx
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import StaticLogo from '../StaticLogo';

// --- Footer Component ---
const AppFooter = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="bg-gray-100 border-t border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
                <div className="inline-flex items-center justify-center mb-4 cursor-default">
                    <StaticLogo className="h-8 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-800">IA para Todos</h3>
                </div>
                <p className="text-gray-500 text-base mb-2">&copy; {currentYear} IA para Todos...</p>
                <p className="text-gray-500 text-base">
                    <a href="#/" className="text-pcd-accent hover:underline">Voltar à Página Principal</a>
                </p>
            </div>
        </footer>
    );
};

export default AppFooter;
```