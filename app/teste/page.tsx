'use client';

import { useState, useEffect, useCallback } from 'react';

type Forma = 'circle' | 'square' | 'triangle' | 'diamond' | 'hexagon' | 'cross';

interface Celula {
forma: Forma;
quantidade: number;
rotacao: number;
preenchida: boolean;
}

interface Pergunta {
id: number;
nivel: number;
categoria: string;
titulo: string;
matriz: (Celula | null)\[\];
alternativas: Celula\[\];
respostaCorreta: number;
}

const FORMAS: Forma\[\] = \['circle', 'square', 'triangle', 'diamond', 'hexagon', 'cross'\];

const CATEGORIAS = \[
'Sequências geométricas',
'Rotação espacial',
'Quantidade e preenchimento',
'Transformações matriciais',
'Progressão de formas',
'Raciocínio combinado',
'Matrizes avançadas',
\];

const TITULOS = \[
'Observe a sequência e descubra a regra que conecta as figuras.',
'Analise as transformações e identifique a figura que está faltando.',
'Observe as linhas e colunas. Qual alternativa completa a matriz?',
'Identifique a relação entre as figuras e encontre a continuação correta.',
\];

function criarCelula(familia: number, variante: number, linha: number, coluna: number): Celula {
const deslocamento = variante % 3;
return {
forma: FORMAS\[(linha + coluna + deslocamento + familia) % FORMAS.length\],
quantidade: ((linha + coluna + variante) % 3) + 1,
rotacao: (linha \* 90 + coluna \* 45 + variante \* 15) % 360,
preenchida: (linha + coluna) % 2 === 0,
};
}

function assinatura(c: Celula): string {
if (!c) return '';
return `${c.forma}-${c.quantidade}-${c.rotacao}-${c.preenchida}`;
}

function criarPergunta(id: number): Pergunta {
const familia = Math.floor((id - 1) / 4) % CATEGORIAS.length;
const variante = (id - 1) % 4;
const posicaoAusente = (id \* 3 + 4) % 9;

const matriz: (Celula | null)\[\] = Array.from({ length: 9 }, (\_, posicao) => {
if (posicao === posicaoAusente) return null;
return criarCelula(familia, variante, Math.floor(posicao / 3), posicao % 3);
});

const linhaCorreta = Math.floor(posicaoAusente / 3);
const colunaCorreta = posicaoAusente % 3;
const correta = criarCelula(familia, variante, linhaCorreta, colunaCorreta);

const distratores: Celula\[\] = \[
{ ...correta, forma: FORMAS\[(FORMAS.indexOf(correta.forma) + 1) % FORMAS.length\] },
{ ...correta, quantidade: (correta.quantidade % 3) + 1 },
{ ...correta, rotacao: (correta.rotacao + 90) % 360 },
{ ...correta, preenchida: !correta.preenchida },
\];

const opcoesUnicas = \[correta, ...distratores\].filter(
(item, index, self) => index === self.findIndex((t) => assinatura(t) === assinatura(item))
);

while (opcoesUnicas.length < 4) {
opcoesUnicas.push({
...correta,
rotacao: (correta.rotacao + 45 \* opcoesUnicas.length) % 360,
});
}

const alternativas = opcoesUnicas.slice(0, 4);
const shift = id % 4;
const alternativasEmbaralhadas = \[
...alternativas.slice(shift),
...alternativas.slice(0, shift),
\];

const indiceRealCorreta = alternativasEmbaralhadas.findIndex(
(item) => assinatura(item) === assinatura(correta)
);

return {
id,
nivel: familia + 1,
categoria: CATEGORIAS\[familia\],
titulo: TITULOS\[(id - 1) % TITULOS.length\],
matriz,
alternativas: alternativasEmbaralhadas,
respostaCorreta: indiceRealCorreta >= 0 ? indiceRealCorreta : 0,
};
}

const PERGUNTAS: Pergunta\[\] = Array.from({ length: 28 }, (\_, index) => criarPergunta(index + 1));

const NIVEL_INFO = \[
{ nome: 'Fundamentos', cor: 'text-emerald-600', bg: 'bg-emerald-500' },
{ nome: 'Intermediário', cor: 'text-blue-600', bg: 'bg-blue-500' },
{ nome: 'Avançado', cor: 'text-orange-600', bg: 'bg-orange-500' },
{ nome: 'Desafio', cor: 'text-purple-600', bg: 'bg-purple-500' },
\];

function DesenharForma({ celula, cor = '#0f172a' }: { celula: Celula; cor?: string }) {
if (!celula) return null;
const preenchimento = celula.preenchida ? cor : 'none';

const renderizarSvgForma = (forma: Forma) => {
switch (forma) {
case 'square':
return ;
case 'triangle':
return ;
case 'diamond':
return ;
case 'hexagon':
return ;
case 'cross':
return ;
case 'circle':
default:
return ;
}
};

const qtd = Math.min(Math.max(celula.quantidade || 1, 1), 4);
const posicoes =
qtd === 1
? \[\[60, 45\]\]
: qtd === 2
? \[\[42, 45\], \[78, 45\]\]
: \[\[40, 30\], \[80, 30\], \[60, 60\]\];

return (

{posicoes.map((\[x, y\], index) => (
<g
key={index}
transform={`translate(${x - 60}, ${y - 45}) rotate(${celula.rotacao || 0} 60 45)`}
stroke={cor}
strokeWidth="3"
strokeLinejoin="round"
strokeLinecap="round"
>
{renderizarSvgForma(celula.forma)}

))}

);
}

function PainelMatriz({ pergunta }: { pergunta: Pergunta }) {
return (

{pergunta.matriz.map((celula, index) => (
<div
key={index}
className={`aspect-[1.25] rounded-xl border-2 flex items-center justify-center p-1 ${ celula ? 'bg-white border-slate-200' : 'bg-blue-50 border-dashed border-blue-500' }`}
>
{celula ?  : ?}

))}

);
}

const LogoMini = () => (

export default function TesteQI() {
const \[indicePergunta, setIndicePergunta\] = useState(0);
const \[respostasUsuario, setRespostasUsuario\] = useState<number\[\]>(\[\]);
const \[fase, setFase\] = useState<'teste' | 'analise' | 'paywall'>('teste');
const \[textoAnalise, setTextoAnalise\] = useState('Analisando seus padrões de raciocínio...');

const perguntaAtual = PERGUNTAS\[indicePergunta\] || PERGUNTAS\[0\];
const progresso = Math.round(((indicePergunta + 1) / PERGUNTAS.length) \* 100);
const nivelInfoSeguro = NIVEL_INFO\[Math.min(Math.max((perguntaAtual?.nivel || 1) - 1, 0), NIVEL_INFO.length - 1)\];

const linkPagamentoUnico = 'https://mpago.li/1bEoVmC';

const lidarComResposta = useCallback(
(indiceAlternativa: number) => {
if (fase !== 'teste') return;

```
  const acertou = indiceAlternativa === perguntaAtual.respostaCorreta;
  const novasRespostas = [...respostasUsuario];
  novasRespostas[indicePergunta] = acertou ? 1 : 0;
  setRespostasUsuario(novasRespostas);

  if (indicePergunta + 1 < PERGUNTAS.length) {
    setIndicePergunta((prev) => prev + 1);
    return;
  }

  const totalAcertos = novasRespostas.reduce((total, resposta) => total + (resposta || 0), 0);

  if (typeof window !== 'undefined') {
    localStorage.setItem('qipro_acertos', String(Math.max(totalAcertos, 18)));
  }

  setFase('analise');
},
[fase, perguntaAtual, respostasUsuario, indicePergunta]

```

);

useEffect(() => {
if (fase !== 'analise') return;

```
const t1 = window.setTimeout(() => setTextoAnalise('Mapeando padrões de reconhecimento visual...'), 1500);
const t2 = window.setTimeout(() => setTextoAnalise('Comparando suas respostas e estratégias lógicas...'), 3000);
const t3 = window.setTimeout(() => setTextoAnalise('Preparando seu relatório de desempenho...'), 4500);
const t4 = window.setTimeout(() => setFase('paywall'), 6000);

return () => {
  window.clearTimeout(t1);
  window.clearTimeout(t2);
  window.clearTimeout(t3);
  window.clearTimeout(t4);
};

```

}, \[fase\]);

useEffect(() => {
if (fase !== 'teste') return;

```
const aoPressionarTecla = (e: KeyboardEvent) => {
  const alvo = e.target as HTMLElement | null;
  if (alvo?.tagName === 'INPUT' || alvo?.tagName === 'TEXTAREA' || alvo?.isContentEditable) return;

  const tecla = e.key.toUpperCase();
  const mapa: Record<string, number> = { A: 0, B: 1, C: 2, D: 3, '1': 0, '2': 1, '3': 2, '4': 3 };

  if (mapa[tecla] !== undefined && mapa[tecla] < perguntaAtual.alternativas.length) {
    e.preventDefault();
    lidarComResposta(mapa[tecla]);
  }
};

window.addEventListener('keydown', aoPressionarTecla);
return () => window.removeEventListener('keydown', aoPressionarTecla);

```

}, \[fase, lidarComResposta, perguntaAtual\]);

if (fase === 'analise') {
return (


QI
PRO


Análise do QI Pro em andamento...
{textoAnalise}



{`@keyframes loading { from { width: 0%; } to { width: 100%; } }`}

);
}

if (fase === 'paywall') {
return (







QI Pro — Relatório de Inteligência

✓ 28/28 Desafios Concluídos



🔒 Checkout Seguro



```
    <main className="max-w-xl mx-auto px-4 pt-8">
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 mb-6 flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-emerald-500 text-[#071026] font-black flex items-center justify-center text-lg shrink-0">✓</div>
        <div className="text-left">
          <h2 className="text-sm font-black text-emerald-300 uppercase tracking-wide">Desafios concluídos!</h2>
          <p className="text-xs text-slate-300">Seu desempenho foi registrado com sucesso.</p>
        </div>
      </div>

      <div className="bg-[#0d1b3a] rounded-3xl border border-cyan-500/30 p-6 sm:p-8 mb-6 shadow-2xl">
        <div className="flex items-center gap-3.5 border-b border-slate-800 pb-4 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-[#071026] border-2 border-cyan-400 flex flex-col items-center justify-center shrink-0">
            <span className="text-white font-black text-sm">QI</span>
            <span className="text-[10px] text-cyan-400 font-black">PRO</span>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 block">Relatório de desempenho</span>
            <h3 className="text-lg font-black text-white leading-tight">QI Pro — Relatório de Inteligência</h3>
            <p className="text-xs text-slate-400">28 desafios visuais concluídos</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-[#071026] border border-cyan-500/40 rounded-2xl p-3">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Resultado</span>
            <span className="text-2xl sm:text-3xl font-black text-cyan-400 blur-[5px] select-none">128</span>
            <span className="text-[10px] text-emerald-400 font-bold block">Registrado</span>
          </div>
          <div className="bg-[#071026] border border-slate-800 rounded-2xl p-3">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Desempenho</span>
            <span className="text-2xl sm:text-3xl font-black text-white blur-[5px] select-none">92%</span>
            <span className="text-[10px] text-cyan-300 font-bold block">Analisado</span>
          </div>
          <div className="bg-[#071026] border border-slate-800 rounded-2xl p-3">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Relatório</span>
            <span className="text-xl sm:text-2xl font-black text-emerald-400 block mt-1">PDF</span>
            <span className="text-[10px] text-slate-400 font-bold block mt-1">Disponível</span>
          </div>
        </div>
      </div>

      <div className="bg-white text-slate-900 rounded-3xl border-4 border-cyan-400 p-7 sm:p-8 shadow-2xl relative">
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-[11px] font-black uppercase tracking-wider py-1 px-5 rounded-full shadow-md whitespace-nowrap">
          ⚡ Acesso imediato
        </div>

        <div className="flex items-center justify-between border-b border-slate-200 pb-5 mb-5 mt-2 gap-3">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">Pacote completo</span>
            <h3 className="text-xl font-black text-slate-900">QI Pro — Relatório de Inteligência</h3>
          </div>
          <div className="text-right shrink-0">
            <span className="text-xs text-slate-400 line-through block">De R$ 39,90</span>
            <span className="text-3xl sm:text-4xl font-black text-emerald-600">R$ 7,99</span>
          </div>
        </div>

        <ul className="space-y-3 mb-7 text-sm text-slate-700">
          {['Visualização do resultado dos 28 desafios', 'Relatório detalhado do desempenho', 'Análise das áreas de raciocínio visual', 'Certificado personalizado em PDF', 'Acesso imediato após confirmação do pagamento'].map((item) => (
            <li key={item} className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs shrink-0">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <a
          href={linkPagamentoUnico}
          className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black py-4 sm:py-5 rounded-2xl transition shadow-xl shadow-emerald-600/25 text-base sm:text-lg cursor-pointer uppercase tracking-wide text-center"
        >
          RECEBER MEU RELATÓRIO E PDF (R$ 7,99) →
        </a>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-4 text-[11px] text-slate-500 font-semibold">
          <span>🔒 Mercado Pago</span>
          <span>•</span>
          <span>⚡ Pix ou cartão</span>
        </div>
      </div>
    </main>
  </div>
);

```

}

return (






QI Pro — Relatório de Inteligência

Descubra seu potencial de raciocínio


```
    <div className="text-xs font-extrabold text-cyan-300 bg-blue-950 px-3.5 py-1.5 rounded-full border border-cyan-500/30">
      Questão {indicePergunta + 1} de 28
    </div>
  </header>

  <main className="flex-1 flex flex-col pb-10">
    <div className="px-4 sm:px-8 pt-5 pb-3">
      <div className="max-w-2xl mx-auto w-full">
        <div className="flex justify-between items-center text-xs font-bold text-slate-500 mb-2">
          <span className="text-blue-600">{perguntaAtual.categoria}</span>
          <span>{progresso}% concluído</span>
        </div>
        <div className="h-2.5 w-full rounded-full overflow-hidden bg-slate-200">
          <div style={{ width: `${progresso}%` }} className="h-full rounded-full transition-all duration-300 bg-gradient-to-r from-cyan-500 to-blue-600" />
        </div>
      </div>
    </div>

    <div className="px-4 pt-2 flex-1 flex flex-col">
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-white shadow-md border border-slate-200/90 rounded-2xl overflow-hidden flex flex-col">
          <div className="px-5 pt-6 pb-7 sm:px-9 sm:pt-8 sm:pb-9">
            <div className="flex items-center justify-between mb-5 gap-2">
              <span className={`text-xs font-black uppercase tracking-wide ${nivelInfoSeguro.cor}`}>
                Nível {perguntaAtual.nivel} — {nivelInfoSeguro.nome}
              </span>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-100 rounded-full px-3 py-1">
                DESAFIO {String(perguntaAtual.id).padStart(2, '0')}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
              <span className="text-blue-600 font-black mr-2">{indicePergunta + 1}.</span>
              {perguntaAtual.titulo}
            </h3>

            <p className="text-sm text-slate-500 mb-6">Escolha a figura que completa corretamente a matriz abaixo.</p>

            <div className="w-full bg-[#f8fafc] rounded-2xl border border-slate-200 p-3 sm:p-5 mb-7 shadow-sm">
              <PainelMatriz pergunta={perguntaAtual} />
            </div>

            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 text-center">
                Qual alternativa completa o padrão?
              </p>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {perguntaAtual.alternativas.map((celula, idx) => {
                  const letra = String.fromCharCode(65 + idx);
                  return (
                    <button
                      key={`${perguntaAtual.id}-${idx}`}
                      onClick={() => lidarComResposta(idx)}
                      type="button"
                      aria-label={`Alternativa ${letra}`}
                      className="relative h-28 sm:h-32 rounded-2xl border-2 border-slate-200 bg-white hover:border-blue-600 hover:bg-blue-50 hover:shadow-md transition-all p-3 flex items-center justify-center cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
                    >
                      <span className="absolute top-2 left-3 text-xs font-black text-slate-500 bg-slate-100 px-2 py-0.5 rounded group-hover:text-blue-600">
                        {letra}
                      </span>
                      <div className="w-full h-full flex items-center justify-center p-2">
                        <DesenharForma celula={celula} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="bg-[#F8FAFC] border-t border-slate-100 py-3.5 px-4 text-center text-xs text-slate-500">
            Use as teclas {['A', 'B', 'C', 'D'].map((letra) => (
              <kbd key={letra} className="px-1.5 py-0.5 bg-slate-200 text-slate-700 rounded text-[11px] font-semibold mx-0.5">
                {letra}
              </kbd>
            ))}{' '}
            ou clique na alternativa.
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full flex items-center justify-between px-2 mt-5">
        <a href="/" className="text-xs font-medium text-slate-400 hover:text-slate-700 transition-colors">← Sair do teste</a>
        {indicePergunta > 0 && (
          <button
            type="button"
            onClick={() => setIndicePergunta((prev) => prev - 1)}
            className="text-xs font-medium text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            ← Voltar questão anterior
          </button>
        )}
      </div>
    </div>
  </main>
</div>

```

);
}