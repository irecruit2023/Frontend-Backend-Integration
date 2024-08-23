import SecondaryButton from "./secondary-button";
import PropTypes from "prop-types";
import styles from "./resume-uploaded.module.css";
import { ReactComponent as  Iconcross } from "../assets/icons/iconclose.svg";
import { ReactComponent as  Icondocument } from "../assets/icons/document.svg";


const ResumeUploaded = ({ className = "" }) => {
  return (
    <div className={[styles.root, className].join(" ")}>
      <a className={styles.awesome}>Awesome, Vidhi!</a>
      <div className={styles.fillNoFormsContainer}>
        <p className={styles.fillNoForms}>
          Fill no forms, save time and unleash the full potential of your job
          search journey by
        </p>
        <p className={styles.fillNoForms}>
          kickstarting it with a polished profile for unparalleled career
          outcomes.
        </p>
      </div>
      <h1 className={styles.uploadResume}>Upload Resume</h1>
      <div className={styles.iconContainerParent}>
        <div className={styles.iconContainer}>
          <div className={styles.iconframe1171275249}>
            <Icondocument/>
          </div>
          <div className={styles.resumeLabel}>
            <div className={styles.resumeTitle}>
              vidhi sharma_resume 2024
            </div>
            <div className={styles.secondaryButtonUploaded}>
              <div className={styles.secondary}>Upload from G drive</div>
            </div>
          </div>
        </div>
        <Iconcross/>
      </div>
      <div className={styles.buttonContainer}>
        <SecondaryButton
          secondary="Generate My Profile"
          secondaryFontWeight="500"
          secondaryButtonBackgroundColor="#f2665d"
          secondaryColor="#fff"
        />
      </div>
      <div className={styles.completionStats}>
        <div className={styles.textBoxParent}>
          <div className={styles.textBox} />
          <div className={styles.ofCandidatesWho}>
            88% of candidates who completed their profiles discovered a brighter
            career path.
          </div>
        </div>
      </div>
      <div className={styles.dontHaveAContainer}>
        <span>Don’t have a resume ready?</span>
        <span className={styles.tryOurResume}>
          {" "}
          Try our Resume Builder (AI)
        </span>
      </div>
    </div>
  );
};

ResumeUploaded.propTypes = {
  className: PropTypes.string,
};



const Modal = ({ isOpen, onClose, className }) => {
    console.log(isOpen,onClose,'hhhhhhhhhhh')
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <div className={[styles.modalBody, className].join(' ')}>
          <ResumeUploaded />
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export { Modal, ResumeUploaded };


