"use client";

import { useState, useEffect } from "react";
import { Users, Search, UserCheck } from "lucide-react";
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-slate-200 p-6 rounded-3xl shadow-xs">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#016737]" />
            <span>Registered Student Directory</span>
          </h1>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            Registered NEET aspirants community list and contact numbers.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student name or phone..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:border-[#016737] focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Student Table */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase font-black tracking-wider bg-slate-50">
                <th className="py-3 px-4">Student Aspirant Name</th>
                <th className="py-3 px-4">Phone Number</th>
                <th className="py-3 px-4">Joined Date</th>
                <th className="py-3 px-4">Account Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
              {filteredStudents.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-black text-slate-900 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#016737]/10 border border-[#016737]/20 text-[#016737] flex items-center justify-center font-black text-xs">
                      {s.full_name?.charAt(0) || "S"}
                    </div>
                    <span>{s.full_name || "Aspirant Student"}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-700">
                    {s.phone || "+91 98765XXXXX"}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px]">
                    {new Date(s.created_at).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-extrabold">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Active Student</span>
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
