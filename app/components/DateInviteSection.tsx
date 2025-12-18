"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { UtensilsCrossed, Calendar, Clock, Star, MapPin } from "lucide-react";

export default function DateInviteSection() {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Fundo escuro elegante para diferenciar das outras seções */}
      <div className="absolute inset-0 bg-slate-900 -z-10" />
      
      {/* Círculos decorativos de luz */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-fuchsia-600/20 rounded-full blur-3xl" />

      <div className="max-w-2xl mx-auto text-center text-white">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="border border-white/10 bg-white/5 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl relative"
        >
          {/* Ícone de destaque */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 p-4 rounded-full border border-violet-500 shadow-lg shadow-violet-900/50">
            <UtensilsCrossed className="w-8 h-8 text-violet-400" />
          </div>

          <h3 className="text-violet-300 font-bold tracking-widest uppercase text-sm mb-4 mt-6">
            Convite Oficial
          </h3>
          
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
            Date Night: Nikko
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-slate-300">
            <div className="flex flex-col items-center gap-2">
              <Calendar className="text-fuchsia-400" />
              <span className="font-semibold">Hoje</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Clock className="text-fuchsia-400" />
              <span className="font-semibold">19:00</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <MapPin className="text-fuchsia-400" />
              <span className="font-semibold">Nikko Japanese</span>
            </div>
          </div>

          <div className="space-y-4 text-lg font-light leading-relaxed text-slate-200 mb-8">
            <p>
              Gostaria de te convidar para uma noite especial. Fiz uma reserva para a gente 
              se deliciar com muitas peças de sushi do jeitinho que a gente gosta (Pode guardar espaço então hein).
            </p>
            <p className="italic text-violet-200">
              P.S.: Se arrume bem linda (kkkkk como se tu já não fosse de qualquer jeito), que às 18:50 sairemos para o nosso date de quatro anos.🍣🥢
            </p>
          </div>

          {!confirmed ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setConfirmed(true)}
              className="px-8 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full font-bold text-white shadow-lg shadow-violet-900/50 flex items-center gap-2 mx-auto"
            >
              <Star size={18} fill="currentColor" /> Confirmar Presença
            </motion.button>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-green-500/20 border border-green-500/50 text-green-200 px-6 py-3 rounded-full inline-flex items-center gap-2"
            >
              Presença Confirmada! Até já já. ❤️
            </motion.div>
          )}

        </motion.div>
      </div>
    </section>
  );
}