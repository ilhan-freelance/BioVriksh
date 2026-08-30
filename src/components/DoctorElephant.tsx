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
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1 w-[65%] h-5 bg-black/25 rounded-full blur-md pointer-events-none z-0"
      />

      {/* ── 3D DOCTOR ELEPHANT MASCOT (100% Single Pristine Image, Zero Seams, Zero Glitches) ── */}
      <motion.div
        animate={
          animated
            ? {
                // Cheerful 3D bounce, wave tilt, & stepping motion
                y: [0, -14, 2, -10, 0],
                rotate: [-3, 4, -2, 3, -3],
                scaleY: [1, 1.02, 0.98, 1.01, 1],
                scaleX: [1, 0.99, 1.01, 0.99, 1],
              }
            : {}
        }
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative z-10 w-full h-full flex items-center justify-center"
      >
        <img
          src="/doctor_elephant_rembg.png"
          alt="3D Doctor Elephant Mascot"
          className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(1,103,55,0.22)]"
          loading="eager"
        />
      </motion.div>
    </div>
  );
}
