'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const LogoMini = () => (
  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 p-0.5 flex items-center justify-center shrink-0 shadow-md">
    <div className="w-full h-full bg-[#071026] rounded-[10px] flex flex-col items-center justify-center">
      <span className="text-white font-black text-[9px] leading-none">QI</span>
      <span className="text-[8px] text-cyan-400 font-black leading-none">PRO</span>
    </div>
  </div>
);

export default function SucessoPage() {
  const [nomeCliente, setNomeCliente] = useState('Candidato Avaliado');
  const [editando, setEditando] = useState(true);
  const [acertos, setAcertos] = useState(25);
  const [idCertificado, setIdCertificado] = useState('QIPRO-2026-849201');
  const [dataEmissao, setDataEmissao] = useState('');

  useEffect(() => {
    const salvo = localStorage.getItem('qipro_acertos');
    if (salvo) {
      const num = parseInt(salvo, 10);
      if (!isNaN(num) && num >= 0 && num <= 28) {
        setAcertos(num);
      }
    }
    setIdCertificado(`QIPRO-2026-${Math.floor(100000 + Math.random() * 900000)}`);
    setDataEmissao(new Date().toLocaleDateString('pt-BR'));
  }, []);

  const qiCalculado = Math.round(92 + (acertos / 28) * 48);
  const percentil = qiCalculado >= 130 ? 'Top 2% (98.4%)' : qiCalculado >= 120 ? 'Top 5% (95.1%)' : 'Acima da Média (85.0%)';
  const classificacao = qiCalculado >= 130 ? 'Superdotação / Muito Superior' : 'Inteligência Superior';

  const lidarComImpressao = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-900 pb-20">
      <header className="print:hidden flex h-16 items-center justify-between px-4 sm:px-10 bg-[#071026] text-white border-b border-blue-900/40 sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-3">
          <LogoMini />
          <div>
            <span className="font-black text-white text-sm sm:text-base block leading-tight">
              QI Pro <span className="text-cyan-400">— Relatório de Inteligência</span>
            </span>
            <span className="text-[10px] text-emerald-400 font-semibold block">✓ Acesso Oficial Liberado</span>
          </div>
        </div>

        <button
          onClick={lidarComImpressao}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs sm:text-sm font-black px-5 py-2.5 rounded-xl transition cursor-pointer shadow-lg"
        >
          🖨️ Baixar / Salvar PDF
        </button>
      </header>

      <main className="max-w-3xl mx-auto px-4 pt-8">
        {editando && (
          <div className="print:hidden bg-[#071026] text-white border-2 border-cyan-400 p-6 rounded-2xl mb-8 text-center shadow-xl">
            <span className="text-[11px] font-black uppercase tracking-widest text-cyan-400 block mb-1">Passo Final • Personalização</span>
            <h3 className="text-lg font-black text-white mb-1">Emita seu QI Pro — Relatório de Inteligência com seu Nome</h3>
            <p className="text-xs text-slate-300 mb-4">Digite seu nome completo abaixo para gravá-lo no Certificado Oficial antes de salvar em PDF:</p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-2.5">
              <input
                type="text"
                placeholder="Digite seu nome completo..."
                value={nomeCliente}
                onChange={(e) => setNomeCliente(e.target.value)}
                className="flex-1 bg-white border-2 border-cyan-400 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none"
              />
              <button
                onClick={() => setEditando(false)}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-sm px-6 py-3 rounded-xl transition cursor-pointer"
              >
                Gravar Nome
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-3xl border-4 border-[#071026] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-center border-b-2 border-slate-200 pb-6 mb-8 gap-4 text-center sm:text-left">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#071026] border-2 border-cyan-500 flex flex-col items-center justify-center shrink-0">
                <span className="text-white font-black text-sm">QI</span>
                <span className="text-[10px] text-cyan-400 font-black">PRO</span>
              </div>
              <div>
                <span className="text-[11px] font-black text-blue-600 uppercase tracking-widest block">Certificação Cognitiva Oficial</span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">QI Pro — Relatório de Inteligência</h2>
                <p className="text-xs text-slate-500">Descubra Seu Verdadeiro Potencial</p>
              </div>
            </div>

            <div className="bg-slate-100 px-4 py-2 rounded-xl border border-slate-200 text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Código Verificador</span>
              <span className="text-xs font-black text-slate-800">{idCertificado}</span>
            </div>
          </div>

          <div className="text-center my-8">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Certificamos oficialmente que</p>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 border-b-2 border-blue-600 pb-2 inline-block min-w-[260px] px-4">
              {nomeCliente}
            </h1>
            <p className="text-sm text-slate-600 mt-4 max-w-xl mx-auto leading-relaxed">
              concluiu com êxito as 28 matrizes progressivas do <strong>QI Pro — Relatório de Inteligência</strong>, atingindo os seguintes índices psicométricos:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 my-8 bg-[#071026] text-white p-6 rounded-2xl text-center shadow-lg">
            <div>
              <span className="text-[11px] text-slate-400 uppercase font-bold block mb-1">Pontuação de QI</span>
              <span className="text-4xl sm:text-5xl font-black text-cyan-400">{qiCalculado}</span>
              <span className="block text-[11px] text-emerald-400 font-bold mt-1">{classificacao}</span>
            </div>
            <div className="border-y sm:border-y-0 sm:border-x border-slate-800 py-4 sm:py-0 flex flex-col justify-center">
              <span className="text-[11px] text-slate-400 uppercase font-bold block mb-1">Percentil Global</span>
              <span className="text-2xl sm:text-3xl font-black text-white">{percentil}</span>
              <span className="block text-[11px] text-slate-400 font-semibold mt-1">Escala Internacional</span>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[11px] text-slate-400 uppercase font-bold block mb-1">Matrizes Corretas</span>
              <span className="text-3xl sm:text-4xl font-black text-white">{acertos}/28</span>
              <span className="block text-[11px] text-cyan-300 font-semibold mt-1">Alta Precisão Visual</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center border-t border-slate-200 pt-6 mt-8 text-xs text-slate-500 gap-4">
            <div>
              <p><strong>Data de Emissão:</strong> {dataEmissao} • <strong>ID:</strong> {idCertificado}</p>
              <p>Documento Oficial: QI Pro — Relatório de Inteligência</p>
            </div>
            <div className="text-center sm:text-right">
              <div className="font-serif italic text-base text-slate-900 font-bold">QI Pro — Conselho Técnico</div>
              <p>Autenticação Digital Verificada</p>
            </div>
          </div>
        </div>

        <div className="print:hidden mt-8 text-center space-y-4">
          <button
            onClick={lidarComImpressao}
            className="w-full max-w-md bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black py-4 rounded-2xl transition shadow-xl cursor-pointer text-base inline-block"
          >
            🖨️ Salvar Certificado e Relatório em PDF
          </button>
          {!editando && (
            <div>
              <button onClick={() => setEditando(true)} className="text-xs font-bold text-blue-600 hover:underline cursor-pointer mr-6">
                ✏️ Alterar nome no certificado
              </button>
              <Link href="/" className="text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors">
                ← Voltar à página inicial
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}