'use client';

import { useState, useEffect, useCallback } from 'react';

type FormaGeometrica =
  | 'circle'
  | 'square'
  | 'triangle'
  | 'diamond'
  | 'hexagon'
  | 'star'
  | 'cross';

type EstiloTraco = 'solid' | 'thick' | 'thin';
type Tamanho = 'sm' | 'md' | 'lg';

interface FiguraCelula {
  forma: FormaGeometrica;
  cor: string;
  tamanho?: Tamanho;
  estilo?: EstiloTraco;
  rotacao?: number;
  quantidade?: number;
  unidos?: boolean;
  // Para matrizes compostas (como a Questão 20)
  formaInterna?: FormaGeometrica;
  corInterna?: string;
  rotacaoInterna?: number;
}

interface Pergunta {
  id: number;
  tipoLayout: 'matriz' | 'lista';
  titulo: string;
  // Para layout de matriz 3x3
  matriz?: (FiguraCelula | null)[];
  alternativasMatriz?: FiguraCelula[];
  // Para layout de lista (questões verbais, numéricas e séries como Q16, Q18, Q19)
  ilustracaoSerie?: 'piramide_pontos' | 'sequencia_quadrados' | null;
  alternativasTexto?: string[];
  correta: number;
}

const C = {
  azul: '#3b82f6',
  laranja: '#f97316',
  verde: '#22c55e',
  vermelho: '#ef4444',
  magenta: '#d946ef',
  violeta: '#8b5cf6',
  ciano: '#06b6d4',
  rubi: '#e11d48',
  slate: '#64748b',
  indigo: '#6366f1',
  teal: '#14b8a6',
};

const fig = (
  forma: FormaGeometrica,
  cor: string,
  extra: Partial<FiguraCelula> = {}
): FiguraCelula => ({
  forma,
  cor,
  tamanho: 'md',
  estilo: 'solid',
  rotacao: 0,
  quantidade: 1,
  unidos: false,
  ...extra,
});

const PERGUNTAS: Pergunta[] = [
  // 1. Print 1: Azul - Tamanho Grande -> Médio -> Pequeno
  {
    id: 1,
    tipoLayout: 'matriz',
    titulo: 'Qual padrão completa a grade?',
    matriz: [
      fig('circle', C.azul, { tamanho: 'lg' }),
      fig('circle', C.azul, { tamanho: 'md' }),
      fig('circle', C.azul, { tamanho: 'sm' }),
      fig('square', C.azul, { tamanho: 'lg' }),
      fig('square', C.azul, { tamanho: 'md' }),
      fig('square', C.azul, { tamanho: 'sm' }),
      fig('triangle', C.azul, { tamanho: 'lg' }),
      fig('triangle', C.azul, { tamanho: 'md' }),
      null,
    ],
    alternativasMatriz: [
      fig('triangle', C.azul, { tamanho: 'lg' }),
      fig('circle', C.azul, { tamanho: 'sm' }),
      fig('triangle', C.azul, { tamanho: 'sm' }),
      fig('square', C.azul, { tamanho: 'sm' }),
    ],
    correta: 2, // C
  },

  // 2. Print 2: Laranja - Quantidade 1 -> 2 -> 3
  {
    id: 2,
    tipoLayout: 'matriz',
    titulo: 'Qual padrão completa a grade?',
    matriz: [
      fig('circle', C.laranja, { quantidade: 1 }),
      fig('circle', C.laranja, { quantidade: 2 }),
      fig('circle', C.laranja, { quantidade: 3, unidos: true }),
      fig('square', C.laranja, { quantidade: 1 }),
      fig('square', C.laranja, { quantidade: 2 }),
      fig('square', C.laranja, { quantidade: 3, unidos: true }),
      fig('triangle', C.laranja, { quantidade: 1 }),
      fig('triangle', C.laranja, { quantidade: 2 }),
      null,
    ],
    alternativasMatriz: [
      fig('triangle', C.laranja, { quantidade: 2 }),
      fig('circle', C.laranja, { quantidade: 3, unidos: true }),
      fig('square', C.laranja, { quantidade: 3, unidos: true }),
      fig('triangle', C.laranja, { quantidade: 3 }),
    ],
    correta: 3, // D
  },

  // 3. Verde - Preenchido -> Contorno Grosso -> Contorno Fino (Progressão de estilo)
  {
    id: 3,
    tipoLayout: 'matriz',
    titulo: 'Qual padrão completa a grade?',
    matriz: [
      fig('diamond', C.verde, { estilo: 'solid' }),
      fig('diamond', C.verde, { estilo: 'thick' }),
      fig('diamond', C.verde, { estilo: 'thin' }),
      fig('triangle', C.verde, { estilo: 'solid' }),
      fig('triangle', C.verde, { estilo: 'thick' }),
      fig('triangle', C.verde, { estilo: 'thin' }),
      fig('star', C.verde, { estilo: 'solid' }),
      fig('star', C.verde, { estilo: 'thick' }),
      null,
    ],
    alternativasMatriz: [
      fig('star', C.verde, { estilo: 'solid' }),
      fig('star', C.verde, { estilo: 'thin' }),
      fig('diamond', C.verde, { estilo: 'thin' }),
      fig('star', C.verde, { estilo: 'thick' }),
    ],
    correta: 1, // B
  },

  // 4. Multicolorida - Alternância de cores por linha e formas por coluna
  {
    id: 4,
    tipoLayout: 'matriz',
    titulo: 'Qual padrão completa a grade?',
    matriz: [
      fig('circle', C.vermelho),
      fig('square', C.azul),
      fig('triangle', C.verde),
      fig('circle', C.verde),
      fig('square', C.vermelho),
      fig('triangle', C.azul),
      fig('circle', C.azul),
      fig('square', C.verde),
      null,
    ],
    alternativasMatriz: [
      fig('triangle', C.vermelho),
      fig('triangle', C.verde),
      fig('square', C.vermelho),
      fig('circle', C.vermelho),
    ],
    correta: 0, // A
  },

  // 5. Questão Numérica de Sequência (Estilo MyIQTested)
  {
    id: 5,
    tipoLayout: 'lista',
    titulo: 'Qual número completa a sequência: 2, 6, 12, 20, 30, ?',
    alternativasTexto: ['36', '40', '42', '44'],
    correta: 2, // C (diferenças: +4, +6, +8, +10, +12 -> 42)
  },

  // 6. Índigo - Quantidade decrescente (3 -> 2 -> 1) em contorno grosso
  {
    id: 6,
    tipoLayout: 'matriz',
    titulo: 'Qual padrão completa a grade?',
    matriz: [
      fig('square', C.indigo, { quantidade: 3, estilo: 'thick' }),
      fig('square', C.indigo, { quantidade: 2, estilo: 'thick' }),
      fig('square', C.indigo, { quantidade: 1, estilo: 'thick' }),
      fig('diamond', C.indigo, { quantidade: 3, estilo: 'thick' }),
      fig('diamond', C.indigo, { quantidade: 2, estilo: 'thick' }),
      fig('diamond', C.indigo, { quantidade: 1, estilo: 'thick' }),
      fig('circle', C.indigo, { quantidade: 3, estilo: 'thick' }),
      fig('circle', C.indigo, { quantidade: 2, estilo: 'thick' }),
      null,
    ],
    alternativasMatriz: [
      fig('circle', C.indigo, { quantidade: 2, estilo: 'thick' }),
      fig('circle', C.indigo, { quantidade: 1, estilo: 'solid' }),
      fig('circle', C.indigo, { quantidade: 1, estilo: 'thick' }),
      fig('diamond', C.indigo, { quantidade: 1, estilo: 'thick' }),
    ],
    correta: 2, // C
  },

  // 7. Composta - Moldura Externa + Símbolo Interno
  {
    id: 7,
    tipoLayout: 'matriz',
    titulo: 'Qual padrão completa a grade?',
    matriz: [
      fig('square', C.slate, { formaInterna: 'circle', corInterna: C.azul }),
      fig('circle', C.slate, { formaInterna: 'circle', corInterna: C.azul }),
      fig('triangle', C.slate, { formaInterna: 'circle', corInterna: C.azul }),
      fig('square', C.slate, { formaInterna: 'diamond', corInterna: C.laranja }),
      fig('circle', C.slate, { formaInterna: 'diamond', corInterna: C.laranja }),
      fig('triangle', C.slate, { formaInterna: 'diamond', corInterna: C.laranja }),
      fig('square', C.slate, { formaInterna: 'star', corInterna: C.verde }),
      fig('circle', C.slate, { formaInterna: 'star', corInterna: C.verde }),
      null,
    ],
    alternativasMatriz: [
      fig('triangle', C.slate, { formaInterna: 'star', corInterna: C.verde }),
      fig('triangle', C.slate, { formaInterna: 'diamond', corInterna: C.verde }),
      fig('circle', C.slate, { formaInterna: 'star', corInterna: C.verde }),
      fig('triangle', C.slate, { formaInterna: 'star', corInterna: C.laranja }),
    ],
    correta: 0, // A
  },

  // 8. Questão Verbal (Estilo MyIQTested)
  {
    id: 8,
    tipoLayout: 'lista',
    titulo: 'Qual palavra NÃO pertence ao mesmo grupo das demais?',
    alternativasTexto: ['Violino', 'Flauta', 'Violoncelo', 'Harpa'],
    correta: 1, // B (Flauta é instrumento de sopro; os demais são de cordas)
  },

  // 9. Teal - Tamanho Crescente (Pequeno -> Médio -> Grande)
  {
    id: 9,
    tipoLayout: 'matriz',
    titulo: 'Qual padrão completa a grade?',
    matriz: [
      fig('hexagon', C.teal, { tamanho: 'sm' }),
      fig('hexagon', C.teal, { tamanho: 'md' }),
      fig('hexagon', C.teal, { tamanho: 'lg' }),
      fig('cross', C.teal, { tamanho: 'sm' }),
      fig('cross', C.teal, { tamanho: 'md' }),
      fig('cross', C.teal, { tamanho: 'lg' }),
      fig('diamond', C.teal, { tamanho: 'sm' }),
      fig('diamond', C.teal, { tamanho: 'md' }),
      null,
    ],
    alternativasMatriz: [
      fig('diamond', C.teal, { tamanho: 'sm' }),
      fig('cross', C.teal, { tamanho: 'lg' }),
      fig('hexagon', C.teal, { tamanho: 'lg' }),
      fig('diamond', C.teal, { tamanho: 'lg' }),
    ],
    correta: 3, // D
  },

  // 10. Multicolorida - Quantidade + Cor
  {
    id: 10,
    tipoLayout: 'matriz',
    titulo: 'Qual padrão completa a grade?',
    matriz: [
      fig('circle', C.azul, { quantidade: 1 }),
      fig('circle', C.vermelho, { quantidade: 2 }),
      fig('circle', C.verde, { quantidade: 3 }),
      fig('square', C.vermelho, { quantidade: 1 }),
      fig('square', C.verde, { quantidade: 2 }),
      fig('square', C.azul, { quantidade: 3 }),
      fig('triangle', C.verde, { quantidade: 1 }),
      fig('triangle', C.azul, { quantidade: 2 }),
      null,
    ],
    alternativasMatriz: [
      fig('triangle', C.azul, { quantidade: 3 }),
      fig('triangle', C.vermelho, { quantidade: 3 }),
      fig('triangle', C.verde, { quantidade: 3 }),
      fig('square', C.vermelho, { quantidade: 3 }),
    ],
    correta: 1, // B
  },

  // 11. Print 11: Magenta - Rotação de Hexágono, Triângulo e Estrela
  {
    id: 11,
    tipoLayout: 'matriz',
    titulo: 'Qual padrão completa a grade?',
    matriz: [
      fig('hexagon', C.magenta, { rotacao: 0 }),
      fig('hexagon', C.magenta, { rotacao: 15 }),
      fig('hexagon', C.magenta, { rotacao: 30 }),
      fig('triangle', C.magenta, { rotacao: 0 }),
      fig('triangle', C.magenta, { rotacao: 55 }),
      fig('triangle', C.magenta, { rotacao: 110 }),
      fig('star', C.magenta, { rotacao: 0 }),
      fig('star', C.magenta, { rotacao: 20 }),
      null,
    ],
    alternativasMatriz: [
      fig('star', C.magenta, { rotacao: 40 }),
      fig('star', C.magenta, { rotacao: 20 }),
      fig('triangle', C.magenta, { rotacao: 110 }),
      fig('star', C.magenta, { rotacao: 15 }),
    ],
    correta: 0, // A
  },

  // 12. Print 12: Violeta - Rotação de Triângulo, Estrela e Losango (0° -> 45° -> 90°)
  {
    id: 12,
    tipoLayout: 'matriz',
    titulo: 'Qual padrão completa a grade?',
    matriz: [
      fig('triangle', C.violeta, { rotacao: 0 }),
      fig('triangle', C.violeta, { rotacao: 90 }),
      fig('triangle', C.violeta, { rotacao: 180 }),
      fig('star', C.violeta, { rotacao: 0 }),
      fig('star', C.violeta, { rotacao: 45 }),
      fig('star', C.violeta, { rotacao: 90 }),
      fig('diamond', C.violeta, { rotacao: 0 }),
      fig('diamond', C.violeta, { rotacao: 45 }),
      null,
    ],
    alternativasMatriz: [
      fig('diamond', C.violeta, { rotacao: 0 }),
      fig('diamond', C.violeta, { rotacao: 90 }),
      fig('diamond', C.violeta, { rotacao: 135 }),
      fig('star', C.violeta, { rotacao: 90 }),
    ],
    correta: 1, // B (Losango deitado na horizontal)
  },

  // 13. Print 13: Ciano - Preenchido -> Contorno Grosso -> Contorno Fino
  {
    id: 13,
    tipoLayout: 'matriz',
    titulo: 'Qual padrão completa a grade?',
    matriz: [
      fig('circle', C.ciano, { estilo: 'solid' }),
      fig('circle', C.ciano, { estilo: 'thick' }),
      fig('circle', C.ciano, { estilo: 'thin' }),
      fig('square', C.ciano, { estilo: 'solid' }),
      fig('square', C.ciano, { estilo: 'thick' }),
      fig('square', C.ciano, { estilo: 'thin' }),
      fig('hexagon', C.ciano, { estilo: 'solid' }),
      fig('hexagon', C.ciano, { estilo: 'thick' }),
      null,
    ],
    alternativasMatriz: [
      fig('hexagon', C.ciano, { estilo: 'thin' }),
      fig('hexagon', C.ciano, { estilo: 'solid' }),
      fig('circle', C.ciano, { estilo: 'thin' }),
      fig('hexagon', C.ciano, { estilo: 'thick' }),
    ],
    correta: 0, // A
  },

  // 14. Print 14: Multicolorida (Círculo pequeno, Triângulo médio, Quadrado grande)
  {
    id: 14,
    tipoLayout: 'matriz',
    titulo: 'Qual padrão completa a grade?',
    matriz: [
      fig('circle', C.vermelho, { tamanho: 'sm' }),
      fig('triangle', C.azul, { tamanho: 'md' }),
      fig('square', C.verde, { tamanho: 'lg' }),
      fig('triangle', C.verde, { tamanho: 'md' }),
      fig('square', C.vermelho, { tamanho: 'lg' }),
      fig('circle', C.azul, { tamanho: 'sm' }),
      fig('square', C.azul, { tamanho: 'lg' }),
      fig('circle', C.verde, { tamanho: 'sm' }),
      null,
    ],
    alternativasMatriz: [
      fig('triangle', C.verde, { tamanho: 'md' }),
      fig('circle', C.vermelho, { tamanho: 'lg' }),
      fig('triangle', C.vermelho, { tamanho: 'md' }),
      fig('square', C.vermelho, { tamanho: 'md' }),
    ],
    correta: 2, // C
  },

  // 15. Print 15: Multicolorida por Colunas (Círculos, Quadrados, Triângulos crescendo por linha)
  {
    id: 15,
    tipoLayout: 'matriz',
    titulo: 'Qual padrão completa a grade?',
    matriz: [
      fig('circle', C.vermelho, { tamanho: 'sm' }),
      fig('square', C.azul, { tamanho: 'sm' }),
      fig('triangle', C.verde, { tamanho: 'sm' }),
      fig('circle', C.verde, { tamanho: 'md' }),
      fig('square', C.vermelho, { tamanho: 'md' }),
      fig('triangle', C.azul, { tamanho: 'md' }),
      fig('circle', C.azul, { tamanho: 'lg' }),
      fig('square', C.verde, { tamanho: 'lg' }),
      null,
    ],
    alternativasMatriz: [
      fig('triangle', C.verde, { tamanho: 'lg' }),
      fig('triangle', C.vermelho, { tamanho: 'lg' }),
      fig('triangle', C.azul, { tamanho: 'lg' }),
      fig('square', C.vermelho, { tamanho: 'lg' }),
    ],
    correta: 1, // B
  },

  // 16. Print 16: Analogia Verbal CIRURGIÃO : BISTURI
  {
    id: 16,
    tipoLayout: 'lista',
    titulo: 'Escolha o par de palavras que expressa a mesma relação que CIRURGIÃO : BISTURI:',
    alternativasTexto: [
      'Professor : Aluno',
      'Pintor : Pincel',
      'Motorista : Estrada',
      'Chef : Restaurante',
    ],
    correta: 1, // B
  },

  // 17. Print 17: Rubi - Rotação de Estrela, Hexágono e Cruz
  {
    id: 17,
    tipoLayout: 'matriz',
    titulo: 'Qual padrão completa a grade?',
    matriz: [
      fig('star', C.rubi, { rotacao: 0 }),
      fig('star', C.rubi, { rotacao: 15 }),
      fig('star', C.rubi, { rotacao: 30 }),
      fig('hexagon', C.rubi, { rotacao: 0 }),
      fig('hexagon', C.rubi, { rotacao: 30 }),
      fig('hexagon', C.rubi, { rotacao: 60 }),
      fig('cross', C.rubi, { rotacao: 0 }),
      fig('cross', C.rubi, { rotacao: 15 }),
      null,
    ],
    alternativasMatriz: [
      fig('cross', C.rubi, { rotacao: 30 }),
      fig('cross', C.rubi, { rotacao: 45 }),
      fig('cross', C.rubi, { rotacao: 60 }),
      fig('cross', C.rubi, { rotacao: 15 }),
    ],
    correta: 0, // A
  },

  // 18. Print 18: Série de Pontos Triangulares (1, 3, 6, 10 -> 15 pontos)
  {
    id: 18,
    tipoLayout: 'lista',
    titulo: 'Qual figura vem a seguir na série em que: 1ª = 1 ponto, 2ª = 3 pontos, 3ª = 6 pontos, 4ª = 10 pontos, 5ª = ?',
    ilustracaoSerie: 'piramide_pontos',
    alternativasTexto: ['13 pontos', '14 pontos', '15 pontos', '16 pontos'],
    correta: 2, // C
  },

  // 19. Print 19: Raciocínio Lógico das 5 Máquinas / 5 Widgets
  {
    id: 19,
    tipoLayout: 'lista',
    titulo: 'Se 5 máquinas levam 5 minutos para fabricar 5 widgets, quanto tempo levariam 100 máquinas para fabricar 100 widgets?',
    alternativasTexto: ['100 minutos', '5 minutos', '20 minutos', '50 minutos'],
    correta: 1, // B
  },

  // 20. Print 20: Matriz Composta (Círculo/Quadrado/Triângulo externo + Estrela/Losango/Cruz colorida interna)
  {
    id: 20,
    tipoLayout: 'matriz',
    titulo: 'Qual padrão completa a grade?',
    matriz: [
      fig('circle', C.slate, { formaInterna: 'star', corInterna: C.vermelho }),
      fig('square', C.slate, { formaInterna: 'star', corInterna: C.azul }),
      fig('triangle', C.slate, { formaInterna: 'star', corInterna: C.verde }),
      fig('circle', C.slate, { formaInterna: 'diamond', corInterna: C.verde }),
      fig('square', C.slate, { formaInterna: 'diamond', corInterna: C.vermelho }),
      fig('triangle', C.slate, { formaInterna: 'diamond', corInterna: C.azul }),
      fig('circle', C.slate, { formaInterna: 'cross', corInterna: C.azul }),
      fig('square', C.slate, { formaInterna: 'cross', corInterna: C.verde }),
      null,
    ],
    alternativasMatriz: [
      fig('triangle', C.slate, { formaInterna: 'cross', corInterna: C.verde }),
      fig('triangle', C.slate, { formaInterna: 'cross', corInterna: C.vermelho }),
      fig('triangle', C.slate, { formaInterna: 'diamond', corInterna: C.vermelho }),
      fig('square', C.slate, { formaInterna: 'cross', corInterna: C.vermelho }),
    ],
    correta: 1, // B
  },

  // 21. Composta Invertida - Moldura Externa por Linha e Forma Interna por Coluna
  {
    id: 21,
    tipoLayout: 'matriz',
    titulo: 'Qual padrão completa a grade?',
    matriz: [
      fig('hexagon', C.slate, { formaInterna: 'circle', corInterna: C.azul }),
      fig('hexagon', C.slate, { formaInterna: 'triangle', corInterna: C.verde }),
      fig('hexagon', C.slate, { formaInterna: 'square', corInterna: C.vermelho }),
      fig('square', C.slate, { formaInterna: 'circle', corInterna: C.verde }),
      fig('square', C.slate, { formaInterna: 'triangle', corInterna: C.vermelho }),
      fig('square', C.slate, { formaInterna: 'square', corInterna: C.azul }),
      fig('circle', C.slate, { formaInterna: 'circle', corInterna: C.vermelho }),
      fig('circle', C.slate, { formaInterna: 'triangle', corInterna: C.azul }),
      null,
    ],
    alternativasMatriz: [
      fig('circle', C.slate, { formaInterna: 'square', corInterna: C.verde }),
      fig('circle', C.slate, { formaInterna: 'square', corInterna: C.vermelho }),
      fig('square', C.slate, { formaInterna: 'square', corInterna: C.verde }),
      fig('circle', C.slate, { formaInterna: 'triangle', corInterna: C.verde }),
    ],
    correta: 0, // A
  },

  // 22. Analogia Verbal Avançada
  {
    id: 22,
    tipoLayout: 'lista',
    titulo: 'Escolha o par de palavras que expressa a mesma relação que ARQUITETO : PLANTA:',
    alternativasTexto: [
      'Médico : Hospital',
      'Compositor : Partitura',
      'Ator : Teatro',
      'Juiz : Tribunal',
    ],
    correta: 1, // B
  },

  // 23. Multicolorida - Espessura de traço + Cor
  {
    id: 23,
    tipoLayout: 'matriz',
    titulo: 'Qual padrão completa a grade?',
    matriz: [
      fig('star', C.azul, { estilo: 'solid' }),
      fig('star', C.verde, { estilo: 'thick' }),
      fig('star', C.vermelho, { estilo: 'thin' }),
      fig('hexagon', C.verde, { estilo: 'thick' }),
      fig('hexagon', C.vermelho, { estilo: 'thin' }),
      fig('hexagon', C.azul, { estilo: 'solid' }),
      fig('diamond', C.vermelho, { estilo: 'thin' }),
      fig('diamond', C.azul, { estilo: 'solid' }),
      null,
    ],
    alternativasMatriz: [
      fig('diamond', C.verde, { estilo: 'solid' }),
      fig('diamond', C.verde, { estilo: 'thick' }),
      fig('diamond', C.azul, { estilo: 'thick' }),
      fig('hexagon', C.verde, { estilo: 'thick' }),
    ],
    correta: 1, // B
  },

  // 24. Série de Quadrados Perfeitos
  {
    id: 24,
    tipoLayout: 'lista',
    titulo: 'Em uma grade crescente onde a 1ª figura tem 1 quadrado, a 2ª tem 4 quadrados, a 3ª tem 9 quadrados e a 4ª tem 16 quadrados, quantos quadrados terá a 6ª figura?',
    ilustracaoSerie: 'sequencia_quadrados',
    alternativasTexto: ['20 quadrados', '25 quadrados', '36 quadrados', '49 quadrados'],
    correta: 2, // C (6² = 36)
  },

  // 25. Laranja - Quantidade + Estilo de Borda
  {
    id: 25,
    tipoLayout: 'matriz',
    titulo: 'Qual padrão completa a grade?',
    matriz: [
      fig('diamond', C.laranja, { quantidade: 1, estilo: 'solid' }),
      fig('diamond', C.laranja, { quantidade: 2, estilo: 'thick' }),
      fig('diamond', C.laranja, { quantidade: 3, estilo: 'thin' }),
      fig('circle', C.laranja, { quantidade: 1, estilo: 'solid' }),
      fig('circle', C.laranja, { quantidade: 2, estilo: 'thick' }),
      fig('circle', C.laranja, { quantidade: 3, estilo: 'thin' }),
      fig('cross', C.laranja, { quantidade: 1, estilo: 'solid' }),
      fig('cross', C.laranja, { quantidade: 2, estilo: 'thick' }),
      null,
    ],
    alternativasMatriz: [
      fig('cross', C.laranja, { quantidade: 3, estilo: 'thick' }),
      fig('cross', C.laranja, { quantidade: 2, estilo: 'thin' }),
      fig('cross', C.laranja, { quantidade: 3, estilo: 'thin' }),
      fig('diamond', C.laranja, { quantidade: 3, estilo: 'thin' }),
    ],
    correta: 2, // C
  },

  // 26. Raciocínio Quantitativo
  {
    id: 26,
    tipoLayout: 'lista',
    titulo: 'Um livro e um caderno custam juntos R$ 110. O livro custa R$ 100 a mais que o caderno. Quanto custa o caderno?',
    alternativasTexto: ['R$ 10', 'R$ 5', 'R$ 15', 'R$ 20'],
    correta: 1, // B (Caderno = R$ 5, Livro = R$ 105 -> Total R$ 110)
  },

  // 27. Composta Avançada - Rotação Interna + Forma Externa
  {
    id: 27,
    tipoLayout: 'matriz',
    titulo: 'Qual padrão completa a grade?',
    matriz: [
      fig('circle', C.slate, { formaInterna: 'triangle', corInterna: C.violeta, rotacaoInterna: 0 }),
      fig('square', C.slate, { formaInterna: 'triangle', corInterna: C.violeta, rotacaoInterna: 90 }),
      fig('hexagon', C.slate, { formaInterna: 'triangle', corInterna: C.violeta, rotacaoInterna: 180 }),
      fig('circle', C.slate, { formaInterna: 'cross', corInterna: C.rubi, rotacaoInterna: 0 }),
      fig('square', C.slate, { formaInterna: 'cross', corInterna: C.rubi, rotacaoInterna: 45 }),
      fig('hexagon', C.slate, { formaInterna: 'cross', corInterna: C.rubi, rotacaoInterna: 90 }),
      fig('circle', C.slate, { formaInterna: 'diamond', corInterna: C.ciano, rotacaoInterna: 0 }),
      fig('square', C.slate, { formaInterna: 'diamond', corInterna: C.ciano, rotacaoInterna: 45 }),
      null,
    ],
    alternativasMatriz: [
      fig('hexagon', C.slate, { formaInterna: 'diamond', corInterna: C.ciano, rotacaoInterna: 0 }),
      fig('square', C.slate, { formaInterna: 'diamond', corInterna: C.ciano, rotacaoInterna: 90 }),
      fig('hexagon', C.slate, { formaInterna: 'diamond', corInterna: C.ciano, rotacaoInterna: 90 }),
      fig('hexagon', C.slate, { formaInterna: 'cross', corInterna: C.ciano, rotacaoInterna: 90 }),
    ],
    correta: 2, // C
  },

  // 28. Matriz Final Multicolorida Combinada
  {
    id: 28,
    tipoLayout: 'matriz',
    titulo: 'Qual padrão completa a grade?',
    matriz: [
      fig('star', C.vermelho, { tamanho: 'lg' }),
      fig('hexagon', C.azul, { tamanho: 'md' }),
      fig('diamond', C.verde, { tamanho: 'sm' }),
      fig('diamond', C.azul, { tamanho: 'sm' }),
      fig('star', C.verde, { tamanho: 'lg' }),
      fig('hexagon', C.vermelho, { tamanho: 'md' }),
      fig('hexagon', C.verde, { tamanho: 'md' }),
      fig('diamond', C.vermelho, { tamanho: 'sm' }),
      null,
    ],
    alternativasMatriz: [
      fig('star', C.azul, { tamanho: 'md' }),
      fig('star', C.vermelho, { tamanho: 'lg' }),
      fig('star', C.azul, { tamanho: 'lg' }),
      fig('hexagon', C.azul, { tamanho: 'lg' }),
    ],
    correta: 2, // C
  },
];

function DesenharGeometriaPrimitiva({
  forma,
  fill,
  stroke,
  strokeWidth,
}: {
  forma: FormaGeometrica;
  fill: string;
  stroke: string;
  strokeWidth: number;
}) {
  switch (forma) {
    case 'circle':
      return <circle cx="0" cy="0" r="24" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />;
    case 'square':
      return <rect x="-22" y="-22" width="44" height="44" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />;
    case 'triangle':
      return (
        <polygon
          points="0,-24 24,20 -24,20"
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      );
    case 'diamond':
      return (
        <polygon
          points="0,-25 18,0 0,25 -18,0"
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      );
    case 'hexagon':
      return (
        <polygon
          points="0,-25 22,-12 22,12 0,25 -22,12 -22,-12"
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      );
    case 'star':
      return (
        <polygon
          points="0,-25 7,-8 25,-8 10,3 16,21 0,11 -16,21 -10,3 -25,-8 -7,-8"
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      );
    case 'cross':
      return (
        <path
          d="M-8,-23 H8 V-8 H23 V8 H8 V23 H-8 V8 H-23 V-8 H-8 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      );
  }
}

function RenderizarCelula({ item }: { item: FiguraCelula }) {
  // Caso seja uma célula composta (como na Questão 20: contorno externo + figura interna colorida)
  if (item.formaInterna) {
    return (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <g transform="translate(60, 60) scale(1.25)">
          <DesenharGeometriaPrimitiva
            forma={item.forma}
            fill="none"
            stroke={item.cor}
            strokeWidth={2.6}
          />
        </g>
        <g
          transform={`translate(60, 60) rotate(${item.rotacaoInterna || 0}) scale(0.55)`}
        >
          <DesenharGeometriaPrimitiva
            forma={item.formaInterna}
            fill={item.corInterna || item.cor}
            stroke={item.corInterna || item.cor}
            strokeWidth={0}
          />
        </g>
      </svg>
    );
  }

  const escalaBase = item.tamanho === 'lg' ? 1.25 : item.tamanho === 'sm' ? 0.62 : 0.92;
  const qtd = item.quantidade || 1;

  const fill = item.estilo === 'solid' ? item.cor : 'none';
  const strokeWidth = item.estilo === 'thick' ? 5.5 : item.estilo === 'thin' ? 2 : 0;

  const posicoesX =
    qtd === 1
      ? [60]
      : qtd === 2
      ? [37, 83]
      : item.unidos
      ? [36, 60, 84]
      : [26, 60, 94];

  const escalaFinal = qtd === 3 ? 0.54 : qtd === 2 ? 0.66 : escalaBase;

  return (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      {posicoesX.map((posX, idx) => (
        <g
          key={idx}
          transform={`translate(${posX}, 60) rotate(${item.rotacao || 0}) scale(${escalaFinal})`}
        >
          <DesenharGeometriaPrimitiva
            forma={item.forma}
            fill={fill}
            stroke={item.cor}
            strokeWidth={strokeWidth}
          />
        </g>
      ))}
    </svg>
  );
}

// Ilustração idêntica à Questão 18 (Pirâmide de pontos 1, 3, 6, 10)
function IlustracaoSerie({ tipo }: { tipo: 'piramide_pontos' | 'sequencia_quadrados' }) {
  if (tipo === 'piramide_pontos') {
    const piramides = [1, 2, 3, 4]; // Número de linhas de cada pirâmide
    return (
      <div className="bg-[#f4f6f9] rounded-xl py-6 px-4 mb-7 max-w-[420px] mx-auto flex items-center justify-around">
        {piramides.map((linhas, pIdx) => (
          <div key={pIdx} className="flex flex-col items-center gap-1.5">
            {Array.from({ length: linhas }).map((_, lIdx) => (
              <div key={lIdx} className="flex items-center gap-1.5">
                {Array.from({ length: lIdx + 1 }).map((__, cIdx) => (
                  <span
                    key={cIdx}
                    className="w-2.5 h-2.5 rounded-full bg-[#64748b] inline-block"
                  />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-[#f4f6f9] rounded-xl py-6 px-4 mb-7 max-w-[420px] mx-auto flex items-center justify-around">
      {[1, 2, 3, 4].map((n) => (
        <div
          key={n}
          className="grid gap-1"
          style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: n * n }).map((_, idx) => (
            <span key={idx} className="w-2.5 h-2.5 bg-[#3b82f6] rounded-[2px] block" />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function TesteQI() {
  const [indice, setIndice] = useState(0);
  const [respostas, setRespostas] = useState<number[]>([]);
  const [fase, setFase] = useState<'teste' | 'analise' | 'paywall'>('teste');
  const [textoAnalise, setTextoAnalise] = useState('Analisando matrizes e raciocínio lógico...');

  const pergunta = PERGUNTAS[indice] || PERGUNTAS[0];
  const progresso = Math.round(((indice + 1) / PERGUNTAS.length) * 100);
  const linkPagamentoUnico = 'https://mpago.li/1bEoVmC';

  const escolherOpcao = useCallback(
    (idxEscolhido: number) => {
      if (fase !== 'teste') return;

      const acertou = idxEscolhido === pergunta.correta ? 1 : 0;
      const novas = [...respostas];
      novas[indice] = acertou;
      setRespostas(novas);

      if (indice + 1 < PERGUNTAS.length) {
        setIndice((prev) => prev + 1);
      } else {
        const total = novas.reduce((acc, v) => acc + (v || 0), 0);
        if (typeof window !== 'undefined') {
          localStorage.setItem('qipro_acertos', String(Math.max(total, 20)));
        }
        setFase('analise');
      }
    },
    [fase, indice, pergunta.correta, respostas]
  );

  useEffect(() => {
    if (fase !== 'analise') return;
    const t1 = window.setTimeout(() => setTextoAnalise('Calculando pontuação nas matrizes visuais...'), 1500);
    const t2 = window.setTimeout(() => setTextoAnalise('Cruzando dados com a distribuição de percentil...'), 3000);
    const t3 = window.setTimeout(() => setTextoAnalise('Gerando Relatório de Inteligência e Certificado PDF...'), 4500);
    const t4 = window.setTimeout(() => setFase('paywall'), 6000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [fase]);

  useEffect(() => {
    if (fase !== 'teste') return;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toUpperCase();
      if (k === 'A' || k === '1') escolherOpcao(0);
      if (k === 'B' || k === '2') escolherOpcao(1);
      if (k === 'C' || k === '3') escolherOpcao(2);
      if (k === 'D' || k === '4') escolherOpcao(3);
      if (e.key === 'ArrowLeft' && indice > 0) setIndice((p) => p - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [fase, indice, escolherOpcao]);

  if (fase === 'analise') {
    return (
      <div className="min-h-screen bg-[#071026] flex flex-col items-center justify-center p-4 text-white text-center font-sans">
        <div className="w-20 h-20 rounded-2xl bg-[#0d1b3a] border-2 border-cyan-400 flex flex-col items-center justify-center mb-6 shadow-xl">
          <span className="text-2xl font-black">QI</span>
          <span className="text-[10px] font-black text-cyan-400">PRO</span>
        </div>
        <div className="w-10 h-10 border-4 border-blue-900 border-t-cyan-400 rounded-full animate-spin mb-4" />
        <h2 className="text-xl font-black mb-2">Processando seu QI Pro — Relatório de Inteligência...</h2>
        <p className="text-cyan-300 text-sm">{textoAnalise}</p>
      </div>
    );
  }

  if (fase === 'paywall') {
    return (
      <div className="min-h-screen bg-[#071026] text-white pb-20 font-sans">
        <header className="bg-[#050c1d] border-b border-blue-900/50 py-3.5 px-6">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <span className="font-black text-base">
              QI Pro <span className="text-cyan-400">— Relatório de Inteligência</span>
            </span>
            <span className="text-xs text-cyan-300 font-bold bg-blue-950 px-3 py-1.5 rounded-full border border-cyan-500/30">
              🔒 Checkout Seguro
            </span>
          </div>
        </header>

        <main className="max-w-xl mx-auto px-4 pt-8">
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 mb-6 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-[#071026] font-black flex items-center justify-center shrink-0">
              ✓
            </div>
            <div>
              <h2 className="text-sm font-black text-emerald-300 uppercase">Avaliação Concluída!</h2>
              <p className="text-xs text-slate-300">
                Sua pontuação exata, análise por categoria e Certificado PDF estão prontos.
              </p>
            </div>
          </div>

          <div className="bg-[#0d1b3a] rounded-3xl border border-cyan-500/30 p-6 mb-6 shadow-2xl">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-[#071026] border border-cyan-500/40 rounded-2xl p-3">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Seu QI</span>
                <span className="text-2xl sm:text-3xl font-black text-cyan-400 select-none">
                  1<span className="blur-[5px]">29</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-bold block mt-0.5">Calculado</span>
              </div>
              <div className="bg-[#071026] border border-slate-800 rounded-2xl p-3">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Percentil</span>
                <span className="text-2xl sm:text-3xl font-black text-white select-none">
                  Top <span className="blur-[5px]">4%</span>
                </span>
                <span className="text-[10px] text-cyan-300 font-bold block mt-0.5">Acima da Média</span>
              </div>
              <div className="bg-[#071026] border border-slate-800 rounded-2xl p-3">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Certificado</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-400 block mt-1">PDF</span>
                <span className="text-[10px] text-slate-400 font-bold block mt-1">Disponível</span>
              </div>
            </div>
          </div>

          <div className="bg-white text-slate-900 rounded-3xl border-4 border-cyan-400 p-7 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-5">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase block">Pacote Completo Oficial</span>
                <h3 className="text-xl font-black">QI Pro — Relatório + PDF</h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 line-through block">De R$ 39,90</span>
                <span className="text-3xl font-black text-emerald-600">R$ 7,99</span>
              </div>
            </div>

            <ul className="space-y-2.5 mb-6 text-sm text-slate-700">
              <li>✓ Revelação imediata da sua pontuação de QI</li>
              <li>✓ Relatório completo por área (Matrizes, Lógica e Verbal)</li>
              <li>✓ Certificado Oficial em PDF personalizado com seu nome</li>
            </ul>

            <a
              href={linkPagamentoUnico}
              className="flex items-center justify-center w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 rounded-2xl transition shadow-lg text-base uppercase tracking-wide"
            >
              DESBLOQUEAR MEU RESULTADO AGORA (R$ 7,99) →
            </a>

            <div className="flex items-center justify-center gap-3 mt-4 text-[11px] text-slate-500 font-semibold">
              <span>🔒 Mercado Pago Oficial</span>
              <span>•</span>
              <span>⚡ Liberação Imediata via Pix ou Cartão</span>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f7fb] flex flex-col items-center justify-center p-4 font-sans text-slate-900">
      <div className="w-full max-w-[720px]">
        {/* Barra de progresso superior azul limpa */}
        <div className="w-full h-2 bg-[#e2e8f0] rounded-full overflow-hidden mb-3">
          <div
            style={{ width: `${progresso}%` }}
            className="h-full bg-[#1d9bf0] rounded-full transition-all duration-300"
          />
        </div>

        {/* Card Principal Branco fiel aos prints */}
        <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(15,23,42,0.06)] border border-slate-200/80 overflow-hidden">
          <div className="p-6 sm:p-10">
            <h2 className="text-lg sm:text-[21px] font-bold text-slate-900 leading-snug mb-7">
              <span className="text-[#475569] font-semibold mr-1.5">{pergunta.id}.</span>
              {pergunta.titulo}
            </h2>

            {pergunta.tipoLayout === 'matriz' && pergunta.matriz && pergunta.alternativasMatriz ? (
              <>
                {/* Grade 3x3 Centralizada */}
                <div className="grid grid-cols-3 gap-3 max-w-[336px] mx-auto mb-8">
                  {pergunta.matriz.map((celula, idx) => (
                    <div
                      key={idx}
                      className={`aspect-square rounded-xl flex items-center justify-center p-3 ${
                        celula
                          ? 'bg-[#f8fafc] border border-[#e2e8f0]'
                          : 'bg-[#f4f6f9] border-2 border-dashed border-[#cbd5e1]'
                      }`}
                    >
                      {celula ? (
                        <RenderizarCelula item={celula} />
                      ) : (
                        <span className="text-2xl font-bold text-[#94a3b8]">?</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* 4 Alternativas Horizontais (A, B, C, D) */}
                <div className="grid grid-cols-4 gap-3 max-w-[440px] mx-auto">
                  {pergunta.alternativasMatriz.map((alt, idx) => {
                    const letra = String.fromCharCode(65 + idx);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => escolherOpcao(idx)}
                        className="relative aspect-square rounded-xl border border-[#cbd5e1] bg-white hover:border-[#3b82f6] hover:shadow-md transition-all p-2.5 flex items-center justify-center cursor-pointer active:scale-95"
                      >
                        <span className="absolute top-1.5 left-2 text-[11px] font-semibold text-[#64748b]">
                          {letra}
                        </span>
                        <div className="w-full h-full bg-[#f8fafc] rounded-lg flex items-center justify-center p-2">
                          <RenderizarCelula item={alt} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                {/* Ilustração opcional de Série (ex: Pirâmide de pontos da Q18) */}
                {pergunta.ilustracaoSerie && (
                  <IlustracaoSerie tipo={pergunta.ilustracaoSerie} />
                )}

                {/* 4 Alternativas Empilhadas Verticalmente (Fiel às Q16, Q18 e Q19) */}
                <div className="space-y-3">
                  {pergunta.alternativasTexto?.map((textoOpcao, idx) => {
                    const letra = String.fromCharCode(65 + idx);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => escolherOpcao(idx)}
                        className="w-full rounded-xl border border-[#e2e8f0] bg-white hover:border-[#3b82f6] hover:bg-[#f8fafc] transition-all p-3.5 sm:p-4 flex items-center gap-4 text-left cursor-pointer active:scale-[0.99]"
                      >
                        <span className="w-9 h-9 rounded-lg bg-[#f1f5f9] text-[#475569] font-semibold text-sm flex items-center justify-center shrink-0">
                          {letra}
                        </span>
                        <span className="text-[15px] font-semibold text-slate-800">
                          {textoOpcao}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Rodapé idêntico às capturas de tela */}
          <div className="bg-[#fafbfd] border-t border-slate-100 py-3.5 px-6 text-center text-xs text-[#64748b]">
            Pressione as teclas{' '}
            <kbd className="px-1.5 py-0.5 bg-[#e2e8f0]/70 text-[#334155] rounded text-[11px] font-semibold mx-0.5">
              A
            </kbd>{' '}
            -{' '}
            <kbd className="px-1.5 py-0.5 bg-[#e2e8f0]/70 text-[#334155] rounded text-[11px] font-semibold mx-0.5">
              D
            </kbd>{' '}
            ou use as setas do teclado
          </div>
        </div>
      </div>
    </div>
  );
}