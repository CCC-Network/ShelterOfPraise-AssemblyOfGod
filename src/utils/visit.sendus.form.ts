// src/utils/visit.sendus.form.ts
import { supabase } from "../lib/supabaseClient";

export interface VisitFormResult {
  success: boolean;
  error?: string;
}

/**
 * submitVisitForm
 * Call this from your React onSubmit handler.
 * Returns { success: true } or { success: false, error: "reason" }
 */
export async function submitVisitForm(
  subject: string,
  name: string,
  email: string,
  message: string
): Promise<VisitFormResult> {
  if (!subject.trim() || !name.trim() || !email.trim() || !message.trim()) {
    return { success: false, error: "Please fill in all fields." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { success: false, error: "Please enter a valid email address." };
  }

  try {
    const { error } = await supabase.from("visits").insert([
      {
        subject: subject.trim(),
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      },
    ]);

    if (error) {
      console.error("[VisitForm] Supabase error:", error.message, error.code);
      return { success: false, error: "Failed to send your message. Please try again." };
    }

    return { success: true };
  } catch (err) {
    console.error("[VisitForm] Network error:", err);
    return { success: false, error: "Network error. Please check your connection." };
  }
}

/**
 * initVisitFormHandler
 * Legacy DOM-based handler — kept for backwards compatibility.
 * Prefer using submitVisitForm() directly inside React components.
 */
export function initVisitFormHandler() {
  const form         = document.getElementById("triggerFormVisitForm") as HTMLFormElement | null;
  const subjectInput = document.querySelector(".triggerSubject")       as HTMLInputElement | null;
  const nameInput    = document.querySelector(".triggerName")          as HTMLInputElement | null;
  const emailInput   = document.querySelector(".triggerEmail")         as HTMLInputElement | null;
  const messageInput = document.querySelector(".triggerMessage")       as HTMLTextAreaElement | null;
  const submitButton = document.getElementById("triggerSubmitForm")    as HTMLButtonElement | null;

  if (!form || !subjectInput || !nameInput || !emailInput || !messageInput || !submitButton) {
    console.warn("[VisitForm] DOM elements not found.");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    submitButton.disabled = true;
    submitButton.textContent = "Sending…";

    const result = await submitVisitForm(
      subjectInput.value,
      nameInput.value,
      emailInput.value,
      messageInput.value
    );

    if (!result.success) {
      alert(result.error ?? "Something went wrong.");
      submitButton.disabled = false;
      submitButton.textContent = "Send Message";
      return;
    }

    submitButton.textContent = "✓ Message Sent!";
    form.reset();

    setTimeout(() => {
      submitButton.disabled = false;
      submitButton.textContent = "Send Message";
    }, 2500);
  });
}