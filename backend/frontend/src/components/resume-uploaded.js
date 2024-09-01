import SecondaryButton from "./secondary-button";
import PropTypes from "prop-types";
import styles from "./resume-uploaded.module.css";
import { ReactComponent as Iconcross } from "../assets/icons/iconclose.svg";
import { ReactComponent as Icondocument } from "../assets/icons/document.svg";

const ResumeUploaded = ({ className = "", handleResumeAnalysis, fileName, onClose }) => {
  return (
    <>
      <div className={styles.iconContainerParent}>
        <div className={styles.iconContainer}>
          <div className={styles.iconframe1171275249}>
            <Icondocument />
          </div>
          <div className={styles.resumeLabel}>
            <div className={styles.resumeTitle}>
              {fileName}
            </div>
          </div>
        </div>
        <Iconcross onClick={onClose} className={styles.closeIcon} />
      </div>
      <div className={styles.buttonContainer} onClick={handleResumeAnalysis}>
        <SecondaryButton
          secondary="Generate My Profile"
          secondaryFontWeight="500"
          secondaryButtonBackgroundColor="#f2665d"
          secondaryColor="#fff"
        />
      </div>
    </>
  );
};

ResumeUploaded.propTypes = {
  className: PropTypes.string,
  handleResumeAnalysis: PropTypes.func.isRequired,
  fileName: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired, // Add PropTypes for onClose
};

export default ResumeUploaded;
