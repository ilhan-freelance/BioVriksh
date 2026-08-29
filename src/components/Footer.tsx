"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-[#F4F3F0] text-[#1A1A1A] pt-16 pb-8 relative overflow-hidden border-t border-gray-200">
      
      {/* Background subtle organic vector lines (Matching reference screenshot) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full text-gray-400" viewBox="0 0 1440 600" fill="none">
          <path d="M-100 100 C400 300, 800 -100, 1500 200" stroke="currentColor" strokeWidth="1.5" />
          <path d="M-50 400 C600 100, 900 500, 1500 300" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* ── TOP ESSENTIAL COLUMNS GRID (NO QUICK LINKS) ────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-16 pb-16">
          
          {/* COL 1: CONNECT */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs font-bold text-gray-400 uppercase tracking-widest">
              Connect
            </span>
            <ul className="flex flex-col gap-2 font-medium text-sm text-[#2B2F2C]">
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#016737] transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#016737] transition-colors">
                  Telegram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#016737] transition-colors">
                  YouTube
                </a>
              </li>
            </ul>
          </div>

          {/* COL 2: CONTACT / REACH OUT */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs font-bold text-gray-400 uppercase tracking-widest">
              Contact
            </span>
            <div className="flex flex-col gap-2 text-sm text-[#2B2F2C] font-medium">
              <p className="font-bold text-[#1A1A1A]">Reach out</p>
              <a href="mailto:support@biovriksha.in" className="hover:text-[#016737] transition-colors">
                support@biovriksha.in
              </a>
              <a href="tel:+919876543210" className="hover:text-[#016737] transition-colors">
                +91 98765 43210
              </a>
            </div>
          </div>

          {/* COL 3: OFFICE / LOCATION */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs font-bold text-gray-400 uppercase tracking-widest">
              Location
            </span>
            <div className="text-sm text-[#4B5563] leading-relaxed font-medium">
              <p className="font-bold text-[#1A1A1A]">BioVriksha EdTech</p>
              <p>Bangalore, Karnataka</p>
              <p>India — 560001</p>
            </div>
          </div>

        </div>

        {/* ── GIANT DISPLAY BRANDING LOGO (Matching Reference Screenshot) ── */}
        <div className="pt-6 pb-4 border-t border-gray-300/60 overflow-hidden select-none">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[140px] xl:text-[165px] font-black text-[#1A1A1A] tracking-tighter leading-none uppercase font-sans text-center sm:text-left"
          >
            BioVriksha
          </motion.h1>
        </div>

        {/* ── BOTTOM LEGAL & COPYRIGHT BAR ──────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-xs text-gray-500 font-medium border-t border-gray-200">
          <div className="flex items-center gap-4">
            <a href="#privacy" className="hover:text-[#1A1A1A] transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#terms" className="hover:text-[#1A1A1A] transition-colors">
              Terms &amp; Conditions
            </a>
          </div>

          <p className="text-center sm:text-right">
            &copy; {new Date().getFullYear()} BioVriksha EdTech. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
