"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Leaf, RotateCcw } from "lucide-react";
import { useState, useEffect } from "react";

interface NavbarProps {
  onReplayPreloader?: () => void;
}

export default function Navbar({ onReplayPreloader }: NavbarProps) {
  const [activeTab, setActiveTab] = useState("Home");
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll for dynamic glass intensity
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Notes", href: "#notes" },
    { name: "Pricing", href: "#pricing" },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40 px-4 md:px-6 py-4 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(255,255,255,0.0)" : "transparent",
      }}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="max-w-7xl mx-auto rounded-2xl px-6 py-3.5 flex items-center justify-between border transition-all duration-500"
        style={{
          background: scrolled ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.65)",
          backdropFilter: scrolled ? "blur(24px) saturate(200%)" : "blur(16px) saturate(160%)",
          WebkitBackdropFilter: scrolled ? "blur(24px) saturate(200%)" : "blur(16px) saturate(160%)",
          boxShadow: scrolled
            ? "0 10px 40px rgba(1,103,55,0.1), 0 0 0 1px rgba(255,255,255,0.6) inset"
            : "0 4px 16px rgba(1,103,55,0.05)",
          borderColor: scrolled ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.5)",
        }}
      >
        {/* LOGO */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-[#016737] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-300">
            <Leaf className="w-5 h-5 text-[#8BC43F] stroke-[2.5]" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#016737] font-sans">
            Bio <span className="text-[#8BC43F]">Vriksha</span>
          </span>
        </a>

        {/* MIDDLE NAV LINKS */}
        <nav className="hidden md:flex items-center gap-1 bg-[#F8F9FA]/80 p-1.5 rounded-full border border-gray-200/50">
          {navLinks.map((link) => {
            const isActive = activeTab === link.name;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setActiveTab(link.name)}
                className={`relative px-5 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                  isActive ? "text-[#016737]" : "text-[#687269] hover:text-[#2B2F2C]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavBg"
                    className="absolute inset-0 rounded-full bg-white shadow-sm border border-gray-200/60"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* RIGHT SIDE ACTIONS */}
        <div className="flex items-center gap-3">
          {/* Optional Replay Preloader Button */}
          {onReplayPreloader && (
            <motion.button
              onClick={onReplayPreloader}
              title="Replay Intro Curtain Animation"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-full text-[#687269] hover:text-[#016737] hover:bg-[#F8F9FA] transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </motion.button>
          )}

          {/* SEARCH BUTTON */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 rounded-full text-[#2B2F2C] hover:text-[#016737] hover:bg-[#F8F9FA] transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5 stroke-[2]" />
          </motion.button>

          {/* LOGIN BUTTON */}
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#016737", color: "#FFFFFF" }}
            whileTap={{ scale: 0.96 }}
            className="px-5 py-2 rounded-full border-2 border-[#016737] text-[#016737] text-sm font-semibold transition-all duration-300 shadow-sm"
          >
            Login
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
