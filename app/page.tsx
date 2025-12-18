"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// --- IMPORTAÇÃO DOS COMPONENTES ---
import LoveQuiz from "./components/LoveQuiz";
import LoveMaze from "./components/LoveMaze"; // Importando o Jogo
import VoucherSection from "./components/VoucherSection";
import TripSection from "./components/TripSection";
import LetterSection from "./components/LetterSection";
import MomentsSection from "./components/MomentsSection";
import MusicPlayer from "./components/MusicPlayer";
import DateInviteSection from "./components/DateInviteSection";

// --- DEFINIÇÃO DAS FASES ---
const STAGE_QUIZ = 0;
const STAGE_GAME = 1;
const STAGE_SITE = 2;

export default function Home() {
  // Estado inicial: Começa no Quiz (0)
  const [currentStage, setCurrentStage] = useState(STAGE_QUIZ);
  const [isLoading, setIsLoading] = useState(true);

  // Efeito para carregar onde parou (evita ter que responder tudo de novo ao dar F5)
  useEffect(() => {
    const savedStage = localStorage.getItem("love_stage_progress");
    const oldAuth = localStorage.getItem("love_access_granted"); // Compatibilidade com versão antiga

    if (savedStage) {
      setCurrentStage(parseInt(savedStage));
    } else if (oldAuth === "true") {
      // Se já tinha acesso na versão antiga, joga direto pro site
      setCurrentStage(STAGE_SITE);
    }

    setIsLoading(false);
  }, []);

  // Função para avançar de nível
  const advanceStage = (newStage: number) => {
    setCurrentStage(newStage);
    localStorage.setItem("love_stage_progress", newStage.toString());
  };

  // Previne "flicker" (piscar) enquanto carrega o localStorage
  if (isLoading) return null;

  // --- RENDERIZAÇÃO CONDICIONAL ---

  // 1. Se estiver na fase 0 -> Mostra o Quiz
  if (currentStage === STAGE_QUIZ) {
    return <LoveQuiz onSuccess={() => advanceStage(STAGE_GAME)} />;
  }

  // 2. Se estiver na fase 1 -> Mostra o Labirinto
  if (currentStage === STAGE_GAME) {
    return <LoveMaze onGameWin={() => advanceStage(STAGE_SITE)} />;
  }

  // 3. Se estiver na fase 2 -> Mostra o Site Principal
  return (
    <main className="min-h-screen selection:bg-violet-200 text-slate-800">

      <MusicPlayer />

      <section className="h-[100dvh] flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="z-10 max-w-2xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-violet-800 mb-4 font-serif">
            Bem-vinda, meu pinguinho ❤️🐼
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 font-light">
            Criei esse cantinho para guardar um pouco da nossa história, te oferecer alguns mimos, te dizer o quanto eu te amo e te quero pra sempre na minha vida e mostrar nossos próximos planos...
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          className="absolute bottom-20 text-violet-400"
        >
          Role para descobrir ↓
        </motion.div>
      </section>

      <LetterSection />

      <VoucherSection />

      <MomentsSection />

      <DateInviteSection />

      <TripSection />

      <footer className="py-10 text-center text-slate-400 text-sm">
        Feito com todo amor do mundo pelo seu desenvolvedor 👩🏻‍💻🫶🏻. <br />
        © {new Date().getFullYear()} Lucca & Larissa

        {/* BOTÃO DE RESET (Útil para você testar o fluxo do zero) */}
        <div className="mt-6">
          <button
            onClick={() => {
              localStorage.removeItem("love_stage_progress");
              localStorage.removeItem("love_access_granted"); // Remove o antigo também
              window.location.reload();
            }}
            className="text-xs text-red-300 hover:text-red-500 underline cursor-pointer"
          >
            Jogar os joguinhos novamente
          </button>
        </div>
      </footer>

    </main>
  );
}