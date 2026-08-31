"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderTree,
  FileText,
  ShoppingCart,
  Users,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If on admin login page, render without sidebar shell
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      router.push("/admin/login");
    }
  };

  const navItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Chapters", href: "/admin/chapters", icon: FolderTree },
    { name: "PDF Notes", href: "/admin/pdfs", icon: FileText },
    { name: "Orders Log", href: "/admin/orders", icon: ShoppingCart },
    { name: "Students", href: "/admin/students", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#0B0F17] text-gray-100 font-sans flex flex-col md:flex-row select-none">
      {/* ═══ DESKTOP SIDEBAR ═══ */}
      <aside className="hidden md:flex flex-col w-64 bg-[#131B2A] border-r border-gray-800 p-5 shrink-0 justify-between">
        <div>
          {/* Brand */}
          <div className="flex items-center gap-3 pb-6 border-b border-gray-800/80 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#016737] flex items-center justify-center text-[#8BC43F] shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-extrabold text-sm text-white tracking-tight leading-tight">
                Bio Vriksha
              </h2>
              <span className="text-[10px] font-extrabold text-[#8BC43F] uppercase tracking-wider bg-[#8BC43F]/10 px-2 py-0.5 rounded-full border border-[#8BC43F]/30">
                Admin Panel
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? "bg-[#016737] text-white shadow-md"
                      : "text-gray-400 hover:bg-gray-800/80 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-gray-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between w-full px-3.5 py-2 rounded-xl bg-gray-900/60 hover:bg-gray-800 text-xs font-semibold text-gray-300 transition-colors border border-gray-800"
          >
            <span>Public Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center justify-between w-full px-3.5 py-2 rounded-xl bg-rose-950/40 hover:bg-rose-950/80 text-rose-300 text-xs font-semibold transition-colors border border-rose-900/40"
          >
            <span>Sign Out</span>
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>

      {/* ═══ MOBILE TOP HEADER ═══ */}
      <div className="md:hidden bg-[#131B2A] border-b border-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-[#8BC43F]" />
          <span className="font-black text-sm text-white">Bio Vriksha Admin</span>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl bg-gray-800 text-gray-200"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#131B2A] border-b border-gray-800 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive ? "bg-[#016737] text-white" : "text-gray-400 hover:bg-gray-800"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}

          <div className="pt-3 border-t border-gray-800 flex gap-2">
            <Link
              href="/"
              target="_blank"
              className="flex-1 py-2 text-center rounded-xl bg-gray-800 text-xs font-bold text-gray-300"
            >
              Public Site ↗
            </Link>
            <button
              onClick={handleLogout}
              className="flex-1 py-2 text-center rounded-xl bg-rose-950 text-xs font-bold text-rose-300"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* ═══ MAIN CONTENT AREA ═══ */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-[#131B2A]/50 border-b border-gray-800/80 sticky top-0 z-30 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-semibold">Admin Panel</span>
            <span className="text-gray-600">/</span>
            <span className="text-xs font-bold text-white capitalize">
              {pathname === "/admin" ? "Overview" : pathname.replace("/admin/", "")}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-full flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live System Connected</span>
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
