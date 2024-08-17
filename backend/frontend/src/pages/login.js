import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/input-field";
import Cts from "../components/cts";
import styles from "./login.module.css";
import { ReactComponent as  Loading } from "../assets/icons/loading.svg";
import { ReactComponent as  Icon } from "../assets/icons/symbol1.svg";
import { ReactComponent as  IconI } from "../assets/icons/vector.svg";
import { ReactComponent as  IconR } from "../assets/icons/vector-11.svg";
import { ReactComponent as  IconE } from "../assets/icons/vector-21.svg";
import { ReactComponent as  IconC } from "../assets/icons/vector-31.svg";
import { ReactComponent as  IconU } from "../assets/icons/vector-41.svg";
import { ReactComponent as  IconR2 } from "../assets/icons/vector-51.svg";
import { ReactComponent as  IconI2 } from "../assets/icons/vector-61.svg";
import { ReactComponent as  IcontT } from "../assets/icons/vector-71.svg";


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
      <Loading className={styles.loadingIcon}/>
      <div className={styles.frameParent}>
        <div className={styles.irecruitLogoBigWrapper}>
          <div className={styles.irecruitLogoBig}>
            <Icon
              className={styles.symbolIcon}
              loading="lazy"
              alt=""

            />
            <div className={styles.logo}>
              <div className={styles.i}>
                <div className={styles.initialBackground} />
                <IconI
                  className={styles.initialShapeIcon}
    
                />
              </div>
              <div className={styles.recruit}>
                <IconR
                  className={styles.wordmarkComponentsIcon}
                  loading="lazy"
                  alt=""
   
                />
                <IconE
                  className={styles.wordmarkComponentsIcon1}
                  loading="lazy"
                  alt=""
                />
                <IconC
                  className={styles.wordmarkComponentIcon}
                  loading="lazy"
                  alt=""
    
                />
                <IconU
                  className={styles.wordmarkComponentsIcon2}
                  loading="lazy"
                  alt=""
            
                />
                <IconR2
                  className={styles.wordmarkComponentIcon1}
                  loading="lazy"
                  alt=""
        
                />
                <IconI2 
                  className={styles.wordmarkComponentsIcon3}
                  loading="lazy"
                  alt=""
            
                />
                <IcontT
                  className={styles.wordmarkComponentsIcon4}
                  loading="lazy"
                  alt=""
                 
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
