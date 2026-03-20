// src/pages/testimonials/testimonials.data.ts
import { supabase } from "../lib/supabaseClient"; // ✅ correct relative path

// ── Types ─────────────────────────────────────────────────────
export interface Testimonial {
  id: string;
  name: string;
  image: string;       // maps from profile_url
  testimonial: string; // maps from message
  role: string;
  created_at?: string;
}

export interface TestimonialFormData {
  name: string;
  role: string;
  message: string;
  image: File | string | null;
}

// ── Fallback avatar ───────────────────────────────────────────
const FALLBACK_AVATAR =
  "https://ui-avatars.com/api/?background=3b82f6&color=fff&size=150&name=";

// ── Fetch all testimonials ────────────────────────────────────
export async function fetchTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from("testimonials")
    .select("id, name, role, message, profile_url, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[Testimonials] Fetch error:", error.message);
    return [];
  }

  return (data ?? []).map((item: any) => ({
    id: item.id,
    name: item.name,
    role: item.role ?? "Member",
    testimonial: item.message,
    image: item.profile_url || `${FALLBACK_AVATAR}${encodeURIComponent(item.name)}`,
    created_at: item.created_at,
  }));
}

// ── Upload image to Supabase Storage ─────────────────────────
const MAX_SIZE_BYTES = 500 * 1024; // 500 KB

export async function uploadImage(file: File): Promise<string | null> {
  if (file.size > MAX_SIZE_BYTES) {
    throw new Error("Image must be smaller than 500 KB.");
  }

  const ext = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const filePath = `testimonial-images/${fileName}`;

  const { error } = await supabase.storage
    .from("testimonials")
    .upload(filePath, file);

  if (error) {
    console.error("[Testimonials] Upload error:", error.message);
    return null;
  }

  const { data } = supabase.storage
    .from("testimonials")
    .getPublicUrl(filePath);

  return data.publicUrl;
}

// ── Submit a testimonial ──────────────────────────────────────
export async function submitTestimonial(
  formData: TestimonialFormData
): Promise<{ success: boolean; error?: string }> {
  try {
    let imageUrl: string | null = null;

    if (formData.image) {
      if (typeof formData.image === "string") {
        imageUrl = formData.image;
      } else {
        imageUrl = await uploadImage(formData.image);
        if (!imageUrl) {
          return { success: false, error: "Image upload failed. Please try again." };
        }
      }
    }

    const { error } = await supabase.from("testimonials").insert([
      {
        name: formData.name.trim(),
        role: formData.role,
        message: formData.message.trim(),
        profile_url: imageUrl,
      },
    ]);

    if (error) {
      console.error("[Testimonials] Insert error:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error("[Testimonials] Unexpected error:", err);
    return { success: false, error: err.message ?? "Something went wrong." };
  }
}