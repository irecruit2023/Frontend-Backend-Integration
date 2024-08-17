import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/input-field";
import Cts from "../components/cts";
import styles from "./login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState({ email: '', password: '' });

  const handleChange = (e, fieldName) => {
    const { value } = e.target;
    setLoginState((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  return (
    <div className={styles.d}>
      <img className={styles.loadingIcon} alt="" src="/loading.svg" />
      <div className={styles.frameParent}>
        <div className={styles.irecruitLogoBigWrapper}>
          <div className={styles.irecruitLogoBig}>
            <img
              className={styles.symbolIcon}
              loading="lazy"
              alt=""
              src="/symbol1.svg"
            />
            <div className={styles.logo}>
              <div className={styles.i}>
                <div className={styles.initialBackground} />
                <img
                  className={styles.initialShapeIcon}
                  loading="lazy"
                  alt=""
                  src="/vector.svg"
                />
              </div>
              <div className={styles.recruit}>
                <img
                  className={styles.wordmarkComponentsIcon}
                  loading="lazy"
                  alt=""
                  src="/vector-11.svg"
                />
                <img
                  className={styles.wordmarkComponentsIcon1}
                  loading="lazy"
                  alt=""
                  src="/vector-21.svg"
                />
                <img
                  className={styles.wordmarkComponentIcon}
                  loading="lazy"
                  alt=""
                  src="/vector-31.svg"
                />
                <img
                  className={styles.wordmarkComponentsIcon2}
                  loading="lazy"
                  alt=""
                  src="/vector-41.svg"
                />
                <img
                  className={styles.wordmarkComponentIcon1}
                  loading="lazy"
                  alt=""
                  src="/vector-51.svg"
                />
                <img
                  className={styles.wordmarkComponentsIcon3}
                  loading="lazy"
                  alt=""
                  src="/vector-61.svg"
                />
                <img
                  className={styles.wordmarkComponentsIcon4}
                  loading="lazy"
                  alt=""
                  src="/vector-71.svg"
                />
              </div>
            </div>
          </div>
        </div>
        <form className={styles.loginForm}>
          <div className={styles.description}>
            <div className={styles.deswcription}>Welcome back</div>
            <h1 className={styles.deswcription1}>
              Login to manage your account
            </h1>
          </div>
          <div className={styles.body}>
            <InputField
              firstName="Email"
              name="email"
              value={loginState.email}
              vectorIcon={false}
              onChange={(e) => handleChange(e, "email")}
              placeholder = "Enter your email"
            />
            <InputField
              firstName="Password"
              name="password"
              value={loginState.password}
              vectorIcon={true}
              onChange={(e) => handleChange(e, "password")}
              placeholder="password"
            />
            <div className={styles.textLink}>
              <div className={styles.secondary}>Forgot Password?</div>
            </div>
          </div>
          <Cts
            primary="Login"
            alreadyHaveAnAccount="Don’t have an account? "
            login=" Sign- up for Free"
            showDescription={false}
            propAlignSelf="unset"
            propWidth="490px"
            loginData={loginState}  // Passing loginState to Cts
          />
        </form>
      </div>
      <div className={styles.footer}>
        <div className={styles.description1}>© 2024 iRecruit</div>
      </div>
    </div>
  );
};

export default Login;
