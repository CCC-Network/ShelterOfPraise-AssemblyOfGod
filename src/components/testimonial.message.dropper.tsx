// src/pages/testimonials/components/testimonial.message.dropper.tsx
import { useState } from "react";
import { X, MessageCircle, Upload, Link as LinkIcon, Loader2 } from "lucide-react";
import { submitTestimonial } from "../utils/testimonials.data";

type SubmitStatus = "idle" | "sending" | "success" | "error";

const ROLES = [
  "Guest",
  "Church Member",
  "Pastor",
  "Associate Pastor",
  "Youth Leader",
  "Worship Leader",
  "Choir Member",
  "Musician",
  "Sunday School Teacher",
  "Kids Ministry Volunteer",
  "Usher",
  "Media Team",
  "Technical Team",
  "Outreach Volunteer",
  "Missionary",
  "Church Staff",
  "Elder",
  "Deacon",
  "Ministry Head",
  "Small Group Leader",
  "Parent",
  "Student",
  "Visitor",
  "Friend",
  "Online Viewer",
  "Donor",
  "Partner",
  "Other",
];

interface Props {
  onSubmitted?: () => void; // parent calls refetch when this fires
}

const TestimonialMessageDropper = ({ onSubmitted }: Props) => {
  const [open, setOpen]               = useState(false);
  const [imageFile, setImageFile]     = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageLink, setImageLink]     = useState("");
  const [name, setName]               = useState("");
  const [role, setRole]               = useState("");
  const [message, setMessage]         = useState("");
  const [status, setStatus]           = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg]       = useState("");

  // ── Image handlers ──────────────────────────────────────────
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 500 * 1024) {
      setErrorMsg("Image must be smaller than 500 KB.");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setImageLink("");
    setErrorMsg("");
  };

  const handleImageLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImageLink(url);
    setImagePreview(url || null);
    setImageFile(null);
  };

  // ── Reset form ───────────────────────────────────────────────
  const resetForm = () => {
    setName("");
    setRole("");
    setMessage("");
    setImageFile(null);
    setImagePreview(null);
    setImageLink("");
    setErrorMsg("");
    setStatus("idle");
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  // ── Submit ───────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) { setErrorMsg("Please enter your name."); return; }
    if (!role)        { setErrorMsg("Please select your role."); return; }
    if (!message.trim()) { setErrorMsg("Please write your testimonial."); return; }

    setStatus("sending");
    setErrorMsg("");

    const result = await submitTestimonial({
      name,
      role,
      message,
      image: imageFile ?? (imageLink.trim() || null),
    });

    if (!result.success) {
      setStatus("error");
      setErrorMsg(result.error ?? "Submission failed. Please try again.");
      return;
    }

    setStatus("success");

    // Notify parent to refetch the testimonials list
    onSubmitted?.();

    setTimeout(() => {
      handleClose();
    }, 2500);
  };

  const isSending = status === "sending";

  return (
    <>
      {/* ── Floating Button ── */}
      <button
        onClick={() => setOpen(true)}
        className="
          fixed bottom-6 left-6 z-40
          bg-blue-600 hover:bg-blue-700
          text-white px-5 py-3 rounded-full shadow-xl
          flex items-center gap-2 font-semibold
          transition-all duration-200 hover:scale-105
        "
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:block">Give Testimonial</span>
      </button>

      {/* ── Modal ── */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 relative max-w-md w-full max-h-[90vh] overflow-y-auto animate-fadeIn">

            {/* Close */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <h2 className="text-2xl font-bold text-gray-800 mb-1 text-center">
              Share Your Testimonial
            </h2>
            <p className="text-gray-500 text-sm text-center mb-5">
              Your story can inspire others. 🙏
            </p>

            {/* Success state */}
            {status === "success" ? (
              <div className="text-center py-8">
                <p className="text-4xl mb-3">🎉</p>
                <p className="text-lg font-bold text-gray-800">Thank you, {name}!</p>
                <p className="text-gray-500 text-sm mt-1">
                  Your testimonial has been submitted successfully.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>

                {/* Image upload / link */}
                <div className="flex flex-col items-center">
                  <label
                    htmlFor="imageUpload"
                    className="
                      cursor-pointer w-28 h-28 rounded-full
                      bg-gray-100 border-2 border-dashed border-gray-300
                      flex items-center justify-center overflow-hidden
                      hover:bg-gray-50 transition-colors
                    "
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-full"
                        onError={() => setImagePreview(null)}
                      />
                    ) : (
                      <div className="text-center">
                        <Upload className="w-6 h-6 text-gray-400 mx-auto" />
                        <p className="text-xs text-gray-400 mt-1">Photo</p>
                      </div>
                    )}
                  </label>

                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={isSending}
                  />

                  <div className="w-full mt-3 flex items-center gap-2">
                    <LinkIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <input
                      type="url"
                      placeholder="or paste image URL"
                      value={imageLink}
                      onChange={handleImageLink}
                      disabled={isSending}
                      className="w-full px-3 py-1.5 rounded-lg border text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                  </div>
                  <span className="text-xs text-gray-400 mt-1">
                    Optional · max 500 KB if uploading
                  </span>
                </div>

                {/* Name */}
                <div className="mt-5">
                  <label className="text-sm font-semibold text-gray-700 block mb-1">
                    Your Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSending}
                    required
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                </div>

                {/* Role */}
                <div className="mt-4">
                  <label className="text-sm font-semibold text-gray-700 block mb-1">
                    Your Role <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    disabled={isSending}
                    required
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-400 outline-none bg-white"
                  >
                    <option value="">Select your role</option>
                    {ROLES.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="mt-4">
                  <label className="text-sm font-semibold text-gray-700 block mb-1">
                    Your Testimonial <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Write your testimonial..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={isSending}
                    required
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-400 outline-none resize-none"
                  />
                </div>

                {/* Error */}
                {errorMsg && (
                  <p className="text-red-500 text-sm mt-3">{errorMsg}</p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSending}
                  className="
                    w-full mt-5 bg-blue-600 hover:bg-blue-700
                    text-white py-3 rounded-lg font-semibold
                    transition-all duration-200 flex items-center justify-center gap-2
                    disabled:opacity-60 disabled:cursor-not-allowed
                  "
                >
                  {isSending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Testimonial"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TestimonialMessageDropper;
