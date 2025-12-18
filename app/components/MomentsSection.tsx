"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Camera, Heart } from "lucide-react";

export default function MomentsSection() {
  // Estado para controlar qual foto está ativa no mobile (clique)
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const handlePhotoClick = (index: number) => {
    // Se clicar na mesma foto, fecha. Se for outra, abre.
    if (activePhotoIndex === index) {
      setActivePhotoIndex(null);
    } else {
      setActivePhotoIndex(index);
    }
  };

  // CONFIGURAÇÃO DAS FOTOS
  const photos = [
    { src: "/foto-1-borogodo.jpeg", alt: "Eu namoro com um espetáculo", style: "col-span-1 row-span-2" },
    { src: "/foto-pipa.jpeg", alt: "Pipa", style: "col-span-2 md:col-span-2 row-span-2" },
    { src: "/foto-barba-branca.jpeg", alt: "Realizando seu sonho de namorar um barbudo albino", style: "col-span-1 row-span-2" },
    { src: "/foto-ilha.jpeg", alt: "Sushizinho", style: "col-span-1 row-span-2" },
    { src: "/foto-sac.jpeg", alt: "SAC", style: "col-span-1 row-span-1" },
    { src: "/foto-shop.jpeg", alt: "Roubando beijin", style: "col-span-1 md:col-span-1 row-span-1" }, 
    { src: "/foto-wedo.jpeg", alt: "Wedo", style: "col-span-2 md:col-span-2 row-span-2" },
    { src: "/foto-tafc.jpeg", alt: "João Pessoa", style: "col-span-1 md:col-span-1 row-span-2" }, 
  ];

  return (
    <section className="py-12 md:py-24 px-2 md:px-4 max-w-6xl mx-auto">
      
      {/* Título da Seção */}
      <div className="text-center mb-8 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-4">
             <div className="bg-white p-3 md:p-4 rounded-full shadow-sm text-violet-500">
                <Camera size={24} className="md:w-8 md:h-8" />
             </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-violet-900 mb-4 font-serif">
            Memórias nossas
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-lg px-4">
            Cada foto conta um pedaço da nossa história e dos nossos momentos juntos 💟
          </p>
          <p className="md:hidden text-xs text-violet-400 mt-2 animate-pulse">
            (Toque nas fotos para ver a legenda)
          </p>
        </motion.div>
      </div>

      {/* A Galeria Bento Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 auto-rows-[120px] md:auto-rows-[200px]">
        {photos.map((photo, index) => {
          const isActive = activePhotoIndex === index;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              onClick={() => handlePhotoClick(index)} // Adicionado evento de clique
              className={`relative rounded-xl md:rounded-3xl overflow-hidden shadow-md md:shadow-lg border-2 md:border-4 border-white group cursor-pointer ${photo.style}`}
            >
              <div className="relative w-full h-full bg-slate-200">
                 
                 <Image 
                   src={photo.src} 
                   alt={photo.alt}
                   fill
                   className="object-cover transition-transform duration-700 group-hover:scale-110"
                 />
                 
                 {/* Overlay da Legenda: Aparece no HOVER (PC) ou no CLIQUE (Mobile) */}
                 <div 
                    className={`absolute inset-0 bg-black/40 transition-all duration-300 flex items-end p-2 md:p-4 ${
                        isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                 >
                   <p className={`text-white text-xs md:text-base font-bold transition-all duration-300 flex items-center gap-1 md:gap-2 ${
                       isActive ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                   }`}>
                     <Heart size={12} className="md:w-4 md:h-4 text-pink-500" fill="currentColor" /> 
                     {photo.alt}
                   </p>
                 </div>
              </div>
            </motion.div>
          );
        })}
        
        {/* Card Final */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="col-span-2 md:col-span-3 row-span-1 bg-violet-100 rounded-xl md:rounded-3xl border-2 md:border-4 border-white flex flex-col items-center justify-center text-center p-4 md:p-6"
        >
            <p className="text-violet-600 font-bold text-sm md:text-xl mb-1 md:mb-2">Mais fotos em breve...</p>
            <p className="text-violet-400 text-xs md:text-sm">Temos uma vida inteira para preencher mais quadros.</p>
        </motion.div>

      </div>
    </section>
  );
}