// src/utils/visit.sendus.form.ts
import { createClient } from "@supabase/supabase-js";

// Use Vite environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export function initVisitFormHandler() {
  const form = document.getElementById("triggerFormVisitForm") as HTMLFormElement | null;
  const subjectInput = document.querySelector(".triggerSubject") as HTMLInputElement | null;
  const nameInput = document.querySelector(".triggerName") as HTMLInputElement | null;
  const emailInput = document.querySelector(".triggerEmail") as HTMLInputElement | null;
  const messageInput = document.querySelector(".triggerMessage") as HTMLTextAreaElement | null;
  const submitButton = document.getElementById("triggerSubmitForm") as HTMLButtonElement | null;

  if (!form || !subjectInput || !nameInput || !emailInput || !messageInput || !submitButton) {
    console.warn("Visit form elements not found.");
    return;
  }

  console.log("Visit form initialized");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent page reload
    submitButton.disabled = true;

    const subject = subjectInput.value.trim();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!subject || !name || !email || !message) {
      alert("Please fill in all fields.");
      submitButton.disabled = false;
      return;
    }

    try {
      // Save to Supabase
      const { data, error } = await supabase
        .from("visits")
        .insert([{ subject, name, email, message }]);

      if (error) {
        console.error("Supabase insert error:", error.message);
        alert("❌ Failed to send message. Try again.");
        return;
      }

      console.log("Supabase insert success:", data);

      // Update button text to "Message Sent" briefly
      submitButton.textContent = "Message Sent";

      // Reset form after a short delay
      setTimeout(() => {
        form.reset();
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
      }, 2000); // 2 seconds

    } catch (err) {
      console.error(err);
      alert("❌ Network error. Please try again later.");
      submitButton.disabled = false;
    }
  });
}
