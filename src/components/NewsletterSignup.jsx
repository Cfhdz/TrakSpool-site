// File: src/components/NewsletterSignup.jsx

import { useState } from "react";
import { Check, AlertCircle } from "lucide-react";

/**
 * Enhanced Newsletter Signup Component
 * 
 * Features:
 * - Real-time email validation with visual feedback
 * - Animated success state
 * - Error handling with retry
 * - Accessible form controls
 * - Loading states
 * 
 * Note: Currently simulates submission. 
 * TODO: Integrate with Mailchimp when ready
 */
export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, validating, loading, success, error
  const [isValidEmail, setIsValidEmail] = useState(false);

  // Simple email validation regex
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Handle email input changes with validation
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    
    // Validate as user types (only show validation after 3 chars)
    if (newEmail.length > 2) {
      setIsValidEmail(validateEmail(newEmail));
    } else {
      setIsValidEmail(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isValidEmail) return;
    
    setStatus("loading");
    
    try {
      // Simulate API call - replace with actual Mailchimp integration
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setStatus("success");
      setEmail("");
      setIsValidEmail(false);
      
      // Reset after 8 seconds
      setTimeout(() => setStatus("idle"), 8000);
    } catch (err) {
      setStatus("error");
      
      // Reset error after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  // Show success state
  if (status === "success") {
    return (
      <div className="newsletterSuccess">
        <div className="newsletterSuccessIcon">
          <Check size={24} strokeWidth={2.5} />
        </div>
        <div className="newsletterSuccessContent">
          <div className="newsletterSuccessTitle">You're on the list!</div>
          <div className="newsletterSuccessText">
            Check your inbox to confirm your subscription.
          </div>
        </div>
      </div>
    );
  }

  // Show main form
  return (
    <div className="newsletterSignup">
      <form className="newsletterForm" onSubmit={handleSubmit}>
        <div className="newsletterInputWrapper">
          <label className="srOnly" htmlFor="newsletterEmail">
            Email address
          </label>
          <input
            id="newsletterEmail"
            name="email"
            type="email"
            className={`newsletterInput ${isValidEmail ? 'newsletterInput--valid' : ''} ${status === 'error' ? 'newsletterInput--error' : ''}`}
            placeholder="you@example.com"
            autoComplete="email"
            required
            value={email}
            onChange={handleEmailChange}
            disabled={status === "loading"}
          />
          
          {/* Validation indicator */}
          {email.length > 2 && (
            <div className={`newsletterValidation ${isValidEmail ? 'newsletterValidation--valid' : 'newsletterValidation--invalid'}`}>
              {isValidEmail ? (
                <Check size={18} strokeWidth={2.5} />
              ) : (
                <AlertCircle size={18} strokeWidth={2} />
              )}
            </div>
          )}
        </div>
        
        <button 
          type="submit" 
          className="newsletterBtn"
          disabled={!isValidEmail || status === "loading"}
        >
          {status === "loading" ? (
            <span className="newsletterBtnLoading">
              <span className="spinner"></span>
              Subscribing...
            </span>
          ) : (
            "Subscribe"
          )}
        </button>
      </form>
      
      {/* Error message */}
      {status === "error" && (
        <div className="newsletterError">
          <AlertCircle size={16} strokeWidth={2} />
          <span>Something went wrong. Please try again.</span>
        </div>
      )}
      
      {/* Trust indicators */}
      {status !== "error" && (
        <div className="newsletterNote">
          ✓ No spam. ✓ Unsubscribe anytime.
        </div>
      )}
    </div>
  );
}
