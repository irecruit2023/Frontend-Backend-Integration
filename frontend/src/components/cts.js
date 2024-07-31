import { useMemo } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import styles from "./cts.module.css";

const Cts = ({
  className = "",
  primary,
  alreadyHaveAnAccount,
  login,
  showDescription,
  propAlignSelf,
  propWidth,
}) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const ctsStyle = useMemo(() => {
    return {
      alignSelf: propAlignSelf,
      width: propWidth,
    };
  }, [propAlignSelf, propWidth]);

  const handlePrimaryClick = () => {
    if (primary === "Login") {
      navigate('/home'); // Navigate to welcome page
    } else {
      navigate('/signupmessage'); // Navigate to signupmessage page
    }
  };

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to login page
  };

  const handleSignupClick = () => {
    navigate('/signup'); // Navigate to sign-up page
  };

  return (
    <div className={[styles.cts, className].join(" ")} style={ctsStyle}>
      <div className={styles.primaryButton} onClick={handlePrimaryClick}>
        <div className={styles.primary}>{primary}</div>
      </div>
      <div className={styles.description}>
        {showDescription && (
          <div className={styles.description1}>
            <p className={styles.byContinuingYouAgreeToTh}>
              <span>By continuing, you agree to the</span>
              <span className={styles.span}>{` `}</span>
              <span className={styles.termsOfService}>Terms of Service</span>
              <span className={styles.span1}>{`, `}</span>
            </p>
            <p className={styles.andPrivacyPolicy}>
              <span className={styles.and}>and</span>
              <span className={styles.span2}>{` `}</span>
              <span>Privacy Policy.</span>
            </p>
          </div>
        )}
        <div className={styles.description2}>
          <span>{alreadyHaveAnAccount}</span>
          <span className={styles.login} onClick={login === " Login" ? handleLoginClick : handleSignupClick}>
            {login}
          </span>
        </div>
      </div>
    </div>
  );
};

Cts.propTypes = {
  className: PropTypes.string,
  primary: PropTypes.string,
  alreadyHaveAnAccount: PropTypes.string,
  login: PropTypes.string,
  showDescription: PropTypes.bool,

  /** Style props */
  propAlignSelf: PropTypes.any,
  propWidth: PropTypes.any,
};

export default Cts;
