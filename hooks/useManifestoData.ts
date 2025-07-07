/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../services/supabaseClient';

export interface ChartData {
    type: 'donut' | 'bar';
    data: {
        label: string;
        value: number;
        color?: string;
    }[];
    unit?: string;
}

export interface ManifestoPrinciple {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  upvotes: number;
  downvotes: number;
  image_url: string;
  relevance_title: string;
  relevance_headline: string;
  relevance_infographic_text: string;
  relevance_facts: string[];
  accordion_title: string;
  accordion_content: string;
  practical_example: string;
  quiz_question: string;
  quiz_options: { text: string; isCorrect: boolean; }[];
  quiz_correct_feedback: string;
  quiz_incorrect_feedback: string;
  theme_color: string;
  chart_data?: ChartData;
}

export interface ManifestoSuggestion {
  id: string;
  created_at: string;
  suggestion_text: string;
  upvotes: number;
  author: string | null;
}

// --- FINALIZED DATA FOR THE MANIFESTO PRINCIPLES ---
const finalizedPrinciples: ManifestoPrinciple[] = [
    {
        id: 'p1',
        title: 'Literacia',
        description: 'A IA deve ser explicável e compreensível para todos. Acreditamos na desmistificação da IA para tornar os seus conceitos acessíveis.',
        icon_name: 'book-open-line',
        upvotes: 18,
        downvotes: 1,
        image_url: 'https://images.unsplash.com/photo-1491841550275-5b462bf975db?q=80&w=2070&auto=format&fit=crop',
        theme_color: 'blue',
        relevance_title: 'Porque é que a Literacia em IA é Importante?',
        relevance_headline: 'A Literacia em IA permite navegar num mundo em rápida transformação digital.',
        relevance_infographic_text: '75% dos profissionais acreditam que a literacia em IA será uma competência essencial nos próximos 5 anos.',
        relevance_facts: [
            'A União Europeia implementou o AI Act para criar regras claras, exigindo transparência que só pode ser fiscalizada por cidadãos informados.',
            'Empresas que investem na formação em IA dos seus colaboradores reportam um aumento de 30% na adoção de novas tecnologias.',
            'Iniciativas de literacia em escolas estão a preparar a próxima geração para os empregos do futuro, focando no pensamento crítico sobre a tecnologia.'
        ],
        accordion_title: 'Fundamentação: Desmistificar a Caixa Preta',
        accordion_content: 'A IA não pode ser uma "caixa preta" acessível apenas a especialistas. Para que todos possam confiar e participar na sua evolução, é crucial que os seus conceitos básicos sejam compreensíveis. A literacia em IA capacita os cidadãos a distinguirem factos de ficção, a usarem as ferramentas de forma segura e a exigirem responsabilidade. É a base para uma sociedade digitalmente competente e justa.',
        practical_example: 'Uma autarquia cria um workshop para comerciantes locais sobre como usar IA para analisar tendências de vendas, sem precisarem de saber programar. A IA sugere os produtos mais populares em cada estação, ajudando-os a gerir o stock de forma mais eficiente.',
        quiz_question: 'Qual é o principal objetivo da literacia em IA para o cidadão comum?',
        quiz_options: [
            { text: 'Tornar toda a gente em programadores de IA.', isCorrect: false },
            { text: 'Capacitar os cidadãos para usar e compreender a IA de forma crítica e segura.', isCorrect: true },
            { text: 'Proibir o uso de IA para quem não tem um curso superior.', isCorrect: false }
        ],
        quiz_correct_feedback: 'Exato! O objetivo é a capacitação e o pensamento crítico, não a exclusividade técnica.',
        quiz_incorrect_feedback: 'Não exatamente. A literacia não é sobre transformar todos em especialistas, mas sim em dar a todos as ferramentas para navegar no mundo da IA com confiança.',
        chart_data: {
            type: 'donut',
            data: [{ label: 'Profissionais que veem IA como competência essencial', value: 75 }]
        }
    },
    {
        id: 'p2',
        title: 'Inclusividade',
        description: 'Ninguém deve ser excluído dos benefícios da IA. Os sistemas devem ser concebidos com base na diversidade e acessibilidade.',
        icon_name: 'group-line',
        upvotes: 22,
        downvotes: 2,
        image_url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2070&auto=format&fit=crop',
        theme_color: 'roxo',
        relevance_title: 'Porque é que a Inclusividade é Crucial em IA?',
        relevance_headline: 'Sistemas de IA enviesados podem perpetuar e amplificar a discriminação existente na sociedade.',
        relevance_infographic_text: 'Sistemas de reconhecimento facial chegaram a ter taxas de erro 34% mais altas para mulheres de pele escura em comparação com homens de pele clara.',
        relevance_facts: [
            'Modelos de linguagem treinados em textos históricos podem reproduzir estereótipos de género e raciais se não forem cuidadosamente auditados.',
            'A falta de dados de grupos minoritários leva a que ferramentas de diagnóstico médico por IA sejam menos precisas para essas populações.',
            'Empresas líderes estão a criar equipas de "IA Responsável" para testar e mitigar ativamente o preconceito nos seus algoritmos antes do lançamento.'
        ],
        accordion_title: 'Fundamentação: Combater o Preconceito Digital',
        accordion_content: 'Os sistemas de IA são treinados com dados do mundo real, que muitas vezes contêm preconceitos históricos e sociais. Se não forem desenhados com cuidado, podem perpetuar e até amplificar a discriminação. A inclusividade garante que a IA é desenvolvida com conjuntos de dados diversos e testada para ser justa para todos os grupos, independentemente de género, etnia, capacidade ou origem.',
        practical_example: 'Uma empresa desenvolve um sistema de IA para triagem de currículos. Para garantir a inclusividade, treina o modelo para ignorar nomes e fotos, focando-se apenas nas competências e experiência, e audita-o regularmente para detetar enviesamentos contra grupos sub-representados.',
        quiz_question: 'Porque é que um sistema de IA pode ser "enviesado" (biased)?',
        quiz_options: [
            { text: 'Porque a IA tem as suas próprias opiniões.', isCorrect: false },
            { text: 'Porque foi treinado com dados que refletem preconceitos existentes na sociedade.', isCorrect: true },
            { text: 'Porque os computadores são naturalmente discriminatórios.', isCorrect: false }
        ],
        quiz_correct_feedback: 'Perfeito! A IA aprende com os dados que lhe damos. Se os dados são enviesados, a IA também o será.',
        quiz_incorrect_feedback: 'A IA não tem opiniões. O problema reside nos dados com que é alimentada, que podem conter preconceitos humanos.',
        chart_data: {
            type: 'bar',
            data: [
                { label: 'Homens de pele clara', value: 100, color: 'bg-gray-400' },
                { label: 'Mulheres de pele escura', value: 134, color: 'bg-pcd-roxo' }
            ],
            unit: ' (Erro Relativo)'
        }
    },
    {
        id: 'p3',
        title: 'Potencial Humano',
        description: 'A IA deve expandir as capacidades humanas, não substituí-las. Defendemos tecnologias que capacitam e desenvolvem as pessoas.',
        icon_name: 'lightbulb-line',
        upvotes: 25,
        downvotes: 0,
        image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
        theme_color: 'green',
        relevance_title: 'Como pode a IA Aumentar o Potencial Humano?',
        relevance_headline: 'A IA pode automatizar tarefas repetitivas, libertando os humanos para a criatividade e o pensamento estratégico.',
        relevance_infographic_text: '40% do tempo de trabalho em escritórios é gasto em tarefas administrativas que podem ser automatizadas com IA.',
        relevance_facts: [
            'Cirurgiões estão a usar IA como "copilotos" para analisar imagens em tempo real durante operações, aumentando a precisão.',
            'Programadores usam ferramentas como o GitHub Copilot para acelerar a escrita de código e focar-se em resolver problemas mais complexos.',
            'Artistas utilizam geradores de imagem de IA para criar protótipos rápidos de ideias visuais, acelerando o processo criativo.'
        ],
        accordion_title: 'Fundamentação: A IA como Copiloto',
        accordion_content: 'O objetivo da IA não deve ser substituir a criatividade e o julgamento humano, mas sim aumentá-los. As melhores ferramentas de IA funcionam como "copilotos", automatizando tarefas repetitivas e libertando os humanos para se concentrarem no pensamento estratégico, na resolução de problemas complexos e na criatividade. A IA deve ser uma parceira, não uma concorrente.',
        practical_example: 'Um médico usa uma IA para analisar milhares de exames de imagem e detetar anomalias que poderiam passar despercebidas. A IA acelera a análise, mas a decisão final do diagnóstico e o plano de tratamento são sempre da responsabilidade do médico, que usa a sua experiência e empatia.',
        quiz_question: 'Qual é a melhor forma de descrever a relação ideal entre IA e humanos no trabalho?',
        quiz_options: [
            { text: 'A IA substitui completamente os trabalhadores.', isCorrect: false },
            { text: 'A IA funciona como um "copiloto" para aumentar as capacidades humanas.', isCorrect: true },
            { text: 'Os humanos devem supervisionar a IA sem a utilizar.', isCorrect: false }
        ],
        quiz_correct_feedback: 'Isso mesmo! A IA deve ser um parceiro que nos ajuda a ser melhores no que fazemos.',
        quiz_incorrect_feedback: 'A visão mais produtiva é a de parceria. A IA automatiza o repetitivo, e nós focamo-nos no estratégico e criativo.',
        chart_data: {
            type: 'donut',
            data: [{ label: 'Tempo gasto em tarefas administrativas automatizáveis', value: 40 }]
        }
    },
    {
        id: 'p4',
        title: 'Responsabilidade',
        description: 'A IA deve ser desenvolvida com regras justas e transparência. Os seus efeitos devem ser imputáveis aos seus autores.',
        icon_name: 'global-line',
        upvotes: 15,
        downvotes: 1,
        image_url: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=2070&auto=format&fit=crop',
        theme_color: 'orange',
        relevance_title: 'Quem é Responsável pelas Decisões da IA?',
        relevance_headline: 'A ausência de responsabilidade clara pode levar a decisões injustas e sem recurso para os cidadãos afetados.',
        relevance_infographic_text: 'Em 2022, um erro num algoritmo de IA levou à suspensão indevida de benefícios sociais de milhares de famílias nos Países Baixos.',
        relevance_facts: [
            'O "direito à explicação", presente no RGPD, é um primeiro passo para exigir que decisões automatizadas sejam compreensíveis.',
            'Auditorias independentes a algoritmos estão a tornar-se uma prática comum para garantir que sistemas de IA em áreas críticas são justos e fiáveis.',
            'O desenvolvimento de "Constituições de IA" por empresas como a Anthropic visa definir princípios éticos que guiam o comportamento dos seus modelos.'
        ],
        accordion_title: 'Fundamentação: Uma Cadeia de Responsabilidade',
        accordion_content: 'Uma decisão tomada por uma IA pode ter consequências no mundo real. É fundamental que exista uma cadeia de responsabilidade clara. Quem é responsável se um carro autónomo causar um acidente? O programador, a empresa, o dono do carro? A responsabilidade garante que existem mecanismos para corrigir erros, compensar danos e que as decisões automatizadas não operam num vazio legal.',
        practical_example: 'Um banco usa IA para aprovar ou recusar créditos. Pelo princípio da Responsabilidade, o banco tem de ser capaz de explicar por que motivo uma decisão foi tomada e oferecer um canal de recurso para um humano rever o caso se o cliente contestar o resultado da IA.',
        quiz_question: 'O que significa "responsabilidade" (accountability) no contexto da IA?',
        quiz_options: [
            { text: 'A IA é legalmente responsável pelos seus próprios erros.', isCorrect: false },
            { text: 'Deve haver pessoas e organizações claramente identificáveis como responsáveis pelas ações de sistemas de IA.', isCorrect: true },
            { text: 'A IA nunca pode cometer erros.', isCorrect: false }
        ],
        quiz_correct_feedback: 'Exatamente! A responsabilidade recai sempre sobre os humanos e as instituições que desenvolvem e implementam a IA.',
        quiz_incorrect_feedback: 'A IA é uma ferramenta. A responsabilidade é das pessoas e organizações por trás dela.'
    },
    {
        id: 'p5',
        title: 'Bem Comum',
        description: 'A IA deve promover o bem-estar da Humanidade e não causar danos ao planeta, respeitando os direitos humanos e valores democráticos.',
        icon_name: 'shield-line',
        upvotes: 28,
        downvotes: 0,
        image_url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop',
        theme_color: 'pink',
        relevance_title: 'Pode a IA Contribuir para o Bem Comum?',
        relevance_headline: 'A IA tem o potencial de acelerar a resolução de alguns dos maiores desafios globais.',
        relevance_infographic_text: 'Modelos de IA como o AlphaFold aceleraram a descoberta da estrutura de 200 milhões de proteínas, um avanço gigante para a medicina.',
        relevance_facts: [
            'Organizações usam IA para otimizar redes elétricas, reduzindo o desperdício de energia e acelerando a transição para fontes renováveis.',
            'Sistemas de IA ajudam agricultores a usar menos água e pesticidas, analisando dados de sensores e drones para uma agricultura de precisão.',
            'Na saúde, a IA está a ser usada para prever surtos de doenças e para desenvolver novos medicamentos de forma mais rápida e barata.'
        ],
        accordion_title: 'Fundamentação: Tecnologia com Propósito',
        accordion_content: 'A tecnologia deve ser uma força para o bem. A IA tem um potencial imenso para resolver alguns dos maiores desafios da humanidade, desde as alterações climáticas à cura de doenças. O princípio do Bem Comum defende que o desenvolvimento da IA deve ser orientado para objetivos sociais e ambientais positivos, alinhados com os Direitos Humanos e os Objetivos de Desenvolvimento Sustentável, evitando usos que prejudiquem a sociedade ou o planeta.',
        practical_example: 'Investigadores usam IA para analisar dados de satélite e prever áreas em risco de desflorestação na Amazónia, permitindo que as autoridades ajam de forma preventiva para proteger o ecossistema.',
        quiz_question: 'Qual dos seguintes projetos melhor representa o uso da IA para o "Bem Comum"?',
        quiz_options: [
            { text: 'Otimizar anúncios para vender mais produtos.', isCorrect: false },
            { text: 'Ajudar a descobrir novos antibióticos.', isCorrect: true },
            { text: 'Criar vídeos "deepfake" para entretenimento.', isCorrect: false }
        ],
        quiz_correct_feedback: 'Certíssimo! Usar a IA para resolver problemas de saúde globais é um exemplo perfeito de aplicação para o bem comum.',
        quiz_incorrect_feedback: 'O bem comum foca-se em resolver desafios sociais e ambientais, não em objetivos puramente comerciais ou de entretenimento potencialmente duvidoso.'
    },
    {
        id: 'p6',
        title: 'Supervisão Humana',
        description: 'As pessoas devem ter uma palavra a dizer sobre como a IA é usada. Todos os sistemas devem incluir mecanismos de controlo humano.',
        icon_name: 'eye-line',
        upvotes: 20,
        downvotes: 1,
        image_url: 'https://images.unsplash.com/photo-1551818255-e6e10975846a?q=80&w=2070&auto=format&fit=crop',
        theme_color: 'green',
        relevance_title: 'Porque é que a Supervisão Humana é Indispensável?',
        relevance_headline: 'A autonomia total da IA em áreas críticas é um risco inaceitável. O controlo humano é a nossa salvaguarda final.',
        relevance_infographic_text: '+90% dos especialistas em IA concordam que sistemas de armas autónomas devem sempre exigir autorização humana para agir.',
        relevance_facts: [
            'Na aviação, o piloto automático (uma forma de IA) assiste o piloto, mas o controlo final e a responsabilidade permanecem sempre com o humano na cabine.',
            'Sistemas de moderação de conteúdo em redes sociais usam IA para sinalizar publicações, mas decisões complexas ou de recurso são escaladas para moderadores humanos.',
            'Ferramentas de diagnóstico médico por IA fornecem uma "segunda opinião" ao médico, que integra a sugestão da máquina com o seu conhecimento clínico e do paciente.'
        ],
        accordion_title: 'Fundamentação: O "Botão de Emergência"',
        accordion_content: 'Mesmo os sistemas de IA mais avançados podem falhar ou ter comportamentos inesperados. É crucial que exista sempre um mecanismo de supervisão e controlo humano, especialmente em áreas de alto risco como a saúde, a justiça ou a defesa. A Supervisão Humana garante que uma pessoa pode intervir, corrigir ou desligar um sistema de IA se este começar a agir de forma perigosa ou indesejada. É o "botão de emergência" da era da IA.',
        practical_example: 'Num sistema de defesa que usa IA para detetar ameaças, a decisão final de qualquer ação letal é sempre tomada por um comandante humano, que analisa a recomendação da IA mas tem a autoridade para a anular.',
        quiz_question: 'Porque é essencial a "Supervisão Humana" em sistemas de IA de alto risco?',
        quiz_options: [
            { text: 'Para garantir que uma pessoa pode intervir e prevenir erros graves.', isCorrect: true },
            { text: 'Porque os humanos são mais lentos e isso dá tempo para pensar.', isCorrect: false },
            { text: 'Para ensinar a IA a ter emoções.', isCorrect: false }
        ],
        quiz_correct_feedback: 'Exato! É a nossa salvaguarda final para garantir que a tecnologia permanece sob controlo humano.',
        quiz_incorrect_feedback: 'A supervisão é sobre controlo e segurança, garantindo que um humano tem sempre a palavra final em decisões críticas.',
        chart_data: {
            type: 'donut',
            data: [{ label: 'Especialistas que concordam com a necessidade de supervisão humana em armas autónomas', value: 90 }]
        }
    }
];


export const useManifestoData = () => {
    const [principles, setPrinciples] = useState<ManifestoPrinciple[]>(finalizedPrinciples);
    const [suggestions, setSuggestions] = useState<ManifestoSuggestion[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        // Principles are now loaded locally, only fetch dynamic suggestions
        if (!supabase) {
            setIsLoading(false);
            return;
        }

        try {
            const { data: suggestionsData, error: suggestionsError } = await supabase
                .from('manifesto_suggestions')
                .select('*')
                .eq('status', 'approved')
                .order('upvotes', { ascending: false });
            if (suggestionsError) throw new Error(`Suggestions fetch error: ${suggestionsError.message}`);
            setSuggestions(suggestionsData || []);

            setError(null);
        } catch (err: any) {
            console.error("Error fetching manifesto suggestions:", err.message || err);
            setError("Não foi possível carregar as sugestões da comunidade.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const voteOnPrinciple = async (principleId: string, voteType: 'up' | 'down') => {
        setPrinciples(prevPrinciples =>
            prevPrinciples.map(p => {
                if (p.id === principleId) {
                    return {
                        ...p,
                        upvotes: voteType === 'up' ? p.upvotes + 1 : p.upvotes,
                        downvotes: voteType === 'down' ? p.downvotes + 1 : p.downvotes,
                    };
                }
                return p;
            })
        );
        if (!supabase) return;
        const { error } = await supabase.rpc('vote_on_principle', {
            p_id: principleId,
            vote_type: voteType,
        });
        if (error) console.error("Error voting on principle:", error);
    };

    const voteOnSuggestion = async (suggestionId: string, voteType: 'up', onVoteSuccess?: () => void) => {
        if (!supabase) return;
        const { error } = await supabase.rpc('vote_on_suggestion', {
            s_id: suggestionId,
            vote_type: voteType,
        });
        if (error) {
            console.error("Error voting on suggestion:", error);
        } else {
            onVoteSuccess?.();
        }
    };

    const submitSuggestion = async (suggestionText: string, author?: string, onSubmissionSuccess?: () => void) => {
        if (!supabase) return;
        const { error } = await supabase.from('manifesto_suggestions').insert({
            suggestion_text: suggestionText,
            status: 'pending',
            author: author || null,
        });
        if (error) {
             console.error("Error submitting suggestion:", error);
             throw error;
        } else {
            onSubmissionSuccess?.();
        }
    };

    return { principles, suggestions, isLoading, error, voteOnPrinciple, submitSuggestion, voteOnSuggestion, refreshData: fetchData };
};
