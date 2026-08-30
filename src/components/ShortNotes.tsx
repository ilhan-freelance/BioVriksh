"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { FileText, Clock, BookOpen, Sparkles } from "lucide-react";
import { useRef, useState } from "react";

const shortNotes = [
  {
    id: 1,
    title: "Botany One-Pager",
    subtitle: "Cell Biology",
    pages: "1 page",
    readTime: "5 min",
    color: "bg-emerald-50",
    accent: "#016737",
  },
  {
    id: 2,
    title: "Photosynthesis Cheatsheet",
    subtitle: "Plant Physiology",
    pages: "1 page",
    readTime: "4 min",
    color: "bg-lime-50",
    accent: "#8BC43F",
  },
  {
    id: 3,
    title: "DNA Replication Flowchart",
    subtitle: "Molecular Biology",
    pages: "1 page",
    readTime: "6 min",
    color: "bg-green-50",
    accent: "#016737",
  },
  {
    id: 4,
    title: "Human Heart Diagram",
    subtitle: "Zoology",
    pages: "1 page",
    readTime: "5 min",
    color: "bg-teal-50",
    accent: "#8BC43F",
  },
  {
    id: 5,
    title: "Mendel's Laws Quick Ref",
    subtitle: "Genetics",
    pages: "1 page",
    readTime: "4 min",
    color: "bg-emerald-50",
    accent: "#016737",
  },
  {
    id: 6,
    title: "Ecosystem Summary",
    subtitle: "Ecology",
    pages: "1 page",
    readTime: "5 min",
    color: "bg-lime-50",
    accent: "#8BC43F",
  },
  {
    id: 7,
    title: "Respiration at a Glance",
    subtitle: "Biochemistry",
    pages: "1 page",
    readTime: "4 min",
    color: "bg-green-50",
    accent: "#016737",
  },
  {
    id: 8,
    title: "Reproduction Flowchart",
    subtitle: "Human Physiology",
    pages: "1 page",
    readTime: "5 min",
    color: "bg-teal-50",
    accent: "#8BC43F",
  },
];

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 14;
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
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { y: 48, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100, damping: 18 } },
};

export default function ShortNotes() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleX = useTransform(scrollYProgress, [0, 0.35], [-70, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const smoothTitleX = useSpring(titleX, { stiffness: 80, damping: 18 });

  return (
    <section ref={sectionRef} className="py-32 bg-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[350px] bg-[#8BC43F]/8 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#016737]/6 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#8BC43F]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* SECTION HEADER */}
        <motion.div
          style={{ x: smoothTitleX, opacity: titleOpacity }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 rounded-full bg-[#8BC43F]" />
            <span className="text-sm font-semibold text-[#8BC43F] uppercase tracking-[0.15em]">
              Quick Revision
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#016737] leading-tight tracking-tight">
                Short Notes{" "}
                <span className="text-[#2B2F2C] font-light italic text-3xl md:text-4xl">
                  (Free)
                </span>
              </h2>
              <p className="mt-3 text-[#687269] text-base md:text-lg max-w-xl leading-relaxed">
                One-pager cheatsheets designed for last-minute revision. No fluff, pure concepts.
              </p>
            </div>
            <motion.a
              href="#"
              whileHover={{ x: 6 }}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#016737] hover:text-[#8BC43F] transition-colors duration-200 whitespace-nowrap"
            >
              Browse all short notes
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
          </div>
        </motion.div>

        {/* GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {shortNotes.map((note) => (
            <motion.div key={note.id} variants={cardVariants}>
              <TiltCard className="h-full">
                <div
                  className="bg-white rounded-2xl border border-[#E8EDE8] p-5 flex flex-col gap-4 cursor-pointer group transition-colors duration-300 shadow-card h-full justify-between"
                >
                  <div className="flex flex-col gap-3">
                    {/* Icon Block */}
                    <div
                      className={`w-11 h-11 rounded-xl ${note.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <FileText
                        className="w-5 h-5"
                        style={{ color: note.accent, strokeWidth: 1.8 }}
                      />
                    </div>

                    {/* Text */}
                    <div>
                      <p className="text-[11px] font-semibold text-[#8BC43F] uppercase tracking-wider mb-1">
                        {note.subtitle}
                      </p>
                      <h3 className="text-sm font-semibold text-[#2B2F2C] leading-snug group-hover:text-[#016737] transition-colors duration-200">
                        {note.title}
                      </h3>
                    </div>
                  </div>

                  {/* Meta + Pulsing FREE Badge */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#F0F4F0]">
                    <div className="flex items-center gap-3 text-xs text-[#687269]">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" style={{ strokeWidth: 1.8 }} />
                        {note.pages}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" style={{ strokeWidth: 1.8 }} />
                        {note.readTime}
                      </span>
                    </div>
                    <span className="badge-pulse px-2.5 py-0.5 rounded-full bg-[#8BC43F] text-white text-[10px] font-bold tracking-wide">
                      FREE
                    </span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
