import PrimaryButton from "./primary-button";
import PropTypes from "prop-types";
import styles from "./objective-modal.module.css";
import { useState } from "react";

const ObjectiveModal = ({ className = "", isOpen, onClose }) => {
  const [objective, setObjective] = useState(
    "I am committed to achieving excellence in everything I do, utilize my skills, dedication and strong work ethic, and ensuring that every action I take is driven by integrity and good values."
  );
  const [charCount, setCharCount] = useState(objective.length);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setObjective(newValue);
    setCharCount(newValue.length);
  };

  const handleSave = () => {
    // Logic to save the objective can go here
    console.log("Objective saved:", objective);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={[styles.modalContent, className].join(" ")}>
        <div className={styles.internshipworkExperienceWrapper}>
          <div className={styles.internshipworkExperience}>
            Objective
          </div>
        </div>
        <section className={styles.frameParent}>
          <textarea
            className={styles.frameWrapper} // Ensure styling in CSS
            value={objective}
            onChange={handleInputChange}
            rows="6"
            maxLength="1000"
            placeholder="Enter your objective here..."
          />
          <div className={styles.div}>{charCount}/1000</div>
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
            onClick={handleSave} // Handle saving the objective
          />
        </footer>
      </div>
    </div>
  );
};

ObjectiveModal.propTypes = {
  className: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ObjectiveModal;
