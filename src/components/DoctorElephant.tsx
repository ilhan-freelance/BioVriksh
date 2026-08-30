"use client";

import { motion } from "framer-motion";

interface DoctorElephantProps {
  className?: string;
  animated?: boolean;
}

/**
 * 3D Doctor Elephant Mascot with Pure Hand Waving Motion (Zero Cloth Distortion).
 * Base 3D model remains 100% clean and pristine.
 * Only the elephant hand paw itself rotates at the wrist for an authentic wave greeting.
 */
export default function DoctorElephant({
  className = "",
  animated = true,
}: DoctorElephantProps) {
  return (
    <div className={`relative inline-flex flex-col items-center justify-center select-none ${className}`}>
      {/* ── GROUND CONTACT SHADOW ── */}
      <motion.div
        animate={
          animated
            ? {
                scaleX: [1, 1.12, 0.92, 1.1, 1],
                opacity: [0.15, 0.26, 0.15, 0.24, 0.15],
              }
            : {}
        }
        transition={{
          duration: 1.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1 w-[65%] h-5 bg-black/25 rounded-full blur-md pointer-events-none z-0"
      />

      {/* ── 3D CHARACTER CONTAINER WITH GENTLE BODY BOUNCE ── */}
      <motion.div
        animate={
          animated
            ? {
                // Gentle body bounce & stepping motion
                y: [0, -14, 2, -10, 0],
                rotate: [-1.5, 1.5, -1, 1, -1.5],
                scaleY: [1, 1.02, 0.98, 1.01, 1],
              }
            : {}
        }
        transition={{
          duration: 1.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative z-10 w-full h-full flex items-center justify-center"
      >
        {/* 1. CLEAN BODY (Hand area erased on body layer so zero double-hand ghosting occurs) */}
        <img
          src="/doctor_elephant_body_no_hand.png"
          alt="3D Doctor Elephant Mascot"
          className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(1,103,55,0.18)]"
          loading="eager"
        />

        {/* 2. ISOLATED WAVING HAND OVERLAY ("Hii!" Wave Motion) */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            transformOrigin: "72% 52%", // Arm / wrist joint pivot point
          }}
          animate={
            animated
              ? {
                  // Natural "Hii!" hand wave back & forth at joint
                  rotate: [-14, 18, -10, 22, -14],
                  scale: [0.98, 1.04, 0.96, 1.03, 0.98],
                }
              : {}
          }
          transition={{
            duration: 0.85,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none z-20"
        >
          <img
            src="/doctor_elephant_hand_only_clean.png"
            alt="Waving Hand"
            className="w-full h-full object-contain"
            loading="eager"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
