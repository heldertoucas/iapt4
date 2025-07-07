# Guia de Integração com Serviços de IA

Este documento fornece as diretrizes e as melhores práticas para interagir com os múltiplos serviços de Inteligência Artificial utilizados na "Fábrica de Prompts".

## 1. Gestão de Chaves de API: A Estratégia Híbrida

A segurança e a flexibilidade na gestão das chaves de API são a nossa maior prioridade. Para garantir que a aplicação funciona em qualquer ambiente (desenvolvimento local, produção na Vercel, sandboxed como o AI Studio), implementámos uma estratégia híbrida centralizada no ficheiro `services/apiConfig.ts`.

### Como Funciona

A função `getApiKey(serviceName)` abstrai a complexidade de obter uma chave. Ela tenta, por esta ordem:

1.  **Ambiente de Desenvolvimento (Vite):** Procura por uma variável de ambiente com o prefixo `VITE_` (ex: `VITE_API_KEY`) no seu ficheiro `.env.local`.
2.  **Ambiente de Produção (Vercel, etc.):** Se a primeira falhar, procura por uma variável de ambiente padrão, sem o prefixo (ex: `API_KEY`).
3.  **Ambiente Sandboxed (AI Studio):** Se ambas as anteriores falharem, recorre a um valor de placeholder diretamente no código de `apiConfig.ts`, que deve ser editado manualmente para testes nesse ambiente.

### Chaves Necessárias

Para o funcionamento completo, a aplicação procurará pelas seguintes chaves:

-   `API_KEY` (para o Google Gemini)
-   `OPENROUTER_API_KEY` (para OpenRouter.ai)
-   `HUGGINGFACE_API_KEY` (para Hugging Face)

Pode configurar apenas uma, e a lógica de fallback da aplicação tratará do resto.

## 2. Arquitetura de Serviços: Cascata de Fallback

Para garantir máxima resiliência, a aplicação não depende de um único provedor de IA. A função `api.generate` em `services/prompt-factory-api.ts` orquestra uma cascata de chamadas.

**Para Geração de Texto:**
1.  **Tenta 1º:** Google Gemini (`gemini-2.5-flash-preview-04-17`)
2.  **Tenta 2º:** OpenRouter (`mistralai/mistral-7b-instruct:free`)
3.  **Tenta 3º:** Hugging Face (`mistralai/Mistral-7B-Instruct-v0.2`)
4.  **Fallback Final:** Uma resposta local da receita.

**Para Geração de Imagem:**
1.  **Tenta 1º:** Google Gemini (`imagen-3.0-generate-002`)
2.  **Fallback (TODO):** A arquitetura está preparada para adicionar fallbacks do OpenRouter e Hugging Face.
3.  **Fallback Final:** Um URL de imagem local da receita.

## 3. Detalhes de Implementação por Provedor

-   **Google Gemini:** A interação é feita através da biblioteca oficial `@google/genai`, que simplifica o streaming e a formatação das respostas.
-   **OpenRouter & Hugging Face:** A interação é feita através de chamadas `fetch` padrão à API REST de cada serviço. O código trata da leitura do stream de resposta e da extração do conteúdo relevante.

## 4. Gestão de Erros

Cada chamada de API na cascata está envolvida no seu próprio bloco `try...catch`.

-   **Falha Graciosa:** Se uma chamada falha, um aviso (`console.warn`) é registado, e o sistema avança para o próximo provedor na cascata.
-   **Interface do Utilizador:** O utilizador final nunca vê um erro de API. Na pior das hipóteses, recebe a resposta de fallback pré-definida, garantindo que a experiência nunca é interrompida por uma falha técnica.
-   **Debug:** Os erros detalhados são sempre registados na consola do desenvolvedor para facilitar a depuração.