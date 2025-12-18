"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, CheckCircle2, Lock, AlertCircle } from "lucide-react";

// --- CÓDIGOS DO MAPA ---
const W = 0; // Parede (Wall)
const P = 1; // Caminho Vazio (Path)
const S = 2; // Start (Você)
const E = 3; // End (Ela)

// --- MOMENTOS ESPECIAIS ---
const M_ESCOLA = 10;      
const M_ENCONTRO = 11;    
const M_PEDIDO = 12;      
const M_DISTANCIA = 13;   
const M_FACULDADE = 14;   
const M_VANGOGH = 15;     
const M_SP = 16;          
const M_PRAIA = 17;       
const M_FUTVOLEI = 18;    
const M_CINEMA = 19;      
const M_SUSHI = 20;
const M_BUQUE = 21;
const M_MUSICA = 22;
const M_AN = 23;

// Lista de todos os momentos que precisam ser coletados
const ALL_MOMENTS = [
  M_ESCOLA, M_ENCONTRO, M_PEDIDO, M_DISTANCIA, M_FACULDADE, 
  M_VANGOGH, M_SP, M_PRAIA, M_FUTVOLEI, M_CINEMA, M_SUSHI, M_BUQUE, M_MUSICA, M_AN
];

const initialMazeMap = [
    [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  
    [S,P,P,P,P,P,P,P,W,P,P,P,W,P,P,P,P,P,W,P,W],
  
    [W,W,W,W,W,P,W,P,W,W,W,P,W,P,W,W,W,W,W,P,W],
  
    [W,P,P,P,W,P,W,P,P,P,P,P,W,P,P,P,W,P,P,P,W],
  
    [W,P,W,W,W,P,W,W,W,W,W,W,W,W,W,P,W,W,W,P,W],
  
    [W,P,P,P,P,P,W,P,P,P,P,P,W,P,P,P,P,P,P,P,W],
  
    [W,W,W,P,W,W,W,P,W,W,W,W,W,P,W,W,W,W,W,W,W],
  
    [W,P,W,P,P,P,W,P,P,P,P,P,P,P,W,P,P,P,W,P,W],
  
    [W,P,W,W,W,P,W,P,W,W,W,P,W,W,W,W,W,P,W,P,W],
  
    [W,P,W,P,P,P,P,P,W,P,W,P,P,P,P,P,P,P,W,P,W],
  
    [W,P,W,P,W,W,W,P,W,P,W,W,W,W,W,P,W,W,W,P,W],
  
    [W,P,P,P,P,P,W,P,W,P,P,P,P,P,P,P,P,P,P,P,W],
  
    [W,W,W,W,W,W,W,P,W,W,W,W,W,P,W,W,W,W,W,W,W],
  
    [W,P,P,P,P,P,W,P,W,P,P,P,P,P,P,P,W,P,P,P,W],
  
    [W,P,W,W,W,P,W,W,W,P,W,P,W,W,W,P,W,P,W,W,W],
  
    [W,P,W,P,W,P,P,P,P,P,W,P,W,P,P,P,W,P,P,P,W],
  
    [W,P,W,P,W,W,W,W,W,W,W,P,W,W,W,W,W,W,W,P,W],
  
    [W,P,W,P,P,P,W,P,P,P,W,P,P,P,P,P,P,P,P,P,W],
  
    [W,P,W,W,W,P,W,P,W,P,W,W,W,W,W,P,W,W,W,W,W],
  
    [W,P,P,P,W,P,P,P,W,P,P,P,P,P,P,P,P,P,P,P,E],
  
    [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  ];

initialMazeMap[1][3]    = M_ESCOLA;      // 🏫
initialMazeMap[3][7]    = M_ENCONTRO;    // 🎪🍔
initialMazeMap[5][3]    = M_PEDIDO;      // 💍
initialMazeMap[9][5]    = M_DISTANCIA;   // 🌎✈️
initialMazeMap[7][9]    = M_FACULDADE;   // 💻📣
initialMazeMap[5][15]  = M_VANGOGH;     // 🌻
initialMazeMap[1][19]   = M_SP;          // ✈️🏙️🥶
initialMazeMap[7][19]   = M_PRAIA;       // 🚗🏝️
initialMazeMap[17][1]   = M_FUTVOLEI;    // ⚽🏐
initialMazeMap[13][9]  = M_CINEMA;      // 🎥
initialMazeMap[15][5]  = M_SUSHI;       // 🍣
initialMazeMap[19][18]  = M_BUQUE;       // 
initialMazeMap[19][6]  = M_MUSICA;      // 🎶🎵
initialMazeMap[13][19]  = M_AN;      // 🎅🏻🎆



const findStartPosition = () => {
  for (let r = 0; r < initialMazeMap.length; r++) {
    for (let c = 0; c < initialMazeMap[r].length; c++) {
      if (initialMazeMap[r][c] === S) return { r, c };
    }
  }
  return { r: 1, c: 1 };
};

interface LoveMazeProps {
  onGameWin: () => void;
}

export default function LoveMaze({ onGameWin }: LoveMazeProps) {
  const [playerPos, setPlayerPos] = useState(findStartPosition());
  const [hasWon, setHasWon] = useState(false);
  
  // NOVO: Estado para rastrear itens coletados e mensagem de aviso
  const [collected, setCollected] = useState<number[]>([]);
  const [showWarning, setShowWarning] = useState(false);

  const move = useCallback((dr: number, dc: number) => {
    if (hasWon) return;

    const newR = playerPos.r + dr;
    const newC = playerPos.c + dc;

    if (
      newR < 0 || newR >= initialMazeMap.length ||
      newC < 0 || newC >= initialMazeMap[0].length
    ) return;

    const targetCell = initialMazeMap[newR][newC];

    // Verifica Parede
    if (targetCell === W) return; 

    // LÓGICA DE COLETA DE ITENS
    // Se o alvo for um momento especial, adiciona à lista de coletados
    if (ALL_MOMENTS.includes(targetCell)) {
        if (!collected.includes(targetCell)) {
            setCollected(prev => [...prev, targetCell]);
        }
    }

    // LÓGICA DE VITÓRIA / BLOQUEIO
    if (targetCell === E) {
        // Verifica se coletou todos
        if (collected.length < ALL_MOMENTS.length) {
            // Se faltam itens, mostra aviso e impede o movimento
            setShowWarning(true);
            setTimeout(() => setShowWarning(false), 2000);
            return;
        }
        // Se pegou tudo, ganha!
        setHasWon(true);
    }

    setPlayerPos({ r: newR, c: newC });

  }, [playerPos, hasWon, collected]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
      }
      switch (e.key) {
        case "ArrowUp": move(-1, 0); break;
        case "ArrowDown": move(1, 0); break;
        case "ArrowLeft": move(0, -1); break;
        case "ArrowRight": move(0, 1); break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [move]);

  const renderTile = (cellCode: number, r: number, c: number) => {
    const isPlayerHere = r === playerPos.r && c === playerPos.c;
    const isCollected = collected.includes(cellCode);
    const isAllCollected = collected.length === ALL_MOMENTS.length;
    
    let content = null;
    let bgColor = "bg-violet-50";
    let opacity = "opacity-100";

    if (cellCode === W) bgColor = "bg-violet-900/10 rounded-sm"; 

    // Renderização condicional baseada se já foi coletado
    if (isCollected) {
        content = <span className="text-sm text-green-400">✅</span>;
        opacity = "opacity-50"; // Deixa meio transparente pra mostrar que já foi
    } else {
        switch (cellCode) {
        case E: 
            // Mostra CADEADO se não coletou tudo, ou ELA se coletou
            content = isAllCollected ? <span className="text-2xl">👩🏻</span> : <span className="text-xl">🔒</span>; 
            break;
        case M_ESCOLA: content = <span className="text-lg">🏫</span>; break;
        case M_ENCONTRO: content = <span className="text-lg flex">🎪🍔</span>; break;
        case M_PEDIDO: content = <span className="text-lg">💍</span>; break;
        case M_DISTANCIA: content = <span className="text-lg flex">🌉🥺</span>; break;
        case M_FACULDADE: content = <span className="text-lg flex">👩🏻‍💻👨🏻‍💻</span>; break;
        case M_VANGOGH: content = <span className="text-lg">🌻</span>; break;
        case M_SP: content = <span className="text-xs flex flex-col items-center leading-none"><span>✈️</span><span>🏙️</span></span>; break;
        case M_PRAIA: content = <span className="text-lg flex">🚗🏝️</span>; break;
        case M_FUTVOLEI: content = <span className="text-lg flex">⚽🏐</span>; break;
        case M_CINEMA: content = <span className="text-lg">🎥</span>; break;
        case M_SUSHI: content = <span className="text-lg">🍣</span>; break;
        case M_BUQUE: content = <span className="text-lg">💐</span>; break;
        case M_MUSICA: content = <span className="text-lg">🎵</span>; break;
        case M_AN: content = <span className="text-lg">🎅🏻🎆</span>; break;
        }
    }

    return (
      <div 
        key={`${r}-${c}`} 
        className={`w-7 h-7 md:w-10 md:h-10 flex items-center justify-center relative ${bgColor} border-[0.5px] border-white/20 `}
      >
        <div className={`z-0 scale-90 ${opacity}`}>{content}</div>
        
        {isPlayerHere && (
          <motion.div 
            layoutId="player"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="absolute inset-0 flex items-center justify-center text-2xl md:text-3xl z-20 drop-shadow-md"
          >
            👦🏻
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-2 overflow-hidden relative">
       
       {/* AVISO DE BLOQUEIO */}
       <AnimatePresence>
         {showWarning && (
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute top-10 z-50 bg-red-100 text-red-600 px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2"
            >
                <AlertCircle size={20} /> Colete todas as memórias primeiro!
            </motion.div>
         )}
       </AnimatePresence>

       <div className="text-center mb-4 max-w-md animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="flex justify-center mb-2">
            <div className="bg-violet-100 p-3 rounded-full text-violet-600">
             <Lock size={20} />
            </div>
        </div>
        <h2 className="text-xl font-bold text-violet-900 font-serif">Colete todas as memórias para desbloquear a recompensa</h2>
        <div className="text-slate-500 text-xs px-4 mt-1">
           Memórias coletadas: <span className="font-bold text-violet-600">{collected.length} / {ALL_MOMENTS.length}</span>
        </div>
       </div>
       <div className="w-full max-w-4xl overflow-x-auto pb-4 px-2 custom-scrollbar">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-2 rounded-xl shadow-2xl border-4 border-violet-100 min-w-fit mx-auto"
      >
        <div 
            className="grid gap-[1px] bg-violet-100" 
            style={{ 
                gridTemplateColumns: `repeat(${initialMazeMap[0].length}, minmax(0, 1fr))` 
            }}
        >
          {initialMazeMap.map((row, rIndex) => (
            row.map((cell, cIndex) => renderTile(cell, rIndex, cIndex))
          ))}
        </div>
      </motion.div>
      <p className="text-center text-xs text-slate-400 mt-2 md:hidden animate-pulse">
            (Arraste para os lados para ver o mapa todo)
          </p>
      </div>

      <div className="mt-6 h-32 flex flex-col items-center justify-center relative w-full max-w-xs">
        <AnimatePresence mode="wait">
            {!hasWon ? (
                <motion.div 
                    key="controls"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="grid grid-cols-3 gap-2"
                >
                    <div />
                    <ControlButton onClick={() => move(-1, 0)} icon={<ArrowUp size={20} />} />
                    <div />
                    <ControlButton onClick={() => move(0, -1)} icon={<ArrowLeft size={20} />} />
                    <ControlButton onClick={() => move(1, 0)} icon={<ArrowDown size={20} />} />
                    <ControlButton onClick={() => move(0, 1)} icon={<ArrowRight size={20} />} />
                </motion.div>
            ) : (
                <motion.div
                    key="win"
                    initial={{ scale: 0.5, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center gap-3 w-full"
                >
                    <div className="text-5xl animate-bounce">👦🏻 ❤️ 👩🏻</div>
                    <p className="text-violet-700 font-bold text-sm">Te encontrei!</p>
                    <button
                        onClick={onGameWin}
                        className="px-8 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-full font-bold shadow-lg flex items-center gap-2 animate-pulse hover:scale-105 transition-transform"
                    >
                        <CheckCircle2 size={18} />Pegar recompensa🏆
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ControlButton({ onClick, icon }: { onClick: () => void, icon: React.ReactNode }) {
    return (
        <button 
            onClick={(e) => {
                e.preventDefault(); 
                onClick();
            }}
            className="w-12 h-12 bg-white border-2 border-violet-100 text-violet-600 rounded-xl shadow-[0_4px_0_0_rgba(139,92,246,0.2)] active:shadow-none active:translate-y-[2px] transition-all flex items-center justify-center"
        >
            {icon}
        </button>
    )
}


// const initialMazeMap = [
//     [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  
//     [S,P,P,P,P,P,P,P,W,P,P,P,W,P,P,P,P,P,W,P,W],
  
//     [W,W,W,W,W,P,W,P,W,W,W,P,W,P,W,W,W,W,W,P,W],
  
//     [W,P,P,P,W,P,W,P,P,P,P,P,W,P,P,P,W,P,P,P,W],
  
//     [W,P,W,W,W,P,W,W,W,W,W,W,W,W,W,P,W,W,W,P,W],
  
//     [W,P,P,P,P,P,W,P,P,P,P,P,W,P,P,P,P,P,P,P,W],
  
//     [W,W,W,P,W,W,W,P,W,W,W,W,W,P,W,W,W,W,W,W,W],
  
//     [W,P,W,P,P,P,W,P,P,P,P,P,P,P,W,P,P,P,W,P,W],
  
//     [W,P,W,W,W,P,W,P,W,W,W,P,W,W,W,W,W,P,W,P,W],
  
//     [W,P,W,P,P,P,P,P,W,P,W,P,P,P,P,P,P,P,W,P,W],
  
//     [W,P,W,P,W,W,W,P,W,P,W,W,W,W,W,P,W,W,W,P,W],
  
//     [W,P,P,P,P,P,W,P,W,P,P,P,P,P,P,P,P,P,P,P,W],
  
//     [W,W,W,W,W,W,W,P,W,W,W,W,W,P,W,W,W,W,W,W,W],
  
//     [W,P,P,P,P,P,W,P,W,P,P,P,P,P,P,P,W,P,P,P,W],
  
//     [W,P,W,W,W,P,W,W,W,P,W,P,W,W,W,P,W,P,W,W,W],
  
//     [W,P,W,P,W,P,P,P,P,P,W,P,W,P,P,P,W,P,P,P,W],
  
//     [W,P,W,P,W,W,W,W,W,W,W,P,W,W,W,W,W,W,W,P,W],
  
//     [W,P,W,P,P,P,W,P,P,P,W,P,P,P,P,P,P,P,P,P,W],
  
//     [W,P,W,W,W,P,W,P,W,P,W,W,W,W,W,P,W,W,W,W,W],
  
//     [W,P,P,P,W,P,P,P,W,P,P,P,P,P,P,P,P,P,P,P,E],
  
//     [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
//   ];