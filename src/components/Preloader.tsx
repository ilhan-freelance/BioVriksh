"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import DoctorElephant from "@/components/DoctorElephant";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  // Sequence stages:
  // "elephant"  (0.0s - 2.4s): Big 3D elephant drops, squishes, bounces, waves & says "Hii!"
  // "brand"     (2.4s - 3.8s): "Bio Vriksha" brand name with gradient glow
  // "opening"   (3.8s - 5.0s): Curtains slide open revealing the main page
  const [stage, setStage] = useState<"elephant" | "brand" | "opening">("elephant");

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("biovriksha_seen_preloader")) {
      onComplete();
      return;
    }

    if (typeof window !== "undefined") {
      sessionStorage.setItem("biovriksha_seen_preloader", "true");
    }

    const timer1 = setTimeout(() => setStage("brand"), 2400);
    const timer2 = setTimeout(() => setStage("opening"), 3800);
    const timer3 = setTimeout(() => onComplete(), 5000);

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
        transition={{ duration: 1.2, ease: curtainEase }}
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
        transition={{ duration: 1.2, ease: curtainEase }}
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
          {/* ═══ STAGE 1: BIG 3D ELEPHANT JUMP ANIMATION ═══ */}
          {stage === "elephant" && (
            <motion.div
              key="elephant-stage"
              className="flex flex-col items-center justify-center"
              exit={{ scale: 0.4, opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.4 }}
            >
              {/* Big elephant drops from top, squishes on landing, bounces, waves */}
              <motion.div
                initial={{ y: -350, opacity: 0 }}
                animate={{
                  y: [-350, 20, 20, -60, 0, -25, 0],
                  scaleY: [1, 0.65, 1.15, 0.95, 1.05, 0.98, 1],
                  scaleX: [1, 1.35, 0.88, 1.05, 0.97, 1.02, 1],
                  opacity: [0, 1, 1, 1, 1, 1, 1],
                  rotate: [0, 0, -8, 10, -5, 3, 0],
                }}
                transition={{
                  duration: 2.0,
                  times: [0, 0.35, 0.5, 0.65, 0.78, 0.9, 1],
                  ease: ["easeIn", "easeInOut", "easeOut", "easeInOut", "easeOut", "easeInOut", "easeOut"],
                }}
                className="relative flex items-center justify-center"
              >
                {/* Outer ambient glow */}
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-[-40px] rounded-full bg-gradient-to-tr from-[#016737]/20 via-[#8BC43F]/15 to-[#E8A63C]/10 blur-3xl"
                />

                {/* Secondary ring glow */}
                <motion.div
                  animate={{
                    scale: [1, 1.08, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                  className="absolute inset-[-20px] rounded-full bg-gradient-to-br from-[#8BC43F]/25 to-[#016737]/15 blur-2xl"
                />

                {/* THE BIG DOCTOR ELEPHANT – takes center stage */}
                <DoctorElephant
                  className="w-80 h-80 sm:w-96 sm:h-96 md:w-[480px] md:h-[480px] drop-shadow-[0_20px_50px_rgba(1,103,55,0.3)]"
                />
              </motion.div>

              {/* Impact shadow on ground – synced with bounce */}
              <motion.div
                initial={{ scaleX: 0.15, scaleY: 0.5, opacity: 0 }}
                animate={{
                  scaleX: [0.15, 1.6, 0.7, 1.1, 0.85, 1, 0.95],
                  scaleY: [0.5, 1, 0.8, 1, 0.9, 1, 1],
                  opacity: [0, 0.5, 0.25, 0.4, 0.3, 0.35, 0.3],
                }}
                transition={{
                  duration: 2.0,
                  times: [0, 0.35, 0.5, 0.65, 0.78, 0.9, 1],
                }}
                className="w-40 h-4 bg-black/12 rounded-full blur-md -mt-2"
              />
            </motion.div>
          )}

          {/* ═══ STAGE 2: BRAND NAME "Bio Vriksha" ═══ */}
          {stage === "brand" && (
            <motion.div
              key="brand-stage"
              className="flex flex-col items-center justify-center text-center px-4"
              initial={{ y: -80, opacity: 0, filter: "blur(16px)", scale: 1.15 }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Ambient glow behind text */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[400px] h-[200px] bg-gradient-to-r from-[#016737]/15 via-[#8BC43F]/10 to-[#E8A63C]/15 blur-[80px] rounded-full" />
              </div>

              <h1
                className="relative text-7xl md:text-9xl font-extrabold tracking-tight drop-shadow-[0_8px_32px_rgba(1,103,55,0.25)]"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  backgroundImage:
                    "linear-gradient(135deg, #016737 0%, #016737 40%, #8BC43F 70%, #E8A63C 100%)",
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
