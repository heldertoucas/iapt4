# IA para Todos - Aplicação Web (React SPA)

Este é o repositório oficial da aplicação web "IA para Todos", uma Single Page Application (SPA) construída com React, TypeScript e Vite. O objetivo é fornecer uma plataforma educacional, um manifesto para uma IA mais humana e ferramentas interativas como a "Fábrica de Prompts" para desmistificar a IA.

**URL da Aplicação:** [https://your-vercel-deployment-url.vercel.app](https://your-vercel-deployment-url.vercel.app) (Substituir pelo seu URL de produção)

---

## Pré-requisitos

Antes de começar, certifique-se de que tem o seguinte software instalado na sua máquina:

-   [Node.js](https://nodejs.org/) (versão 18.x ou superior recomendada)
-   `npm` (normalmente incluído com o Node.js)

## Instalação e Configuração

Siga estes passos para obter uma cópia local do projeto e executá-la.

### 1. Clonar o Repositório

```bash
git clone https://github.com/your-username/ia-para-todos.git
cd ia-para-todos
```

### 2. Instalar Dependências

Este projeto utiliza `npm` para gerir as dependências. Execute o seguinte comando na raiz do projeto:

```bash
npm install
```

### 3. Configurar Variáveis de Ambiente

A aplicação necessita de chaves de API para comunicar com os serviços de IA (Gemini, OpenRouter, Hugging Face) e com a base de dados (Supabase). A nossa aplicação utiliza uma estratégia híbrida: procurará primeiro por variáveis com o prefixo `VITE_` (para desenvolvimento local) e depois sem o prefixo (para produção).

1.  Crie um novo ficheiro na raiz do projeto chamado `.env.local`.
2.  Abra o ficheiro e adicione as suas chaves no seguinte formato. Pode adicionar apenas as que pretende testar. A aplicação é resiliente e utilizará fallbacks se uma chave não estiver presente.

    ```
    # Chave para Google Gemini API
    VITE_API_KEY=A_SUA_CHAVE_DO_GEMINI

    # Chave para OpenRouter.ai
    VITE_OPENROUTER_API_KEY=A_SUA_CHAVE_DO_OPENROUTER

    # Chave para Hugging Face
    VITE_HUGGINGFACE_API_KEY=A_SUA_CHAVE_DO_HUGGINGFACE

    # Credenciais do Supabase
    VITE_SUPABASE_URL=A_URL_DO_SEU_PROJETO_SUPABASE
    VITE_SUPABASE_ANON_KEY=A_CHAVE_ANONIMA_DO_SUPABASE
    ```

> **⚠️ Importante:** O ficheiro `.env.local` contém informações sensíveis. Ele já está incluído no `.gitignore` para garantir que as suas chaves **nunca** sejam enviadas para o GitHub. Nunca partilhe este ficheiro ou as suas chaves publicamente.

### 4. Executar o Servidor de Desenvolvimento

Após a instalação e configuração, pode iniciar o servidor de desenvolvimento local:

```bash
npm run dev
```

A aplicação estará agora disponível no seu navegador em [http://localhost:5173](http://localhost:5173) (ou numa porta diferente, se a 5173 estiver ocupada).

## Scripts Disponíveis

-   `npm run dev`: Inicia o servidor de desenvolvimento com hot-reloading.
-   `npm run build`: Cria uma versão de produção otimizada da aplicação na pasta `/dist`.
-   `npm run lint`: Executa o linter para verificar a qualidade do código (se configurado).
-   `npm run preview`: Inicia um servidor local para pré-visualizar a build de produção.

## Estrutura de Pastas

```
ia-para-todos/
├── public/
├── src/
│   ├── components/
│   │   ├── icons/          # Ícones SVG específicos
│   │   ├── illustrations/
│   │   ├── layout/
│   │   ├── learning/       # Componentes de E-learning
│   │   │   └── prompt-factory/ # Componentes da Fábrica de Prompts
│   │   ├── pages/          # Componentes de página
│   │   └── ui/
│   ├── data/               # Dados mock (ex: prompt-factory-data.ts)
│   ├── docs/               # Documentação do projeto
│   ├── hooks/
│   ├── services/           # Lógica de API e comunicação externa
│   ├── types/              # Definições TypeScript
│   ├── App.tsx
│   ├── index.css
│   └── index.tsx
├── .env.local
├── index.html
├── package.json
└── README.md```
## Acessibilidade e UDL

Esta aplicação segue boas práticas de acessibilidade e o Universal Design for Learning. Consulte o documento [docs/ACCESSIBILITY_GUIDE.md](docs/ACCESSIBILITY_GUIDE.md) para mais detalhes e recomendações.
