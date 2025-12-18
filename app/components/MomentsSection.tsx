"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Camera, Heart } from "lucide-react";

export default function MomentsSection() {
  // CONFIGURAÇÃO DAS FOTOS
  // span = 1 (quadrado pequeno), span = 2 (retângulo largo ou alto)
  // Coloque suas fotos na pasta public e ajuste os nomes aqui
  const photos = [
    { src: "/foto-1-borogodo.jpeg", alt: "Eu namoro com um espetáculo", style: "col-span-1 row-span-2" },
    { src: "/foto-pipa.jpeg", alt: "Pipa", style: "md:col-span-2 row-span-2" }, // Larga
    { src: "/foto-barba-branca.jpeg", alt: "Realizando seu sonho de namorar um barbudo albino", style: "col-span-1 row-span-2" },
    { src: "/foto-ilha.jpeg", alt: "Sushizinho", style: "col-span-1 row-span-2" },
    { src: "/foto-sac.jpeg", alt: "SAC", style: "col-span-1 row-span-1" },
    { src: "/foto-shop.jpeg", alt: "Roubando beijin", style: "md:col-span-1 row-span-1" }, // Larga
    { src: "/foto-wedo.jpeg", alt: "Wedo", style: "md:col-span-2 row-span-2" }, // Larga
    { src: "/foto-tafc.jpeg", alt: "João Pessoa", style: "md:col-span-1 row-span-2" }, // Larga
  ];

  return (
    <section className="py-24 px-4 max-w-6xl mx-auto">
      
      {/* Título da Seção */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-4">
             <div className="bg-white p-4 rounded-full shadow-sm text-violet-500">
                <Camera size={32} />
             </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-violet-900 mb-4 font-serif">
            Memórias nossas
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Cada foto conta um pedaço da nossa história e dos nossos momentos juntos 💟
          </p>
        </motion.div>
      </div>

      {/* A Galeria Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className={`relative rounded-3xl overflow-hidden shadow-lg border-4 border-white group ${photo.style}`}
          >
            <div className="relative w-full h-full bg-slate-200">
                
               <Image 
                 src={photo.src} 
                 alt={photo.alt}
                 fill
                 className="object-cover transition-transform duration-700 group-hover:scale-110"
               />
               
               
               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end p-4">
                 <p className="text-white font-bold opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2">
                   <Heart size={16} fill="currentColor" /> {photo.alt}
                 </p>
               </div>
            </div>
          </motion.div>
        ))}
        
        
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="col-span-3 row-span-1 bg-violet-100 rounded-3xl border-4 border-white flex flex-col items-center justify-center text-center p-6"
        >
            <p className="text-violet-600 font-bold text-xl mb-2">Mais fotos em breve...</p>
            <p className="text-violet-400 text-sm">Temos uma vida inteira para preencher mais quadros.</p>
        </motion.div>

      </div>
    </section>
  );
}