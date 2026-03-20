/**
 * CCC_AI_SERVICE.ts
 * Location: src/app/services/CCC_AI_SERVICE.ts
 *
 * Powered by: Google Gemini (gemini-2.0-flash) — free tier
 * Replaced DeepSeek (paid) with Gemini (free).
 * Same interface — CccAiChat.tsx needs NO changes.
 */

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

const GEMINI_API_KEY = (import.meta.env.VITE_GEMINI_API_KEY as string) ?? "";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

if (!GEMINI_API_KEY) {
  console.error("[CCC AI] ❌ VITE_GEMINI_API_KEY missing from .env — restart dev server after adding.");
} else {
  console.log("[CCC AI] ✓ Gemini key loaded", `...${GEMINI_API_KEY.slice(-6)}`);
}

/* ── Church context loader ─────────────────────────────────── */

async function loadChurchContext(): Promise<string> {
  const parts: string[] = [];

  try {
    const allModules = import.meta.glob(
      ["/AGENT.md", "/.shelter_of_praise/**/*.md"],
      { query: "?raw", import: "default", eager: false }
    );

    const count = Object.keys(allModules).length;
    if (count === 0) {
      console.warn("[CCC AI] ⚠ No context .md files found. CCC AI will respond using built-in church knowledge.");
    } else {
      console.log(`[CCC AI] ✓ Loaded ${count} context file(s)`);
    }

    for (const [filePath, load] of Object.entries(allModules)) {
      try {
        const content = await (load as () => Promise<string>)();
        const fileName = filePath.split("/").pop() ?? filePath;
        if (content?.trim()) {
          parts.push(`\n\n--- SOURCE: ${fileName} ---\n${content}`);
        }
      } catch { /* skip unreadable file */ }
    }
  } catch (err) {
    console.error("[CCC AI] Context load error:", err);
  }

  return parts.join("\n");
}

/* ── System prompt ─────────────────────────────────────────── */

async function buildSystemPrompt(): Promise<string> {
  const churchContext = await loadChurchContext();

  return `You are CCC AI — the official AI assistant of Shelter of Praise: Assembly of God (also known as CCC — Conquerors & Co-Heirs Church).
You are warm, faith-centered, and genuinely helpful to anyone who visits the church website.

YOUR IDENTITY:
- Name: CCC AI
- Purpose: Help visitors learn about Shelter of Praise, its ministries, events, and how to get connected
- Tone: Warm, encouraging, clear, and concise — like a caring church staff member
- Language: English by default; respond in Filipino/Tagalog if the visitor writes in it

YOUR RESPONSIBILITIES:
- Answer questions about Shelter of Praise using the knowledge base below
- Help people feel welcomed and guide them to the right ministry or contact
- Share Scripture encouragement when appropriate
- If you don't know something specific, say so honestly and suggest contacting the church directly

STRICT RULES:
- Never make up specific dates, addresses, or contact details not in the knowledge base
- Never discuss topics unrelated to the church or Christian faith
- Always be respectful, encouraging, and kind
- If asked about giving/tithing and no specific info is in the knowledge base, say: "You can give during Sunday service or contact the church directly for online giving options."

=== SHELTER OF PRAISE KNOWLEDGE BASE ===
${churchContext.trim() || "No specific church data loaded. Answer based on your general knowledge of Assembly of God churches and always encourage the visitor to contact Shelter of Praise directly for specifics."}
=== END KNOWLEDGE BASE ===`;
}

/* ── Prompt cache ──────────────────────────────────────────── */
let _cachedPrompt: string | null = null;

async function getSystemPrompt(): Promise<string> {
  if (!_cachedPrompt) {
    _cachedPrompt = await buildSystemPrompt();
  }
  return _cachedPrompt;
}

/* ── Convert chat history to Gemini format ─────────────────── */

function toGeminiContents(
  history: ChatMessage[],
  systemPrompt: string
): object {
  /**
   * Gemini API format:
   * - systemInstruction: { parts: [{ text }] }
   * - contents: [{ role: "user"|"model", parts: [{ text }] }]
   *
   * Note: Gemini uses "model" instead of "assistant"
   * First message must be role "user" — system goes in systemInstruction
   */
  const contents = history.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  return {
    systemInstruction: {
      parts: [{ text: systemPrompt }],
    },
    contents,
    generationConfig: {
      maxOutputTokens: 1024,
      temperature: 0.7,
    },
  };
}

/* ── Main send function ────────────────────────────────────── */

/**
 * sendChatMessage
 * Same signature as the DeepSeek version — CccAiChat.tsx unchanged.
 * Uses Gemini generateContent (non-streaming) then replays word-by-word.
 * ALWAYS returns a non-empty string.
 */
export async function sendChatMessage(
  history: ChatMessage[],
  onChunk?: (delta: string) => void
): Promise<string> {
  if (!GEMINI_API_KEY) {
    const msg = "⚠️ CCC AI is not configured. Please add VITE_GEMINI_API_KEY to your .env file and restart the dev server.";
    onChunk?.(msg);
    return msg;
  }

  const systemPrompt = await getSystemPrompt();
  const body = toGeminiContents(history, systemPrompt);

  try {
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error(`[CCC AI] Gemini HTTP ${response.status}:`, errText);

      let msg = `CCC AI encountered an error (${response.status}). Please try again. 🙏`;
      if (response.status === 400)
        msg = "CCC AI received a bad request. Please try rephrasing your question.";
      else if (response.status === 403)
        msg = "⚠️ Invalid Gemini API key. Check VITE_GEMINI_API_KEY in your .env file.";
      else if (response.status === 429)
        msg = "CCC AI is busy right now. Please try again in a moment. 🙏";
      else if (response.status === 503)
        msg = "Gemini is temporarily unavailable. Please try again shortly. 🙏";

      onChunk?.(msg);
      return msg;
    }

    const data = await response.json();

    // Gemini response shape: data.candidates[0].content.parts[0].text
    const content: string =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    if (!content.trim()) {
      // Check if Gemini blocked the response (safety filters)
      const blockReason = data?.candidates?.[0]?.finishReason;
      const safetyBlock = data?.promptFeedback?.blockReason;

      if (safetyBlock || blockReason === "SAFETY") {
        const msg = "I'm not able to respond to that. Please ask something related to Shelter of Praise. 🙏";
        onChunk?.(msg);
        return msg;
      }

      console.error("[CCC AI] Empty Gemini response:", data);
      const fallback = "I didn't receive a response. Please try again. 🙏";
      onChunk?.(fallback);
      return fallback;
    }

    // ── Typewriter effect: replay word-by-word ──
    if (onChunk) {
      const words = content.split(" ");
      for (let i = 0; i < words.length; i++) {
        const chunk = (i === 0 ? "" : " ") + words[i];
        onChunk(chunk);
        await new Promise((r) => setTimeout(r, 18));
      }
    }

    return content;

  } catch (err) {
    console.error("[CCC AI] Network/fetch error:", err);
    const msg = "Connection to CCC AI failed. Please check your internet and try again. 🙏";
    onChunk?.(msg);
    return msg;
  }
}

/* ── Starter questions ─────────────────────────────────────── */
export const STARTER_QUESTIONS = [
  "What is Shelter of Praise?",
  "When are your Sunday services?",
  "How can I join a life group?",
  "How do I get involved in ministry?",
  "How can I give or tithe online?",
  "What youth programs do you have?",
];