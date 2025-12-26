{/*
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

// ✅ Initialize Supabase Client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// ✅ Initialize Resend Client
const resendApiKey = import.meta.env.VITE_RESEND_API_KEY!;
const resend = new Resend(resendApiKey);

// ✅ Setup Newsletter Logic
export function setupNewsletter() {
  const emailInput = document.querySelector<HTMLInputElement>("#email-newsletter");
  const subscribeButton = document.querySelector<HTMLButtonElement>("#subscribe-button");

  // 🧩 If elements are missing, stop
  if (!emailInput || !subscribeButton) return;

  subscribeButton.addEventListener("click", async () => {
    const email = emailInput.value.trim();

    if (!email || !validateEmail(email)) {
      alert("⚠️ Please enter a valid email address.");
      return;
    }

    // 🕐 Disable button to prevent multiple clicks
    subscribeButton.disabled = true;
    subscribeButton.textContent = "Subscribing...";

    try {
      // 1️⃣ Store the email in Supabase
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert([{ email }]);

      if (error) {
        if (error.code === "23505") {
          alert("📧 This email is already subscribed.");
        } else {
          console.error("Supabase error:", error);
          alert("❌ Failed to subscribe. Please try again later.");
        }
        resetButton(subscribeButton);
        return;
      }

      // 2️⃣ Send confirmation email via Resend
      await resend.emails.send({
        from: "CCC Network <onboarding@resend.dev>",
        to: email,
        subject: "Welcome to CCC Network Newsletter",
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f8f9fa; padding: 30px; text-align: center; border-radius: 10px; color: #333;">
    <img src="https://github.com/conquerorscoheirs-ag/ShelterOfPraise-AssemblyOfGod-Database-Hosting/blob/main/Public/photos/albums/JhericoBalasa/J_J_B_2.jpg?raw=true" 
         alt="Pastor Jherico John Balasa" 
         style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; margin-bottom: 15px;"/>

    <h2 style="color: #2b5797;">🕊️ Welcome to the CCC Network Newsletter</h2>
    
    <p style="font-size: 16px; margin-top: 10px; line-height: 1.6;">
      Beloved in Christ, we’re blessed to have your presence with us!  
      As part of our growing family of faith, you’ll receive inspirational words,  
      church events, and stories of God’s goodness.  
      May this be a step toward deeper fellowship with our Savior.
    </p>

    <blockquote style="font-style: italic; color: #555; margin: 20px 0;">
      “The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you.”  
      <br/>— Numbers 6:24-25
    </blockquote>

    <h3 style="margin-top: 25px; color: #2b5797;">🎉 What’s Ahead in Our Journey</h3>
    <ul style="list-style: none; padding: 0; margin-top: 10px; color: #444;">
      <li>📖 Leadership & Discipleship Programs</li>
      <li>🔥 Youth Camp & Worship Nights</li>
      <li>❤️ Community Outreach & Fellowship</li>
    </ul>

    <br/>
    <div style="background-color: #eef2ff; border-radius: 8px; padding: 15px; display: inline-block;">
      <p style="margin: 0; font-size: 15px; color: #333;">
        <strong>Location:</strong> MQ38+RH4, Kalilangan, Bukidnon, Northern Mindanao, Philippines<br/>
        <strong>Service Time:</strong> Sunday 09:00 AM<br/>
        <strong>Contact:</strong> +63 951 251 8441<br/>
        <strong>GitHub:</strong> <a href="https://github.com/conquerorscoheirs-ag" style="color:#2b5797;">conquerorscoheirs-ag</a><br/>
        <strong>Email:</strong> conquerorscoheirsag@gmail.com | shelterofpraiseassemblyofgod@gmail.com
      </p>
    </div>

    <br/><br/>
    <p style="font-size: 14px; color: #777;">
      With blessings,<br/>
      <strong>Pastor Jherico John Balasa</strong><br/>
      <em>“We welcome you in the love of Christ.”</em>
    </p>
  </div>
        `,
      });

      // 3️⃣ Success feedback
      subscribeButton.textContent = "✅ Subscribed!";
      emailInput.value = "";

      // ⏳ Revert text back after 3 seconds
      setTimeout(() => {
        resetButton(subscribeButton);
      }, 3000);

    } catch (err) {
      console.error("Newsletter system error:", err);
      alert("🚫 Something went wrong. Please try again later.");
      resetButton(subscribeButton);
    }
  });
}

// ✅ Helper to validate email
function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}

// ✅ Helper to reset the subscribe button
function resetButton(button: HTMLButtonElement) {
  button.disabled = false;
  button.textContent = "Subscribe";
}
  */}

{/*
  import { createClient } from "@supabase/supabase-js";

// ✅ Initialize Supabase Client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export function setupNewsletter() {
  const emailInput = document.querySelector<HTMLInputElement>("#email-newsletter");
  const subscribeButton = document.querySelector<HTMLButtonElement>("#subscribe-button");

  if (!emailInput || !subscribeButton) return;

  subscribeButton.addEventListener("click", async () => {
    const email = emailInput.value.trim();

    if (!email || !validateEmail(email)) {
      alert("⚠️ Please enter a valid email address.");
      return;
    }

    subscribeButton.disabled = true;
    subscribeButton.textContent = "Subscribing...";

    try {
      // 1️⃣ Store email in Supabase table
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert([{ email }]);

      if (error) {
        if (error.code === "23505") {
          alert("📧 This email is already subscribed.");
        } else {
          console.error("Supabase error:", error);
          alert("❌ Subscription failed. Try again later.");
        }
        resetButton(subscribeButton);
        return;
      }

      // 2️⃣ Call Supabase Edge Function (Resend handled in backend)
      const { data, error: sendError } = await supabase.functions.invoke("newsletter", {
        body: JSON.stringify({ email }),
      });

      if (sendError) {
        console.error(sendError);
        alert("🚫 Failed to send confirmation email.");
      } else {
        console.log("Resend response:", data);
        alert("✅ Subscribed successfully! Please check your inbox.");
      }

      subscribeButton.textContent = "✅ Subscribed!";
      emailInput.value = "";

      setTimeout(() => resetButton(subscribeButton), 3000);
    } catch (err) {
      console.error("Newsletter error:", err);
      alert("🚫 Something went wrong.");
      resetButton(subscribeButton);
    }
  });
}

function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}

function resetButton(button: HTMLButtonElement) {
  button.disabled = false;
  button.textContent = "Subscribe";
}

*/}

import { supabase } from "../lib/supabaseClient"; // ✅ Reuse existing client

export function setupNewsletter() {
  const emailInput = document.querySelector<HTMLInputElement>("#email-newsletter");
  const subscribeButton = document.querySelector<HTMLButtonElement>("#subscribe-button");

  if (!emailInput || !subscribeButton) return;

  subscribeButton.addEventListener("click", async () => {
    const email = emailInput.value.trim();

    if (!email || !validateEmail(email)) {
      alert("⚠️ Please enter a valid email address.");
      return;
    }

    subscribeButton.disabled = true;
    subscribeButton.textContent = "Subscribing...";

    try {
      // 1️⃣ Store email in Supabase table
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert([{ email }]);

      if (error) {
        if (error.code === "23505") {
          alert("📧 This email is already subscribed.");
        } else {
          console.error("Supabase error:", error);
          alert("❌ Subscription failed. Try again later.");
        }
        resetButton(subscribeButton);
        return;
      }

      // 2️⃣ Call Supabase Edge Function to send email
      const { data, error: sendError } = await supabase.functions.invoke("newsletter", {
        body: JSON.stringify({ email }),
      });

      if (sendError) {
        console.error(sendError);
        alert("🚫 Failed to send confirmation email.");
      } else {
        console.log("Resend response:", data);
        alert("✅ Subscribed successfully! Please check your inbox.");
      }

      subscribeButton.textContent = "✅ Subscribed!";
      emailInput.value = "";

      setTimeout(() => resetButton(subscribeButton), 3000);
    } catch (err) {
      console.error("Newsletter error:", err);
      alert("🚫 Something went wrong.");
      resetButton(subscribeButton);
    }
  });
}

function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}

function resetButton(button: HTMLButtonElement) {
  button.disabled = false;
  button.textContent = "Subscribe";
}

