import styles from "./email-expired.module.css";
import { ReactComponent as Icon } from "../assets/icons/iRecurit-complete-logo.svg";

const EmailExpiredMessage = () => {
  const resendEmail = () => {
    // Logic for resending the email goes here
    navigate('/signup');
    console.log("Resending email...");
  };

  return (
    <div className={styles.expiredContainer}>
      <div className={styles.messageWrapper}>
        <div className={styles.logoContainer}>
          <Icon  loading="lazy" alt="iRecruit Logo" />
        </div>

        <div className={styles.messageContent}>
          <h1 className={styles.mainTitle}>Your Activation Link has Expired</h1>
          <p className={styles.subtitle}>
            It looks like the activation link has expired. You can request a new link by clicking below.
          </p>

          <button className={styles.actionButton} onClick={resendEmail}>
            Resend Activation Email
          </button>
        </div>
      </div>

      <footer className={styles.footer}>
        © 2024 iRecruit. All Rights Reserved.
      </footer>
    </div>
  );
};

export default EmailExpiredMessage;
