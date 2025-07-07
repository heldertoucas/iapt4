
# Application Component & Section Library

This document serves as a guide to the reusable React components and page sections available in the "IA para Todos" application. It's designed to help developers and designers understand the architecture and quickly find the right building blocks for creating new features or pages.

---

## 1. Core UI Components (`/components/ui`)

These are the fundamental, general-purpose building blocks of the user interface, designed for maximum reusability.

-   **`Card.tsx`**
    -   **Description:** A versatile card component with a consistent style (padding, shadow, border). It's wrapped in `AnimatedSection` for a default fade-in effect.
    -   **Common Use Cases:** Wrapping individual items in a grid, such as manifesto principles, team member profiles, feature descriptions, or course modules. It serves as the primary container for discrete pieces of content.

-   **`QuoteBlock.tsx`**
    -   **Description:** A visually distinct block for highlighting quotes. It features a large decorative quotation mark and attribution for the author and their role.
    -   **Common Use Cases:** Displaying testimonials from users, quoting experts in an article, or emphasizing a key statement from a leader or historical figure.

-   **`RemixIcon.tsx`**
    -   **Description:** A simple wrapper for the [Remix Icon](https://remixicon.com/) library, allowing for easy use of icons throughout the app via `<RemixIcon name="icon-name" />`.
    -   **Common Use Cases:** Any place an icon is needed—in buttons, section headers, list items, or as standalone visual elements.

-   **`Accordion.tsx`**
    -   **Description:** A standard accordion component that allows toggling the visibility of content under a title.
    -   **Common Use Cases:** Hiding non-critical information to save space, such as FAQs, hints within a quiz, or detailed explanations that are optional for the user to view.

-   **`Carousel.tsx`**
    -   **Description:** A flexible carousel/slider for displaying multiple items. It supports navigation arrows and optional indicator dots.
    -   **Common Use Cases:** Showcasing featured courses, creating image galleries for listings (like in `ListingCard.tsx`), or rotating through user testimonials.

-   **`SlideCarousel.tsx`**
    -   **Description:** A "PowerPoint-style" carousel where each slide features a full-bleed background image with a gradient overlay to ensure text readability. It's designed for impactful, visual storytelling.
    -   **Common Use Cases:** Creating an engaging hero section, showcasing key features with strong visual backing, or presenting a narrative-driven introduction to a course or product.

-   **`TabbedContent.tsx`**
    -   **Description:** A component for creating tabbed navigation, where each tab reveals a different panel of content.
    -   **Common Use Cases:** Comparing different approaches side-by-side (e.g., "Good vs. Bad" examples), organizing content by user level (Beginner, Advanced), or separating different categories of information within the same component.

## 2. Layout Components (`/components/layout`)

These components define the main structure and layout of pages, ensuring a consistent and responsive design across the application.

-   **`PageSection.tsx`**
    -   **Description:** A standardized wrapper for major content sections. It provides consistent padding, a centered title and subtitle, and an animated entrance.
    -   **Common Use Cases:** This should be the main container for almost every high-level section on a page (e.g., "About Us," "Our Courses," "Features"). It ensures visual consistency in spacing and typography.

-   **`AppHeader.tsx` & `AppFooter.tsx`**
    -   **Description:** The navigation header and footer used for all sub-pages. They provide a consistent user experience for navigating back to the main site.

-   **`LearningUnitLayout.tsx`**
    -   **Description:** A specialized two-column layout for e-learning pages, providing a main content area and a sidebar.
    -   **Common Use Cases:** Use specifically for e-learning missions or course pages where a sticky sidebar for gamification or progress tracking is desired.

## 3. Full Page Sections

These are large, self-contained sections that typically occupy a significant portion of a page. They are composed of smaller Core UI components and are designed to fulfill a specific narrative purpose.

-   **`HeroSection.tsx`**: The main landing page hero. Its purpose is to make a strong first impression and provide clear, primary calls-to-action.
-   **`ManifestoSection.tsx`**: Presents the core values and principles of the initiative.
-   **`AboutSection.tsx`**: Explains the purpose and goals of the program in more detail.
-   **`FeaturesSection.tsx`**: A classic marketing section to highlight key benefits of a program or course.
-   **`ComponentShowcaseSection.tsx`**: A section for displaying a collection of modern, functional components.
-   **`EmailCaptureBanner.tsx`**: A strong call-to-action to grow a newsletter list.
-   **`LearnSection.tsx`**: Acts as a central hub, directing users to various educational modules and tools.
-   **`ParticipateSection.tsx`**: A crucial call-to-action section designed to drive user engagement.

## 4. E-Learning & Interactive Components (`/components/learning`)

This is the core of the educational experience, designed to make learning active and engaging.

-   **`MissionBlock.tsx`**: The fundamental container for any piece of learning content. Use it to structure a course into logical, visually distinct steps based on its pedagogical purpose (`aprender`, `descobrir`, `desafio`, `partilhar`).
-   **`GamificationSidebar.tsx`**: Provides constant positive reinforcement and a clear sense of progress during a learning mission.
-   **`InlineQuiz.tsx`**: Creates quick knowledge checks within a lesson.
-   **`InteractiveNarrative.tsx`**: Introduces a new concept through a relatable story or scenario.
-   **`SocialReflection.tsx`**: Fosters a sense of community by asking users to articulate and share their opinions.
-   **`SentenceBuilder.tsx`**: A hands-on simulation to explain "next-token prediction" in a simple, interactive way.
-   **`PromptFactoryApp.tsx`**: The complete, self-contained application for teaching prompt engineering.
-   **`PrincipleCard.tsx`**: Presents a manifesto principle with real-world examples and a community voting mechanism.
-   **`SuggestionForm.tsx`**: Enables direct community participation by allowing users to submit ideas for the manifesto.

## 5. Showcase Components (`/components/showcase`)

These are modern, visually distinct components inspired by external examples, adapted to the app's design system. They are useful for building marketing pages or dashboards.

-   **`StatsGroup.tsx`**: Use to display impressive metrics or KPIs in a visually appealing banner.
-   **`ProgressCard.tsx`**: Ideal for a dashboard-like view to track the progress of a project or course module.
-   **`ListingCard.tsx`**: Perfect for a marketplace or any item that requires an image gallery and a call-to-action.
-   **`GradientBorderCard.tsx`**: Use to draw special attention to a particular card or piece of information.
