"use client";

import { useState, useRef, useEffect } from "react";
import { Music, Pause, Play, SkipForward, SkipBack, ListMusic, X, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [showHint, setShowHint] = useState(true); // Controla o aviso
  const audioRef = useRef<HTMLAudioElement>(null);

  const playlist = [
    { title: "YUKON", src: "/songs/song1.mp3" },
    { title: "Geribá", src: "/songs/song2.mp3" },
    { title: "Eu sou feliz assim", src: "/songs/song3.mp3" },
    { title: "Fútil", src: "/songs/song4.mp3" },
    { title: "Para você acreditar", src: "/songs/song5.mp3" },
    { title: "Buzz Lightyear", src: "/songs/song6.mp3" },
    { title: "Tanto faz", src: "/songs/song7.mp3" },
    { title: "Arriadin por tu", src: "/songs/song8.mp3" },
  ];  
  
  // Efeito para tocar a música
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Interação necessária"));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSongIndex]);

  // NOVO: Efeito para esconder o aviso automaticamente após 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 5000); // 5000ms = 5 segundos

    return () => clearTimeout(timer); // Limpa o timer se o componente desmontar
  }, []);

  const toggleOpen = () => {
      setIsOpen(true);
      setShowHint(false); // Garante que suma se clicar antes do tempo
  }

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
  };

  const prevSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  const selectSong = (index: number) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        src={playlist[currentSongIndex].src} 
        onEnded={nextSong} 
      />

      {/* Container do Botão + Dica */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
          
          {/* O Aviso (Dica) com AnimatePresence para saída suave */}
          <AnimatePresence>
            {showHint && (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, transition: { duration: 0.5 } }} // Saída suave
                    className="bg-white px-3 py-2 rounded-lg shadow-lg border border-violet-100 text-xs text-violet-600 font-bold whitespace-nowrap relative mr-2 animate-bounce"
                >
                    Pode escutar uma músiquinha se quiser
                    {/* Triângulo apontando para o botão */}
                    <div className="absolute -bottom-1 right-4 w-2 h-2 bg-white rotate-45 border-r border-b border-violet-100"></div>
                </motion.div>
            )}
          </AnimatePresence>

          {/* BOTÃO FLUTUANTE */}
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={toggleOpen}
            className="cursor-pointer bg-violet-600 text-white p-4 rounded-full shadow-xl shadow-violet-300 hover:bg-violet-700 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            {isPlaying ? (
                <div className="flex gap-1 items-end h-4">
                    <motion.div animate={{ height: [5, 16, 5] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-white rounded-full" />
                    <motion.div animate={{ height: [5, 16, 5] }} transition={{ repeat: Infinity, duration: 1.1 }} className="w-1 bg-white rounded-full" />
                    <motion.div animate={{ height: [5, 16, 5] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-white rounded-full" />
                </div>
            ) : (
                <Music size={24} />
            )}
          </motion.button>
      </div>

      {/* SIDEBAR */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/20 backdrop-blur-[1px] z-50"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full sm:w-80 bg-white/95 backdrop-blur-md shadow-2xl z-[60] border-l border-violet-100 p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-violet-900 font-bold flex items-center gap-2">
                  <ListMusic size={20} /> Nossa Playlist
                </h3>
                <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={24} />
                </button>
              </div>

              <div className="text-center mb-8">
                <div className="w-32 h-32 bg-gradient-to-br from-violet-200 to-fuchsia-200 rounded-full mx-auto mb-4 flex items-center justify-center shadow-inner">
                    <Music size={40} className="text-violet-500 opacity-50" />
                </div>
                <h4 className="font-bold text-lg text-slate-800">{playlist[currentSongIndex].title}</h4>
                <p className="text-xs text-slate-500 uppercase tracking-widest">Tocando Agora</p>
              </div>

              <div className="flex justify-center items-center gap-6 mb-8">
                <button onClick={prevSong} className="text-slate-400 hover:text-violet-600 transition-colors">
                  <SkipBack size={28} />
                </button>
                
                <button 
                  onClick={togglePlay} 
                  className="bg-violet-600 text-white p-4 rounded-full shadow-lg hover:bg-violet-700 hover:scale-105 transition-all"
                >
                  {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                </button>

                <button onClick={nextSong} className="text-slate-400 hover:text-violet-600 transition-colors">
                  <SkipForward size={28} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2">
                {playlist.map((song, index) => (
                  <button
                    key={index}
                    onClick={() => selectSong(index)}
                    className={`w-full p-3 rounded-lg flex items-center gap-3 text-left transition-all ${
                      currentSongIndex === index 
                        ? "bg-violet-100 text-violet-700 font-bold" 
                        : "hover:bg-slate-50 text-slate-600"
                    }`}
                  >
                    <span className="text-xs opacity-50 w-4">{index + 1}</span>
                    <span className="flex-1 truncate">{song.title}</span>
                    {currentSongIndex === index && isPlaying && (
                        <Volume2 size={14} className="animate-pulse" />
                    )}
                  </button>
                ))}
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}