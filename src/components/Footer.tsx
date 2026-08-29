"use client";

import { motion } from "framer-motion";
import { Leaf, Mail, Phone, MapPin, Send } from "lucide-react";

// Inline SVGs for brand icons removed from newer lucide-react versions
const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Youtube = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <polygon points="10 15 15 12 10 9" />
  </svg>
);


const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Chapters", href: "#notes" },
  { label: "Founder Story", href: "#founder" },
  { label: "Notes", href: "#notes" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Login / Register", href: "#login" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Terms & Conditions", href: "#terms" },
  { label: "Refund & Cancellation Policy", href: "#refund" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function Footer() {
  return (
    <footer className="bg-[#016737] text-white relative overflow-hidden">
      {/* Top Separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8BC43F]/40 to-transparent" />

      {/* Decorative blobs inside footer */}
      <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-[#8BC43F]/8 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-80 bg-white/3 rounded-full blur-[100px] pointer-events-none" />
      {/* Subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(white_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* ── MAIN FOOTER GRID ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pt-16 pb-12"
        >
          {/* ── COL 1: BRAND ── */}
          <motion.div variants={itemVariants} className="flex flex-col gap-5">
            {/* Logo */}
            <a href="#home" className="inline-flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#8BC43F] flex items-center justify-center flex-shrink-0 shadow-lg">
                <Leaf className="w-5 h-5 text-[#016737] stroke-[2.5]" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Bio <span className="text-[#8BC43F]">Vriksha</span>
              </span>
            </a>

            {/* Tagline */}
            <p className="text-white/65 text-sm leading-relaxed max-w-[220px]">
              Master NEET Biology, root by root. Free notes. Focused practice.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-1">
              {[
                {
                  icon: <Instagram className="w-4 h-4" />,
                  label: "Instagram",
                  href: "#instagram",
                  color: "hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500",
                },
                {
                  icon: <Youtube className="w-4 h-4" />,
                  label: "YouTube",
                  href: "#youtube",
                  color: "hover:bg-red-600",
                },
                {
                  icon: <Send className="w-4 h-4" />,
                  label: "Telegram",
                  href: "#telegram",
                  color: "hover:bg-sky-500",
                },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white/70 hover:text-white border border-white/10 transition-all duration-200 ${social.color}`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── COL 2: QUICK LINKS ── */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-[0.12em] text-[#8BC43F]">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/65 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200 group"
                  >
                    <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200 opacity-0 group-hover:opacity-100 text-[#8BC43F]">›</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── COL 3: LEGAL ── */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-[0.12em] text-[#8BC43F]">
              Legal
            </h4>
            <ul className="flex flex-col gap-2.5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/65 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200 group"
                  >
                    <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200 opacity-0 group-hover:opacity-100 text-[#8BC43F]">›</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* App availability notice */}
            <div className="mt-4 px-4 py-3 rounded-xl bg-white/6 border border-white/10 text-xs text-white/50 leading-relaxed">
              📱 Mobile app launching soon on Android & iOS
            </div>
          </motion.div>

          {/* ── COL 4: CONTACT ── */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-[0.12em] text-[#8BC43F]">
              Contact & Support
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-3.5 h-3.5 text-[#8BC43F]" />
                </div>
                <div>
                  <p className="text-[11px] text-white/40 uppercase tracking-wider mb-0.5">Email</p>
                  <a href="mailto:support@biovriksha.in" className="text-sm text-white/80 hover:text-white transition-colors duration-200">
                    support@biovriksha.in
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-3.5 h-3.5 text-[#8BC43F]" />
                </div>
                <div>
                  <p className="text-[11px] text-white/40 uppercase tracking-wider mb-0.5">WhatsApp / Phone</p>
                  <a href="tel:+919876543210" className="text-sm text-white/80 hover:text-white transition-colors duration-200">
                    +91 98765 43210
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#8BC43F]" />
                </div>
                <div>
                  <p className="text-[11px] text-white/40 uppercase tracking-wider mb-0.5">Address</p>
                  <p className="text-sm text-white/80 leading-relaxed">
                    Bio Vriksha EdTech Pvt. Ltd.<br />
                    Bangalore, Karnataka — 560001
                  </p>
                </div>
              </li>
            </ul>

            {/* Payment Methods */}
            <div className="mt-2">
              <p className="text-[11px] text-white/40 uppercase tracking-wider mb-2">Accepted Payments</p>
              <div className="flex flex-wrap items-center gap-2">
                {["UPI", "Cards", "Net Banking", "Wallets"].map((method) => (
                  <span
                    key={method}
                    className="text-[10px] font-semibold px-2.5 py-1 rounded-md bg-white/10 border border-white/15 text-white/70"
                  >
                    {method}
                  </span>
                ))}
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-md bg-[#8BC43F]/20 border border-[#8BC43F]/30 text-[#8BC43F]">
                  🔒 Razorpay Secured
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── BOTTOM BAR ── */}
        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
          <p className="text-white/45 text-center md:text-left">
            © {new Date().getFullYear()} Bio Vriksha EdTech Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-white/40 text-xs">
            <span>Made with</span>
            <span className="text-[#8BC43F]">🌿</span>
            <span>for every NEET aspirant in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
