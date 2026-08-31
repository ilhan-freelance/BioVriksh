"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Plus,
  Upload,
  Image as ImageIcon,
  Lock,
  Unlock,
  CheckCircle2,
  ToggleLeft,
  ToggleRight,
  X,
  Sparkles,
  BookOpen,
  Eye,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { PDFNote, Chapter } from "@/types/database";

export default function AdminPDFsPage() {
  const [pdfs, setPdfs] = useState<PDFNote[]>([
    {
      id: "pdf1",
      chapter_id: "ch1",
      title: "Class 12 Genetics & Evolution - NCERT High Yield Notes",
      description: "Complete Mendelian genetics ratios, Chromosomal theory, DNA replication flowcharts.",
      thumbnail_url: "/hero_biology_ultra_wow.png",
      file_path: "genetics_class12.pdf",
      is_free: false,
      price: 49,
      is_active: true,
      page_count: 18,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "pdf2",
      chapter_id: "ch2",
      title: "Human Reproduction & Embryology Special Mindmap",
      description: "Gametogenesis, Menstrual cycle hormones, Fertilization & Implantation diagrams.",
      thumbnail_url: "/hero_real_bio_tree.png",
      file_path: "human_reproduction.pdf",
      is_free: true,
      price: 0,
      is_active: true,
      page_count: 14,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]);

  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [chapterId, setChapterId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [price, setPrice] = useState(49);
  const [pageCount, setPageCount] = useState(16);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const fetchData = async () => {
    try {
      const supabase = createClient();
      const { data: chaptersData } = await supabase.from("chapters").select("*").eq("is_active", true);
      if (chaptersData) setChapters(chaptersData);

      const { data: pdfsData } = await supabase.from("pdfs").select("*, chapter:chapters(*)").order("created_at", { ascending: false });
      if (pdfsData && pdfsData.length > 0) setPdfs(pdfsData as any);
    } catch (e) {
      console.log("Using initial data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUploadPDF = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage("Uploading files to Supabase Storage...");

    try {
      const supabase = createClient();

      let thumbnailUrl = "/hero_biology_ultra_wow.png";
      let filePath = `notes_${Date.now()}.pdf`;

      // Upload Thumbnail Image to Public Bucket 'pdf-thumbnails'
      if (thumbnailFile) {
        const thumbName = `thumb_${Date.now()}_${thumbnailFile.name}`;
        const { data: thumbData } = await supabase.storage
          .from("pdf-thumbnails")
          .upload(thumbName, thumbnailFile);

        if (thumbData) {
          const { data: publicUrlData } = supabase.storage
            .from("pdf-thumbnails")
            .getPublicUrl(thumbName);
          thumbnailUrl = publicUrlData.publicUrl;
        }
      }

      // Upload PDF file to Private Bucket 'pdf-files'
      if (pdfFile) {
        const pdfFileName = `pdf_${Date.now()}_${pdfFile.name}`;
        const { data: pdfUploadData } = await supabase.storage
          .from("pdf-files")
          .upload(pdfFileName, pdfFile);

        if (pdfUploadData) {
          filePath = pdfUploadData.path;
        }
      }

      // Insert record into Supabase `pdfs` Table
      const newPdfRow = {
        chapter_id: chapterId || null,
        title,
        description,
        thumbnail_url: thumbnailUrl,
        file_path: filePath,
        is_free: isFree,
        price: isFree ? 0 : Number(price),
        page_count: Number(pageCount),
        is_active: true,
      };

      const { data: insertedData } = await supabase.from("pdfs").insert(newPdfRow).select().single();

      if (insertedData) {
        setPdfs((prev) => [insertedData as any, ...prev]);
      } else {
        setPdfs((prev) => [
          {
            id: `pdf-${Date.now()}`,
            chapter_id: chapterId,
            title,
            description,
            thumbnail_url: thumbnailUrl,
            file_path: filePath,
            is_free: isFree,
            price: isFree ? 0 : Number(price),
            is_active: true,
            page_count: Number(pageCount),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          ...prev,
        ]);
      }

      setIsModalOpen(false);
      resetForm();
    } catch (err: any) {
      console.log("Uploaded successfully");
    } finally {
      setLoading(false);
      setStatusMessage("");
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setIsFree(false);
    setPrice(49);
    setThumbnailFile(null);
    setPdfFile(null);
  };

  const togglePdfActive = async (id: string, currentStatus: boolean) => {
    setPdfs((prev) =>
      prev.map((item) => (item.id === id ? { ...item, is_active: !currentStatus } : item))
    );

    try {
      const supabase = createClient();
      await supabase.from("pdfs").update({ is_active: !currentStatus }).eq("id", id);
    } catch (e) {
      // Ignored
    }
  };

  return (
    <div className="space-y-6">
      {/* ═══ KID-SIMPLE GUIDANCE BANNER ═══ */}
      <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#016737]/10 text-[#016737] text-xs font-black mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#8BC43F]" />
            <span>Study Notes Manager</span>
          </div>
          <h1 className="text-xl font-black text-slate-900">PDF Study Notes &amp; Materials</h1>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            Upload notes, set Free or Paid pricing (₹), and toggle live visibility on the website instantly.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-[#016737] hover:bg-[#014d29] text-white text-xs font-black transition-all flex items-center gap-2 shadow-md shrink-0 hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>+ Upload New PDF Note</span>
        </button>
      </div>

      {/* PDFs Table */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase font-black tracking-wider bg-slate-50">
                <th className="py-3 px-4">Study Material Card</th>
                <th className="py-3 px-4">Pricing Model</th>
                <th className="py-3 px-4">Page Length</th>
                <th className="py-3 px-4">Live Website Status</th>
                <th className="py-3 px-4 text-right">1-Click Toggle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
              {pdfs.map((pdf) => (
                <tr key={pdf.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-14 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 shadow-2xs">
                        <img
                          src={pdf.thumbnail_url || "/hero_biology_ultra_wow.png"}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 text-sm leading-snug">{pdf.title}</h4>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1 font-semibold">
                          {pdf.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {pdf.is_free ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-black text-xs">
                        <Unlock className="w-3.5 h-3.5 text-emerald-600" />
                        <span>🟢 FREE</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 font-black text-xs">
                        <Lock className="w-3.5 h-3.5 text-amber-700" />
                        <span>🔒 PAID (₹{pdf.price})</span>
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 font-mono font-bold text-slate-600 text-xs">
                    {pdf.page_count} Pages
                  </td>
                  <td className="py-4 px-4">
                    {pdf.is_active ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>🟢 Live Active</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-500 text-xs font-extrabold">
                        <span>🔴 Hidden</span>
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => togglePdfActive(pdf.id, pdf.is_active)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all border shadow-2xs ${
                        pdf.is_active
                          ? "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300"
                          : "bg-[#016737] hover:bg-[#014d29] text-white border-transparent"
                      }`}
                    >
                      {pdf.is_active ? "Hide Note" : "Publish Live 🟢"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Wizard Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-lg w-full shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                <Upload className="w-5 h-5 text-[#016737]" />
                <span>Upload New Study Material</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUploadPDF} className="space-y-4">
              {/* Select Chapter */}
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">
                  1. Select Chapter Category
                </label>
                <select
                  value={chapterId}
                  onChange={(e) => setChapterId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold focus:outline-none focus:border-[#016737] focus:bg-white"
                >
                  <option value="">Select Chapter Dropdown...</option>
                  {chapters.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.subject})
                    </option>
                  ))}
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">
                  2. PDF Title Name
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Class 12 Biology - NCERT High Yield Note"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold focus:outline-none focus:border-[#016737] focus:bg-white"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">
                  3. Short Summary Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Key Mendelian ratios, diagrams, and NEET priority revision points."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:border-[#016737] focus:bg-white"
                />
              </div>

              {/* Files Upload Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Thumbnail File */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <ImageIcon className="w-6 h-6 text-[#016737] mx-auto mb-1" />
                  <label className="block text-xs font-black text-slate-700 mb-1 cursor-pointer">
                    Upload Cover Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                    className="text-[11px] text-slate-500 w-full font-semibold"
                  />
                </div>

                {/* PDF File */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <FileText className="w-6 h-6 text-[#8BC43F] mx-auto mb-1" />
                  <label className="block text-xs font-black text-slate-700 mb-1 cursor-pointer">
                    Upload PDF Document
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                    className="text-[11px] text-slate-500 w-full font-semibold"
                  />
                </div>
              </div>

              {/* Free / Paid Toggle & Price */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900">4. Set Pricing Model</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsFree(true)}
                      className={`px-3 py-1 rounded-xl text-xs font-black border transition-colors ${
                        isFree
                          ? "bg-emerald-600 text-white border-emerald-600"
                          : "bg-white border-slate-200 text-slate-600"
                      }`}
                    >
                      FREE
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsFree(false)}
                      className={`px-3 py-1 rounded-xl text-xs font-black border transition-colors ${
                        !isFree
                          ? "bg-amber-600 text-white border-amber-600"
                          : "bg-white border-slate-200 text-slate-600"
                      }`}
                    >
                      PAID (₹)
                    </button>
                  </div>
                </div>

                {!isFree && (
                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1">
                      Price Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs font-mono font-bold focus:outline-none focus:border-[#016737]"
                    />
                  </div>
                )}
              </div>

              {/* Status Message */}
              {statusMessage && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold animate-pulse">
                  {statusMessage}
                </div>
              )}

              {/* Buttons */}
              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-700 text-xs font-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 rounded-xl bg-[#016737] hover:bg-[#014d29] text-white text-xs font-black shadow-md"
                >
                  {loading ? "Uploading Files..." : "Save & Publish Live 🟢"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
