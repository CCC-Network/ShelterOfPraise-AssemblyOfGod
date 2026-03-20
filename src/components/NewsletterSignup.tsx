// src/components/NewsletterSignup.tsx
import { useState } from "react";
import { subscribeToNewsletter } from "../utils/news.letter.system";

type Status = "idle" | "sending" | "success" | "duplicate" | "error";

export default function NewsletterSignup() {
  const [email, setEmail]       = useState("");
  const [status, setStatus]     = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubscribe = async () => {
    if (!email.trim()) return;

    setStatus("sending");
    setErrorMsg("");

    const result = await subscribeToNewsletter(email);

    if (result.alreadySubscribed) {
      setStatus("duplicate");
      setTimeout(() => setStatus("idle"), 4000);
      return;
    }

    if (!result.success) {
      setErrorMsg(result.error ?? "Something went wrong. Please try again.");
      setStatus("error");
      return;
    }

    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 4000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubscribe();
  };

  const isSending = status === "sending";

  return (
    <div>
      <h4 className="custom-h4 text-white mb-6">Newsletter</h4>
      <p className="custom-span text-gray-300 mb-4">
        Get updates, devotionals, events, and church news delivered to your inbox.
      </p>

      <div className="space-y-3">
        <input
          id="email-newsletter"
          name="email-newsletter"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isSending || status === "success"}
          className="w-full px-4 py-3 rounded-lg text-gray-900 custom-span border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200"
          required
        />

        <button
          id="subscribe-button"
          className="custom-button w-full hover:scale-105"
          onClick={handleSubscribe}
          disabled={isSending || status === "success"}
        >
          {isSending
            ? "Subscribing..."
            : status === "success"
            ? "✅ Subscribed!"
            : "Subscribe"}
        </button>

        {status === "success" && (
          <p className="text-green-400 text-sm">
            ✓ You're subscribed! Check your inbox for a confirmation. 🙏
          </p>
        )}

        {status === "duplicate" && (
          <p className="text-yellow-400 text-sm">
            📧 This email is already subscribed.
          </p>
        )}

        {status === "error" && errorMsg && (
          <p className="text-red-400 text-sm">{errorMsg}</p>
        )}
      </div>
    </div>
  );
}