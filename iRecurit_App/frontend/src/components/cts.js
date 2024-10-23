import { useMemo } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styles from "./cts.module.css";
import { signup,userLogin } from "../utils/util";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyError } from "../helper";

const Cts = ({
  className = "",
  primary,
  alreadyHaveAnAccount,
  login,
  showDescription,
  propAlignSelf,
  propWidth,
  formData, 
  loginData
}) => {

  console.log("formData",formData)
  const navigate = useNavigate();

  const ctsStyle = useMemo(() => {
    return {
      alignSelf: propAlignSelf,
      width: propWidth,
    };
  }, [propAlignSelf, propWidth]);

  const validateFormData = () => {
    console.log(formData)
    const { firstName, lastName, email, password, reEnterPassword } = formData;
    if (!firstName || !lastName || !email || !password || !reEnterPassword) {
      notifyError("Please fill in all fields.");
      return false;
    }
    if (password !== reEnterPassword) {
      notifyError("Passwords do not match.");
      return false;
    }
    return true;
  };


  const validateLoginData = () => {
    const { email, password } = loginData;
    console.log("logindata",loginData)
    if (!email || !password) {
      notifyError("Please fill in all fields.");
      return false;
    }
    return true;
  };


  const handlePrimaryClick = async () => {
    if (primary === "Sign up") {
      if (validateFormData()) {
        try {
          const response = await signup(formData.email,formData.firstName, formData.lastName,formData.password );
          if (response.success) {
            localStorage.setItem("loginInformation", JSON.stringify(response));
            navigate('/signupMessage');
          } else {
          
            notifyError(response.message || "Sign up failed.");
          }
        } catch (error) {
          notifyError("An error occurred during sign up. Please try again.");
        }
      }
    } else if (primary === "Login") {

      if (validateLoginData()) {
        // navigate('/home');
        try {
          const response = await userLogin(loginData.email,loginData.password );
          console.log(response)
          if (response.success) {
            localStorage.setItem("loginInformation", JSON.stringify(response));
            navigate('/home');
          } else {
            console.log(response.message)
            notifyError(response.message);
          }
        } catch (error) {
          notifyError("An error occurred during login up. Please try again.");
        }

      }
      else{
        notifyError("not valid")
      }

    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
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
  formData: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    reEnterPassword: PropTypes.string.isRequired,
  }),

  /** Style props */
  propAlignSelf: PropTypes.any,
  propWidth: PropTypes.any,
};

export default Cts;
