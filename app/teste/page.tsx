'use client';

import { useState, useEffect, useCallback } from 'react';

type TipoForma = 'circle' | 'square' | 'triangle' | 'diamond' | 'star' | 'cross' | 'arrow' | 'ring';
type Tamanho = 'lg' | 'md' | 'sm';
type Posicao = 'center' | 'tl' | 'tr' | 'bl' | 'br';

interface Celula {
  forma: TipoForma;
  cor: string;
  tamanho?: Tamanho;
  quantidade?: number;
  preenchida?: boolean;
  rotacao?: number;
  posicao?: Posicao;
  pontoInterno?: boolean;
  unidos?: boolean;
}

interface Pergunta {
  id: number;
  titulo: string;
  matriz: (Celula | null)[];
  alternativas: Celula[];
  correta: number;
}

const CORES = {
  azul: '#3b82f6',
  laranja: '#f97316',
  verde: '#10b981',
  roxo: '#8b5cf6',
  rosa: '#ec4899',
  ciano: '#0891b2',
  vermelho: '#ef4444',
  indigo: '#6366f1',
};

// Banco de 28 questões com regras visuais claras no padrão MyIQTested
function gerarBancoQuestoes(): Pergunta[] {
  const f = (
    forma: TipoForma,
    cor: string,
    opcoes: Partial<Celula> = {}
  ): Celula => ({
    forma,
    cor,
    tamanho: 'md',
    quantidade: 1,
    preenchida: true,
    rotacao: 0,
    posicao: 'center',
    pontoInterno: false,
    unidos: false,
    ...opcoes,
  });

  return [
    // QUESTÃO 1: Idêntica ao print 1 (Azul - Tamanho Grande -> Médio -> Pequeno)
    {
      id: 1,
      titulo: 'Qual padrão completa a grade?',
      matriz: [
        f('circle', CORES.azul, { tamanho: 'lg' }),
        f('circle', CORES.azul, { tamanho: 'md' }),
        f('circle', CORES.azul, { tamanho: 'sm' }),
        f('square', CORES.azul, { tamanho: 'lg' }),
        f('square', CORES.azul, { tamanho: 'md' }),
        f('square', CORES.azul, { tamanho: 'sm' }),
        f('triangle', CORES.azul, { tamanho: 'lg' }),
        f('triangle', CORES.azul, { tamanho: 'md' }),
        null,
      ],
      alternativas: [
        f('triangle', CORES.azul, { tamanho: 'lg' }),
        f('circle', CORES.azul, { tamanho: 'sm' }),
        f('triangle', CORES.azul, { tamanho: 'sm' }),
        f('square', CORES.azul, { tamanho: 'sm' }),
      ],
      correta: 2, // C
    },

    // QUESTÃO 2: Idêntica ao print 2 (Laranja - Quantidade 1 -> 2 -> 3)
    {
      id: 2,
      titulo: 'Qual padrão completa a grade?',
      matriz: [
        f('circle', CORES.laranja, { quantidade: 1 }),
        f('circle', CORES.laranja, { quantidade: 2 }),
        f('circle', CORES.laranja, { quantidade: 3, unidos: true }),
        f('square', CORES.laranja, { quantidade: 1 }),
        f('square', CORES.laranja, { quantidade: 2 }),
        f('square', CORES.laranja, { quantidade: 3, unidos: true }),
        f('triangle', CORES.laranja, { quantidade: 1 }),
        f('triangle', CORES.laranja, { quantidade: 2 }),
        null,
      ],
      alternativas: [
        f('triangle', CORES.laranja, { quantidade: 2 }),
        f('circle', CORES.laranja, { quantidade: 3, unidos: true }),
        f('square', CORES.laranja, { quantidade: 3, unidos: true }),
        f('triangle', CORES.laranja, { quantidade: 3 }),
      ],
      correta: 3, // D
    },

    // QUESTÃO 3: Verde - Preenchido -> Contorno -> Com ponto central
    {
      id: 3,
      titulo: 'Qual padrão completa a grade?',
      matriz: [
        f('circle', CORES.verde, { preenchida: true }),
        f('circle', CORES.verde, { preenchida: false }),
        f('circle', CORES.verde, { preenchida: false, pontoInterno: true }),
        f('square', CORES.verde, { preenchida: true }),
        f('square', CORES.verde, { preenchida: false }),
        f('square', CORES.verde, { preenchida: false, pontoInterno: true }),
        f('diamond', CORES.verde, { preenchida: true }),
        f('diamond', CORES.verde, { preenchida: false }),
        null,
      ],
      alternativas: [
        f('diamond', CORES.verde, { preenchida: true }),
        f('diamond', CORES.verde, { preenchida: false, pontoInterno: true }),
        f('square', CORES.verde, { preenchida: false, pontoInterno: true }),
        f('circle', CORES.verde, { preenchida: false }),
      ],
      correta: 1, // B
    },

    // QUESTÃO 4: Roxo - Rotação de Setas (0° -> 90° -> 180°)
    {
      id: 4,
      titulo: 'Qual padrão completa a grade?',
      matriz: [
        f('arrow', CORES.roxo, { rotacao: 0 }),
        f('arrow', CORES.roxo, { rotacao: 90 }),
        f('arrow', CORES.roxo, { rotacao: 180 }),
        f('triangle', CORES.roxo, { rotacao: 0 }),
        f('triangle', CORES.roxo, { rotacao: 90 }),
        f('triangle', CORES.roxo, { rotacao: 180 }),
        f('arrow', CORES.roxo, { rotacao: 90, preenchida: false }),
        f('arrow', CORES.roxo, { rotacao: 180, preenchida: false }),
        null,
      ],
      alternativas: [
        f('arrow', CORES.roxo, { rotacao: 270, preenchida: false }),
        f('arrow', CORES.roxo, { rotacao: 0, preenchida: false }),
        f('arrow', CORES.roxo, { rotacao: 270, preenchida: true }),
        f('triangle', CORES.roxo, { rotacao: 270, preenchida: false }),
      ],
      correta: 0, // A
    },

    // QUESTÃO 5: Rosa - Alternância de Formas (Quadrado Rosa, Losango, Estrela)
    {
      id: 5,
      titulo: 'Qual padrão completa a grade?',
      matriz: [
        f('star', CORES.rosa, { tamanho: 'sm' }),
        f('star', CORES.rosa, { tamanho: 'md' }),
        f('star', CORES.rosa, { tamanho: 'lg' }),
        f('diamond', CORES.rosa, { tamanho: 'sm' }),
        f('diamond', CORES.rosa, { tamanho: 'md' }),
        f('diamond', CORES.rosa, { tamanho: 'lg' }),
        f('cross', CORES.rosa, { tamanho: 'sm' }),
        f('cross', CORES.rosa, { tamanho: 'md' }),
        null,
      ],
      alternativas: [
        f('cross', CORES.rosa, { tamanho: 'sm' }),
        f('star', CORES.rosa, { tamanho: 'lg' }),
        f('cross', CORES.rosa, { tamanho: 'lg' }),
        f('diamond', CORES.rosa, { tamanho: 'lg' }),
      ],
      correta: 2, // C
    },

    // QUESTÃO 6: Ciano - Movimento pelos cantos
    {
      id: 6,
      titulo: 'Qual padrão completa a grade?',
      matriz: [
        f('circle', CORES.ciano, { posicao: 'tl', tamanho: 'sm' }),
        f('circle', CORES.ciano, { posicao: 'tr', tamanho: 'sm' }),
        f('circle', CORES.ciano, { posicao: 'br', tamanho: 'sm' }),
        f('square', CORES.ciano, { posicao: 'tl', tamanho: 'sm' }),
        f('square', CORES.ciano, { posicao: 'tr', tamanho: 'sm' }),
        f('square', CORES.ciano, { posicao: 'br', tamanho: 'sm' }),
        f('triangle', CORES.ciano, { posicao: 'tl', tamanho: 'sm' }),
        f('triangle', CORES.ciano, { posicao: 'tr', tamanho: 'sm' }),
        null,
      ],
      alternativas: [
        f('triangle', CORES.ciano, { posicao: 'bl', tamanho: 'sm' }),
        f('triangle', CORES.ciano, { posicao: 'br', tamanho: 'sm' }),
        f('square', CORES.ciano, { posicao: 'br', tamanho: 'sm' }),
        f('triangle', CORES.ciano, { posicao: 'center', tamanho: 'sm' }),
      ],
      correta: 1, // B
    },
  ].concat(
    // Gera as questões 7 a 28 com progressões únicas e cores alternadas
    Array.from({ length: 22 }, (_, i) => {
      const id = i + 7;
      const listaCores = Object.values(CORES);
      const cor = listaCores[id % listaCores.length];
      const listaFormas: TipoForma[] = ['circle', 'square', 'triangle', 'diamond', 'star', 'cross', 'arrow', 'ring'];
      const f1 = listaFormas[id % listaFormas.length];
      const f2 = listaFormas[(id + 2) % listaFormas.length];
      const f3 = listaFormas[(id + 4) % listaFormas.length];

      const modo = id % 5;

      // Modo 0: Quantidade 3 -> 2 -> 1
      if (modo === 0) {
        const resp = f(f3, cor, { quantidade: 1, preenchida: id % 2 === 0 });
        return {
          id,
          titulo: 'Qual padrão completa a grade?',
          matriz: [
            f(f1, cor, { quantidade: 3, preenchida: id % 2 === 0 }),
            f(f1, cor, { quantidade: 2, preenchida: id % 2 === 0 }),
            f(f1, cor, { quantidade: 1, preenchida: id % 2 === 0 }),
            f(f2, cor, { quantidade: 3, preenchida: id % 2 === 0 }),
            f(f2, cor, { quantidade: 2, preenchida: id % 2 === 0 }),
            f(f2, cor, { quantidade: 1, preenchida: id % 2 === 0 }),
            f(f3, cor, { quantidade: 3, preenchida: id % 2 === 0 }),
            f(f3, cor, { quantidade: 2, preenchida: id % 2 === 0 }),
            null,
          ],
          alternativas: [
            f(f3, cor, { quantidade: 2, preenchida: id % 2 === 0 }),
            resp,
            f(f1, cor, { quantidade: 1, preenchida: id % 2 === 0 }),
            f(f3, cor, { quantidade: 3, preenchida: !(id % 2 === 0) }),
          ],
          correta: 1,
        };
      }

      // Modo 1: Rotação e Ponto Interno
      if (modo === 1) {
        const resp = f(f3, cor, { rotacao: 90, preenchida: false, pontoInterno: true });
        return {
          id,
          titulo: 'Qual padrão completa a grade?',
          matriz: [
            f(f1, cor, { rotacao: 0, preenchida: true }),
            f(f1, cor, { rotacao: 45, preenchida: false }),
            f(f1, cor, { rotacao: 90, preenchida: false, pontoInterno: true }),
            f(f2, cor, { rotacao: 0, preenchida: true }),
            f(f2, cor, { rotacao: 45, preenchida: false }),
            f(f2, cor, { rotacao: 90, preenchida: false, pontoInterno: true }),
            f(f3, cor, { rotacao: 0, preenchida: true }),
            f(f3, cor, { rotacao: 45, preenchida: false }),
            null,
          ],
          alternativas: [
            f(f3, cor, { rotacao: 0, preenchida: true }),
            f(f2, cor, { rotacao: 90, preenchida: false, pontoInterno: true }),
            resp,
            f(f3, cor, { rotacao: 90, preenchida: false, pontoInterno: false }),
          ],
          correta: 2,
        };
      }

      // Modo 2: Quadrado Latino (cada linha tem as 3 formas sem repetir)
      if (modo === 2) {
        const resp = f(f1, cor, { quantidade: 2, preenchida: true });
        return {
          id,
          titulo: 'Qual padrão completa a grade?',
          matriz: [
            f(f1, cor, { quantidade: 2 }),
            f(f2, cor, { quantidade: 2 }),
            f(f3, cor, { quantidade: 2 }),
            f(f2, cor, { quantidade: 2 }),
            f(f3, cor, { quantidade: 2 }),
            f(f1, cor, { quantidade: 2 }),
            f(f3, cor, { quantidade: 2 }),
            f(f2, cor, { quantidade: 2 }),
            null,
          ],
          alternativas: [
            resp,
            f(f2, cor, { quantidade: 2 }),
            f(f3, cor, { quantidade: 2 }),
            f(f1, cor, { quantidade: 1 }),
          ],
          correta: 0,
        };
      }

      // Modo 3: Crescimento com contorno
      if (modo === 3) {
        const resp = f(f3, cor, { tamanho: 'lg', preenchida: false, pontoInterno: true });
        return {
          id,
          titulo: 'Qual padrão completa a grade?',
          matriz: [
            f(f1, cor, { tamanho: 'sm', preenchida: false }),
            f(f1, cor, { tamanho: 'md', preenchida: false }),
            f(f1, cor, { tamanho: 'lg', preenchida: false, pontoInterno: true }),
            f(f2, cor, { tamanho: 'sm', preenchida: false }),
            f(f2, cor, { tamanho: 'md', preenchida: false }),
            f(f2, cor, { tamanho: 'lg', preenchida: false, pontoInterno: true }),
            f(f3, cor, { tamanho: 'sm', preenchida: false }),
            f(f3, cor, { tamanho: 'md', preenchida: false }),
            null,
          ],
          alternativas: [
            f(f3, cor, { tamanho: 'lg', preenchida: true }),
            f(f3, cor, { tamanho: 'sm', preenchida: false, pontoInterno: true }),
            f(f2, cor, { tamanho: 'lg', preenchida: false, pontoInterno: true }),
            resp,
          ],
          correta: 3,
        };
      }

      // Modo 4: Soma visual de elementos (1 + 2 = 3)
      const resp = f(f2, cor, { quantidade: 3, preenchida: false });
      return {
        id,
        titulo: 'Qual padrão completa a grade?',
        matriz: [
          f(f1, cor, { quantidade: 1, preenchida: false }),
          f(f1, cor, { quantidade: 2, preenchida: false }),
          f(f1, cor, { quantidade: 3, preenchida: false }),
          f(f3, cor, { quantidade: 1, preenchida: true }),
          f(f3, cor, { quantidade: 2, preenchida: true }),
          f(f3, cor, { quantidade: 3, preenchida: true }),
          f(f2, cor, { quantidade: 1, preenchida: false }),
          f(f2, cor, { quantidade: 2, preenchida: false }),
          null,
        ],
        alternativas: [
          f(f2, cor, { quantidade: 2, preenchida: false }),
          resp,
          f(f2, cor, { quantidade: 3, preenchida: true }),
          f(f1, cor, { quantidade: 3, preenchida: false }),
        ],
        correta: 1,
      };
    })
  );
}

const PERGUNTAS = gerarBancoQuestoes();

function RenderizarFigura({ celula }: { celula: Celula }) {
  const escala = celula.tamanho === 'lg' ? 1.25 : celula.tamanho === 'sm' ? 0.62 : 0.92;
  const fill = celula.preenchida ? celula.cor : 'none';
  const stroke = celula.cor;
  const strokeWidth = celula.preenchida ? 0 : 7;

  const offsetPosicao: Record<Posicao, [number, number]> = {
    center: [0, 0],
    tl: [-22, -22],
    tr: [22, -22],
    bl: [-22, 22],
    br: [22, 22],
  };

  const [dx, dy] = offsetPosicao[celula.posicao || 'center'];
  const qtd = celula.quantidade || 1;

  const pontosX =
    qtd === 1
      ? [60]
      : qtd === 2
      ? [38, 82]
      : celula.unidos
      ? [36, 60, 84]
      : [28, 60, 92];

  const escalaFinal = qtd === 3 ? 0.55 : qtd === 2 ? 0.68 : escala;

  const desenharGeometria = () => {
    switch (celula.forma) {
      case 'circle':
        return <circle cx="0" cy="0" r="24" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />;
      case 'square':
        return <rect x="-22" y="-22" width="44" height="44" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />;
      case 'triangle':
        return <polygon points="0,-25 25,22 -25,22" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />;
      case 'diamond':
        return <polygon points="0,-26 26,0 0,26 -26,0" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />;
      case 'star':
        return (
          <polygon
            points="0,-26 7,-8