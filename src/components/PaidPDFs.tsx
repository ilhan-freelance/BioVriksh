"use client";

import { useCheckout } from "@/hooks/useCheckout";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Lock, Target, Timer, BarChart2, CheckCircle, Sparkles, Flame } from "lucide-react";
import { useRef, useState } from "react";

const paidPDFs = [
  {
    id: 1,
    subject: "Cell Division & Cell Cycle",
    chapter: "Chapter 10 · Class 11",
    questions: 120,
    difficulty: "Medium",
    difficultyColor: "#F59E0B",
    time: "90 min",
    price: "₹49",
    topics: ["Mitosis", "Meiosis", "Checkpoints"],
    tag: "Bestseller",
    tagColor: "bg-amber-500",
    gradient: "from-amber-50 to-orange-50",
  },
  {
    id: 2,
    subject: "Human Reproduction",
    chapter: "Chapter 3 · Class 12",
    questions: 150,
    difficulty: "Hard",
    difficultyColor: "#EF4444",
    time: "110 min",
    price: "₹49",
    topics: ["Gametogenesis", "Fertilisation", "Implantation"],
    tag: "Most Tested",
    tagColor: "bg-red-500",
    gradient: "from-red-50 to-rose-50",
  },
  {
    id: 3,
    subject: "Ecology & Environment",
    chapter: "Chapter 13 & 14 · Class 12",
    questions: 200,
    difficulty: "Medium",
    difficultyColor: "#F59E0B",
    time: "120 min",
    price: "₹79",
    topics: ["Ecosystem", "Biodiversity", "Pollution"],
    tag: "High Weightage",
    tagColor: "bg-[#016737]",
    gradient: "from-green-50 to-emerald-50",
  },
  {
    id: 4,
    subject: "Genetics & Evolution Mega Pack",
    chapter: "Ch. 5–7 · Class 12",
    questions: 300,
    difficulty: "Hard",
    difficultyColor: "#EF4444",
    time: "180 min",
    price: "₹129",
    topics: ["Mendel's Laws", "DNA Replication", "Evolution"],
    tag: "🔥 Combo Pack",
    tagColor: "bg-[#8BC43F]",
    gradient: "from-lime-50 to-green-50",
  },
];

// 3D tilt card
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 16;
    setTilt({ x, y });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
      style={{
        transform: hovered
          ? `perspective(900px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(1.03)`
          : "perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)",
        transition: hovered ? "transform 0.08s linear" : "transform 0.5s ease",
        willChange: "transform",
      }}
      className={className}
    >
      {children}
    </div>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { y: 70, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 18 },
  },
};

export default function PaidPDFs() {
  const { handleCheckout } = useCheckout();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const blobY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const titleX = useTransform(scrollYProgress, [0, 0.4], [-80, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const smoothTitleX = useSpring(titleX, { stiffness: 80, damping: 18 });

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="py-32 bg-white relative overflow-hidden"
    >
      {/* Mesh gradient + blobs */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(at 70% 20%, rgba(139,196,63,0.09) 0px, transparent 55%), radial-gradient(at 10% 80%, rgba(1,103,55,0.07) 0px, transparent 50%)",
        }}
        aria-hidden="true"
      />
      <motion.div
        style={{ y: blobY }}
        className="absolute bottom-[-60px] left-[-60px] w-[550px] h-[420px] bg-[#016737]/8 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-16 right-[-40px] w-80 h-80 bg-[#8BC43F]/10 rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Separator */}
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#8BC43F]/30 to-transparent" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* SECTION HEADER — slides from left */}
        <motion.div
          style={{ x: smoothTitleX, opacity: titleOpacity }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 rounded-full bg-[#8BC43F]" />
            <span className="text-sm font-semibold text-[#8BC43F] uppercase tracking-[0.15em]">
              Premium Practice
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#016737] leading-tight">
                Paid Notes
              </h2>
              <p className="mt-3 text-[#687269] text-base md:text-lg max-w-xl leading-relaxed">
                High-density question banks crafted by NEET toppers. Pay once, practice infinitely.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#016737]/8 border border-[#016737]/15 text-[#016737] text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              Starting at ₹49 only
            </div>
          </div>
        </motion.div>

        {/* CARDS GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {paidPDFs.map((pdf) => (
            <motion.div
              key={pdf.id}
              variants={cardVariants}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <div className="bg-white rounded-2xl border border-gray-200 hover:border-[#016737]/30 group cursor-pointer overflow-hidden flex flex-col h-full transition-all duration-200">
                {/* Accent top line */}
                <div className="h-1 w-full bg-[#016737]" />

                {/* Card body */}
                <div className="p-6 flex flex-col gap-4 flex-1">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <p className="text-xs font-semibold text-[#016737] uppercase tracking-wider">
                        {pdf.chapter}
                      </p>
                      <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                        {pdf.price}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#111827] leading-snug group-hover:text-[#016737] transition-colors duration-200">
                      {pdf.subject}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {pdf.topics.map((topic) => (
                      <span
                        key={topic}
                        className="text-[10px] font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-1.5 mt-auto pt-2 border-t border-gray-100">
                    {["NCERT Chapter Notes", "Practice Question Set"].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                        <CheckCircle className="w-3.5 h-3.5 text-[#016737] flex-shrink-0" style={{ strokeWidth: 2.2 }} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA footer */}
                <div className="px-6 pb-5 pt-1">
                  <button
                    onClick={() => handleCheckout(pdf.price, `paid-pdf-${pdf.id}`)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#016737] text-white text-xs font-bold group-hover:bg-[#014d29] transition-all duration-200"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Unlock {pdf.price}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 rounded-2xl bg-gradient-to-r from-[#016737]/[0.04] to-[#8BC43F]/[0.06] border border-[#8BC43F]/20 px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="text-center md:text-left">
            <p className="font-bold text-[#2B2F2C] text-lg">
              Not sure yet?{" "}
              <span className="text-[#016737]">Try a free sample first.</span>
            </p>
            <p className="text-sm text-[#687269] mt-1">
              Every paid note set comes with a free 20-question preview — no login required.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 12px 32px rgba(139,196,63,0.35)" }}
            whileTap={{ scale: 0.97 }}
            className="btn-shimmer px-7 py-3 rounded-full bg-[#8BC43F] text-[#2B2F2C] font-semibold text-sm whitespace-nowrap shadow-md"
          >
            View Free Samples
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
