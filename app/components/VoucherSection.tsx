"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Sparkles, Loader2, MessageCircleHeart, X, CheckCircle2 } from "lucide-react";

type Voucher = {
  id: string;
  title: string;
  description: string;
  type: "ACTION" | "ADVICE";
};

export default function VoucherSection() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null); // Controla o Modal

  useEffect(() => {
    fetch("/api/vouchers")
      .then((res) => res.json())
      .then((data) => {
        setVouchers(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleRedeem = async (id: string, type: string) => {
    const message = type === "ACTION" 
      ? "Tem certeza que quer usar este vale agora?" 
      : "Quer marcar este conselho como lido?";

    if (!confirm(message)) return;

    try {
      await fetch("/api/vouchers", {
        method: "PUT",
        body: JSON.stringify({ id }),
      });
      
      // Remove da lista visualmente
      setVouchers((prev) => prev.filter((v) => v.id !== id));
      
      // Fecha o modal
      setSelectedVoucher(null);

      if (type === "ACTION") {
        alert("Pedido enviado para o Lucca! ❤️");
      }
    } catch (error) {
      alert("Erro ao processar.");
    }
  };

  if (loading) return (
    <div className="flex justify-center p-10 text-violet-400">
      <Loader2 className="animate-spin" />
    </div>
  );

  const actions = vouchers.filter((v) => v.type === "ACTION");
  const advices = vouchers.filter((v) => v.type === "ADVICE");

  return (
    <div className="w-full relative">
      
      {/* SEÇÃO 1: VALES E MIMOS (ACTION) */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-violet-600 mb-2 flex items-center justify-center gap-2">
            <Gift className="text-fuchsia-500" /> Vales & Mimos
          </h2>
          <p className="text-slate-500">
            Escolha o que você quer e eu faço acontecer. Basta clicar no mimo que quiser.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {actions.length === 0 ? (
            <p className="col-span-full text-center text-slate-400 italic bg-slate-50 p-6 rounded-lg">
              Você zerou seus presentes! (Por enquanto...) 🎁
            </p>
          ) : (
            actions.map((voucher) => (
              <VoucherCard 
                key={voucher.id} 
                voucher={voucher} 
                onClick={() => setSelectedVoucher(voucher)} 
                color="violet" 
              />
            ))
          )}
        </div>
      </section>

      {/* SEÇÃO 2: CONSELHOS (ADVICE) */}
      <section className="py-20 px-4 bg-gradient-to-b from-fuchsia-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-fuchsia-700 mb-2 flex items-center justify-center gap-2">
              <MessageCircleHeart className="text-violet-500" /> Para quando precisar...
            </h2>
            <p className="text-fuchsia-800/70 max-w-2xl mx-auto">
              Escrevi algumas palavras pra que você possa ler durante o seu dia a dia pra poder te ajudar, apoiar e incentivar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advices.length === 0 ? (
              <p className="col-span-full text-center text-fuchsia-400 italic">
                Você já leu todos os conselhos disponíveis. ❤️
              </p>
            ) : (
              advices.map((voucher) => (
                <VoucherCard 
                  key={voucher.id} 
                  voucher={voucher} 
                  onClick={() => setSelectedVoucher(voucher)} 
                  color="fuchsia" 
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* MODAL EXPANDIDO (Pop-up) */}
      <AnimatePresence>
        {selectedVoucher && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedVoucher(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden relative border-t-8 ${selectedVoucher.type === 'ACTION' ? 'border-violet-500' : 'border-fuchsia-500'}`}
            >
              {/* Botão Fechar */}
              <button 
                onClick={() => setSelectedVoucher(null)}
                className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
              >
                <X size={20} className="text-slate-500" />
              </button>

              <div className="p-8">
                {/* Ícone e Título */}
                <div className="flex flex-col items-center text-center mb-6">
                  <div className={`p-4 rounded-full mb-4 ${selectedVoucher.type === 'ACTION' ? 'bg-violet-100 text-violet-600' : 'bg-fuchsia-100 text-fuchsia-600'}`}>
                    {selectedVoucher.type === 'ACTION' ? <Gift size={32} /> : <MessageCircleHeart size={32} />}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 font-serif">
                    {selectedVoucher.title}
                  </h3>
                </div>

                {/* Conteúdo do Texto (Com scroll se for grande) */}
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 max-h-[40vh] overflow-y-auto mb-8 text-center">
                  <p className="text-lg text-slate-600 leading-relaxed whitespace-pre-line">
                    "{selectedVoucher.description}"
                  </p>
                </div>

                {/* Botão de Ação */}
                <button
                  onClick={() => handleRedeem(selectedVoucher.id, selectedVoucher.type)}
                  className={`w-full py-4 rounded-xl font-bold text-white text-lg shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 ${
                    selectedVoucher.type === 'ACTION' 
                      ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600' 
                      : 'bg-gradient-to-r from-fuchsia-500 to-pink-500'
                  }`}
                >
                  {selectedVoucher.type === 'ACTION' ? (
                    <> <CheckCircle2 /> Usar Vale Agora </>
                  ) : (
                    <> <CheckCircle2 /> Marcar como Lido </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Card Simplificado (Apenas para exibir e clicar)
function VoucherCard({ voucher, onClick, color }: { voucher: Voucher; onClick: () => void; color: "violet" | "fuchsia" }) {
  const gradient = color === "violet" ? "from-violet-500 to-fuchsia-600" : "from-fuchsia-500 to-pink-500";

  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`h-48 w-full rounded-2xl shadow-lg bg-gradient-to-br ${gradient} text-white p-6 flex flex-col items-center justify-center border-4 border-white/20 cursor-pointer relative overflow-hidden group`}
    >
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
      
      <Sparkles className="w-10 h-10 mb-4 text-white/80" />
      <h3 className="text-xl font-bold font-serif text-center relative z-10">{voucher.title}</h3>
      <p className="text-xs mt-3 uppercase tracking-widest opacity-75 relative z-10">
        {voucher.type === "ACTION" ? "Clique para usar" : "Clique para ler"}
      </p>
    </motion.div>
  );
}