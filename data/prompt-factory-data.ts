/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import type { Category, Recipe } from '../types/prompt-factory';

export const categories: Category[] = [
  { id: 'cat-1', title: 'Gerar Ideias', icon_name: 'lightbulb-flash-line' },
  { id: 'cat-2', title: 'Escrever E-mails', icon_name: 'mail-send-line' },
  { id: 'cat-3', title: 'Criar Imagens', icon_name: 'image-line' },
  { id: 'cat-4', title: 'Resumir Texto', icon_name: 'file-text-line' },
  { id: 'cat-5', title: 'Redes Sociais', icon_name: 'user-heart-line' },
  { id: 'cat-6', title: 'Educação', icon_name: 'book-open-line' },
];

export const recipes: Recipe[] = [
  // --- Category: Gerar Ideias ---
  {
    id: 'rec-1',
    categoryId: 'cat-1',
    title: 'Brainstorm para Projetos',
    icon_name: 'flask-line',
    template: 'Cria uma lista de [numero] ideias para um [projeto] sobre [tema]. O tom deve ser [tom].',
    type: 'text',
    placeholders: [
      { key: '[numero]', label: 'Número de ideias', options: ['3', '5', '10'] },
      { key: '[projeto]', label: 'Tipo de projeto', options: ['podcast', 'vídeo para o YouTube', 'artigo de blog', 'negócio'] },
      { key: '[tema]', label: 'Tema principal', options: ['tecnologia sustentável', 'história de Portugal', 'gastronomia local', 'produtividade pessoal'] },
      { key: '[tom]', label: 'Tom da comunicação', options: ['profissional', 'divertido', 'informativo', 'inspirador'] },
    ],
    advanced_tips: [
        "Tente pedir à IA para organizar as ideias em categorias (ex: 'baixo custo', 'alto impacto').", 
        "Experimente adicionar uma restrição, como 'as ideias não devem envolver programação'."
    ],
    fallback_outputs: [
        "Desculpe, a minha criatividade está a recarregar. Que tal pensarmos em nomes para um café com tema de gatos?",
        "Não consegui gerar as ideias pedidas. No entanto, aqui está uma receita de bolo de chocolate para adoçar o dia."
    ],
    total_score: 48,
    vote_count: 10,
  },
  // --- Category: Escrever E-mails ---
  {
    id: 'rec-2',
    categoryId: 'cat-2',
    title: 'E-mail para Marcar Reunião',
    icon_name: 'calendar-2-line',
    template: 'Escreve um e-mail [formalidade] para [destinatario] para marcar uma reunião sobre [assunto]. Sugere [numero_sugestoes] horários possíveis.',
    type: 'text',
    placeholders: [
      { key: '[formalidade]', label: 'Formalidade', options: ['formal', 'informal', 'amigável'] },
      { key: '[destinatario]', label: 'Destinatário', options: ['um colega de equipa', 'o meu chefe', 'um cliente potencial'] },
      { key: '[assunto]', label: 'Assunto da reunião', options: ['o relatório trimestral', 'um novo projeto', 'feedback sobre a proposta'] },
      { key: '[numero_sugestoes]', label: 'Sugestões de horário', options: ['2', '3'] },
    ],
    advanced_tips: [
        "Peça à IA para incluir uma frase a mencionar um ponto positivo sobre o trabalho do destinatário para quebrar o gelo.",
        "Para maior eficiência, pode colar a sua agenda (texto) e pedir à IA para encontrar os horários livres."
    ],
    fallback_outputs: [
        "Ocorreu um erro ao redigir o e-mail. Recomendo ligar diretamente, por vezes a comunicação humana é mais rápida!",
        "Não foi possível criar o e-mail. Que tal enviar um pombo-correio para uma abordagem mais memorável?"
    ],
    total_score: 35,
    vote_count: 8,
  },
   // --- Category: Criar Imagens ---
  {
    id: 'rec-3',
    categoryId: 'cat-3',
    title: 'Cenário de Fantasia',
    icon_name: 'sword-line',
    template: 'Gera uma imagem de [criatura], [acao], num/a [ambiente]. O estilo deve ser [estilo_artistico].',
    type: 'image',
    placeholders: [
      { key: '[criatura]', label: 'Criatura Mítica', options: ['um dragão majestoso', 'um unicórnio brilhante', 'um grifo vigilante'] },
      { key: '[acao]', label: 'Ação', options: ['a dormir num pico de montanha', 'a beber de um rio mágico', 'a voar sobre um castelo'] },
      { key: '[ambiente]', label: 'Ambiente', options: ['floresta encantada', 'cidade flutuante', 'caverna de cristal'] },
      { key: '[estilo_artistico]', label: 'Estilo Artístico', options: ['pintura a óleo digital', 'aquarela vibrante', 'arte conceptual (concept art)', 'estilo anime'] },
    ],
    advanced_tips: [
        "Adicione detalhes sobre a iluminação, como 'iluminação dramática do pôr-do-sol' ou 'luz suave da lua'.",
        "Experimente referenciar um artista famoso, como 'no estilo de Van Gogh' ou 'inspirado em H.R. Giger'."
    ],
    fallback_outputs: [
        "https://images.unsplash.com/photo-1549476464-373921717541?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=800&auto=format&fit=crop"
    ],
    total_score: 22,
    vote_count: 5,
  },
];