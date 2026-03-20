/**
 * CccAiChat.tsx — FIXED
 *
 * BUGS FIXED:
 * 1. DOUBLE BUBBLE — async IIFE was launched inside a setMessages() updater.
 *    React Strict Mode calls updaters twice in dev, firing the API call twice.
 *    FIX: async logic moved completely OUTSIDE of setMessages. The flow is now
 *    linear: add user msg → add empty assistant placeholder → call API → update placeholder.
 *
 * 2. BLANK RESPONSE — sendChatMessage used streaming SSE which could silently
 *    produce zero chunks on some network conditions. Service now uses non-streaming
 *    and replays word-by-word, guaranteeing content always arrives.
 *
 * 3. sessionId race condition — uses ref instead of state so saveMessage always
 *    reads the current value regardless of render cycle.
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { Send, ChevronDown, MessageCircle, Sparkles } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import {
  sendChatMessage,
  STARTER_QUESTIONS,
  type ChatMessage,
} from "../../app/services/CCC_AI_SERVICE";

/* ── Session key ───────────────────────────────────────────── */
function getOrCreateSessionKey(): string {
  const existing = localStorage.getItem("ccc_ai_session");
  if (existing) return existing;
  const key = crypto.randomUUID();
  localStorage.setItem("ccc_ai_session", key);
  return key;
}

/* ── Types ─────────────────────────────────────────────────── */
interface UIMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
}

/* ── Helpers ───────────────────────────────────────────────── */
function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

function stringToColor(str: string): string {
  const colors = [
    "#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b",
    "#10b981", "#06b6d4", "#ef4444", "#6366f1",
  ];
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

function renderMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\n/g, "<br/>");
}

/* ── Component ─────────────────────────────────────────────── */
export default function CccAiChat() {
  const [open, setOpen]               = useState(false);
  const [messages, setMessages]       = useState<UIMessage[]>([]);
  const [input, setInput]             = useState("");
  const [loading, setLoading]         = useState(false);
  const [unread, setUnread]           = useState(0);
  const [userInitial, setUserInitial] = useState("U");
  const [userColor, setUserColor]     = useState("#3b82f6");

  const bottomRef     = useRef<HTMLDivElement>(null);
  const inputRef      = useRef<HTMLTextAreaElement>(null);
  const sessionKeyRef = useRef(getOrCreateSessionKey());
  const sessionIdRef  = useRef<string | null>(null);
  // ✅ Keep a ref copy of messages for building history without stale closure
  const messagesRef   = useRef<UIMessage[]>([]);

  // Keep messagesRef in sync
  useEffect(() => { messagesRef.current = messages; }, [messages]);

  /* ── Scroll to bottom ── */
  const scrollBottom = useCallback(() => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  }, []);

  useEffect(() => {
    if (open) scrollBottom();
  }, [messages, open, scrollBottom]);

  /* ── Init session ── */
  useEffect(() => {
    let cancelled = false;

    async function initSession() {
      const key = sessionKeyRef.current;

      const { data: existing } = await supabase
        .from("chat_sessions")
        .select("id")
        .eq("session_key", key)
        .maybeSingle();

      if (cancelled) return;

      if (existing?.id) {
        sessionIdRef.current = existing.id;

        const { data: msgs } = await supabase
          .from("chat_messages")
          .select("role, content")
          .eq("session_id", existing.id)
          .order("created_at", { ascending: true });

        if (!cancelled && msgs && msgs.length > 0) {
          setMessages(msgs.map((m) => ({
            id: uid(),
            role: m.role as "user" | "assistant",
            content: m.content,
          })));
        }
      } else {
        const { data: created } = await supabase
          .from("chat_sessions")
          .insert({ session_key: key })
          .select("id")
          .single();

        if (!cancelled && created?.id) sessionIdRef.current = created.id;
      }
    }

    initSession();
    return () => { cancelled = true; };
  }, []);

  /* ── Save message ── */
  const saveMessage = useCallback(async (role: "user" | "assistant", content: string) => {
    const sid = sessionIdRef.current;
    if (!sid || !content.trim()) return;
    await supabase.from("chat_messages").insert({ session_id: sid, role, content });
    await supabase
      .from("chat_sessions")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", sid);
  }, []);

  /* ── Send message ── */
  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    // Update user avatar
    setUserInitial(trimmed[0].toUpperCase());
    setUserColor(stringToColor(trimmed));

    // ✅ Step 1: Add user message
    const userMsg: UIMessage = { id: uid(), role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    saveMessage("user", trimmed);

    // ✅ Step 2: Build history from ref (not stale closure)
    const history: ChatMessage[] = [
      ...messagesRef.current.map((m) => ({ role: m.role, content: m.content })),
      { role: "user", content: trimmed },
    ];

    // ✅ Step 3: Add empty assistant placeholder OUTSIDE of any updater
    const assistantId = uid();
    setMessages((prev) => [
      ...prev,
      { id: assistantId, role: "assistant", content: "", streaming: true },
    ]);

    let fullResponse = "";

    // ✅ Step 4: Call API — completely outside setMessages
    try {
      await sendChatMessage(history, (delta) => {
        fullResponse += delta;
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: fullResponse } : m
          )
        );
      });
    } catch (err) {
      console.error("[CccAiChat] sendChatMessage threw:", err);
      fullResponse = "Something went wrong. Please try again. 🙏";
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId ? { ...m, content: fullResponse } : m
        )
      );
    }

    // ✅ Step 5: Mark streaming done
    setMessages((prev) =>
      prev.map((m) =>
        m.id === assistantId ? { ...m, streaming: false } : m
      )
    );

    // ✅ Step 6: If fullResponse is still empty (edge case), set a fallback
    if (!fullResponse.trim()) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: "I didn't receive a response. Please try again. 🙏" }
            : m
        )
      );
    }

    saveMessage("assistant", fullResponse);
    setLoading(false);
    setUnread((n) => (open ? n : n + 1));

  }, [loading, open, saveMessage]);

  /* ── Clear chat ── */
  const clearChat = useCallback(async () => {
    setMessages([]);
    const sid = sessionIdRef.current;
    if (sid) {
      await supabase.from("chat_messages").delete().eq("session_id", sid);
    }
  }, []);

  /* ── Keyboard send ── */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  /* ── Open / close ── */
  const toggleOpen = () => {
    setOpen((v) => !v);
    if (!open) setUnread(0);
  };

  /* ── Render ── */
  return (
    <>
      {/* Floating FAB */}
      <button
        className="ccc-chat-fab"
        onClick={toggleOpen}
        aria-label="Open CCC AI Chat"
        title="Chat with CCC AI"
      >
        {open
          ? <ChevronDown size={20} strokeWidth={2} />
          : <MessageCircle size={20} strokeWidth={2} />
        }
        {!open && unread > 0 && (
          <span className="ccc-fab-badge">{unread > 9 ? "9+" : unread}</span>
        )}
      </button>

      {/* Chat panel */}
      <div className={`ccc-chat-panel ${open ? "ccc-chat-open" : ""}`}>

        {/* Header */}
        <div className="ccc-chat-header">
          <div className="ccc-chat-header-left">
            <div className="ccc-chat-avatar">
              <img
                className="CCC-AVATAR"
                src="/assets/icons/logo-ccc-transparent.png"
                alt="CCC AI"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
              <Sparkles size={14} strokeWidth={2} className="ccc-avatar-fallback" />
            </div>
            <div>
              <p className="ccc-chat-name">CCC AI</p>
              <p className="ccc-chat-status">
                <span className="ccc-status-dot" />
                Shelter of Praise Assistant
              </p>
            </div>
          </div>
          <div className="ccc-chat-header-actions">
            <button className="ccc-icon-btn" onClick={clearChat} title="Clear conversation">
              <img
                className="delete-ccc-chat"
                src="/assets/system/remove.png"
                alt="Clear"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
            </button>
            <button className="ccc-icon-btn" onClick={toggleOpen} title="Close">
              <img
                className="close-ccc-chat"
                src="/assets/system/close.png"
                alt="Close"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="ccc-messages">

          {/* Welcome + starters */}
          {messages.length === 0 && (
            <div className="ccc-welcome">
              <div className="ccc-welcome-avatar">
                <img
                  src="/assets/icons/logo-ccc-transparent.png"
                  alt="CCC AI"
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />
              </div>
              <p className="ccc-welcome-text">
                Hi! I'm CCC AI — your Shelter of Praise assistant. How can I help you today? 🙏
              </p>
              <div className="ccc-starters">
                {STARTER_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    className="ccc-starter-btn"
                    onClick={() => sendMessage(q)}
                    disabled={loading}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Bubbles */}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`ccc-bubble-row ${msg.role === "user" ? "ccc-row-user" : "ccc-row-ai"}`}
            >
              {/* AI avatar */}
              {msg.role === "assistant" && (
                <div className="ccc-ai-avatar">
                  <img
                    src="/assets/icons/logo-ccc-transparent.png"
                    alt="CCC AI"
                    style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "50%" }}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
              )}

              <div className={`ccc-bubble ${msg.role === "user" ? "ccc-bubble-user" : "ccc-bubble-ai"}`}>
                {msg.role === "assistant" ? (
                  <>
                    {msg.streaming && !msg.content ? (
                      <span className="ccc-typing-dots">
                        <span /><span /><span />
                      </span>
                    ) : (
                      <span dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }} />
                    )}
                    {msg.streaming && msg.content && <span className="ccc-cursor" />}
                  </>
                ) : (
                  msg.content
                )}
              </div>

              {/* User avatar */}
              {msg.role === "user" && (
                <div
                  className="ccc-user-avatar"
                  style={{ background: userColor }}
                  aria-label="You"
                >
                  {userInitial}
                </div>
              )}
            </div>
          ))}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="ccc-input-area">
          <textarea
            ref={inputRef}
            className="ccc-input"
            rows={1}
            placeholder="Ask CCC AI anything…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <button
            className={`ccc-send-btn ${!input.trim() || loading ? "ccc-send-disabled" : ""}`}
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            aria-label="Send"
          >
            <Send size={15} strokeWidth={2} />
          </button>
        </div>

        <p className="ccc-footer-note">Powered by DeepSeek · CCC AI may make mistakes</p>
      </div>
    </>
  );
}