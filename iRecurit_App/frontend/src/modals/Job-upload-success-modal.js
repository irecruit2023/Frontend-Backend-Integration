import React from "react";
import styles from "./job-upload-success-modal.module.css";

const JobUploadSuccessModal = () => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Amazing!</h1>
        <p className={styles.subtitle}>
          Great news! Your Job Description has been approved by our AI and is now ready to go live!
        </p>
        <p className={styles.text}>
          Before you publish, take a moment to preview your post and see it as candidates will. <br />
          Once you're happy with it, hit "Publish" and watch the applications start rolling in.
        </p>
        <p className={styles.text}>
          Here's to finding the perfect fit – our ideal candidate is just a click away!
        </p>
        <div className={styles.iconContainer}>
          <span className={styles.icon}>📄</span>
          <a href="#" className={styles.link}>
            View Job Description
          </a>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.secondaryButton}>Save and publish later</button>
          <button className={styles.primaryButton}>Publish Now</button>
        </div>
        <p className={styles.footer}>Powered by iRecruit AI Engine</p>
      </div>
    </div>
  );
};

export default JobUploadSuccessModal;
