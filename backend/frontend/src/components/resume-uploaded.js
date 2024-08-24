import SecondaryButton from "./secondary-button";
import PropTypes from "prop-types";
import styles from "./resume-uploaded.module.css";
import { ReactComponent as Iconcross } from "../assets/icons/iconclose.svg";
import { ReactComponent as Icondocument } from "../assets/icons/document.svg";



const ResumeUploaded = ({ className = "", handleResumeAnalysis }) => {
  return (
    <>
      <div className={styles.iconContainerParent}>
        <div className={styles.iconContainer}>
          <div className={styles.iconframe1171275249}>
            <Icondocument />
          </div>
          <div className={styles.resumeLabel}>
            <div className={styles.resumeTitle}>
              vidhi sharma_resume 2024
            </div>
          </div>
        </div>
        <Iconcross />
      </div>
      <div className={styles.buttonContainer} onClick ={handleResumeAnalysis}>
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
};



// const Modal = ({ isOpen, onClose, className }) => {
//     console.log(isOpen,onClose,'hhhhhhhhhhh')
//   if (!isOpen) return null;

//   return (
//     <div className={styles.modalOverlay}>
//       <div className={styles.modalContent}>
//         <button className={styles.closeButton} onClick={onClose}>X</button>
//         <div className={[styles.modalBody, className].join(' ')}>
//           <ResumeUploaded />
//         </div>
//       </div>
//     </div>
//   );
// };

// Modal.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   className: PropTypes.string,
// };

export default ResumeUploaded;


