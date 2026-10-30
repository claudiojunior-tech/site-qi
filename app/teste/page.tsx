const FORMAS: Forma[] = [
  'circle',
  'square',
  'triangle',
  'diamond',
  'hexagon',
  'cross',
];

const CATEGORIAS = [
  'Sequências geométricas',
  'Rotação espacial',
  'Quantidade e preenchimento',
  'Transformações matriciais',
  'Progressão de formas',
  'Raciocínio combinado',
  'Matrizes avançadas',
];

const TITULOS = [
  'Observe a sequência de formas. Qual figura completa corretamente o padrão?',
  'As figuras passam por uma transformação a cada coluna. Identifique a posição que falta.',
  'Observe a quantidade, o formato e o preenchimento das figuras. Qual alternativa completa a matriz?',
  'Analise as mudanças nas linhas e colunas para descobrir a figura ausente.',
  'Identifique a regra de progressão geométrica e escolha a continuação correta.',
  'Observe as duas regras que atuam simultaneamente. Qual figura respeita ambas?',
  'Analise cuidadosamente os elementos da matriz e encontre a única alternativa compatível.',
];

// Cada família possui uma regra visual própria.
// Linha e coluna determinam a resposta de maneira verificável.
function criarCelula(
  familia: number,
  variante: number,
  linha: number,
  coluna: number
): Celula {
  const base = variante + familia;

  switch (familia) {
    // 1. Formas mudam horizontalmente.
    // Quantidade muda verticalmente.
    case 0:
      return {
        forma: FORMAS[(coluna + base) % 6],
        quantidade: linha + 1,
        rotacao: 0,
        preenchida: false,
      };

    // 2. Formas mudam verticalmente.
    // Rotação muda horizontalmente.
    case 1:
      return {
        forma: FORMAS[(linha + base) % 6],
        quantidade: 1,
        rotacao: (coluna * 90) % 360,
        preenchida: false,
      };

    // 3. Forma acompanha a diagonal.
    // Quantidade acompanha a coluna.
    // Preenchimento alterna por linha.
    case 2:
      return {
        forma: FORMAS[(linha + coluna + base) % 6],
        quantidade: coluna + 1,
        rotacao: 0,
        preenchida: linha % 2 === 0,
      };

    // 4. Combinação de progressão de formas,
    // quantidade, rotação e preenchimento.
    case 3:
      return {
        forma: FORMAS[(linha * 2 + coluna + base) % 6],
        quantidade: linha + 1,
        rotacao: coluna * 45,
        preenchida: coluna % 2 === 0,
      };

    // 5. Progressão horizontal e vertical combinada.
    case 4:
      return {
        forma: FORMAS[(linha + coluna * 2 + base) % 6],
        quantidade: coluna + 1,
        rotacao: linha * 90,
        preenchida: linha === coluna,
      };

    // 6. Alternância de elementos e rotações.
    case 5:
      return {
        forma: FORMAS[(linha + coluna * 2 + base) % 6],
        quantidade: (linha % 2) + 1,
        rotacao: ((linha + coluna) * 45) % 360,
        preenchida: (linha + coluna) % 2 === 0,
      };

    // 7. Combinação avançada de regras.
    default:
      return {
        forma: FORMAS[(linha * 2 + coluna * 2 + base) % 6],
        quantidade: ((linha * 2 + coluna) % 3) + 1,
        rotacao: (linha * 90 + coluna * 45) % 360,
        preenchida: (linha + coluna) % 2 === 0,
      };
  }
}

function assinatura(c: Celula): string {
  return `${c.forma}-${c.quantidade}-${c.rotacao}-${c.preenchida}`;
}

function criarPergunta(id: number): Pergunta {
  // Sete famílias com quatro variações cada.
  const familia = Math.floor((id - 1) / 4);
  const variante = (id - 1) % 4;

  // Quatro etapas de dificuldade, sete questões por etapa.
  const nivel = Math.floor((id - 1) / 7) + 1;

  // Distribui as lacunas pelas nove posições possíveis.
  const posicaoAusente = (id * 5 + 4) % 9;

  const matriz: Array<Celula | null> = Array.from(
    { length: 9 },
    (_, posicao) => {
      if (posicao === posicaoAusente) return null;

      const linha = Math.floor(posicao / 3);
      const coluna = posicao % 3;

      return criarCelula(familia, variante, linha, coluna);
    }
  );

  const linhaCorreta = Math.floor(posicaoAusente / 3);
  const colunaCorreta = posicaoAusente % 3;

  // Calcula a resposta pela mesma regra que construiu a matriz.
  const correta = criarCelula(
    familia,
    variante,
    linhaCorreta,
    colunaCorreta
  );

  // Cada alternativa errada altera apenas uma propriedade.
  const distratores: Celula[] = [
    {
      ...correta,
      forma: FORMAS[(FORMAS.indexOf(correta.forma) + 1) % 6],
    },
    {
      ...correta,
      quantidade: (correta.quantidade % 3) + 1,
    },
    {
      ...correta,
      rotacao: (correta.rotacao + 90) % 360,
    },
    {
      ...correta,
      preenchida: !correta.preenchida,
    },
  ];

  // Seleciona três distratores diferentes em cada variação.
  const inicioDistratores = variante % 4;

  const distratoresSelecionados = [
    ...distratores.slice(inicioDistratores),
    ...distratores.slice(0, inicioDistratores),
  ].slice(0, 3);

  // Quatro alternativas únicas: uma correta e três incorretas.
  const opcoes = [correta, ...distratoresSelecionados];

  // Embaralhamento determinístico.
  // A resposta correta continua sendo identificada pela assinatura.
  const deslocamento = (id * 3) % 4;

  const alternativasEmbaralhadas = [
    ...opcoes.slice(deslocamento),
    ...opcoes.slice(0, deslocamento),
  ];

  const indiceRealCorreta = alternativasEmbaralhadas.findIndex(
    (item) => assinatura(item) === assinatura(correta)
  );

  return {
    id,
    nivel,
    categoria: CATEGORIAS[familia],
    titulo: TITULOS[familia],
    matriz,
    alternativas: alternativasEmbaralhadas,
    respostaCorreta: indiceRealCorreta,
  };
}

const PERGUNTAS: Pergunta[] = Array.from(
  { length: 28 },
  (_, index) => criarPergunta(index + 1)
);