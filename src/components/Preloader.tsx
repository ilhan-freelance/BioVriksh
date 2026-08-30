"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Leaf, Dna, Sparkles } from "lucide-react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  // Sequence stages:
  // "intro"    (0.0s - 2.0s): Glowing 3D Bio Vriksha Leaf emblem drops & pulses
  // "brand"    (2.0s - 3.4s): "Bio Vriksha" brand name with gradient glow
  // "opening"  (3.4s - 4.4s): Curtains slide open revealing the main page
  const [stage, setStage] = useState<"intro" | "brand" | "opening">("intro");

  useEffect(() => {
    const timer1 = setTimeout(() => setStage("brand"), 2000);
    const timer2 = setTimeout(() => setStage("opening"), 3400);
    const timer3 = setTimeout(() => onComplete(), 4400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  const curtainEase = [0.76, 0, 0.24, 1];

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden">
      {/* ── LEFT CURTAIN PANEL (Pure White) ── */}
      <motion.div
        className="absolute top-0 left-0 w-1/2 h-full bg-white z-10 flex items-center justify-end"
        initial={{ x: "0%" }}
        animate={{ x: stage === "opening" ? "-100%" : "0%" }}
        transition={{ duration: 1.0, ease: curtainEase }}
        style={{
          boxShadow:
            stage === "opening"
              ? "25px 0 60px rgba(0,0,0,0.1)"
              : "5px 0 20px rgba(0,0,0,0.03)",
        }}
      >
        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-[#016737]/20 to-transparent" />
      </motion.div>

      {/* ── RIGHT CURTAIN PANEL (Pure White) ── */}
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-full bg-white z-10 flex items-center justify-start"
        initial={{ x: "0%" }}
        animate={{ x: stage === "opening" ? "100%" : "0%" }}
        transition={{ duration: 1.0, ease: curtainEase }}
        style={{
          boxShadow:
            stage === "opening"
              ? "-25px 0 60px rgba(0,0,0,0.1)"
              : "-5px 0 20px rgba(0,0,0,0.03)",
        }}
      >
        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-[#016737]/20 to-transparent" />
      </motion.div>

      {/* ── CENTER STAGE ── */}
      <div className="relative z-20 pointer-events-auto flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {/* ═══ STAGE 1: GLOWING 3D BIO VRIKSHA LEAF EMBLEM ═══ */}
          {stage === "intro" && (
            <motion.div
              key="intro-stage"
              className="flex flex-col items-center justify-center"
              exit={{ scale: 0.4, opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                initial={{ scale: 0.2, opacity: 0, rotate: -20 }}
                animate={{
                  scale: [0.2, 1.15, 1],
                  opacity: 1,
                  rotate: [ -20, 5, 0 ],
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative flex items-center justify-center"
              >
                {/* Ambient glow rings */}
                <motion.div
                  animate={{
                    scale: [1, 1.25, 1],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-[-30px] rounded-full bg-gradient-to-tr from-[#016737]/30 via-[#8BC43F]/25 to-[#016737]/15 blur-3xl"
                />

                {/* 3D Bio Vriksha Badge */}
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-br from-[#016737] to-[#014d29] flex items-center justify-center text-white shadow-2xl border-2 border-[#8BC43F]/40 relative">
                  <Leaf className="w-16 h-16 sm:w-20 sm:h-20 text-[#8BC43F] stroke-[2.5]" />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-3xl border border-dashed border-[#8BC43F]/60 pointer-events-none"
                  />
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-6 text-sm font-semibold tracking-widest uppercase text-[#016737]"
              >
                NEET Biology Learning Platform
              </motion.p>
            </motion.div>
          )}

          {/* ═══ STAGE 2: BRAND NAME "Bio Vriksha" ═══ */}
          {stage === "brand" && (
            <motion.div
              key="brand-stage"
              className="flex flex-col items-center justify-center text-center px-4"
              initial={{ y: -60, opacity: 0, filter: "blur(12px)", scale: 1.1 }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Ambient glow behind text */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[350px] h-[180px] bg-gradient-to-r from-[#016737]/15 via-[#8BC43F]/10 to-[#016737]/15 blur-[60px] rounded-full" />
              </div>

              <h1
                className="relative text-6xl sm:text-8xl font-extrabold tracking-tight drop-shadow-[0_8px_32px_rgba(1,103,55,0.25)]"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  backgroundImage:
                    "linear-gradient(135deg, #016737 0%, #016737 45%, #8BC43F 80%, #016737 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Bio Vriksha
              </h1>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
