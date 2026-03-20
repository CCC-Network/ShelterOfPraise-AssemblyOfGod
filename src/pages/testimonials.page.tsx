// src/pages/testimonials.page.tsx
import { useEffect, useState, useCallback } from "react";
import { Loader2, RefreshCw } from "lucide-react";
import { fetchTestimonials, type Testimonial } from "../utils/testimonials.data";
import TestimonialMessageDropper from "./testimonials/components/testimonial.message.dropper";

const FALLBACK_AVATAR = "https://ui-avatars.com/api/?background=3b82f6&color=fff&size=150&name=";

const TestimonialsPage = () => {
  const [testimonials, setTestimonials]   = useState<Testimonial[]>([]);
  const [loading, setLoading]             = useState(true);
  const [selected, setSelected]           = useState<Testimonial | null>(null);

  // ── Fetch from Supabase ──────────────────────────────────────
  const loadTestimonials = useCallback(async () => {
    setLoading(true);
    const data = await fetchTestimonials();
    setTestimonials(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadTestimonials();
  }, [loadTestimonials]);

  // ── Called by dropper after successful submit ────────────────
  const handleNewSubmission = () => {
    loadTestimonials();
  };

  return (
    <>
      <div className="testimonials-container relative min-h-screen">
        <div className="testimonials-wrapper container mx-auto px-4 py-12 max-w-7xl">

          {/* ── Header ── */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-800 tracking-wide">
              TESTIMONIALS
            </h1>
            <div className="mx-auto mt-3 w-24 h-1 bg-blue-600 rounded-full" />
            <p className="text-gray-500 text-sm mt-3">
              Stories of faith, grace, and community from our congregation.
            </p>
          </div>

          {/* ── Loading state ── */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
              <p className="text-sm">Loading testimonials...</p>
            </div>
          )}

          {/* ── Empty state ── */}
          {!loading && testimonials.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-gray-400">
              <p className="text-lg font-medium text-gray-500">No testimonials yet.</p>
              <p className="text-sm">Be the first to share your story! 🙏</p>
              <button
                onClick={loadTestimonials}
                className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
              >
                <RefreshCw className="w-4 h-4" /> Refresh
              </button>
            </div>
          )}

          {/* ── Testimonials Grid ── */}
          {!loading && testimonials.length > 0 && (
            <>
              {/* Count + Refresh */}
              <div className="flex items-center justify-between mb-4 px-1">
                <p className="text-xs text-gray-400">
                  {testimonials.length} testimon{testimonials.length === 1 ? "y" : "ies"}
                </p>
                <button
                  onClick={loadTestimonials}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <RefreshCw className="w-3 h-3" /> Refresh
                </button>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {testimonials.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => setSelected(t)}
                    className="
                      cursor-pointer bg-white rounded-xl shadow-md p-5
                      hover:shadow-xl transition-all duration-200 hover:-translate-y-1
                      flex flex-col items-center text-center border border-gray-100
                    "
                  >
                    {/* Avatar */}
                    <div className="w-20 h-20 rounded-full overflow-hidden mb-3 border-2 border-blue-100 flex-shrink-0">
                      <img
                        src={t.image}
                        alt={t.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            `${FALLBACK_AVATAR}${encodeURIComponent(t.name)}`;
                        }}
                      />
                    </div>

                    {/* Quote */}
                    <p className="text-gray-500 text-sm italic line-clamp-3 leading-relaxed">
                      "{t.testimonial}"
                    </p>

                    {/* Author */}
                    <div className="mt-3">
                      <p className="font-semibold text-gray-800 text-sm">{t.name}</p>
                      <p className="text-xs text-blue-600 font-medium mt-0.5">{t.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* ── Full Testimonial Modal ── */}
        {selected && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4"
            onClick={() => setSelected(null)}
          >
            <div
              className="
                bg-white rounded-xl shadow-2xl p-6 relative
                max-w-md w-full max-h-[90vh] overflow-y-auto
                animate-fadeIn text-center
              "
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-800 text-lg leading-none"
              >
                ✕
              </button>

              {/* Avatar */}
              <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-blue-600 mb-4">
                <img
                  src={selected.image}
                  alt={selected.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      `${FALLBACK_AVATAR}${encodeURIComponent(selected.name)}`;
                  }}
                />
              </div>

              {/* Name & Role */}
              <h2 className="text-xl font-bold text-gray-800">{selected.name}</h2>
              <p className="text-sm text-blue-600 font-medium mb-4">{selected.role}</p>

              {/* Full message */}
              <p className="text-gray-700 italic leading-relaxed text-sm">
                "{selected.testimonial}"
              </p>

              {selected.created_at && (
                <p className="text-xs text-gray-400 mt-4">
                  {new Date(selected.created_at).toLocaleDateString("en-PH", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              )}

              {/* Close button */}
              <button
                onClick={() => setSelected(null)}
                className="
                  mt-5 bg-blue-600 hover:bg-blue-700 text-white
                  px-6 py-2 rounded-lg font-semibold
                  transition-all duration-200
                "
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* ── Floating dropper — notifies page after submit ── */}
        <TestimonialMessageDropper onSubmitted={handleNewSubmission} />
      </div>
    </>
  );
};

export default TestimonialsPage;