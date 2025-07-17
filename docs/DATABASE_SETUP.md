# Guia de Configuração da Base de Dados (Supabase)

Este documento fornece um guia passo a passo para configurar a base de dados PostgreSQL no Supabase, necessária para o funcionamento completo da aplicação "IA para Todos", com um foco especial na "Fábrica de Prompts".

## Passo 1: Criar um Projeto no Supabase

1.  Aceda ao [Supabase](https://supabase.com/) e crie uma conta ou faça login.
2.  No seu "Dashboard", clique em **"New project"**.
3.  Escolha a sua organização.
4.  Preencha os detalhes do projeto:
    *   **Name:** `ia-para-todos` (ou outro nome à sua escolha).
    *   **Database Password:** Crie uma senha forte e guarde-a em segurança.
    *   **Region:** Escolha a região mais próxima dos seus utilizadores.
5.  Clique em **"Create new project"**. Aguarde alguns minutos enquanto o seu projeto é provisionado.

## Passo 2: Obter as Chaves da API

Para que a sua aplicação se possa conectar à base de dados, precisa da URL e da chave `anon`.

1.  No menu lateral esquerdo do seu projeto Supabase, clique no ícone de **Configurações** (engrenagem).
2.  Clique em **"API"**.
3.  Nesta página, encontrará:
    *   **Project URL:** A URL do seu projeto.
    *   **Project API Keys -> `anon` `public`:** Esta é a sua chave anónima pública.

Guarde estes dois valores. Serão usados como variáveis de ambiente na sua aplicação (consulte o `README.md` ou o `services/apiConfig.ts` para mais detalhes).

## Passo 3: Estrutura das Tabelas da Fábrica de Prompts

As tabelas a seguir são o coração da "Fábrica de Prompts". O código SQL completo para criá-las está no **Passo 5**.

### Tabela `categories`
Armazena as categorias de alto nível para os prompts.

| Coluna      | Tipo          | Descrição                                                    |
| :---------- | :------------ | :----------------------------------------------------------- |
| `id`        | `TEXT`        | **(Chave Primária)** O identificador único da categoria (ex: `cat-1`). |
| `title`     | `TEXT`        | O nome da categoria que aparece na UI (ex: "Gerar Ideias").  |
| `icon_name` | `TEXT`        | O nome do ícone da biblioteca Remix Icon a ser usado (ex: `lightbulb-flash-line`). |
| `created_at`| `TIMESTAMPTZ` | A data e hora de criação do registo.                         |

### Tabela `recipes`
Armazena cada modelo de prompt, ou "receita", associado a uma categoria.

| Coluna              | Tipo          | Descrição                                                                                                                                                                                                                                                        |
| :------------------ | :------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                | `TEXT`        | **(Chave Primária)** O identificador único da receita (ex: `rec-1`).                                                                                                                                                                                                |
| `category_id`       | `TEXT`        | **(Chave Estrangeira)** Refere-se a `categories.id` para associar a receita a uma categoria.                                                                                                                                                                       |
| `title`             | `TEXT`        | O título da receita (ex: "Brainstorm para Projetos").                                                                                                                                                                                                              |
| `icon_name`         | `TEXT`        | O nome do ícone Remix Icon para a receita (ex: `flask-line`).                                                                                                                                                                                                      |
| `template`          | `TEXT`        | O modelo do prompt com placeholders (ex: `Cria uma lista de [numero] ideias...`).                                                                                                                                                                                  |
| `type`              | `TEXT`        | O tipo de output esperado. Deve ser `'text'` ou `'image'`.                                                                                                                                                                                                          |
| `placeholders`      | `JSONB`       | **(Importante)** Um campo JSON que contém um array de objetos. Cada objeto define um placeholder no template, o seu rótulo e as opções do menu dropdown. **Formato:** `[{"key": "[nome]", "label": "Nome da variável", "options": ["op1", "op2"]}]`             |
| `advanced_tips`     | `TEXT[]`      | Um array de strings com dicas avançadas para o utilizador. **Formato em CSV:** `{ "Dica 1", "Dica 2" }`                                                                                                                                                             |
| `fallback_outputs`  | `TEXT[]`      | Um array de strings com respostas de fallback caso todos os serviços de IA falhem. Para receitas do tipo `image`, estes devem ser URLs para imagens de fallback. **Formato em CSV:** `{ "Output 1", "Output 2" }`                                                      |
| `total_score`       | `INTEGER`     | A soma de todas as classificações de estrelas recebidas (usado para calcular a média).                                                                                                                                                                           |
| `vote_count`        | `INTEGER`     | O número total de votos recebidos (usado para calcular a média).                                                                                                                                                                                                 |
| `created_at`        | `TIMESTAMPTZ` | A data e hora de criação do registo.                                                                                                                                                                                                                               |

---

## Passo 4: Migrando Dados do Google Sheets para o Supabase

Siga este plano para mover os seus dados de múltiplas folhas do Google Sheets para as tabelas do Supabase.

### 1. Exportar os Dados do Google Sheets
Para cada uma das suas folhas (`Categories`, `Recipes`, `Placeholders`), exporte os dados como um ficheiro **CSV**.

### 2. Preparar o Ficheiro `categories.csv`
Este ficheiro deve ser simples. Garanta que tem as colunas `id`, `title` e `icon_name`, correspondendo à tabela do Supabase.

### 3. Preparar o Ficheiro `recipes.csv` (Passo Crítico)
Esta é a fase mais complexa, pois precisa de consolidar a informação da sua folha de `Placeholders` e formatar os dados corretamente.

**a. Consolidar os Placeholders:**
O Supabase espera que a coluna `placeholders` contenha **um único campo de texto formatado como JSON** para cada receita. Terá de transformar a sua folha de `Placeholders` nisto.

-   **Objetivo:** Para cada `recipe_id`, agrupe todos os seus placeholders e as suas opções num único JSON.
-   **Exemplo:** Se na sua folha de `Placeholders` tem várias linhas para `rec-1`:
    -   `rec-1`, `[numero]`, `Número de ideias`, `3;5;10`
    -   `rec-1`, `[projeto]`, `Tipo de projeto`, `podcast;vídeo;artigo`
-   **Transformação:** No seu ficheiro `recipes.csv`, na linha correspondente à `rec-1`, a coluna `placeholders` deve conter o seguinte texto:
    ```json
    [{"key": "[numero]", "label": "Número de ideias", "options": ["3", "5", "10"]}, {"key": "[projeto]", "label": "Tipo de projeto", "options": ["podcast", "vídeo", "artigo"]}]
    ```
-   **Como Fazer:** Pode usar um script (Python, JavaScript) para automatizar esta transformação ou fazê-la manualmente no seu editor de folhas de cálculo se tiver poucas receitas.

**b. Formatar Colunas de Array (Dicas e Fallbacks):**
Para as colunas `advanced_tips` e `fallback_outputs`, o Supabase espera um formato específico para arrays de texto no CSV.

-   **Formato:** Coloque os valores entre chaves `{}` e separe-os por vírgulas. Se um valor contiver uma vírgula, coloque-o entre aspas duplas.
-   **Exemplo:** Para a coluna `advanced_tips`, o valor na célula do CSV deve ser:
    ```
    {"Tente pedir à IA para organizar as ideias em categorias.","Experimente adicionar uma restrição, como 'as ideias não devem envolver programação'."}
    ```

### 4. Importar para o Supabase
Com os seus ficheiros CSV preparados, a importação é simples:

1.  No painel do Supabase, vá para o **Table Editor** (ícone de tabela).
2.  **Importe `categories.csv` primeiro:**
    *   Selecione a tabela `categories`.
    *   Clique em `Insert` > `Import data from CSV`.
    *   Carregue o seu ficheiro `categories.csv`. O Supabase fará a correspondência das colunas. Confirme a importação.
3.  **Importe `recipes.csv` em segundo:**
    *   Selecione a tabela `recipes`.
    *   Siga o mesmo processo, carregando o seu ficheiro `recipes.csv` já preparado.
    *   Verifique se o Supabase interpreta corretamente os tipos de dados, especialmente `jsonb` e `text[]`.

---

## Passo 5: Executar o Script SQL de Configuração

Depois de criar o projeto, execute os seguintes scripts SQL no **SQL Editor** do Supabase para configurar toda a estrutura, incluindo outras tabelas da aplicação.

### Script 1: Criação das Tabelas
Crie uma nova query, cole o código abaixo e clique em **"RUN"**.

```sql
-- =================================================================
-- Schema Cleanup (Optional, for safety on re-runs)
-- =================================================================
DROP TABLE IF EXISTS public.recipes;
DROP TABLE IF EXISTS public.manifesto_suggestions;
DROP TABLE IF EXISTS public.manifesto_principles;
DROP TABLE IF EXISTS public.hero_content;
DROP TABLE IF EXISTS public.categories;


-- =================================================================
-- Table Creation
-- =================================================================

-- Tabela para o conteúdo dinâmico do Hero Section
CREATE TABLE public.hero_content (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  emojis TEXT[]
);

-- Tabela para as categorias da Fábrica de Prompts
CREATE TABLE public.categories (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  icon_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela para as receitas da Fábrica de Prompts
CREATE TABLE public.recipes (
  id TEXT PRIMARY KEY,
  category_id TEXT REFERENCES public.categories(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  icon_name TEXT,
  template TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('text', 'image')),
  placeholders JSONB,
  advanced_tips TEXT[],
  fallback_outputs TEXT[],
  total_score INTEGER DEFAULT 0,
  vote_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Manifesto Co-Creation Tables
CREATE TABLE public.manifesto_principles (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT,
  theme_color TEXT,
  image_url TEXT,
  relevance_title TEXT,
  relevance_headline TEXT,
  relevance_infographic_text TEXT,
  relevance_facts JSONB,
  accordion_title TEXT,
  accordion_content TEXT,
  practical_example TEXT,
  quiz_question TEXT,
  quiz_options JSONB,
  quiz_correct_feedback TEXT,
  quiz_incorrect_feedback TEXT,
  upvotes INT DEFAULT 0,
  downvotes INT DEFAULT 0
);

CREATE TABLE public.manifesto_suggestions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  suggestion_text TEXT NOT NULL,
  author TEXT,
  status TEXT DEFAULT 'pending', -- pending, approved, rejected
  upvotes INT DEFAULT 0
);
```

### Script 2: Inserir Dados Iniciais (Opcional)
Se não for importar de um CSV, pode usar este script para popular a base de dados com dados de exemplo.

```sql
-- Inserir novo conteúdo dinâmico para o Hero
INSERT INTO public.hero_content (title, subtitle, emojis) VALUES
('A Sua Máquina de Ideias Geniais.', 'Diga-nos o que precisa, e nós construímos o prompt perfeito para si.', ARRAY['💡', '✨', '🚀', '🤖', '🧠', '🧬', '🎨', '⚙️']);

-- Inserir categorias para a Fábrica de Prompts
INSERT INTO public.categories (id, title, icon_name) VALUES
('cat-1', 'Gerar Ideias', 'lightbulb-flash-line'),
('cat-2', 'Escrever E-mails', 'mail-send-line');

-- Inserir receitas para a Fábrica de Prompts
INSERT INTO public.recipes (id, category_id, title, icon_name, template, type, placeholders, advanced_tips, fallback_outputs, total_score, vote_count) VALUES
(
  'rec-1', 'cat-1', 'Brainstorm para Projetos', 'flask-line', 'Cria uma lista de [numero] ideias para um [projeto] sobre [tema]. O tom deve ser [tom].', 'text',
  '[{"key": "[numero]", "label": "Número de ideias", "options": ["3", "5", "10"]}, {"key": "[projeto]", "label": "Tipo de projeto", "options": ["podcast", "vídeo para o YouTube", "artigo de blog", "negócio"]}, {"key": "[tema]", "label": "Tema principal", "options": ["tecnologia sustentável", "história de Portugal", "gastronomia local", "produtividade pessoal"]}, {"key": "[tom]", "label": "Tom da comunicação", "options": ["profissional", "divertido", "informativo", "inspirador"]}]',
  ARRAY['Tente pedir à IA para organizar as ideias em categorias (ex: ''baixo custo'', ''alto impacto'').', 'Experimente adicionar uma restrição, como ''as ideias não devem envolver programação''.'],
  ARRAY['Desculpe, a minha criatividade está a recarregar. Que tal pensarmos em nomes para um café com tema de gatos?', 'Não consegui gerar as ideias pedidas. No entanto, aqui está uma receita de bolo de chocolate para adoçar o dia.'],
  48, 10
),
(
  'rec-2', 'cat-2', 'E-mail para Marcar Reunião', 'calendar-2-line', 'Escreve um e-mail [formalidade] para [destinatario] para marcar uma reunião sobre [assunto]. Sugere [numero_sugestoes] horários possíveis.', 'text',
  '[{"key": "[formalidade]", "label": "Formalidade", "options": ["formal", "informal", "amigável"]}, {"key": "[destinatario]", "label": "Destinatário", "options": ["um colega de equipa", "o meu chefe", "um cliente potencial"]}, {"key": "[assunto]", "label": "Assunto da reunião", "options": ["o relatório trimestral", "um novo projeto", "feedback sobre a proposta"]}, {"key": "[numero_sugestoes]", "label": "Sugestões de horário", "options": ["2", "3"]}]',
  ARRAY['Peça à IA para incluir uma frase a mencionar um ponto positivo sobre o trabalho do destinatário para quebrar o gelo.', 'Para maior eficiência, pode colar a sua agenda (texto) e pedir à IA para encontrar os horários livres.'],
  ARRAY['Ocorreu um erro ao redigir o e-mail. Recomendo ligar diretamente, por vezes a comunicação humana é mais rápida!', 'Não foi possível criar o e-mail. Que tal enviar um pombo-correio para uma abordagem mais memorável?'],
  35, 8
);
```

### Script 3: Configurar a Segurança (Row Level Security e Funções)
Este passo é **obrigatório** para que a aplicação consiga ler dados e interagir de forma segura.

```sql
-- Ativar Row Level Security (RLS) para cada tabela
ALTER TABLE public.hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.manifesto_principles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.manifesto_suggestions ENABLE ROW LEVEL SECURITY;

-- Criar políticas de acesso público de leitura (SELECT)
CREATE POLICY "Allow public read-only access to hero_content" ON public.hero_content FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access to categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access to recipes" ON public.recipes FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access to principles" ON public.manifesto_principles FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access to suggestions" ON public.manifesto_suggestions FOR SELECT USING (true);

-- Criar política de escrita (INSERT) para sugestões
CREATE POLICY "Allow users to insert their own suggestions" ON public.manifesto_suggestions FOR INSERT WITH CHECK (true);

-- Criar uma função para incrementar a votação de uma receita de forma segura
CREATE OR REPLACE FUNCTION increment_recipe_rating(recipe_id TEXT, rating_value INT)
RETURNS void AS $$
BEGIN
  UPDATE public.recipes
  SET
    total_score = total_score + rating_value,
    vote_count = vote_count + 1
  WHERE id = recipe_id;
END;
$$ LANGUAGE plpgsql;

-- Funções para votação no manifesto
CREATE OR REPLACE FUNCTION vote_on_principle(p_id TEXT, vote_type TEXT)
RETURNS void AS $$
BEGIN
  IF vote_type = 'up' THEN
    UPDATE public.manifesto_principles SET upvotes = upvotes + 1 WHERE id = p_id;
  ELSIF vote_type = 'down' THEN
    UPDATE public.manifesto_principles SET downvotes = downvotes + 1 WHERE id = p_id;
  END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION vote_on_suggestion(s_id UUID, vote_type TEXT)
RETURNS void AS $$
BEGIN
  IF vote_type = 'up' THEN
    UPDATE public.manifesto_suggestions SET upvotes = upvotes + 1 WHERE id = s_id;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- ** IMPORTANTE: Conceder permissões para que as funções sejam chamadas publicamente **
GRANT EXECUTE ON FUNCTION public.increment_recipe_rating(TEXT, INT) TO anon;
GRANT EXECUTE ON FUNCTION public.vote_on_principle(TEXT, TEXT) TO anon;
GRANT EXECUTE ON FUNCTION public.vote_on_suggestion(UUID, TEXT) TO anon;
```
---

**Conclusão:** A sua base de dados está agora configurada, populada com dados e segura para ser utilizada pela aplicação. Certifique-se de que a sua URL do Supabase e a chave `anon` estão corretamente configuradas nas variáveis de ambiente da sua aplicação.