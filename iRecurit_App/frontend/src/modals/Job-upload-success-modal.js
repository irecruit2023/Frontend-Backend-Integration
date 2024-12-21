import React, { useState } from "react";
import styles from "./job-upload-success-modal.module.css";
import SuccessJDModal from "../modals/SuccessJDModal";

const JobUploadSuccessModal = ({ className = "", handleAfterAIAnalysis }) => {
  // State to manage the visibility of the congratulations message and SuccessJDModal
  const [showCongratulationMsg, setShowCongratulationMsg] = useState(true);

  // Function to handle the "Publish Now" button click
  const handlePublishNow = () => {
    setShowCongratulationMsg(false); // Hide the current component
  };

  return (
    <>
      {showCongratulationMsg ? (
        <div className={[styles.root, className].join(" ")}>
          <h1 className={styles.title}>Amazing!</h1>
          <p className={styles.subtitle}>
            Great news! Your Job Description has been approved by our AI and is now ready to go live!
          </p>
          <p className={styles.text}>
            Before you publish, take a moment to preview your post and see it as candidates will. <br />
            Once you're happy with it, hit "Publish" and watch the applications start rolling in.
          </p>
          <p className={styles.subtitle}>
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
            <button className={styles.primaryButton} onClick={handlePublishNow}>
              Publish Now
            </button>
          </div>
          <p className={styles.footer}>Powered by iRecruit AI Engine</p>
        </div>
      ) : (
        // Show the SuccessJDModal when the "Publish Now" button is clicked
        <SuccessJDModal />
      )}
    </>
  );
};

export default JobUploadSuccessModal;
