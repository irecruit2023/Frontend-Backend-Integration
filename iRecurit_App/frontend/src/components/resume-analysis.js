import SecondaryButton from "./secondary-button";
import PropTypes from "prop-types";
import styles from "./resume-analysis.module.css";
import dice from "../assets/images/dice.png"


const ResumeAnalysis = ({ className = "" , handleResumeAnalysis2 }) => {
  return (
    <div className={[styles.root, className].join(" ")}>
      <section className={styles.sitBackAndSeeTheMaParent}>
        <h3 className={styles.sitBack}>
        {JSON.parse(localStorage?.loginInformation).data.name}, sit back and see the magic unfold!
        </h3>
        <div className={styles.thisShouldTakeContainer}>
          <p className={styles.thisShouldTake}>This should take a moment.</p>
          <p
            className={styles.thisShouldTake}
          >{`Feel free to patiently await while we meticulously analyse your resume, or you may choose to explore the portal further. We'll promptly notify you once the analysis is complete. `}</p>
        </div>
      </section>
      <div className={styles.secondaryButtonWrapper} onClick={handleResumeAnalysis2}>
        <SecondaryButton
          secondary="Notify me once the analysis is complete"
          secondaryFontWeight="500"
        />
      </div>
      <img
        className={styles.screenrecording20240124at22Icon}
        // loading="lazy"
        alt=""
        src= {dice}
      />
      <div className={styles.resumeAnalysisPoweredByIreWrapper}>
        <div className={styles.resumeAnalysisPowered}>
          Resume analysis powered by iRecruit AI Engine
        </div>
      </div>
    </div>
  );
};

ResumeAnalysis.propTypes = {
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
//           <ResumeAnalysis />
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

export default ResumeAnalysis;
