'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SucessoPage() {
const \[nomeUsuario, setNomeUsuario\] = useState('Candidato Avaliado');
const \[editando, setEditando\] = useState(true);

// Simulação de cálculo baseado nas 28 respostas
const qiCalculado = 124;
const percentil = '94.5º Percentil (Superior)';

const lidarComImpressao = () => {
window.print();
};

return (

```
  {/* Header (Oculto na Impressão) */}
  <header className="flex h-16 items-center justify-between px-6 sm:px-10 bg-white border-b border-slate-200 print:hidden">
     <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded bg-slate-900 flex items-center justify-center">
          <span className="text-white font-bold text-[10px]">QI</span>
        </div>
        <span className="font-bold text-slate-900 text-base">Teste de QI Oficial</span>
     </div>
     <div className="flex items-center gap-3">
       <button 
         onClick={lidarComImpressao}
         className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-lg transition shadow-xs cursor-pointer"
       >
         🖨️ Guardar em PDF / Imprimir
       </button>
       <Link href="/" className="text-xs font-medium text-slate-500 hover:text-slate-900">Sair</Link>
     </div>
  </header>

  {/* Conteúdo Principal / Documento Oficial */}
  <main className="max-w-3xl mx-auto px-4 pt-10 print:p-0 print:max-w-none">
    
    {/* Aviso Inicial para Nome (Oculto na impressão) */}
    {editando && (
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl mb-8 print:hidden text-center">
        <p className="text-sm font-medium text-amber-900 mb-2">Personalize o seu certificado com o seu nome completo:</p>
        <div className="flex max-w-md mx-auto gap-2">
          <input 
            type="text" 
            value={nomeUsuario} 
            onChange={(e) => setNomeUsuario(e.target.value)}
            placeholder="Digite o seu nome completo"
            className="flex-1 px-3 py-2 border border-amber-300 rounded-lg text-sm bg-white"
          />
          <button 
            onClick={() => setEditando(false)}
            className="bg-amber-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-amber-800 cursor-pointer"
          >
            Aplicar Nome
          </button>
        </div>
      </div>
    )}

    {/* --- CERTIFICADO OFICIAL --- */}
    <div className="bg-white rounded-2xl border-2 border-slate-900 p-8 sm:p-12 shadow-md relative overflow-hidden mb-12 print:border-4 print:shadow-none print:m-0 print:min-h-[95vh] flex flex-col justify-between">
      <div className="absolute top-0 right-0 bg-slate-900 text-white text-[10px] font-mono tracking-widest px-6 py-1.5 rounded-bl-xl uppercase">
        ID de Autenticação: #IQ-2026-BR88
      </div>

      <div className="text-center pt-6">
        <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center mx-auto mb-4 font-black text-lg">
          QI
        </div>
        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Certificado Oficial de Avaliação Psicométrica</h4>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">Relatório de Inteligência Fluida</h1>
      </div>

      <div className="text-center my-10">
        <p className="text-sm text-slate-500 uppercase tracking-wide mb-2">Este documento certifica que</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 border-b-2 border-slate-200 pb-3 inline-block min-w-[300px]">
          {nomeUsuario}
        </h2>
        <p className="text-sm text-slate-600 mt-4 max-w-lg mx-auto leading-relaxed">
          concluiu com êxito o rigoroso teste de 28 matrizes progressivas, demonstrando desempenho cognitivo oficial avaliado em:
        </p>

        <div className="my-6 inline-block bg-slate-50 border border-slate-200 px-8 py-4 rounded-2xl">
          <span className="text-xs uppercase tracking-wider text-slate-500 block mb-1 font-bold">Pontuação de QI Estimada</span>
          <span className="text-5xl font-black text-slate-900">{qiCalculado}</span>
          <span className="text-xs text-emerald-600 block mt-1 font-semibold">{percentil}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 border-t border-slate-200 pt-6 text-xs text-slate-600">
        <div>
          <p className="font-bold text-slate-900">Metodologia Aplicada:</p>
          <p>Escala Padrão de Matrizes Progressivas (Desvio Padrão 15).</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-slate-900">Validação Global:</p>
          <p>Certificado emitido digitalmente no Brasil.</p>
        </div>
      </div>
    </div>

    {/* --- ANÁLISE COGNITIVA DETALHADA --- */}
    <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6 print:hidden">
      <h3 className="text-xl font-bold text-slate-900 mb-4">Análise Detalhada por Domínio</h3>
      
      <div className="space-y-4 text-sm text-slate-700">
        <div>
          <div className="flex justify-between font-semibold mb-1">
            <span>Raciocínio Espacial e Geométrico</span>
            <span className="text-emerald-600">Excelente (96%)</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-slate-900 w-[96%]"></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between font-semibold mb-1">
            <span>Velocidade de Processamento Lógico</span>
            <span className="text-emerald-600">Acima da Média (91%)</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-slate-900 w-[91%]"></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between font-semibold mb-1">
            <span>Reconhecimento de Padrões Complexos</span>
            <span className="text-emerald-600">Avançado (94%)</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-slate-900 w-[94%]"></div>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-slate-100 text-center">
        <button 
          onClick={lidarComImpressao}
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-8 rounded-xl transition shadow-md text-base w-full cursor-pointer"
        >
          🖨️ Descarregar Relatório & Certificado em PDF
        </button>
        <p className="text-xs text-slate-400 mt-3">Dica: Na janela de impressão que abrir, selecione "Guardar como PDF" como destino.</p>
      </div>
    </div>

  </main>
</div>

```

);
}