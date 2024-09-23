import PropTypes from "prop-types";
import styles from "./certification-modal.module.css";
import { useState } from "react";

const ObjectiveModal = ({ className = "", isOpen, onClose }) => {
  const [expandedItem, setExpandedItem] = useState(null);

  if (!isOpen) return null;

  const toggleExpand = (index, url) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  const openUrl= (url) => {
    // Open a new tab on click
    window.open(url, '_blank');
  };

  const certifications = [
    {
      title: "Certified Secure Software Lifecycle Professional",
      details: "The AWS Certified Developer – Associate certification is meant to train software engineers in creating and deploying cloud-based web apps. Be warned ....",
      url: "https://example.com/cert1"
    },
    {
      title: "Certified Software Engineer",
      details: "A certification that validates software engineering expertise, including design and development.",
      url: "https://example.com/cert2"
    },
    {
      title: "Certified Scrum Developer",
      details: "For professionals involved in Scrum-based agile development methodologies.",
      url: "https://example.com/cert3"
    },
    {
        title: "Certified Scrum Developer",
        details: "For professionals involved in Scrum-based agile development methodologies.",
        url: "https://example.com/cert3"
      },
      
  ];

  return (
    <div className={styles.modalOverlay}>
      <div className={[styles.modalContent, className].join(" ")}>
        <div className={styles.certificationsContainer}>
          <div className={styles.certificationsContent}>
            <div className={styles.upperMessage}>
              <div className={styles.certificationHeading}>No certifications yet?</div>
              <div className={styles.heading}>
                <div className={styles.certificationSub1Heading}>No worries! We've got a list to get you started.</div>
                <div className={styles.certificationSub2Heading}>Recommended certifications list</div>
              </div>
            </div>

            <div className={styles.lowerList}>
              <ul style={{ padding: "0px" }}>
                {certifications.map((cert, index) => (
                  <li
                    key={index}
                    className={styles.items}
                    onClick={() => toggleExpand(index, cert.url)}
                    style={{ cursor: "pointer" }}
                  >
                <div style={{padding: "24px 24px"}}>
                <div onClick={() => openUrl(cert.url)} className={styles.itemTitle}>
                      {cert.title}
                </div>
                    {expandedItem === index && (
                      <div className={styles.itemDetails}>
                        {cert.details}
                      </div>
                    )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <footer style={{ marginBottom: "48px" }} className={styles.secondaryButtonParent}>
          <div className={styles.secondaryButton} onClick={onClose}>
            <div className={styles.secondary}>Cancel</div>
          </div>
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
