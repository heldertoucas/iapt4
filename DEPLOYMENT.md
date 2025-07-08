# Guia de Deployment na Vercel

Este documento fornece um guia passo-a-passo e definitivo para configurar e implementar a aplicação "IA para Todos" num ambiente de produção, utilizando a Vercel.

---

## Passo 1: Configuração do Código para Produção

Antes de fazer o deploy, há uma configuração crítica a verificar no código para garantir que a aplicação se comporte como esperado.

### A. Desativar a Navegação de Desenvolvimento

1.  Abra o ficheiro: `src/config/appConfig.ts`
2.  Localize a linha `useStudioNav: true`.
3.  **Altere o valor para `false`**:

    ```typescript
    // src/config/appConfig.ts
    export const appConfig: AppConfig = {
        // --- GENERAL SETTINGS ---
        useStudioNav: false, // <-- SET TO false FOR PRODUCTION
        // ...
    };
    ```

---

## Passo 2: Gestão de Chaves de API e Segurança (Ponto Crítico)

**Nunca deve hardcodar chaves de API diretamente no código.** A nossa aplicação é construída com **Vite**, o que impõe uma regra importante para a gestão de variáveis de ambiente.

### Porquê o Prefixo `VITE_`?

Por razões de segurança, o Vite só expõe variáveis de ambiente ao código do seu navegador (client-side) se elas começarem com o prefixo `VITE_`. Qualquer outra variável será ignorada durante o processo de build e não estará disponível na aplicação em produção.

Isto significa que as suas chaves de API, tanto para desenvolvimento local como para produção na Vercel, **têm de ter este prefixo.**

### A. Para Desenvolvimento Local (`.env.local`)

1.  Na raiz do seu projeto, certifique-se de que o seu ficheiro `.env.local` existe.
2.  Adicione as suas chaves a este ficheiro, **usando o prefixo `VITE_`**.

    ```bash
    # Exemplo de conteúdo para .env.local
    VITE_API_KEY="SUA_CHAVE_DO_GEMINI"
    VITE_SUPABASE_URL="A_URL_DO_SEU_PROJETO_SUPABASE"
    VITE_SUPABASE_ANON_KEY="A_CHAVE_ANONIMA_DO_SUPABASE"
    VITE_OPENROUTER_API_KEY="A_SUA_CHAVE_DO_OPENROUTER"
    VITE_HUGGINGFACE_API_KEY="A_SUA_CHAVE_DO_HUGGINGFACE"
    ```
> **Nota de Segurança:** O ficheiro `.gitignore` já está configurado para ignorar o ficheiro `.env.local`.

### B. Para Produção na Vercel (Configuração Correta)

1.  No seu projeto na Vercel, vá a **Settings > Environment Variables**.
2.  Adicione as variáveis exatamente como mostrado abaixo. **É crucial que os nomes comecem com `VITE_`**.

| Nome da Variável na Vercel      | Valor                                     | Obrigatório |
| :------------------------------ | :---------------------------------------- |:-----------:|
| `VITE_API_KEY`                  | `SUA_CHAVE_DO_GEMINI`                     |     Sim     |
| `VITE_SUPABASE_URL`             | `A_URL_DO_SEU_PROJETO_SUPABASE`           |     Sim     |
| `VITE_SUPABASE_ANON_KEY`        | `A_CHAVE_ANONIMA_DO_SUPABASE`             |     Sim     |
| `VITE_OPENROUTER_API_KEY`       | `A_SUA_CHAVE_DO_OPENROUTER`                 |  Opcional   |
| `VITE_HUGGINGFACE_API_KEY`      | `A_SUA_CHAVE_DO_HUGGINGFACE`                |  Opcional   |

**Atenção:** Se as suas variáveis na Vercel não tiverem o prefixo `VITE_`, a aplicação **não funcionará**, pois o Vite não as incluirá na build final. Após adicionar ou corrigir as variáveis, **é obrigatório fazer um novo deploy** para que as alterações tenham efeito.

---

## Passo 3: Processo de Deployment

Com a configuração concluída, pode fazer o deploy da sua aplicação.

### A. Enviar o Código para o GitHub

```bash
git add .
git commit -m "Configuração para deploy de produção"
git push
```

### B. Implementar na Vercel

1.  **Aceda à Vercel** e faça login com a sua conta do GitHub.
2.  **Adicionar Novo Projeto:** Clique em **Add New... > Project**.
3.  **Importar Repositório:** Selecione o seu repositório do GitHub e clique em **Import**.
4.  **Configurar Projeto:** A Vercel detetará que é um projeto **Vite**. As configurações padrão de build são geralmente corretas.
5.  **Adicionar Variáveis de Ambiente:** Expanda a secção **Environment Variables** e adicione as chaves conforme descrito no **Passo 2B**.
6.  **Deploy:** Clique no botão **Deploy**.

A Vercel irá agora construir e implementar a sua aplicação. A partir deste ponto, cada `git push` para a sua branch principal irá acionar automaticamente um novo deploy.

---

## Passo 4: Verificar Dependências do `package.json`

Um erro comum durante o build na Vercel é a presença de nomes de pacotes inválidos no `package.json`. Antes de fazer o push final:

1. Abra o ficheiro `package.json` e confirme que todas as dependências têm nomes válidos (apenas caracteres URL-friendly).
2. Se encontrar entradas suspeitas, como `"react-dom/client"`, remova-as ou corrija-as. O nome do pacote deve ser apenas `"react-dom"`.
3. Execute `npm install` localmente para validar que o ficheiro está correto.

Esta verificação simples evita falhas no `npm install` durante o deploy e poupa tempo de troubleshooting.

---

## Passo 5: Validar o Build Localmente

Erros de build, como tags JSX mal fechadas, apenas surgem durante a compilação com o Vite. Antes de enviar alterações para o GitHub:

1. Execute `npm run build` no seu ambiente local.
2. Corrija qualquer erro de sintaxe ou JSX que seja reportado.
3. Depois de um build bem-sucedido, faça o push para a sua branch.

Seguir este passo evita falhas de deploy na Vercel causadas por problemas de marcação nos componentes React.

