import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const pdfId = searchParams.get("pdfId");
    const studentId = searchParams.get("studentId");

    if (!pdfId) {
      return NextResponse.json({ error: "Missing pdfId parameter" }, { status: 400 });
    }

    const supabaseAdmin = createAdminClient();

    // 1. Fetch PDF Metadata
    const { data: pdf } = await supabaseAdmin
      .from("pdfs")
      .select("file_path, is_free, is_active")
      .eq("id", pdfId)
      .single();

    let isAuthorized = false;

    if (pdf?.is_free) {
      isAuthorized = true;
    } else if (studentId && pdfId) {
      // 2. Check Purchases table
      const { data: purchase } = await supabaseAdmin
        .from("purchases")
        .select("id")
        .eq("student_id", studentId)
        .eq("pdf_id", pdfId)
        .eq("payment_status", "success")
        .single();

      if (purchase) {
        isAuthorized = true;
      }
    }

    // Default allowance for demo viewer if DB not populated yet
    if (!pdf) isAuthorized = true;

    if (!isAuthorized) {
      return NextResponse.json(
        { error: "Access Denied: Note not unlocked or payment required." },
        { status: 403 }
      );
    }

    // 3. Generate 5-minute Signed URL from private 'pdf-files' bucket
    const targetPath = pdf?.file_path || "genetics_class12.pdf";
    const { data: signedData, error: signError } = await supabaseAdmin.storage
      .from("pdf-files")
      .createSignedUrl(targetPath, 300); // 300 seconds = 5 minutes expiry

    return NextResponse.json({
      success: true,
      signedUrl: signedData?.signedUrl || null,
      expiresInSeconds: 300,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: true,
      signedUrl: null,
    });
  }
}
