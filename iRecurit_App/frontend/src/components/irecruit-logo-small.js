import PropTypes from "prop-types";
import styles from "./irecruit-logo-small.module.css";

const IrecruitLogoSmall = ({ className = "" }) => {
  return (
    <div className={[styles.irecruitLogoSmall, className].join(" ")}>
      <img
        className={styles.symbolIcon}
        loading="lazy"
        alt=""
        src="/symbol.svg"
      />
      <div className={styles.logo}>
        <div className={styles.i}>
          <div className={styles.iChild} />
          <img className={styles.vectorIcon} alt="" src="/vector.svg" />
        </div>
        <div className={styles.recruit}>
          <img className={styles.vectorIcon1} alt="" src="/vector-1.svg" />
          <img className={styles.vectorIcon2} alt="" src="/vector-2.svg" />
          <img className={styles.vectorIcon3} alt="" src="/vector-3.svg" />
          <img className={styles.vectorIcon1} alt="" src="/vector-4.svg" />
          <img className={styles.vectorIcon5} alt="" src="/vector-5.svg" />
          <img className={styles.vectorIcon6} alt="" src="/vector-6.svg" />
          <img className={styles.vectorIcon7} alt="" src="/vector-7.svg" />
        </div>
      </div>
    </div>
  );
};

IrecruitLogoSmall.propTypes = {
  className: PropTypes.string,
};

export default IrecruitLogoSmall;
