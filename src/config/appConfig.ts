/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

/**
 * App Configuration
 *
 * This file centralizes application-level settings for easy management.
 * You can toggle features, change themes, and adjust behavior for different
 * environments (e.g., local development vs. production vs. AI Studio).
 */

export type AppTheme = 'theme-blue' | 'theme-purple' | 'theme-green' | 'theme-pink' | 'theme-orange' | '';

interface AppConfig {
    /**
     * Use AI Studio Navigation Dropdown
     * When true, adds a special dropdown navigator to the main header.
     * This is useful for development and for sandboxed environments like
     * AI Studio where all pages need to be accessible from the main view.
     * Set to `false` for production deployments to hide it.
     */
    useStudioNav: boolean;

    /**
     * Page-specific Theming
     * Assigns a color theme to each sub-page. The theme class will be applied
     * to the root element of the page.
     */
    pageThemes: Record<string, AppTheme>;

    /**
     * Feature Flags
     * Enable or disable major sections of the application. This is useful for
     * A/B testing, phased rollouts, or simplifying the UI for specific demos.
     */
    featureFlags: {
        // Show the component showcase section on the homepage
        showComponentShowcase: boolean;
        // Show the detailed e-learning component showcase on the homepage
        showElearningShowcase: boolean;
        // Show the gamification section on the homepage
        showGamificationSection: boolean;
        // Enable the co-creation page for the manifesto
        enableManifestoCoCreation: boolean;
        // Display gamification elements as a sticky sidebar on e-learning pages.
        // If false, they will be rendered as a section before the footer.
        useGamificationSidebar: boolean;
        // Enable the component library page for designers/developers
        enableComponentLibrary: boolean;
    };
}

export const appConfig: AppConfig = {
    // --- GENERAL SETTINGS ---
    useStudioNav: false, // <-- SET TO false FOR PRODUCTION

    // --- PAGE THEMES ---
    pageThemes: {
        '#/': '',
        '#/home-archive': 'theme-pink',
        '#/manifesto-cocreate': 'theme-purple',
        '#/prompt-factory': 'theme-purple',
        '#/copilot-course': 'theme-green',
        '#/mscopilot-course': 'theme-blue',
        '#/mscopilot-course-v2': 'theme-orange',
        '#/component-library': 'theme-pink',
    },

    // --- FEATURE FLAGS ---
    featureFlags: {
        showComponentShowcase: true,
        showElearningShowcase: true,
        showGamificationSection: true,
        enableManifestoCoCreation: true,
        useGamificationSidebar: true,
        enableComponentLibrary: true,
    }
};