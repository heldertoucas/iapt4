# Guia de Deployment da Aplicação "IA para Todos"

Este documento fornece um guia abrangente para preparar e implementar a aplicação "IA para Todos" num ambiente de produção.

## 1. Visão Geral da Estratégia de Deploy

-   **Hosting:** **Vercel** é a nossa plataforma de eleição, devido à sua integração perfeita com o Git e ao seu sistema de CI/CD (Implementação Contínua).
-   **Branch Principal:** A branch `main` é a nossa fonte de verdade para a produção. Cada `push` para esta branch aciona um novo deploy automático.
-   **Configuração:** As variáveis de ambiente (chaves de API) são geridas de forma segura através do painel de controlo da Vercel.

---

## 2. Preparação do Código para Produção (Passo Crítico)

O código atual no repositório inclui modificações para permitir a pré-visualização em ambientes como o AI Studio, que não suportam a navegação por URL. A principal modificação é o uso de uma navegação por abas em vez de um router.

Antes de implementar para um ambiente de produção real, estas alterações específicas da pré-visualização **devem ser revertidas**.

### Ações Necessárias:

1.  **Restaurar o Router:** O passo mais importante é reativar a lógica de roteamento. Isto envolve modificar o ficheiro `components/App.tsx` para usar um router baseado em hash de URL, em vez do sistema de abas controlado por `useState`.
2.  **Reativar Links de Navegação:** Vários links de navegação (`<a>` tags) foram desativados (convertidos em `<div>`, `<li>`, etc.) para a pré-visualização. Estes devem ser restaurados para `<a>` tags funcionais com os atributos `href` corretos (ex: `href="#/prompt-factory"`).

> **Referência Completa:** Para obter um guia detalhado, com os excertos de código necessários para reverter estas alterações ficheiro a ficheiro, **consulte o documento [Guia de Reversão para Produção](./docs/PRODUCTION_GUIDE.md)**. É fundamental seguir as instruções nesse documento para garantir que a aplicação fica pronta para produção.

---

## 3. Gestão de Variáveis de Ambiente e Segurança

A gestão correta das chaves de API é fundamental para a segurança e funcionalidade da aplicação.

### Ficheiros `.env` e `.gitignore`

-   **Desenvolvimento Local:** Para desenvolver localmente, crie um ficheiro chamado `.env.local` na raiz do projeto. Este ficheiro **não é e não deve ser** versionado pelo Git.
    ```
    # Exemplo de conteúdo para .env.local
    VITE_API_KEY=A_SUA_CHAVE_DO_GEMINI
    VITE_SUPABASE_URL=A_URL_DO_SEU_PROJETO_SUPABASE
    VITE_SUPABASE_ANON_KEY=A_CHAVE_ANONIMA_DO_SUPABASE
    ```
-   **Segurança com `.gitignore`:** O ficheiro `.gitignore` do projeto já está configurado para ignorar todos os ficheiros `.env*`. **Nunca remova esta linha nem envie o seu ficheiro `.env.local` para o GitHub.** Isto impede que as suas chaves secretas sejam expostas publicamente.

### Configuração na Vercel

Em produção, as variáveis de ambiente **têm de ser configuradas diretamente no painel de controlo da Vercel**.

1.  No seu projeto Vercel, navegue até **Settings > Environment Variables**.
2.  Adicione as seguintes variáveis. Note que na Vercel, os nomes são inseridos **sem o prefixo `VITE_`**. A aplicação está desenhada para ler ambos os formatos.

| Nome                  | Valor                                     | Descrição                                 |
| :-------------------- | :---------------------------------------- | :---------------------------------------- |
| `API_KEY`             | `SUA_CHAVE_DO_GEMINI`                     | **(Obrigatório)** Chave da API do Google Gemini. |
| `SUPABASE_URL`        | `A_URL_DO_SEU_PROJETO_SUPABASE`           | **(Obrigatório)** URL do projeto Supabase.      |
| `SUPABASE_ANON_KEY`   | `A_CHAVE_ANONIMA_DO_SUPABASE`             | **(Obrigatório)** Chave anónima do Supabase. |
| `OPENROUTER_API_KEY`  | `SUA_CHAVE_DO_OPENROUTER`                 | (Opcional) Chave da API do OpenRouter.ai como fallback. |
| `HUGGINGFACE_API_KEY` | `SUA_CHAVE_DO_HUGGINGFACE`                | (Opcional) Chave da API do Hugging Face como fallback.  |

> **Nota sobre Fallbacks:** O ficheiro `services/apiConfig.ts` contém chaves de placeholder como último recurso. Num ambiente de produção como a Vercel, as variáveis de ambiente que configurou terão sempre prioridade.

---

## 4. Testar a Build de Produção Localmente

Antes de fazer o deploy, é uma boa prática verificar se a aplicação compila e funciona corretamente no modo de produção.

1.  **Construir o Projeto:**
    ```bash
    npm run build
    ```
    Este comando cria uma pasta `/dist` com os ficheiros otimizados para produção.

2.  **Pré-visualizar a Build:**
    ```bash
    npm run preview
    ```
    Este comando inicia um servidor local que serve os ficheiros da pasta `/dist`, permitindo-lhe testar a versão final da aplicação exatamente como ela será servida em produção.

---

## 5. Processo de Deployment na Vercel

1.  **Login na Vercel:** Aceda à sua conta Vercel.
2.  **Importar Projeto:** Clique em **"Add New... > Project"** e selecione o seu repositório GitHub.
3.  **Configurar Projeto:** A Vercel detetará automaticamente que é um projeto Vite. As configurações padrão (Build Command: `npm run build`, Output Directory: `dist`) estão corretas.
4.  **Adicionar Variáveis de Ambiente:** Configure as variáveis de ambiente conforme descrito na secção 3.
5.  **Deploy:** Clique no botão **"Deploy"**.

Após o primeiro deploy, qualquer `git push` para a branch `main` irá acionar automaticamente uma nova implementação, mantendo a sua aplicação sempre atualizada.
