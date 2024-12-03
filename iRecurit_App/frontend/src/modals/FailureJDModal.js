import React from "react";
import styles from "./FailureJDModal.module.css";

const FailureJDModal = () => {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Oops!</h1>
        <p className={styles.description}>
          It looks like a few essential sections are missing from your Job
          Description. To make sure your listing attracts the best candidates,
          we need all key details in place.
        </p>
        <div className={styles.missingSections}>
          <p className={styles.subTitle}>Here’s what’s missing:</p>
          <ul className={styles.list}>
            <li>
              <strong>Position Requirements</strong> (e.g., “3+ years of
              experience in software development”)
            </li>
            <li>
              <strong>Responsibilities</strong> (e.g., “Lead cross-functional
              teams to deliver projects on time”)
            </li>
          </ul>
        </div>
        <p className={styles.note}>
          Kindly update your JD with these sections and re-upload when ready.
        </p>
        <p className={styles.apology}>
          We apologise for the inconvenience but want to ensure your post
          shines!
        </p>
        <button className={styles.button}>Re-upload JD</button>
        <footer className={styles.footer}>
          Powered by <strong>iRecruit AI Engine</strong>
        </footer>
      </div>
    </div>
  );
};

export default FailureJDModal;
