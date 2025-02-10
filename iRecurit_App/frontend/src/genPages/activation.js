import styles from "./activation.module.css";
import { ReactComponent as Loading } from "../assets/icons/loading.svg";
import { ReactComponent as Icon } from "../assets/icons/iRecurit-complete-logo.svg";

const EmailActivationMessage = () => {
  const goToLogin = () => {
    window.location.href = "/login";
  };

  return (
    <div className={styles.activationContainer}>

      <div className={styles.messageWrapper}>
        <div className={styles.logoContainer}>
          <Icon  loading="lazy" alt="iRecruit Logo" />
        </div>

        <div className={styles.messageContent}>
          <h1 className={styles.mainTitle}>Your Account is Activated!</h1>
          <p className={styles.subtitle}>
            Your account has been successfully activated. Please proceed to login.
          </p>

          <button className={styles.actionButton} onClick={goToLogin}>
            Go to Login
          </button>
        </div>
      </div>

      <footer className={styles.footer}>
        © 2024 iRecruit. All Rights Reserved.
      </footer>
    </div>
  );
};

export default EmailActivationMessage;
