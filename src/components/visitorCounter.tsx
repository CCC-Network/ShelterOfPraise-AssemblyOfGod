/**
 * VisitorCounter.tsx
 * Displays unique visitor count with:
 * - Eye icon
 * - Animated pulse indicator
 * - Smart number formatting (K / M / B / T)
 * - Realtime subscription via Supabase
 */

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { fetchVisitorCount, trackVisit } from "../../app/services/visitorService";

/* ── number formatter ─────────────────────────────────────── */
function formatCount(n: number): string {
  if (n >= 1_000_000_000_000) return (n / 1_000_000_000_000).toFixed(1).replace(/\.0$/, "") + "T";
  if (n >= 1_000_000_000)     return (n / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  if (n >= 1_000_000)         return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000)             return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return n.toLocaleString();
}

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    // 1. Track this visit
    trackVisit();

    // 2. Fetch initial count
    fetchVisitorCount().then((total) => setCount(total));

    // 3. Subscribe to realtime changes on visitor_count
    const channel = supabase
      .channel("visitor_count_realtime")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "visitor_count" },
        (payload) => {
          const newTotal = payload.new?.total;
          if (typeof newTotal === "number") {
            setCount(newTotal);
            setAnimating(true);
            setTimeout(() => setAnimating(false), 600);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="visitor-counter" title="Unique visitors">
      {/* Pulse ring */}
      <span className="visitor-pulse-ring" />
      <span className="visitor-pulse-dot" />

      {/* Eye icon */}
      <Eye size={14} strokeWidth={1.8} className="visitor-eye-icon" />

      {/* Count */}
      <span className={`visitor-count-text ${animating ? "visitor-count-bump" : ""}`}>
        {count === null ? "—" : formatCount(count)}
      </span>
    </div>
  );
}