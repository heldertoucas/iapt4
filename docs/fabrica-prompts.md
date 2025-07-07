# Especificações Funcionais: Fábrica de Prompts IA

## 1. Visão Geral e Objetivo

O objetivo desta aplicação é criar uma ferramenta pedagógica e interativa que ensine utilizadores iniciantes a construir prompts eficazes para modelos de Inteligência Artificial (IA). A aplicação deve guiar o utilizador através de um processo estruturado, desde a escolha de um objetivo geral até à criação de um prompt específico e à geração de um resultado.

O foco principal é a aprendizagem através da prática (learning by doing), desmistificando a "engenharia de prompts" através de um sistema de modelos e componentes reutilizáveis.

---

## 2. Fluxo Principal do Utilizador (User Flow)

A experiência do utilizador é dividida em quatro estados principais, que devem seguir uma progressão lógica.

### **Estado 0: Ecrã de Boas-Vindas (Splash Screen)**

-   **Objetivo:** Criar um ponto de entrada focado e convidativo para a aplicação.
-   **Funcionalidade:**
    -   Ao aceder à página, o utilizador vê um "hero" de ecrã inteiro com um título e um subtítulo dinâmicos.
    -   A aplicação principal só é revelada depois de o utilizador clicar no botão "Começar a Criar".

### **Estado 1: Seleção de Categoria**

-   **Objetivo:** Permitir que o utilizador escolha o tipo de tarefa que pretende realizar.
-   **Funcionalidade:**
    -   A aplicação apresenta uma lista de "Categorias" de prompts (ex: "Gerar Ideias", "Escrever E-mails").
    -   Cada categoria tem um ícone e um título. Ao selecionar uma, a aplicação avança.

### **Estado 2: Seleção de Receita**

-   **Objetivo:** Dentro de uma categoria, o utilizador escolhe um modelo de prompt específico ("Receita").
-   **Funcionalidade:**
    -   Apresenta uma lista de "Receitas" com base na categoria anterior.
    -   Cada receita mostra um ícone, título e a sua classificação média de utilizadores.
    -   Receitas com boa classificação recebem um destaque de "Popular".

### **Estado 3: Construção do Prompt e Geração**

-   **Objetivo:** O utilizador personaliza a receita, preenchendo as suas variáveis, e gera um resultado.
-   **Funcionalidade:**
    1.  **Montagem do Prompt:** A receita é apresentada como texto com menus dropdown para cada variável. O "Prompt Final" é atualizado em tempo real.
    2.  **Geração de Conteúdo:** O botão "Gerar com IA" fica ativo quando todos os campos estão preenchidos. Ao clicar, envia o prompt para o serviço de API. A resposta (texto ou imagem) é exibida, suportando streaming para texto.
    3.  **Fallback:** Se todos os serviços de IA falharem, é apresentado um output de fallback da base de dados.
    4.  **Dica Avançada:** Após a geração, uma dica aleatória da receita é exibida.
    5.  **Contexto Visível:** O prompt que originou a resposta é exibido acima do resultado para manter o contexto.

### **Navegação**

-   **Indicador de Progresso:** Uma barra de progresso visual (1, 2, 3) mostra o passo atual.
-   **Navegação para Trás:** É possível clicar nos passos anteriores para voltar atrás e alterar seleções.
-   **Reiniciar:** Um botão no final do ciclo ("Criar outro prompt") permite reiniciar a experiência.

---

## 3. Estrutura de Dados (Modelo para Base de Dados)

A aplicação utiliza o Supabase com as tabelas `Categories` e `Recipes`, conforme definido no `docs/DATABASE_SETUP.md`.

---

## 4. Lógica de API (Implementada no Frontend)

Para esta aplicação, a lógica de backend foi implementada diretamente no frontend (no ficheiro `services/prompt-factory-api.ts`), com a segurança das chaves garantida pelas variáveis de ambiente da plataforma de hosting (Vercel).

-   **Geração de Conteúdo (`api.generate`):**
    -   Orquestra a cascata de chamadas aos provedores de IA (Gemini -> OpenRouter -> Hugging Face).
    -   Trata do streaming de texto e da formatação de respostas de imagem.
    -   Implementa a lógica de fallback final.

-   **Classificação de Receitas (`api.rateRecipe`):**
    -   Chama uma função de procedimento remoto (RPC) no Supabase (`increment_recipe_rating`) para atualizar a pontuação de uma receita de forma segura, sem expor permissões de escrita diretas.

---

## 5. Gamificação e Mecanismos de Feedback

### **Sistema de Pontos e Recompensa**

-   **Objetivo:** Incentivar a experimentação e recompensar o progresso.
-   **Lógica:**
    1.  **Acumulação de Pontos:** O utilizador ganha 1 ponto por cada **geração de IA** bem-sucedida e também por cada vez que **copia um prompt**. Os pontos são guardados no `localStorage`.
    2.  **Barra de Progressão:** Os pontos são exibidos numa barra de progressão com o objetivo final de 15 pontos.
    3.  **Animação de Pontos:** Cada vez que a pontuação aumenta, a barra de progresso tem um "flash" visual para chamar a atenção.
    4.  **Notificações:** Mensagens de incentivo surgem nos marcos de 1, 5 e 10 pontos.
    5.  **Recompensa Final:** Ao atingir 15 pontos, a barra é substituída por uma "Medalha Desbloqueada" que contém um link para reclamar a recompensa digital.

### **Sistema de Classificação de Receitas**

-   **Objetivo:** Permitir que a comunidade identifique as receitas mais úteis (prova social).
-   **Lógica:**
    -   Após cada geração, o utilizador pode classificar a receita (1-5 estrelas).
    -   O voto é registado de forma segura na base de dados através da função RPC.
    -   A classificação média (`total_score` / `vote_count`) é exibida no ecrã de seleção de receitas.