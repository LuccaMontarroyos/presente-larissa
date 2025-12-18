"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, X, Heart, Sparkles, CheckCircle2, Gift } from "lucide-react";
import { Caveat } from 'next/font/google';

// Configurando a fonte para parecer escrita à mão
const handwriting = Caveat({ 
  subsets: ['latin'],
  weight: ['400', '700'], 
});

export default function LetterSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [requestedPhysical, setRequestedPhysical] = useState(false);

  const handleRequestPhysical = () => {
    setRequestedPhysical(true);
    // Aqui você poderia, opcionalmente, salvar no banco de dados que ela pediu a física
    // Mas como o presente já vai com ela, é mais um efeito visual para surpreender.
  };

  return (
    <section className="py-24 px-4 bg-violet-50 flex flex-col items-center justify-center">
      
      {/* O Chamado para a Carta (O envelope fechado) */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="bg-white p-6 rounded-full inline-block shadow-lg mb-6">
          <Mail className="w-12 h-12 text-violet-500" />
        </div>
        <h2 className="text-3xl font-bold text-violet-900 mb-4 font-serif">
          Uma Carta para Você
        </h2>
        <p className="text-slate-600 mb-8">
          Existem coisas que eu só consigo expressar escrevendo. <br />
          Dediquei alguns minutos para colocar no papel o que sinto.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="px-8 py-3 bg-violet-600 text-white rounded-full font-bold shadow-md hover:bg-violet-700 transition-colors flex items-center gap-2 mx-auto"
        >
          <Heart size={18} fill="currentColor" /> Ler Carta
        </motion.button>
      </div>

      {/* O MODAL (A Carta Aberta) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-[#fffdf5] rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[85vh] mx-4"
              style={{
                backgroundImage: "linear-gradient(#e5e5f7 1px, transparent 1px)",
                backgroundSize: "20px 20px"
              }}
            >
              {/* Cabeçalho da Carta */}
              <div className="bg-violet-600 p-4 flex justify-between items-center text-white shrink-0">
                <span className="font-bold flex items-center gap-2">
                  <Mail size={18} /> De: Lucca | Para: Larissa
                </span>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-violet-700 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* CONTEÚDO DA CARTA (Scrollável) */}
              <div className={`p-6 md:p-12 overflow-y-auto text-slate-800 text-xl md:text-2xl leading-relaxed ${handwriting.className}`}>
                <p className="mb-4 font-bold text-violet-700">Minha linda,</p>
                
                <p className="mb-4">
                  Mais um ano comemorando a nossa data especial, a minha maior certeza e o que eu mais prezo na vida. Mais do que ninguém, nós dois sabemos que não foi fácil chegar até aqui onde chegamos, já passamos por muitas coisas juntos, diversas etapas, mas acima de tudo nós sempre conseguimos dar a volta por cima, como ainda faremos com mais momentos assim e seguiremos firmes um ao outro, porque eu sempre vou falar isso e nunca sairá da minha cabeça, que a gente é para sempre.
                </p>

                <p className="mb-4">
                  Sei de todos os meus defeitos, te agradeço muito por me fazer enxergá-los, e eu vou seguir disposto a mudar todos eles em mim para poder ser o homem perfeito para você. Eu te prometo me entregar e me doar todos os dias fazendo isso acontecer. Você é a mulher da minha vida, só pode ser você, você é absolutamente tudo pra mim, pra quem eu falo quando qualquer coisa acontece, pra quem eu recorro quando estou triste ou preciso de um consolo, com quem eu quero passar cada segundo de cada etapa da minha vida, com quem eu vou construir uma família, com quem eu vou dividir uma cadeira de balanço, quando a gente for bem velhinho, eu vou continuar falando que te amo um dia após o outro, até porque eu nunca vou deixar de te amar, não tem como. Você com esse seu jeito único, que me encanta em absolutamente tudo que faz, seja gravando um story pra seus seguimores, falando fofo com os cachorros, falando "rabiga", fazendo barulhinhos com a boca como se tivesse cheia, ajudando qualquer pessoa sem pedir nada em troca, nossa como tu é tão maravilhosa. 
                </p>

                <p className="mb-4">
                  O teu coração é a coisa mais pura e linda que eu já vi na vida Larissa Magalhães, e eu nunca trocaria por nada nesse mundo ser a pessoa que poderá viver ao teu lado, ter você no dia a dia, pra mim isso é a coisa mais rara nesse mundo e obrigado por dividir a sua vida comigo, obrigado por mais um ano ao seu lado meu amor, obrigado por me fazer sentir amado, você é pra sempre a minha pessoa favorita nesse mundo, te amo de um jeito que chega a doer o meu peito. ❤️🐼
                </p>

                <p className="text-right mt-8 font-bold text-violet-700">
                  Com todo amor do mundo,<br />
                  Lucca.
                </p>
              </div>

              {/* Rodapé: Ação de Receber Física */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col items-center justify-center shrink-0">
                
                {!requestedPhysical ? (
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleRequestPhysical}
                        className="w-full md:w-auto px-6 py-3 bg-white border-2 border-violet-200 text-violet-700 rounded-xl font-bold shadow-sm hover:bg-violet-50 hover:border-violet-300 transition-all flex items-center justify-center gap-2 text-sm md:text-base group"
                    >
                        <Mail className="w-5 h-5 group-hover:animate-bounce" /> Quero receber essa carta física também?
                    </motion.button>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-green-100 border border-green-200 text-green-800 px-6 py-3 rounded-xl flex items-center gap-3 shadow-sm w-full md:w-auto justify-center"
                    >
                        <div className="bg-white p-2 rounded-full shadow-sm">
                            <Gift className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="text-left">
                            <p className="font-bold text-sm">Pedido Confirmado!</p>
                            <p className="text-xs opacity-90">Ela já está indo junto com seu presente. 🎁</p>
                        </div>
                        <CheckCircle2 className="w-5 h-5 text-green-600 ml-2" />
                    </motion.div>
                )}

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}