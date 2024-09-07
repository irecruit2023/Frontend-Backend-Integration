import PrimaryButton from "./primary-button";
import PropTypes from "prop-types";
import styles from "./profile-edit-modal.module.css";

const EditModal = ({ className = "" }) => {
  return (
    <div className={[styles.a, className].join(" ")}>
      <div className={styles.internshipworkExperienceWrapper}>
        <div className={styles.internshipworkExperience}>
          Internship/Work Experience
        </div>
      </div>
      <section className={styles.frameParent}>
        <div className={styles.frameWrapper}>
          <div className={styles.razorpaySoftwareEngineeringWrapper}>
            <div className={styles.razorpaySoftwareEngineeringContainer}>
              <p className={styles.razorpay}>Razorpay</p>
              <p className={styles.softwareEngineeringInternshi}>
                Software Engineering Internship
              </p>
              <p className={styles.jan2024}>Jan 2024 - Present - Full Time</p>
              <p className={styles.gurgaonIndia}>Gurgaon, India</p>
              <p className={styles.blankLine}>&nbsp;</p>
              <p className={styles.mg}>1mg</p>
              <p className={styles.softwareEngineeringInternshi1}>
                Software Engineering Internship
              </p>
              <p className={styles.oct2023}>Oct 2023 - Dec 2023 - Full Time</p>
              <p className={styles.gurgaonIndia1}>Gurgaon, India</p>
              <p className={styles.blankLine1}>&nbsp;</p>
              <p className={styles.mg1}>1mg</p>
              <p className={styles.trainee}>Trainee</p>
              <p className={styles.july2023}>
                July 2023 - Sep 2023 - Full Time
              </p>
              <p className={styles.gurgaonIndia2}>Gurgaon, India</p>
            </div>
          </div>
        </div>
        <div className={styles.div}>0/1000</div>
      </section>
      <footer className={styles.secondaryButtonParent}>
        <div className={styles.secondaryButton}>
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
  );
};

EditModal.propTypes = {
  className: PropTypes.string,
};

export default EditModal;
