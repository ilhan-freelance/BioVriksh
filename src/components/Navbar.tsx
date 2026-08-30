"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Leaf, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Detect scroll for dynamic glass intensity
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { name: "Notes", href: "/#notes" },
    { name: "Pricing", href: "/#pricing" },
    { name: "Chapters", href: "/chapters", isHighlight: true },
    { name: "About Us", href: "/#about" },
    { name: "Founder's Story", href: "/#founder-story" },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40 px-3 md:px-6 py-3 md:py-4 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(255,255,255,0.0)" : "transparent",
      }}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="max-w-7xl mx-auto rounded-2xl px-4 md:px-6 py-3 flex items-center justify-between border transition-all duration-500 gap-2 relative"
        style={{
          background: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.85)",
          backdropFilter: "blur(24px) saturate(200%)",
          WebkitBackdropFilter: "blur(24px) saturate(200%)",
          boxShadow: scrolled
            ? "0 10px 40px rgba(1,103,55,0.1), 0 0 0 1px rgba(255,255,255,0.6) inset"
            : "0 4px 16px rgba(1,103,55,0.05)",
          borderColor: scrolled ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.5)",
        }}
      >
        {/* LOGO */}
        <a href="/#home" className="flex items-center gap-2.5 group shrink-0">
          <img
            src="/logo.jpg"
            alt="Bio Vriksha Logo"
            className="w-9 h-9 sm:w-10 sm:h-10 object-contain rounded-xl shadow-xs group-hover:scale-105 transition-transform duration-300"
          />
          <span className="text-lg md:text-xl font-bold tracking-tight text-[#016737] font-sans">
            Bio <span className="text-[#8BC43F]">Vriksha</span>
          </span>
        </a>

        {/* MIDDLE NAV LINKS — Desktop */}
        <nav className="hidden lg:flex items-center justify-center mx-auto gap-8">
          {navLinks.map((link) => {
            const isActive = activeTab === link.name;
            const isChapters = link.name === "Chapters";
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setActiveTab(link.name)}
                className={`relative text-xs lg:text-sm transition-colors duration-200 whitespace-nowrap ${
                  isChapters
                    ? "text-[#8BC43F] font-bold hover:text-[#016737]"
                    : isActive
                    ? "text-[#016737] font-bold"
                    : "text-[#4B5563] font-semibold hover:text-[#016737]"
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* RIGHT SIDE ACTIONS */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* SEARCH BUTTON */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 sm:p-2.5 rounded-full text-[#2B2F2C] hover:text-[#016737] hover:bg-[#F8F9FA] transition-colors"
            aria-label="Search"
          >
            <Search className="w-4 sm:w-5 h-4 sm:h-5 stroke-[2]" />
          </motion.button>

          {/* LOGIN BUTTON */}
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#016737", color: "#FFFFFF" }}
            whileTap={{ scale: 0.96 }}
            className="hidden sm:block px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border-2 border-[#016737] text-[#016737] text-xs sm:text-sm font-semibold transition-all duration-300 shadow-sm"
          >
            Login
          </motion.button>

          {/* MOBILE HAMBURGER TOGGLE BUTTON */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-[#016737] hover:bg-gray-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE NAV DROPDOWN MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden max-w-7xl mx-auto mt-2 rounded-2xl bg-white/95 backdrop-blur-2xl border border-gray-200/80 p-4 shadow-xl flex flex-col gap-3"
          >
            {navLinks.map((link) => {
              const isChapters = link.name === "Chapters";
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    setActiveTab(link.name);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    isChapters
                      ? "bg-[#8BC43F]/15 text-[#016737] border border-[#8BC43F]/30"
                      : "text-gray-700 hover:bg-gray-50 hover:text-[#016737]"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}

            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl bg-[#016737] text-white text-xs font-bold text-center shadow-sm"
              >
                Login
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
