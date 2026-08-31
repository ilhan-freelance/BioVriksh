"use client";

import { useState, useEffect } from "react";
import { Users, Search, UserCheck, ShieldCheck, Mail, Phone } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Profile } from "@/types/database";

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<Profile[]>([
    { id: "s1", full_name: "Rahul Sharma", phone: "+91 9876543210", role: "student", created_at: new Date().toISOString() },
    { id: "s2", full_name: "Priya Patel", phone: "+91 9876543211", role: "student", created_at: new Date(Date.now() - 86400000 * 2).toISOString() },
    { id: "s3", full_name: "Aman Verma", phone: "+91 9876543212", role: "student", created_at: new Date(Date.now() - 86400000 * 5).toISOString() },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const fetchStudents = async () => {
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "student")
        .order("created_at", { ascending: false });

      if (data && data.length > 0) setStudents(data);
    } catch (e) {
      console.log("Using initial student list");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(
    (s) =>
      s.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.phone?.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#131B2A] border border-gray-800 p-6 rounded-3xl shadow-xl">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-[#8BC43F]" />
            <span>Registered Student Directory</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Registered NEET aspirants community list and account status.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student name or phone..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-900 border border-gray-700 text-white text-xs focus:outline-none focus:border-[#8BC43F]"
          />
        </div>
      </div>

      {/* Student Table */}
      <div className="bg-[#131B2A] border border-gray-800 rounded-3xl p-6 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400 uppercase font-extrabold tracking-wider">
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Phone Contact</th>
                <th className="py-3 px-4">Joined Date</th>
                <th className="py-3 px-4">Account Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 font-medium text-gray-300">
              {filteredStudents.map((s) => (
                <tr key={s.id} className="hover:bg-gray-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#016737]/20 border border-[#8BC43F]/30 text-[#8BC43F] flex items-center justify-center font-bold text-xs">
                      {s.full_name?.charAt(0) || "S"}
                    </div>
                    <span>{s.full_name || "Aspirant Student"}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-gray-300">
                    {s.phone || "+91 98765XXXXX"}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-gray-400 text-[11px]">
                    {new Date(s.created_at).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-400 text-[11px] font-bold">
                      <UserCheck className="w-3 h-3" />
                      <span>Active Aspirant</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
