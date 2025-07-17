# Guia de Produção e Deployment na Vercel

Este documento fornece um guia passo-a-passo e definitivo para configurar e implementar a aplicação "IA para Todos" num ambiente de produção, com foco na plataforma Vercel.

---

## Passo 1: Configuração do Código para Produção

Antes de fazer o deploy, há uma configuração crucial a ser feita no código para garantir que a aplicação se comporta como esperado num ambiente de produção.

### Desativar a Navegação de Pré-visualização

A aplicação tem uma bandeira de funcionalidade (`feature flag`) para uma navegação especial de desenvolvimento, útil em ambientes como o AI Studio. Para produção, esta deve ser desativada.

1.  Abra o ficheiro: `src/config/appConfig.ts`
2.  Localize a linha `useStudioNav: true`.
3.  Altere o valor para `false`:

    ```typescript
    // src/config/appConfig.ts

    export const appConfig: AppConfig = {
        // --- GENERAL SETTINGS ---
        useStudioNav: false, // <-- SET TO false FOR PRODUCTION
        
        // ... resto da configuração
    };
    ```

Esta alteração irá remover o menu de navegação suspenso para programadores do cabeçalho principal, apresentando a interface limpa pretendida para os utilizadores finais.

---

## Passo 2: Gestão de Chaves de API e Segurança

A gestão correta das chaves de API é fundamental para a segurança e funcionalidade da aplicação. **Nunca deve hardcodar chaves de API diretamente no código que é enviado para o GitHub.**

### A. Para Desenvolvimento Local

1.  Na raiz do seu projeto, crie um ficheiro chamado `.env.local`.
2.  Adicione as suas chaves de API a este ficheiro, usando o prefixo `VITE_`. A aplicação está configurada para as ler.

    ```bash
    # Exemplo de conteúdo para .env.local
    VITE_API_KEY=A_SUA_CHAVE_DO_GEMINI
    VITE_SUPABASE_URL=A_URL_DO_SEU_PROJETO_SUPABASE
    VITE_SUPABASE_ANON_KEY=A_CHAVE_ANONIMA_DO_SUPABASE
    VITE_OPENROUTER_API_KEY=A_SUA_CHAVE_DO_OPENROUTER
    VITE_HUGGINGFACE_API_KEY=A_SUA_CHAVE_DO_HUGGINGFACE
    ```
> **Nota de Segurança:** O ficheiro `.gitignore` já está configurado para ignorar os ficheiros `.env.local`, garantindo que as suas chaves secretas nunca sejam expostas.

### B. Para Produção na Vercel

As suas chaves secretas devem ser configuradas como variáveis de ambiente no painel de controlo da Vercel.

1.  No seu projeto na Vercel, vá a **Settings > Environment Variables**.
2.  Adicione as variáveis necessárias. Em produção, a aplicação irá procurar por estes nomes **sem o prefixo `VITE_`**.

| Nome                  | Valor                                     | Obrigatório |
| :-------------------- | :---------------------------------------- |:-----------:|
| `API_KEY`             | `SUA_CHAVE_DO_GEMINI`                     |     Sim     |
| `SUPABASE_URL`        | `A_URL_DO_SEU_PROJETO_SUPABASE`           |     Sim     |
| `SUPABASE_ANON_KEY`   | `A_CHAVE_ANONIMA_DO_SUPABASE`             |     Sim     |
| `OPENROUTER_API_KEY`  | `SUA_CHAVE_DO_OPENROUTER`                 |  Opcional   |
| `HUGGINGFACE_API_KEY` | `SUA_CHAVE_DO_HUGGINGFACE`                |  Opcional   |

---

## Passo 3: Verificação da Configuração do Projeto (`package.json`)

A Vercel executa o comando `npm install` durante o processo de build. Para evitar erros, é crucial que o ficheiro `package.json` esteja correto e não contenha nomes de pacotes inválidos.

Verifique se o seu `package.json` corresponde à seguinte estrutura:

```json
{
  "name": "v4-ia-para-todos-react-spa",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "@google/genai": "latest",
    "marked": "latest",
    "@supabase/supabase-js": "latest"
  },
  "devDependencies": {
    "typescript": "^5.2.2",
    "vite": "^5.3.1",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0"
  }
}
```
**Ponto Crítico:** Confirme que `react-dom` está listado e não `react-dom/client` ou outras entradas inválidas.

---

## Passo 4: Processo de Deployment

Com a configuração concluída, pode fazer o deploy da sua aplicação.

### A. Enviar o Código para o GitHub

1.  **Inicialize o Git (se ainda não o fez):**
    ```bash
    git init -b main
    ```
2.  **Adicione o repositório remoto do GitHub:**
    ```bash
    git remote add origin https://github.com/SEU_UTILIZADOR/SEU_REPOSITORIO.git
    ```
3.  **Adicione, faça commit e envie as suas alterações:**
    ```bash
    git add .
    git commit -m "Preparar para o deploy de produção"
    git push -u origin main
    ```

### B. Implementar na Vercel

1.  **Aceda à Vercel** e faça login com a sua conta do GitHub.
2.  **Adicionar Novo Projeto:** Clique em **Add New... > Project**.
3.  **Importar Repositório:** Selecione o seu repositório do GitHub e clique em **Import**.
4.  **Configurar Projeto:** A Vercel detetará que é um projeto **Vite**. As configurações padrão de build são geralmente corretas.
5.  **Adicionar Variáveis de Ambiente:** Expanda a secção **Environment Variables** e adicione as chaves conforme descrito no **Passo 2B**.
6.  **Deploy:** Clique no botão **Deploy**.

A Vercel irá agora construir e implementar a sua aplicação. Após a conclusão, ser-lhe-á fornecido um URL público. A partir deste ponto, cada `git push` para a sua branch `main` irá acionar automaticamente um novo deploy.