import SecondaryButton from "./secondary-button";
import PropTypes from "prop-types";
import styles from "./resume-uploaded.module.css";
import { ReactComponent as Iconcross } from "../assets/icons/iconclose.svg";
import { ReactComponent as Icondocument } from "../assets/icons/document.svg";

const DescriptionUploaded = ({ className = "", handleDescriptionAnalysis, fileName, onClose }) => {
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
      <div className={styles.buttonContainer} onClick={handleDescriptionAnalysis}>
        <SecondaryButton
          secondary="Upload Now"
          secondaryFontWeight="500"
          secondaryButtonBackgroundColor="#f2665d"
          secondaryColor="#fff"
        />
      </div>
    </>
  );
};



export default DescriptionUploaded;
