export function setupPrivacyPolicyTrigger() {
    const privacyButton = document.getElementById("privacy-policy-button");
  
    if (!privacyButton) {
      console.warn("⚠️ Privacy Policy button not found in the DOM.");
      return;
    }
  
    privacyButton.addEventListener("click", (event) => {
      event.preventDefault();
  
      // ✅ Open Privacy Policy in a new tab
      const privacyUrl = "https://www.freeprivacypolicy.com/live/d0d81578-8520-4d1b-862e-2c007cc6727b";
      window.open(privacyUrl, "_blank", "noopener,noreferrer");
    });
  }
  