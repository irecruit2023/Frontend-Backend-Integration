import PrimaryButton from "./primary-button";
import PropTypes from "prop-types";
import styles from "./delete-modal.module.css";
import { useState, useEffect } from "react";
import Confirmation from "./delete-confirmation";

const DeleteModal = ({ className = "", isOpen, onClose, selectedItem }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  // When the confirmation is shown, set a timer to automatically close the modal after 3 seconds
  useEffect(() => {
    if (showConfirmation) {
      const timer = setTimeout(() => {
        setShowConfirmation(false)
        onClose();  // Close the modal after 3 seconds
      }, 3000);
      return () => clearTimeout(timer); // Clean up the timer when the component is unmounted or state changes
    }
  }, [showConfirmation, onClose]);

  if (!isOpen) return null;

  const handleDeleteClick = () => {
    setShowConfirmation(true); // Show confirmation when delete is clicked
  };

  const items = [
    "Skill Analysis",
    "Top Tech Skills",
    "Education",
    "Internship/Work Experience",
    "Certifications",
    "Achievements",
    "Case Study",
  ];

  return (
    <div className={styles.modalOverlay}>
      <div
        style={{
          height: showConfirmation ? '328px' : '578px', // Conditionally set height
        }}
        className={[styles.modalContent, className].join(" ")}
      >
        {showConfirmation ? (
          <Confirmation selectedItem={selectedItem} />
        ) : (
          <div className={styles.deleteInformation}>
            <div className={styles.upperMessage}>
              <div style={{ fontSize: '32px', fontWeight: '600', color: '#F2665D' }}>Hold up!</div>
              <p className={styles.warning}>
                <span className="icon">ℹ️</span> You're about to delete {selectedItem}?
              </p>
              <p>This is your chance to shine, don't miss the spotlight! Keep it and let your successes speak for themselves.</p>
            </div>
            <div className={styles.lowerList}>
              <div className={styles.listContainer}>
                <ul style={{ listStyleType: 'none' }}>
                  {items.map((item, index) => (
                    <li
                      key={index}
                      style={{
                        color: item === selectedItem ? '#F2665D' : 'inherit', // Make the matched item red
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <footer className={styles.secondaryButtonParent}>
              <div className={styles.secondaryButton} onClick={onClose}>
                <div className={styles.secondary}>Cancel</div>
              </div>
              <div onClick={handleDeleteClick}>
                <PrimaryButton
                  propPadding="7.5px 57px"
                  propAlignSelf="unset"
                  primary="Delete"
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
              </div>
            </footer>
          </div>
        )}
      </div>
    </div>
  );
};

DeleteModal.propTypes = {
  className: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedItem: PropTypes.string.isRequired, // Prop for selected item
};

export default DeleteModal;
