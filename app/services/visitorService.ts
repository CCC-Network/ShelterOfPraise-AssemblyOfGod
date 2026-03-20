/**
 * visitorService.ts — FIXED
 *
 * ROOT CAUSE OF BUGS FIXED:
 * 1. upsert with ignoreDuplicates:false on an existing ip_hash fires UPDATE,
 *    not INSERT — so the trigger never increments the count.
 *    FIX: Check if the row exists first. Only INSERT when truly new.
 *
 * 2. The cookie was set BEFORE confirming the row was actually new,
 *    so repeat visitors were silently skipped even on first real visit.
 *    FIX: Only set the cookie after a confirmed new INSERT.
 *
 * 3. Silent error swallowing hid all failures.
 *    FIX: console.error so you can see exactly what goes wrong.
 */

import { supabase } from "../../src/lib/supabaseClient";

const COOKIE_KEY = "sop_visited";
const COOKIE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

/* ── helpers ──────────────────────────────────────────────── */

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string, ttlMs: number): void {
  const expires = new Date(Date.now() + ttlMs).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

async function sha256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function getPublicIP(): Promise<string> {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const json = await res.json();
    return json.ip ?? "unknown";
  } catch {
    // fallback — still track with a browser fingerprint
    return "unknown";
  }
}

/* ── main ─────────────────────────────────────────────────── */

export async function trackVisit(): Promise<void> {
  // Already tracked in this 24h window — skip
  if (getCookie(COOKIE_KEY)) return;

  try {
    const ip = await getPublicIP();
    const hash = await sha256(ip + navigator.userAgent.slice(0, 64));

    // ── Step 1: check if this visitor already exists ──
    const { data: existing, error: selectError } = await supabase
      .from("visitors")
      .select("id")
      .eq("ip_hash", hash)
      .maybeSingle();

    if (selectError) {
      console.error("[SOP Visitor] SELECT error:", selectError);
      return;
    }

    if (existing) {
      // Known visitor — just update last_seen, do NOT trigger count increment
      await supabase
        .from("visitors")
        .update({ last_seen: new Date().toISOString() })
        .eq("ip_hash", hash);

      setCookie(COOKIE_KEY, "1", COOKIE_TTL_MS);
      return;
    }

    // ── Step 2: genuinely new visitor — INSERT (fires the trigger) ──
    const { error: insertError } = await supabase.from("visitors").insert({
      ip_hash: hash,
      first_seen: new Date().toISOString(),
      last_seen: new Date().toISOString(),
      user_agent: navigator.userAgent.slice(0, 200),
    });

    if (insertError) {
      console.error("[SOP Visitor] INSERT error:", insertError);
      return;
    }

    // Success — set cookie so we don't re-count within 24h
    setCookie(COOKIE_KEY, "1", COOKIE_TTL_MS);
    console.log("[SOP Visitor] New visitor tracked ✓");
  } catch (err) {
    console.error("[SOP Visitor] Unexpected error:", err);
  }
}

export async function fetchVisitorCount(): Promise<number> {
  const { data, error } = await supabase
    .from("visitor_count")
    .select("total")
    .eq("id", 1)
    .single();

  if (error) {
    console.error("[SOP Visitor] fetchVisitorCount error:", error);
    return 0;
  }

  return (data?.total as number) ?? 0;
}