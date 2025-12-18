"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Lock, ArrowRight, Sparkles } from "lucide-react";

interface LoveQuizProps {
  onSuccess: () => void;
}

type QuestionType = "text" | "select" | "radio";

interface Question {
  question: string;
  type: QuestionType;
  placeholder?: string;
  hint: string;
  options?: string[];
  validate: (value: string) => boolean;
}

export default function LoveQuiz({ onSuccess }: LoveQuizProps) {
  const [step, setStep] = useState(0);
  const [error, setError] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [answer, setAnswer] = useState("");

  const questions: Question[] = [
    {
      question: "Qual a data do nosso primeiro date?",
      type: "text",
      placeholder: "dd/mm/aaaa",
      hint: "Dica: Lembrávamos sempre como o dia que começamos a ficar...",
      validate: (val) => {
        const clean = val.replace(/[^0-9]/g, "");
        return clean === "03102021";
      },
    },
    {
      question: "Ao total quantos dias ficamos sem nos ver enquanto eu estive no meu intercâmbio?",
      type: "text",
      placeholder: "Digite o número...",
      hint: "Dica: Parecia uma eternidade (são quase 100 dias...)",
      validate: (val) => val.includes("94"),
    },
    {
      question: "Se Larissa e Lucca têm opiniões diferentes, quem é que tá certo independente da ocasião?",
      type: "select",
      options: ["Selecione quem manda...", "Lucca", "Larissa"],
      hint: "Dica: Achou mesmo que eu ia falar que era eu?",
      validate: (val) => val.toLowerCase() === "larissa",
    },
    {
      question: "Qual o primeiro apelido que começamos a chamar um ao outro no início do relacionamento?",
      type: "text",
      placeholder: "Ex: Amor",
      hint: "Dica: Tem a ver com a beleza (lindo/linda)",
      validate: (val) => {
        const lower = val.toLowerCase().trim();
        return lower.includes("lindo") || lower.includes("linda");
      },
    },
    {
      question: "Para qual lugar saímos mais vezes ao longo do nosso namoro?",
      type: "text",
      placeholder: "Ex: Restaurante...",
      hint: "Dica: Pipoca e tela grande...",
      validate: (val) => val.toLowerCase().trim().includes("cinema"),
    },
    {
      question: "Por que eu estou tão desesperado para arrumar um emprego definitivo?",
      type: "radio",
      options: [
        "Porque eu quero guardar dinheiro para nosso casamento",
        "Porque eu quero morar com você o mais rápido possível",
        "Porque eu quero ter nossa vida em paz sem depender de ninguém",
        "Porque eu não quero que falte nada para você nunca",
        "Todas as opções acima",
      ],
      hint: "Dica: É o mínimo que eu devo fazer (selecione a mais completa)",
      validate: (val) => val === "Todas as opções acima",
    },
    {
      question: "Qual o nome da nossa primeira música?",
      type: "text",
      hint: "Dica: Pra mim só você importa e o resto...",
      validate: (val) => val.toLowerCase().trim().includes("tanto faz"),
    },
    {
      question: "O que você ganhou de 1 ano de namoro?",
      type: "text",
      placeholder: "Digite o presente...",
      hint: "Dica: Usava até pra academia 😒",
      validate: (val) => {
        const lower = val.toLowerCase().trim();
        return lower.includes("vans") || lower.includes("tênis") || lower.includes("tenis");
      },
    },
    {
      question: "Qual a primeira data comemorativa que passamos juntos?",
      type: "text",
      placeholder: "Ex: Páscoa...",
      hint: "Dica: Fomos primeira à casa da sua vó e depois à uma festa.",
      validate: (val) => {
        const lower = val.toLowerCase().trim();
        return lower.includes("ano novo") || lower.includes("reveillon") || lower.includes("reveillón");
      },
    },
  ];

  const handleValidation = () => {
    const currentQ = questions[step];

    if (currentQ.validate(answer.trim())) {
      setError(false);
      setShowHint(false);
      setAnswer("");

      if (step < questions.length - 1) {
        setStep(step + 1);
      } else {
        onSuccess();
      }
    } else {
      setError(true);
      setShowHint(true);
      setTimeout(() => setError(false), 500);
    }
  };

  const handleChange = (val: string) => {
    setError(false);
    setAnswer(val);
  };

  const renderInput = () => {
    const q = questions[step];

    if (q.type === "select") {
      return (
        <select
          value={answer}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full p-3 border border-violet-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 bg-white text-gray-700 appearance-none"
        >
          {q.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );
    }

    if (q.type === "radio") {
      return (
        <div className="flex flex-col gap-2 text-left">
          {q.options?.map((opt) => (
            <label
              key={opt}
              className={`p-3 border rounded-lg cursor-pointer transition-all flex items-center gap-3 ${answer === opt
                  ? "bg-violet-100 border-violet-500 text-violet-900 shadow-sm"
                  : "bg-white border-violet-100 hover:bg-violet-50 text-gray-600"
                }`}
            >
              <input
                type="radio"
                name="quiz-option"
                value={opt}
                checked={answer === opt}
                onChange={(e) => handleChange(e.target.value)}
                className="w-4 h-4 text-violet-600 focus:ring-violet-500 accent-violet-600"
              />
              <span className="text-sm">{opt}</span>
            </label>
          ))}
        </div>
      );
    }

    return (
      <input
        type="text"
        value={answer}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={q.placeholder}
        className={`w-full text-black p-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${error
            ? "border-red-400 focus:ring-red-200 bg-red-50"
            : "border-violet-200 focus:ring-violet-300 bg-white"
          }`}
        onKeyDown={(e) => e.key === "Enter" && handleValidation()}
      />
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 px-4 relative overflow-hidden">

      <div className="absolute top-10 left-10 text-violet-200 opacity-50">
        <Sparkles size={40} />
      </div>
      <div className="absolute bottom-10 right-10 text-fuchsia-200 opacity-50">
        <Heart size={60} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl max-w-md w-full border border-violet-100 text-center relative z-10"
        >
          <div className="mb-6 flex justify-center">
            <div className="bg-violet-100 p-4 rounded-full">
              <Lock size={32} className="text-violet-600" />
            </div>
          </div>

          <div className="mb-2 text-xs font-bold tracking-widest text-violet-400 uppercase">
            PERGUNTA {step + 1} DE {questions.length}
          </div>

          <h2 className="text-xl font-bold text-slate-800 mb-6 leading-relaxed">
            {questions[step].question}
          </h2>

          <div className="space-y-4">

            {/* CORREÇÃO DO ERRO AQUI: Removido "type: spring" */}
            <motion.div
              animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              {renderInput()}
            </motion.div>

            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="text-sm text-fuchsia-600 bg-fuchsia-50 p-3 rounded-lg border border-fuchsia-100 italic"
              >
                💡 {questions[step].hint}
              </motion.div>
            )}

            <button
              onClick={handleValidation}
              className="w-full py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white rounded-lg font-bold shadow-lg transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 mt-4"
            >
              {step === questions.length - 1 ? (
                <>
                  <Heart size={18} fill="currentColor" /> Acessar Próxima etapa
                </>
              ) : (
                <>
                  Próxima <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}