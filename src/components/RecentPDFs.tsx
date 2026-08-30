"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { FileText, Eye, Lock, ShieldCheck, X, BookOpen } from "lucide-react";
import { useRef, useState } from "react";

const recentNotesList = [
  {
    id: 1,
    subject: "Cell: The Unit of Life",
    chapter: "Chapter 8 · Class 11",
    pages: "18 pages",
    views: "4.2k views",
    isPaid: false,
    price: "FREE",
    image: "/hero_premium_clean.png",
    accent: "#8BC43F",
  },
  {
    id: 2,
    subject: "Photosynthesis in Higher Plants",
    chapter: "Chapter 13 · Class 11",
    pages: "22 pages",
    views: "3.8k views",
    isPaid: true,
    price: "₹49",
    image: "/hero_premium_clean.png",
    accent: "#016737",
  },
  {
    id: 3,
    subject: "Reproduction in Organisms",
    chapter: "Chapter 1 · Class 12",
    pages: "14 pages",
    views: "5.1k views",
    isPaid: false,
    price: "FREE",
    image: "/hero_premium_clean.png",
    accent: "#8BC43F",
  },
  {
    id: 4,
    subject: "Molecular Basis of Inheritance",
    chapter: "Chapter 6 · Class 12",
    pages: "28 pages",
    views: "6.7k views",
    isPaid: true,
    price: "₹49",
    image: "/hero_premium_clean.png",
    accent: "#016737",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 18 },
  },
};

export default function RecentPDFs() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedNote, setSelectedNote] = useState<(typeof recentNotesList)[0] | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  const titleOpacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);

  return (
    <section
      id="notes"
      ref={sectionRef}
      className="py-24 sm:py-32 bg-white relative overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute top-0 right-[-80px] w-[500px] h-[500px] bg-[#8BC43F]/12 rounded-full blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* SECTION HEADER — Clean Responsive Fade (No Left Cut-Off) */}
        <motion.div
          style={{ opacity: titleOpacity }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1 h-7 rounded-full bg-[#016737]" />
              <span className="text-xs sm:text-sm font-semibold text-[#016737] uppercase tracking-[0.15em]">
                Recent Study Notes
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111827] leading-tight">
              Recent Notes
            </h2>
            <p className="mt-2 text-[#687269] text-sm sm:text-base max-w-xl">
              Explore chapter notes and question sets freshly updated for NEET.
            </p>
          </div>

          <a
            href="/chapters"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#016737] hover:text-[#014d29] transition-colors"
          >
            <span>View All Chapters</span>
            <BookOpen className="w-4 h-4" />
          </a>
        </motion.div>

        {/* CARDS GRID — 50/50 Image Top Half & Details Bottom Half */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {recentNotesList.map((note) => (
            <motion.div
              key={note.id}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl border border-gray-200 hover:border-[#016737]/40 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full group"
            >
              {/* TOP 50% — BIOLOGY THUMBNAIL IMAGE BANNER */}
              <div className="h-40 relative overflow-hidden bg-gradient-to-br from-[#016737]/10 to-[#8BC43F]/20">
                <img
                  src={note.image}
                  alt={note.subject}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Price / Free Badge */}
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold shadow-xs ${
                      note.isPaid
                        ? "bg-[#016737] text-white"
                        : "bg-[#8BC43F] text-[#111827]"
                    }`}
                  >
                    {note.price}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-[11px] font-bold text-white/90 uppercase tracking-wider bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md">
                    {note.chapter}
                  </span>
                </div>
              </div>

              {/* BOTTOM 50% — DETAILS & SECURE READER BUTTON */}
              <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                <div>
                  <h3 className="text-base font-bold text-[#111827] leading-snug group-hover:text-[#016737] transition-colors">
                    {note.subject}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-2">
                    <span>{note.pages}</span>
                    <span>•</span>
                    <span>{note.views}</span>
                  </p>
                </div>

                <button
                  onClick={() => setSelectedNote(note)}
                  className="w-full py-2.5 rounded-xl border border-[#016737] text-[#016737] text-xs font-bold hover:bg-[#016737] hover:text-white transition-all flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Note</span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── SECURE NOTE READER MODAL (Protected Screenshots/Recording Notice) ── */}
      {selectedNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-gray-200">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#016737] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#8BC43F]" />
                <span className="text-sm font-bold tracking-wide">
                  Protected Secure Viewer
                </span>
              </div>
              <button
                onClick={() => setSelectedNote(null)}
                className="p-1 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Protection Notice Banner */}
            <div className="bg-amber-50 border-b border-amber-200/80 px-6 py-2.5 flex items-center justify-between text-xs text-amber-800 font-medium">
              <span>🔒 Screen Recording &amp; Downloads are strictly disabled for content security.</span>
              <span className="font-bold text-amber-900">Protected Mode</span>
            </div>

            {/* Note Content Viewer */}
            <div className="p-6 overflow-y-auto flex-1 bg-gray-50 flex flex-col items-center justify-center min-h-[320px] text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#016737]/10 flex items-center justify-center text-[#016737] mb-4">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedNote.subject}</h3>
              <p className="text-xs font-semibold text-[#016737] mb-4">{selectedNote.chapter}</p>
              
              <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-md w-full text-left space-y-3 shadow-xs">
                <p className="text-xs text-gray-600 leading-relaxed">
                  ✓ High-density NCERT key points &amp; diagrams preview mode.
                </p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  ✓ Complete exam summary structured chapter-by-chapter.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3.5 bg-white border-t border-gray-200 flex items-center justify-between">
              <span className="text-xs text-gray-500 font-semibold">{selectedNote.price} • {selectedNote.pages}</span>
              <button
                onClick={() => setSelectedNote(null)}
                className="px-5 py-1.5 rounded-full bg-[#016737] text-white text-xs font-bold hover:bg-[#014d29] transition-colors"
              >
                Close Viewer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
