"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, Camera, Moon, Sun, Utensils, CheckCircle2, LockKeyhole, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import Image from "next/image";

export default function TripSection() {
  const [accepted, setAccepted] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false); // Controla o mistério geral (Nome, Mapa e Fotos)

  // Endereços formatados para a URL do Google Maps
  const origin = encodeURIComponent("Rua Francisco da Cunha, 70, Recife - PE");
  const destination = encodeURIComponent("Rua Felisberto de Ataíde, São Miguel dos Milagres - AL");
  
  const finalMapSrc = accepted 
    ? `https://maps.google.com/maps?saddr=${origin}&daddr=${destination}&output=embed`
    : `https://maps.google.com/maps?q=${destination}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  const handleAccept = () => {
    setAccepted(true);
    
    // Explosão de Confetes
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#8b5cf6', '#d946ef', '#f472b6']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#8b5cf6', '#d946ef', '#f472b6']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const moments = [
    {
      icon: <Sun className="w-8 h-8 text-amber-400" />,
      title: "Chamego de manhã",
      desc: "Acordando agarradinhos na pousada...",
      imgSrc: "/foto-hotel.png"
    },
    {
      icon: <Camera className="w-8 h-8 text-blue-400" />,
      title: "Altinha",
      desc: "Eu acertando minha chapinha pra você na areia da praia.",
      imgSrc: "/foto-praia.png"
    },
    {
      icon: <Utensils className="w-8 h-8 text-rose-400" />,
      title: "Jantarzinho",
      desc: "Colecionando mais e mais lugares fazendo uma das coisas que mais amamos juntos.",
      imgSrc: "/foto-amor.png"
    },
    {
      icon: <Moon className="w-8 h-8 text-indigo-400" />,
      title: "Passeio Noturno",
      desc: "Mãos dadas à passear por Milagres.",
      imgSrc: "/foto-noite.png"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white overflow-hidden relative">
      
      <div className="max-w-4xl mx-auto text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-violet-900 mt-2 mb-6">
            Nosso Final de Semana 🌴
          </h2>
          <p className="text-slate-600 text-lg mb-8">
            Arrume as malas, separe suas roupas de praia, vestido para usar a noite no centrinho e por favor não esqueça esse seu sorriso lindo. E sim, levarei minha bola para nossa altinha, pois iremos para:
          </p>
          
          {/* BOTÃO DE REVELAÇÃO (CONTROLA TUDO) */}
          <div className="flex justify-center">
            <motion.div 
              className="relative cursor-pointer group"
              onClick={() => setIsRevealed(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
                {!isRevealed ? (
                    <div className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl px-8 py-6 flex flex-col items-center gap-3 select-none shadow-sm hover:shadow-md transition-shadow">
                         <div className="bg-white p-3 rounded-full shadow-sm">
                            <LockKeyhole className="text-violet-500 w-6 h-6 animate-pulse" />
                         </div>
                         <span className="font-bold text-slate-500 uppercase tracking-widest text-sm">
                             Toque para revelar o destino
                         </span>
                         {/* Texto borrado atrás para dar efeito visual de spoiler */}
                         <div className="absolute inset-0 blur-md bg-slate-100/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-slate-400 font-bold">
                             ??? ??? ???
                         </div>
                    </div>
                ) : (
                    <motion.h4 
                        initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ type: "spring", bounce: 0.5 }}
                        className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600 mt-2 mb-6"
                    >
                        São Miguel dos Milagres
                    </motion.h4>
                )}
            </motion.div>
          </div>

        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* MAPA (Só aparece se revelado) */}
        <motion.div 
          className="w-full h-96 bg-slate-100 rounded-3xl shadow-xl overflow-hidden border-4 border-white relative group"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
            {isRevealed ? (
                 <iframe 
                 key={accepted ? "route" : "place"}
                 src={finalMapSrc}
                 width="100%" 
                 height="100%" 
                 style={{ border: 0 }} 
                 allowFullScreen 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
                 className={`grayscale group-hover:grayscale-0 transition-all duration-700 ${accepted ? 'grayscale-0' : ''}`}
               ></iframe>
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 text-slate-300 font-bold uppercase tracking-widest gap-2">
                    <MapPin size={40} className="opacity-20" />
                    <span>Localização Secreta</span>
                </div>
            )}
         
          {(!accepted && isRevealed) && (
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow text-violet-800 font-bold flex items-center gap-2">
              <MapPin size={18} /> São Miguel dos Milagres, AL
            </div>
          )}
        </motion.div>

        {/* GRID DE FOTOS (Cobre se não estiver revelado) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {moments.map((moment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={isRevealed ? { scale: 1.02 } : {}}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-2xl overflow-hidden shadow-lg group cursor-pointer bg-slate-100"
            >
              {isRevealed ? (
                // CONTEÚDO REVELADO (FOTOS)
                <>
                    <Image
                        src={moment.imgSrc}
                        alt={moment.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 p-5 text-white w-full">
                        <div className="bg-white/20 backdrop-blur-md w-fit p-2 rounded-full mb-3">
                            {moment.icon}
                        </div>
                        <h3 className="font-bold text-lg leading-tight">{moment.title}</h3>
                        <p className="text-xs text-slate-200 mt-1">{moment.desc}</p>
                    </div>
                </>
              ) : (
                // CONTEÚDO BLOQUEADO (CARD CINZA)
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-50 border-2 border-dashed border-slate-200 m-2 rounded-xl">
                    <div className="bg-white p-3 rounded-full shadow-sm text-slate-300">
                        <Sparkles size={24} />
                    </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* BOTÃO FINAL (Só aparece se revelado) */}
      <div className="mt-24 text-center h-24">
        <AnimatePresence>
            {isRevealed && (
                !accepted ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.button
                    onClick={handleAccept}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-xl font-bold rounded-full shadow-lg shadow-violet-200 overflow-hidden"
                    >
                    <span className="relative z-10 flex items-center gap-2">
                        <Navigation className="w-5 h-5" /> Aceitar Viagem
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </motion.button>
                </motion.div>
                ) : (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-block bg-green-100 text-green-700 px-8 py-4 rounded-full font-bold text-xl border-2 border-green-200 flex items-center gap-2 shadow-lg"
                >
                    <CheckCircle2 size={28} />
                    Viagem marcada! Te amo meu amor! ❤️
                </motion.div>
                )
            )}
        </AnimatePresence>
      </div>

    </section>
  );
}