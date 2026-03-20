// src/pages/memorial/memorial.data.ts
import { supabase } from "../lib/supabaseClient"; // ✅ shared client

/* ── Types ──────────────────────────────────────────────────── */
export interface MemorialMessage {
  id: string;
  name: string;
  message: string;
  photo_url: string | null;
  created_at: string;
}

export interface MemorialMessageFormData {
  name: string;
  message: string;
  photo: File | null;
}

/* ── Fallback avatar ─────────────────────────────────────────── */
export const FALLBACK_AVATAR =
  "https://ui-avatars.com/api/?background=6b7280&color=fff&size=60&name=";

/* ── Fetch all messages ──────────────────────────────────────── */
export async function fetchMemorialMessages(): Promise<MemorialMessage[]> {
  const { data, error } = await supabase
    .from("memorial_messages")
    .select("id, name, message, photo_url, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[Memorial] Fetch error:", error.message);
    return [];
  }

  return data ?? [];
}

/* ── Upload photo to Supabase Storage ────────────────────────── */
const MAX_BYTES = 500 * 1024; // 500 KB

export async function uploadMemorialPhoto(file: File): Promise<string | null> {
  if (file.size > MAX_BYTES) {
    throw new Error("Photo must be smaller than 500 KB.");
  }

  const ext      = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const filePath = `messages/${fileName}`;

  const { error } = await supabase.storage
    .from("memorial-photos")
    .upload(filePath, file);

  if (error) {
    console.error("[Memorial] Upload error:", error.message);
    return null;
  }

  const { data } = supabase.storage
    .from("memorial-photos")
    .getPublicUrl(filePath);

  return data.publicUrl;
}

/* ── Submit a message ────────────────────────────────────────── */
export async function submitMemorialMessage(
  formData: MemorialMessageFormData
): Promise<{ success: boolean; error?: string }> {
  try {
    let photoUrl: string | null = null;

    if (formData.photo) {
      photoUrl = await uploadMemorialPhoto(formData.photo);
      if (!photoUrl) {
        return { success: false, error: "Photo upload failed. Please try again." };
      }
    }

    const { error } = await supabase.from("memorial_messages").insert([
      {
        name:      formData.name.trim(),
        message:   formData.message.trim(),
        photo_url: photoUrl,
      },
    ]);

    if (error) {
      console.error("[Memorial] Insert error:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error("[Memorial] Unexpected error:", err);
    return { success: false, error: err.message ?? "Something went wrong." };
  }
}

/* ── Format date for display ─────────────────────────────────── */
export function formatMessageDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString("en-PH", {
    month: "short",
    year:  "numeric",
  });
}
