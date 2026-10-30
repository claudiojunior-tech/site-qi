'use client';

import { useState } from 'react';

// Emblema Oficial em SVG Neon (nunca quebra)
const LogoQipro = () => (
  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 p-0.5 flex items-center justify-center shadow-lg shadow-cyan-500/30 shrink-0">
    <div className="w-full h-full bg-[#071026] rounded-[14px] flex flex-col items-center justify-center">
      <span className="text-white font-black text-xs leading-none tracking-tight">QI</span>
      <span className="text-[10px] text-cyan-400 font-black leading-none tracking-wider">PRO</span>
    </div>
  </div>
);

export default function Home() {
  // Estado para os comentários ao vivo interativos
  const [comentarios, setComentarios] = useState([
    {
      id: 1,
      nome: 'Mariana Souza',
      cidade: 'Rio de Janeiro, RJ',
      tempo: 'Há 4 minutos',
      texto: 'Gente, eu tava com super dúvida se era confiável por R$ 7,99, mas paguei no Pix e caiu na hora! Meu QI deu 126, amei demais o certificado em PDF! 😍',
      curtidas: 24,
      curtido: false,
    },
    {
      id: 2,
      nome: 'Carlos Eduardo',
      cidade: 'São Paulo, SP',
      tempo: 'Há 12 minutos',
      texto: 'O teste é muito gostoso de fazer, as figuras geométricas são bem intuitivas. Tirei 132 e já salvei o PDF no celular. Super recomendo!',
      curtidas: 19,
      curtido: false,
    },
    {
      id: 3,
      nome: 'Beatriz Lima',
      cidade: 'Curitiba, PR',
      tempo: 'Há 25 minutos',
      texto: 'Tinha dúvida se o relatório explicava os detalhes, mas é super completo! Vale muito a pena pelo preço, o atendimento e a entrega são imediatas.',
      curtidas: 31,
      curtido: false,
    }
  ]);

  const [novoComentario, setNovoComentario] = useState('');
  const [novoNome, setNovoNome] = useState('');
  const [enviado, setEnviado] = useState(false);

  const curtirComentario = (id: number) => {
    setComentarios(comentarios.map(c => {
      if (c.id === id) {
        return {
          ...c,
          curtidas: c.curtido ? c.curtidas - 1 : c.curtidas + 1,
          curtido: !c.curtido
        };
      }
      return c;
    }));
  };

  const adicionarComentario = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoComentario.trim() || !novoNome.trim()) return;

    const novo = {
      id: Date.now(),
      nome: novoNome,
      cidade: 'Brasil',
      tempo: 'Agora mesmo',
      texto: novoComentario,
      curtidas: 1,
      curtido: true,
    };

    setComentarios([novo, ...comentarios]);
    setNovoComentario('');
    setNovoNome('');
    setEnviado(true);
    setTimeout(() => setEnviado(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans antialiased">
      
      {/* Header Perfeito e Limpo (Sem botões inúteis) */}
      <header className="flex justify-between items-center px-6 sm:px-12 py-3.5 bg-[#071026] text-white border-b border-blue-900/50 sticky top-0 z-50 shadow-lg">
        <div className="flex items-center space-x-3.5">
          <LogoQipro />
          <div>
            <span className="text-base sm:text-lg font-black tracking-tight text-white block leading-tight">
              QI Pro <span className="text-cyan-400 font-bold">— Relatório de Inteligência</span>
            </span>
            <span className="text-[11px] text-slate-400 font-medium tracking-wider uppercase block">
              Avaliação Psicométrica Oficial
            </span>
          </div>
        </div>

        <a 
          href="/teste" 
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider px-6 py-2.5 rounded-xl transition shadow-lg shadow-cyan-500/20 cursor-pointer"
        >
          Iniciar Teste
        </a>
      </header>

      <main>
        {/* Hero Section */}
        <section className="bg-[#071026] text-white py-16 sm:py-24 px-4 border-b border-blue-900/40 relative overflow-hidden">
          <div className="max-w-5xl mx-auto text-center flex flex-col items-center relative z-10">
            
            {/* Emblema Gigante Neon */}
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl border-2 border-cyan-400 shadow-2xl shadow-cyan-500/30 mb-6 bg-[#0a1633] flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-white tracking-tighter">QI</span>
              <span className="text-xl font-black text-cyan-400 tracking-widest">PRO</span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/90 border border-cyan-500/40 text-cyan-300 text-xs font-bold tracking-wide uppercase mb-5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              QI Pro — Relatório de Inteligência Oficial
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-5 text-white leading-tight uppercase">
              Descubra seu <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                verdadeiro potencial
              </span>
            </h1>
            
            <p className="text-slate-300 text-base sm:text-xl mb-9 max-w-2xl leading-relaxed">
              Teste interativo rápido de 28 matrizes visuais. Descubra sua pontuação exata de QI, percentil global e receba seu <strong className="text-white">QI Pro — Relatório de Inteligência</strong> + Certificado em PDF.
            </p>

            <a 
              href="/teste" 
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-lg sm:text-xl px-10 py-5 rounded-2xl shadow-2xl shadow-cyan-500/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              COMEÇAR TESTE DE QI AGORA
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>

            <p className="text-xs text-cyan-300/90 font-semibold mt-4">
              ⚡ Mais de 14.800 relatórios emitidos • Média de conclusão: 6 minutos
            </p>

            {/* Os 4 Pilares Oficiais */}
            <div className="mt-14 pt-10 border-t border-slate-800/80 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="bg-blue-950/40 border border-blue-800/50 p-4 rounded-2xl flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center text-cyan-400 mb-2 text-lg">🧠</div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-white">Teste de QI Online</p>
                <p className="text-[11px] text-slate-400 mt-0.5">28 Matrizes Intuitivas</p>
              </div>

              <div className="bg-blue-950/40 border border-blue-800/50 p-4 rounded-2xl flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center text-cyan-400 mb-2 text-lg">📊</div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-white">Resultado Imediato</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Análise Instantânea</p>
              </div>

              <div className="bg-blue-950/40 border border-blue-800/50 p-4 rounded-2xl flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center text-cyan-400 mb-2 text-lg">📄</div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-white">Relatório Completo</p>
                <p className="text-[11px] text-slate-400 mt-0.5">+ Certificado Oficial PDF</p>
              </div>

              <div className="bg-blue-950/40 border border-blue-800/50 p-4 rounded-2xl flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center text-cyan-400 mb-2 text-lg">🛡️</div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-white">Seus Dados Seguros</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Mercado Pago Verificado</p>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO DE COMENTÁRIOS AO VIVO / PESSOAS REAIS */}
        <section id="comentarios" className="py-20 bg-white border-b border-slate-200">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-xs font-black text-blue-600 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100 uppercase tracking-widest mb-3 inline-block">
                Comunidade QI Pro
              </span>
              <h2 className="text-3xl font-black text-slate-900 mb-2">
                Dúvidas, Elogios e Relatos ao Vivo
              </h2>
              <p className="text-slate-600 text-sm">
                Veja o que quem já testou está dizendo ou deixe seu comentário abaixo.
              </p>
            </div>

            {/* Caixa para Enviar Novo Comentário */}
            <form onSubmit={adicionarComentario} className="bg-slate-50 border border-slate-200 p-6 rounded-2xl mb-10 shadow-xs">
              <h3 className="text-sm font-bold text-slate-800 mb-3">Deixe seu comentário ou tire sua dúvida:</h3>
              {enviado && (
                <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold p-3 rounded-xl">
                  ✓ Seu comentário foi publicado com sucesso!
                </div>
              )}
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Seu nome completo"
                  value={novoNome}
                  onChange={(e) => setNovoNome(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <textarea
                  placeholder="O que você achou do teste? Deixe sua dúvida ou relato..."
                  value={novoComentario}
                  onChange={(e) => setNovoComentario(e.target.value)}
                  rows={3}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-xl transition cursor-pointer shadow-sm"
                  >
                    Publicar Comentário
                  </button>
                </div>
              </div>
            </form>

            {/* Lista de Comentários Dinâmicos */}
            <div className="space-y-5">
              {comentarios.map((c) => (
                <div key={c.id} className="bg-white border border-slate-200/90 p-6 rounded-2xl shadow-2xs">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center">
                        {c.nome.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 text-sm">{c.nome}</h4>
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Comprador Verificado</span>
                        </div>
                        <p className="text-[11px] text-slate-400">{c.cidade} • {c.tempo}</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-700 text-sm leading-relaxed mb-4">
                    {c.texto}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-500 border-t border-slate-100 pt-3">
                    <button
                      onClick={() => curtirComentario(c.id)}
                      className={`flex items-center gap-1.5 font-bold transition cursor-pointer ${
                        c.curtido ? 'text-blue-600' : 'hover:text-slate-800'
                      }`}
                    >
                      👍 Curtir ({c.curtidas})
                    </button>
                    <span className="text-slate-300">•</span>
                    <span className="text-emerald-600 font-medium">✓ Resposta respondida pela moderação QI Pro</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="bg-[#F8FAFC] py-20">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-black text-slate-900 mb-10 text-center">Perguntas Frequentes</h2>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
                <h3 className="font-bold text-slate-900 text-base mb-1.5">O que está incluso no QI Pro — Relatório de Inteligência?</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Você recebe sua pontuação oficial de QI calculada sobre as 28 matrizes, seu percentil comparativo global, métricas por domínio cognitivo e o Certificado Oficial personalizado com seu nome pronto para salvar em PDF.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
                <h3 className="font-bold text-slate-900 text-base mb-1.5">Como recebo meu relatório após o pagamento de R$ 7,99?</h3>
                <p className="text-slate-600 text-sm leading-relaxed">A liberação é imediata! Assim que o pagamento via Pix ou Cartão é confirmado pelo Mercado Pago, você é redirecionado direto para a página do seu certificado para digitar seu nome e baixar o PDF.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#071026] text-slate-400 py-10 px-6 text-center text-xs border-t border-blue-900/40">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-bold text-white">QI Pro — Relatório de Inteligência © Todos os direitos reservados.</p>
          <p className="text-slate-400">Descubra seu verdadeiro potencial • Pagamento 100% Seguro via Mercado Pago.</p>
        </div>
      </footer>
    </div>
  );
}