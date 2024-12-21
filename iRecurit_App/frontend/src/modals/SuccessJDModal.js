import React from "react";
import styles from "./SuccessJDModal.module.css";

const SuccessJDModal =  ({ className = "", handleAfterAIAnalysis }) => {
  return (
    <div className={[styles.root, className].join(" ")}>
        <h1 className={styles.title}>Congratulations!</h1>
        <p className={styles.description}>
          The job description has been successfully published on our portal.
        </p>
        <p className={styles.subDescription}>
          It will be live and ready to inspire candidates in just a few minutes.
          <br />
          Great job making it happen! 🚀
        </p>
        <div className={styles.buttonContainer}>
          <button className={styles.secondaryButton}>Go to Manage Jobs</button>
          <button className={styles.primaryButton}>
            Create a New Job Description
          </button>
        </div>
        <footer className={styles.footer}>
          Powered by <strong>iRecruit AI Engine</strong>
        </footer>
      </div>

  );
};

export default SuccessJDModal;




