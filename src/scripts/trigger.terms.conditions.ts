export function setupTermsAndConditionsTrigger() {
    const termsButton = document.getElementById("terms-button");
  
    if (!termsButton) {
      console.warn("⚠️ Terms & Conditions button not found in the DOM.");
      return;
    }
  
    termsButton.addEventListener("click", (event) => {
      event.preventDefault();
  
      // ✅ Open the Terms & Conditions link in a new browser tab
      const termsUrl = "https://www.freeprivacypolicy.com/live/57788a5a-b602-43b5-8831-e75b9eb3bcc6";
      window.open(termsUrl, "_blank", "noopener,noreferrer");
    });
  }
  