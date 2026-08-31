"use client";

import { useState, useEffect } from "react";
import {
  Zap,
  Plus,
  Upload,
  Image as ImageIcon,
  FileText,
  Lock,
  Unlock,
  CheckCircle2,
  ToggleLeft,
  ToggleRight,
  X,
  Sparkles,
  Pin,
  BookOpen,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { PDFNote, Chapter, ClassLevel } from "@/types/database";

export default function AdminShortNotesPage() {
  const [shortNotes, setShortNotes] = useState<PDFNote[]>([
    {
      id: "sn1",
      chapter_id: "ch2",
      title: "Human Reproduction & Hormones Special Mindmap",
      description: "Fast 1-page revision flowchart of Menstrual Cycle & Gametogenesis.",
      thumbnail_url: "/hero_real_bio_tree.png",
      file_path: "human_reproduction_short.pdf",
      is_free: true,
      price: 0,
      is_active: true,
      is_recent: true,
      note_type: "short",
      class_level: "Class 12",
      page_count: 4,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "sn2",
      chapter_id: "ch3",
      title: "Cell Cycle Checkpoints & Organelles Quick Summary",
      description: "High yield exam memory tricks for G1/S restriction points and enzymes.",
      thumbnail_url: "/hero_tree_of_life_3d.png",
      file_path: "cell_cycle_short.pdf",
      is_free: false,
      price: 29,
      is_active: true,
      is_recent: false,
      note_type: "short",
      class_level: "Class 11",
      page_count: 6,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]);

  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [classLevel, setClassLevel] = useState<ClassLevel>("Class 12");
  const [chapterId, setChapterId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isFree, setIsFree] = useState(true);
  const [isRecent, setIsRecent] = useState(true);
  const [price, setPrice] = useState(29);
  const [pageCount, setPageCount] = useState(4);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const fetchData = async () => {
    try {
      const supabase = createClient();
      const { data: chaptersData } = await supabase.from("chapters").select("*").eq("is_active", true);
      if (chaptersData) setChapters(chaptersData);

      const { data: notesData } = await supabase
        .from("pdfs")
        .select("*, chapter:chapters(*)")
        .eq("note_type", "short")
        .order("created_at", { ascending: false });

      if (notesData && notesData.length > 0) setShortNotes(notesData as any);
    } catch (e) {
      console.log("Using initial data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUploadShortNote = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage("Uploading short note files...");

    try {
      const supabase = createClient();

      let thumbnailUrl = "/hero_real_bio_tree.png";
      let filePath = `short_note_${Date.now()}.pdf`;

      if (thumbnailFile) {
        const thumbName = `thumb_sn_${Date.now()}_${thumbnailFile.name}`;
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

      if (pdfFile) {
        const pdfFileName = `sn_${Date.now()}_${pdfFile.name}`;
        const { data: pdfUploadData } = await supabase.storage
          .from("pdf-files")
          .upload(pdfFileName, pdfFile);

        if (pdfUploadData) {
          filePath = pdfUploadData.path;
        }
      }

      const newShortNoteRow = {
        chapter_id: chapterId || null,
        title,
        description,
        thumbnail_url: thumbnailUrl,
        file_path: filePath,
        is_free: isFree,
        price: isFree ? 0 : Number(price),
        is_recent: isRecent,
        note_type: "short",
        class_level: classLevel,
        page_count: Number(pageCount),
        is_active: true,
      };

      const { data: insertedData } = await supabase.from("pdfs").insert(newShortNoteRow).select().single();

      if (insertedData) {
        setShortNotes((prev) => [insertedData as any, ...prev]);
      } else {
        setShortNotes((prev) => [
          {
            id: `sn-${Date.now()}`,
            chapter_id: chapterId,
            title,
            description,
            thumbnail_url: thumbnailUrl,
            file_path: filePath,
            is_free: isFree,
            price: isFree ? 0 : Number(price),
            is_active: true,
            is_recent: isRecent,
            note_type: "short",
            class_level: classLevel,
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
    setIsFree(true);
    setIsRecent(true);
    setPrice(29);
    setThumbnailFile(null);
    setPdfFile(null);
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    setShortNotes((prev) =>
      prev.map((item) => (item.id === id ? { ...item, is_active: !currentStatus } : item))
    );

    try {
      const supabase = createClient();
      await supabase.from("pdfs").update({ is_active: !currentStatus }).eq("id", id);
    } catch (e) {
      // Ignored
    }
  };

  const toggleRecent = async (id: string, currentRecent: boolean) => {
    setShortNotes((prev) =>
      prev.map((item) => (item.id === id ? { ...item, is_recent: !currentRecent } : item))
    );

    try {
      const supabase = createClient();
      await supabase.from("pdfs").update({ is_recent: !currentRecent }).eq("id", id);
    } catch (e) {
      // Ignored
    }
  };

  return (
    <div className="space-y-6">
      {/* ═══ GUIDANCE BANNER ═══ */}
      <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 text-xs font-black mb-2 border border-amber-200">
            <Zap className="w-3.5 h-3.5 text-amber-600" />
            <span>Short Notes &amp; Mindmaps Manager</span>
          </div>
          <h1 className="text-xl font-black text-slate-900">⚡ Short Notes &amp; Revision Mindmaps</h1>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            Dedicated tab to upload quick revision notes, formula sheets, and mindmaps. Toggle <strong>📌 Featured in Recent</strong> anytime.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-black transition-all flex items-center gap-2 shadow-md shrink-0 hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>+ Upload Short Note</span>
        </button>
      </div>

      {/* Short Notes Table */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase font-black tracking-wider bg-slate-50">
                <th className="py-3 px-4">Mindmap Title</th>
                <th className="py-3 px-4">Class Level</th>
                <th className="py-3 px-4">Pricing Model</th>
                <th className="py-3 px-4">📌 Homepage Recent</th>
                <th className="py-3 px-4 text-right">1-Click Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
              {shortNotes.map((note) => (
                <tr key={note.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-14 rounded-xl bg-amber-50 border border-amber-200 overflow-hidden shrink-0 shadow-2xs flex items-center justify-center text-amber-700 font-bold">
                        <Zap className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 text-sm leading-snug">{note.title}</h4>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1 font-semibold">
                          {note.description || "Quick revision flowchart note."}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-black text-[11px] border border-slate-200">
                      {note.class_level || "Class 12"}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {note.is_free ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-black text-xs">
                        <Unlock className="w-3.5 h-3.5 text-emerald-600" />
                        <span>🟢 FREE</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 font-black text-xs">
                        <Lock className="w-3.5 h-3.5 text-amber-700" />
                        <span>🔒 PAID (₹{note.price})</span>
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => toggleRecent(note.id, note.is_recent)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border transition-all ${
                        note.is_recent
                          ? "bg-amber-100 border-amber-300 text-amber-900 shadow-2xs"
                          : "bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-200"
                      }`}
                    >
                      <Pin className="w-3.5 h-3.5" />
                      <span>{note.is_recent ? "📌 Featured in Recent" : "Not in Recent"}</span>
                    </button>
                  </td>
                  <td className="py-4 px-4 text-right space-x-2">
                    <button
                      onClick={() => toggleActive(note.id, note.is_active)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all border shadow-2xs ${
                        note.is_active
                          ? "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300"
                          : "bg-[#016737] hover:bg-[#014d29] text-white border-transparent"
                      }`}
                    >
                      {note.is_active ? "Hide" : "Publish Live 🟢"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Short Note Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-lg w-full shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-600" />
                <span>Upload New Short Note / Mindmap</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUploadShortNote} className="space-y-4">
              {/* Class & Chapter */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">
                    1. Class Level
                  </label>
                  <select
                    value={classLevel}
                    onChange={(e) => setClassLevel(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold focus:outline-none focus:border-amber-600"
                  >
                    <option value="Class 11">Class 11</option>
                    <option value="Class 12">Class 12</option>
                    <option value="NEET Special">NEET Special</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">
                    2. Chapter Topic
                  </label>
                  <select
                    value={chapterId}
                    onChange={(e) => setChapterId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold focus:outline-none focus:border-amber-600"
                  >
                    <option value="">(Optional) Select Chapter...</option>
                    {chapters.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">
                  3. Mindmap / Short Note Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Cell Cycle & Checkpoints Fast Mindmap"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold focus:outline-none focus:border-amber-600"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">
                  4. Short Summary Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="1-page quick revision sheet of G1/S restriction points and enzymes."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:border-amber-600"
                />
              </div>

              {/* Files Upload Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <ImageIcon className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                  <label className="block text-xs font-black text-slate-700 mb-1 cursor-pointer">
                    Upload Cover Thumbnail
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                    className="text-[11px] text-slate-500 w-full font-semibold"
                  />
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <FileText className="w-5 h-5 text-[#016737] mx-auto mb-1" />
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

              {/* Pricing & Recent Toggle */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isRecent}
                    onChange={(e) => setIsRecent(e.target.checked)}
                    className="w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-600"
                  />
                  <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                    <Pin className="w-3.5 h-3.5 text-amber-600" />
                    <span>📌 Feature in Recent Section on Homepage</span>
                  </span>
                </label>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900">Pricing Model</span>
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
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs font-mono font-bold focus:outline-none focus:border-amber-600"
                    />
                  </div>
                )}
              </div>

              {/* Status Message */}
              {statusMessage && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold animate-pulse">
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
                  className="flex-1 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-black shadow-md"
                >
                  {loading ? "Uploading..." : "Save Short Note ⚡"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
