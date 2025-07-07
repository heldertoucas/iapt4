# Arquitetura da Aplicação "IA para Todos"

Este documento descreve a arquitetura de alto nível, as decisões técnicas e as convenções utilizadas no desenvolvimento da aplicação "IA para Todos".

## 1. Visão Geral da Stack Tecnológica

A nossa stack foi escolhida para otimizar a velocidade de desenvolvimento, a performance, a resiliência e a manutenibilidade.

-   **Framework:** **React (com TypeScript)**
    -   **Porquê?** A sua arquitetura baseada em componentes permite a criação de UIs complexas e reutilizáveis. O TypeScript adiciona tipagem estática, o que melhora a robustez do código e a experiência de desenvolvimento.

-   **Build Tool:** **Vite**
    -   **Porquê?** Vite oferece um servidor de desenvolvimento extremamente rápido com Hot Module Replacement (HMR) e uma build de produção otimizada e eficiente.

-   **Styling:** **Tailwind CSS**
    -   **Porquê?** É um framework utility-first que permite construir designs complexos diretamente no HTML/JSX. A nossa configuração está ligada a um sistema de design tokens para facilitar a tematização.

-   **Base de Dados:** **Supabase**
    -   **Porquê?** Atua como o nosso Backend-as-a-Service (BaaS), fornecendo uma base de dados PostgreSQL, autenticação, armazenamento e funções serverless. Permite-nos ter um backend robusto com o mínimo de configuração.

-   **Serviços de IA:** **Múltiplos Provedores (Google Gemini, OpenRouter, Hugging Face)**
    -   **Porquê?** Para garantir a resiliência e a flexibilidade. A aplicação utiliza uma lógica de cascata, tentando primeiro o Gemini, e recorrendo a outros provedores (que dão acesso a modelos open-source) como fallback.

## 2. Filosofia e Estrutura de Pastas

A organização das pastas é fundamental para a escalabilidade do projeto.

-   **/components**: Contém todos os componentes React, organizados por função.
    -   **/ui**: Componentes pequenos e genéricos (ex: `Card.tsx`, `RemixIcon.tsx`).
    -   **/layout**: Componentes de estrutura de página (ex: `PageSection.tsx`, `AppHeader.tsx`).
    -   **/learning**: Componentes especializados para e-learning, como a "Fábrica de Prompts".
    -   **/pages**: Componentes que representam uma "página" ou vista principal da aplicação.
-   **/services**: Contém a lógica de comunicação com serviços externos.
    -   `apiConfig.ts`: Gestor centralizado e híbrido para as chaves de API.
    -   `supabaseClient.ts`: Inicializa o cliente Supabase.
    -   `prompt-factory-api.ts`: Encapsula toda a lógica de chamada aos serviços de IA, incluindo a cascata de fallback.
-   **/hooks**: Contém os hooks React personalizados (ex: `useGamification.ts`).
-   **/data**: Contém dados estáticos ou mocks (embora a aplicação esteja a migrar para dados dinâmicos).
-   **/docs**: Documentação do projeto.

## 3. Estratégia de Styling

A nossa abordagem de styling combina a flexibilidade do Tailwind CSS com a robustez de um sistema de design centralizado.

1.  **Design Tokens:** Todas as cores e outras variáveis de design estão definidas como **variáveis CSS** no ficheiro `index.css` (ex: `--pcd-blue`, `--pcd-card-bg`).
2.  **Configuração do Tailwind:** O ficheiro `tailwind.config.js` está configurado para usar estas variáveis CSS.
3.  **Tematização:** A aplicação suporta temas. Ao adicionar uma classe como `.theme-purple` a um contentor, as variáveis CSS são redefinidas para esse escopo, e todos os componentes filhos que usam essas variáveis (ex: `bg-pcd-accent`) adaptam-se automaticamente.

## 4. Fluxo de Dados

A aplicação utiliza uma abordagem mista de dados estáticos e dinâmicos, com uma clara migração para o dinâmico.

-   **Conteúdo da Página Principal:** O conteúdo do "Hero Section" da "Fábrica de Prompts" é obtido dinamicamente da tabela `hero_content` no Supabase.
-   **Conteúdo da Fábrica de Prompts:** As categorias e receitas são obtidas das respetivas tabelas no Supabase (embora o código atual ainda use o mock local em `prompt-factory-data.ts` como fallback).
-   **Interação com a Base de Dados:** As classificações das receitas (votos) são enviadas para a base de dados através de uma chamada a uma função de procedimento remoto (RPC) no Supabase (`increment_recipe_rating`), o que garante a segurança e a integridade dos dados.

## 5. Arquitetura do Serviço de API (Fábrica de Prompts)

Para maximizar a resiliência, a lógica de geração de conteúdo (texto e imagem) no ficheiro `services/prompt-factory-api.ts` implementa uma **cascata de fallback**:

1.  **Tentativa 1 (Primária):** O sistema tenta primeiro gerar o conteúdo utilizando o **Google Gemini**.
2.  **Tentativa 2 (Fallback):** Se o Gemini falhar, o sistema tenta, de forma transparente, utilizar o **OpenRouter.ai**, que dá acesso a modelos como o Mistral.
3.  **Tentativa 3 (Fallback):** Se o OpenRouter também falhar, a última tentativa online é feita através da **Inference API do Hugging Face**.
4.  **Fallback Final (Offline):** Se todos os serviços online falharem, a aplicação recorre a um dos `fallback_outputs` pré-definidos na receita, garantindo que o utilizador recebe sempre um resultado.

Esta arquitetura torna a aplicação extremamente robusta e menos suscetível a falhas de um único provedor.