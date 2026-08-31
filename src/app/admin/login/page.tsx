"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, Mail, ArrowRight, Sparkles, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        throw new Error(authError.message);
      }

      if (data?.user) {
        // Verify role in profiles
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", data.user.id)
          .single();

        if (profile?.role !== "admin") {
          await supabase.auth.signOut();
          throw new Error("Access Denied: You do not have administrator permissions.");
        }

        router.push("/admin");
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || "Invalid admin credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-white flex items-center justify-center p-4 font-sans relative overflow-hidden select-none">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#016737]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8BC43F]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-[#131B2A]/90 border border-gray-800 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[#016737]/20 border border-[#8BC43F]/30 text-[#8BC43F] flex items-center justify-center mx-auto mb-4 shadow-inner">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white flex items-center justify-center gap-2">
            <span>Bio Vriksha Admin</span>
            <span className="text-[10px] font-extrabold bg-[#8BC43F]/20 text-[#8BC43F] border border-[#8BC43F]/40 px-2 py-0.5 rounded-full uppercase tracking-wider">
              CMS Portal
            </span>
          </h1>
          <p className="text-xs text-gray-400 mt-1.5 font-medium">
            Sign in with authorized administrator credentials to manage courses, PDFs, orders, and students.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-950/80 border border-rose-800/60 text-rose-300 text-xs font-semibold flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1.5 uppercase tracking-wider">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@biovriksha.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-900/80 border border-gray-700/80 text-white placeholder-gray-500 text-xs font-medium focus:outline-none focus:border-[#8BC43F] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1.5 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-900/80 border border-gray-700/80 text-white placeholder-gray-500 text-xs font-medium focus:outline-none focus:border-[#8BC43F] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#016737] to-[#2d964f] hover:from-[#014d29] hover:to-[#016737] text-white text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
          >
            {loading ? (
              <span>Authenticating Admin...</span>
            ) : (
              <>
                <span>Access Admin Portal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-[11px] text-gray-500">
          Bio Vriksha EdTech Infrastructure • Protected Admin CMS
        </div>
      </div>
    </div>
  );
}
