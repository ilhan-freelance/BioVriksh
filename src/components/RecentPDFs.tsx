"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { FileText, BookOpen, Clock, Eye } from "lucide-react";
import { useRef, useState } from "react";

const freePDFs = [
  {
    id: 1,
    subject: "Cell: The Unit of Life",
    chapter: "Chapter 8 · Class 11",
    pages: "18 pages",
    views: "4.2k views",
    readTime: "25 min read",
    accent: "#8BC43F",
  },
  {
    id: 2,
    subject: "Photosynthesis in Higher Plants",
    chapter: "Chapter 13 · Class 11",
    pages: "22 pages",
    views: "3.8k views",
    readTime: "30 min read",
    accent: "#016737",
  },
  {
    id: 3,
    subject: "Reproduction in Organisms",
    chapter: "Chapter 1 · Class 12",
    pages: "14 pages",
    views: "5.1k views",
    readTime: "20 min read",
    accent: "#8BC43F",
  },
  {
    id: 4,
    subject: "Molecular Basis of Inheritance",
    chapter: "Chapter 6 · Class 12",
    pages: "28 pages",
    views: "6.7k views",
    readTime: "40 min read",
    accent: "#016737",
  },
];

// 3D tilt card wrapper
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

// Stagger variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 18 },
  },
};

export default function RecentPDFs() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // Parallax background blob
  const blobY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  // Title slides from left
  const titleX = useTransform(scrollYProgress, [0, 0.35], [-80, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const smoothTitleX = useSpring(titleX, { stiffness: 80, damping: 18 });

  return (
    <section
      id="notes"
      ref={sectionRef}
      className="py-32 bg-white relative overflow-hidden"
    >
      {/* Parallax blob */}
      <motion.div
        style={{ y: blobY }}
        className="absolute top-0 right-[-80px] w-[500px] h-[500px] bg-[#8BC43F]/12 rounded-full blur-[130px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 bg-[#016737]/6 rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* SECTION HEADER — slides from left */}
        <motion.div
          style={{ x: smoothTitleX, opacity: titleOpacity }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 rounded-full bg-[#8BC43F]" />
            <span className="text-sm font-semibold text-[#8BC43F] uppercase tracking-[0.15em]">
              Free Resources
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#016737] leading-tight">
                Recent PDF&rsquo;s
              </h2>
              <p className="mt-3 text-[#687269] text-base md:text-lg max-w-xl leading-relaxed">
                Handcrafted NCERT notes, chapter by chapter. Download free. No login required.
              </p>
            </div>
            <motion.a
              href="#"
              whileHover={{ x: 6 }}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#016737] hover:text-[#8BC43F] transition-colors duration-200 whitespace-nowrap"
            >
              View all notes
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
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
          {freePDFs.map((pdf) => (
            <motion.div key={pdf.id} variants={cardVariants}>
              <TiltCard className="h-full">
                <div className="bg-white rounded-2xl border border-[#E8EDE8] shadow-card group cursor-pointer overflow-hidden flex flex-col h-full">
                  {/* Accent top strip */}
                  <div
                    className="h-1.5 w-full"
                    style={{ background: `linear-gradient(90deg, ${pdf.accent}, ${pdf.accent === "#8BC43F" ? "#016737" : "#8BC43F"})` }}
                  />

                  <div className="p-6 flex flex-col gap-4 flex-1">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-[#F8F9FA] group-hover:bg-[#016737]/8 flex items-center justify-center transition-colors duration-300">
                      <FileText
                        className="w-6 h-6 transition-colors duration-300 group-hover:text-[#016737]"
                        style={{ color: "#016737", strokeWidth: 1.8 }}
                      />
                    </div>

                    <div className="flex-1">
                      <p className="text-xs font-semibold text-[#8BC43F] uppercase tracking-wider mb-1.5">
                        {pdf.chapter}
                      </p>
                      <h3 className="text-base font-semibold text-[#2B2F2C] leading-snug group-hover:text-[#016737] transition-colors duration-200">
                        {pdf.subject}
                      </h3>
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-3 text-xs text-[#687269]">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" style={{ strokeWidth: 1.8 }} />
                        {pdf.pages}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" style={{ strokeWidth: 1.8 }} />
                        {pdf.readTime}
                      </span>
                      <span className="flex items-center gap-1 ml-auto">
                        <Eye className="w-3.5 h-3.5" style={{ strokeWidth: 1.8 }} />
                        {pdf.views}
                      </span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-6 pb-5 flex items-center justify-between">
                    {/* Pulsing FREE badge */}
                    <span className="badge-pulse px-3 py-1 rounded-full bg-[#8BC43F] text-white text-xs font-bold tracking-wide">
                      FREE
                    </span>

                    <motion.button
                      whileHover={{ scale: 1.07 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-shimmer text-xs font-semibold text-[#016737] border border-[#016737]/30 px-3.5 py-1.5 rounded-full hover:bg-[#014d29] hover:text-white hover:border-transparent focus:ring-2 focus:ring-[#8BC43F] transition-all duration-200"
                    >
                      Download
                    </motion.button>
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
