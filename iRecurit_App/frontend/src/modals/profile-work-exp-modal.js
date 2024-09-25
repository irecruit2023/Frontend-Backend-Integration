import PrimaryButton from "./primary-button";
import PropTypes from "prop-types";
import styles from "./profile-work-exp-modal.module.css";
import { useState } from "react";

const WorkExpModal = ({ className = "", isOpen, onClose }) => {
  // State to store the text in the textarea
  const [workExperienceText, setWorkExperienceText] = useState(
    `Razorpay\nSoftware Engineering Internship\nJan 2024 - Present - Full Time\nGurgaon, India\n\n1mg\nSoftware Engineering Internship\nOct 2023 - Dec 2023 - Full Time\nGurgaon, India\n\n1mg\nTrainee\nJuly 2023 - Sep 2023 - Full Time\nGurgaon, India`
  );

  // Handle changes to textarea input
  const handleTextareaChange = (e) => {
    setWorkExperienceText(e.target.value);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={[styles.modalContent, className].join(" ")}>
      <div className={styles.objectiveContainer}>
        <div className={styles.internshipworkExperienceWrapper}>
          <div className={styles.internshipworkExperience}>
            Internship/Work Experience
          </div>
        </div>

        <section className={styles.frameParent}>
            <textarea className={styles.frameWrapper}
              value={workExperienceText}
              onChange={handleTextareaChange}
              placeholder="Enter your work experience. Follow the format: Company Name, Role, Date, City"
              rows="12" // Adjust height as needed
            />
          <div className={styles.characterCount}>
            {workExperienceText.length}/1000
          </div>
        </section>

        <footer className={styles.secondaryButtonParent}>
          <div className={styles.secondaryButton} onClick={onClose}>
            <div className={styles.secondary}>Cancel</div>
          </div>
          <PrimaryButton
            propPadding="7.5px 57px"
            propAlignSelf="unset"
            primary="Save"
            propFontSize="19px"
            propColor="#f5f5f5"
            propDisplay="inline-block"
            propMinWidth="48px"
            propTextDecoration="unset"
            primaryButtonPosition="unset"
            primaryButtonTop="unset"
            primaryButtonLeft="unset"
            primaryButtonWidth="unset"
            primaryButtonHeight="unset"
          />
        </footer>
      </div>
      </div>
    </div>
  );
};

WorkExpModal.propTypes = {
  className: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default WorkExpModal;
