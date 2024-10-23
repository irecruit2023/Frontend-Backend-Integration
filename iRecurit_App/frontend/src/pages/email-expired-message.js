import { useState, useEffect } from "react"; 
import { useNavigate } from 'react-router-dom';
import styles from "./email-expired.module.css";
import { ReactComponent as Icon } from "../assets/icons/iRecurit-complete-logo.svg";
import { resendVerificationEmail } from "../utils/util";

const EmailExpiredMessage = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [resendDisabled, setResendDisabled] = useState(false); // Disable resend
  const [countdown, setCountdown] = useState(0); // Countdown timer
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setResendDisabled(false); // Re-enable the button when countdown ends
    }
  }, [countdown]);

  const resendEmail = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const email = JSON.parse(localStorage.getItem('loginInformation'))?.data?.candidate_email;

      if (!email) {
        setMessage({ text: "Email not found. Please sign up again.", type: "error" });
        setLoading(false);
        return;
      }

      const data = await resendVerificationEmail(email);

      if (data.success) {
        setMessage({ text: "Activation email has been resent successfully. Please check your inbox.", type: "success" });
        setResendDisabled(true); // Disable resend after success
        setCountdown(30);        // Set 30 seconds countdown
      } else {
        setMessage({ text: data.message || "Failed to resend the activation email.", type: "error" });
      }
    } catch (error) {
      setMessage({ text: "An error occurred while sending the email. Please try again later.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Inline styles for messages
  const messageStyles = {
    marginTop: '15px',
    padding: '10px',
    borderRadius: '5px',
    fontSize: '14px',
    textAlign: 'center',
  };

  const errorMessageStyles = {
    ...messageStyles,
    backgroundColor: '#f8d7da', // Light red background
    color: '#721c24',           // Dark red text
    border: '1px solid #f5c6cb' // Red border
  };

  const successMessageStyles = {
    ...messageStyles,
    backgroundColor: '#d4edda', // Light green background
    color: '#155724',           // Dark green text
    border: '1px solid #c3e6cb' // Green border
  };

  return (
    <div className={styles.expiredContainer}>
      <div className={styles.messageWrapper}>
        <div className={styles.logoContainer}onClick={() => navigate("/")} >
          <Icon loading="lazy" alt="iRecruit Logo" />
        </div>

        <div className={styles.messageContent}>
          <h1 className={styles.mainTitle}>Your Activation Link has Expired</h1>
          <p className={styles.subtitle}>
            It looks like the activation link has expired. You can request a new link by clicking below.
          </p>

          <button 
            className={styles.actionButton} 
            onClick={resendEmail} 
            disabled={loading || resendDisabled} // Disable based on loading or countdown
            style={{
              cursor: loading || resendDisabled ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Sending...' : (resendDisabled ? `Resend available in ${countdown}s` : 'Resend Activation Email')}
          </button>

          {message && (
            <div style={message.type === "error" ? errorMessageStyles : successMessageStyles}>
              {message.text}
            </div>
          )}
        </div>
      </div>

      <footer className={styles.footer}>
        © 2024 iRecruit. All Rights Reserved.
      </footer>
    </div>
  );
};

export default EmailExpiredMessage;
