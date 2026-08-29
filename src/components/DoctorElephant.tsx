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

      {/* ── 3D CHARACTER CONTAINER WITH LEG STEPPING ── */}
      <motion.div
        animate={
          animated
            ? {
                // Leg stepping & bounce (moves whole body up & down cleanly)
                y: [0, -16, 2, -12, 0],
                rotate: [-2, 2, -1, 1, -2],
                scaleY: [1, 1.03, 0.97, 1.02, 1],
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
        {/* 1. CLEAN BASE 3D MODEL (Doctor coat, stethoscope, legs, body 100% stable) */}
        <img
          src="/doctor_elephant_transparent.png"
          alt="3D Doctor Elephant Mascot"
          className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(1,103,55,0.18)]"
          loading="eager"
        />

        {/* 2. PURE HAND WAVING LAYER (Only the hand paw waves at wrist, zero cloth motion) */}
        <motion.div
          style={{
            position: "absolute",
            top: "47.8%",
            left: "59.8%",
            width: "20.4%",
            height: "13.2%",
            transformOrigin: "35% 75%", // Wrist joint pivot
          }}
          animate={
            animated
              ? {
                  // Pure hand wave back and forth at the wrist
                  rotate: [-18, 26, -14, 30, -18],
                  scale: [0.98, 1.08, 0.95, 1.06, 0.98],
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
            src="/doctor_elephant_hand_only.png"
            alt="Waving Hand Paw"
            className="w-full h-full object-contain"
            loading="eager"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
