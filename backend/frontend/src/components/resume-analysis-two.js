import SecondaryButton from "./secondary-button";
import PropTypes from "prop-types";
import styles from "./resume-analysis-two.module.css";
import dice from "../assets/images/dice.png"

const ResumeAnalysisTwo = ({ className = "" }) => {
  console.log("cummmmm")
  return (
    <div className={[styles.root, className].join(" ")}>
      <section className={styles.notificationParent}>
        <div className={styles.notification}>
          <h3 className={styles.awesome}>Awesome!</h3>
          <div
            className={styles.wellPromptlyNotify}
          >
            {`We'll promptly notify you once the analysis is complete. `}
            
            </div>
        </div>
        <img
          className={styles.screenrecording20240124at22Icon}
          loading="lazy"
          alt=""
          src= {dice}
        />
        <div className={styles.secondaryButtonParent}>
          <div style ={{color :'#f2665d'}}  className={styles.secondaryButton}>
            <SecondaryButton
              secondary="Explore iRecruit"
              secondaryFontWeight="500"
            />
          </div>
          <div className={styles.resumeAnalysisPoweredByIreWrapper}>
            <div className={styles.resumeAnalysisPowered}>
              Resume analysis powered by iRecruit AI Engine
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

ResumeAnalysisTwo.propTypes = {
  className: PropTypes.string,
};

export default ResumeAnalysisTwo;
