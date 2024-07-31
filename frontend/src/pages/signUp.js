import InputField2 from "../components/input-field2";
import Cts from "../components/cts";
import InputField3 from "../components/input-field3";
import styles from "./signUp.module.css";

const A = () => {
  return (
    <div className={styles.a}>
      <img className={styles.loadingIcon} alt="" src="/loading.svg" />
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
              <div className={styles.iChild} />
              <img
                className={styles.vectorIcon}
                loading="lazy"
                alt=""
                src="/vector.svg"
              />
            </div>
            <div className={styles.recruit}>
              <img
                className={styles.vectorIcon1}
                loading="lazy"
                alt=""
                src="/vector-11.svg"
              />
              <img
                className={styles.vectorIcon2}
                loading="lazy"
                alt=""
                src="/vector-21.svg"
              />
              <img
                className={styles.vectorIcon3}
                loading="lazy"
                alt=""
                src="/vector-31.svg"
              />
              <img
                className={styles.vectorIcon4}
                loading="lazy"
                alt=""
                src="/vector-41.svg"
              />
              <img
                className={styles.vectorIcon5}
                loading="lazy"
                alt=""
                src="/vector-51.svg"
              />
              <img
                className={styles.vectorIcon6}
                loading="lazy"
                alt=""
                src="/vector-61.svg"
              />
              <img
                className={styles.vectorIcon7}
                loading="lazy"
                alt=""
                src="/vector-71.svg"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.newSignUpForm}>
        <div className={styles.description}>
          <div className={styles.deswcription}>New user Sign up</div>
          <div className={styles.deswcription1}>Let’s get you started</div>
        </div>
        <div className={styles.body}>
          <div className={styles.levelOne}>
            <InputField2
              firstName="First Name*"
              value="Vidhi"
              vectorIcon={false}
              propAlignSelf="unset"
              propFlex="1"
              propMinWidth="151px"
            />
            <InputField2
              firstName="Last Name*"
              value="Sharma"
              vectorIcon={false}
              propAlignSelf="unset"
              propFlex="1"
              propMinWidth="151px"
            />
          </div>
          <InputField2
            firstName="Email*"
            value="vidhisharma@gmail.com"
            vectorIcon={false}
            propAlignSelf="stretch"
            propFlex="unset"
            propMinWidth="unset"
          />
          <InputField2
            firstName="Password"
            value="********"
            vectorIcon
            propAlignSelf="stretch"
            propFlex="unset"
            propMinWidth="unset"
          />
          <InputField2
            firstName="Re-enter Password"
            value="********"
            vectorIcon
            propAlignSelf="stretch"
            propFlex="unset"
            propMinWidth="unset"
          />
        </div>
        <Cts
          primary="Sign up"
          alreadyHaveAnAccount="Already have an account?"
          login=" Login"
          showDescription
          propAlignSelf="stretch"
          propWidth="unset"
        />
      </div>
      <div className={styles.newSignUpFormParent}>
        <form className={styles.newSignUpForm1}>
          <div className={styles.description1}>
            <div className={styles.deswcription2}>New user Sign up</div>
            <h1 className={styles.deswcription3}>Let’s get you started</h1>
          </div>
          <div className={styles.body1}>
            <div className={styles.levelOne1}>
              <InputField3 firstName="First Name*" value="Vidhi" />
              <InputField3 firstName="Last Name*" value="Sharma" />
            </div>
            <InputField2
              firstName="Email*"
              value="vidhisharma@gmail.com"
              vectorIcon={false}
              propAlignSelf="stretch"
              propFlex="unset"
              propMinWidth="unset"
            />
            <InputField2
              firstName="Password"
              value="********"
              vectorIcon
              propAlignSelf="stretch"
              propFlex="unset"
              propMinWidth="unset"
            />
            <InputField2
              firstName="Re-enter Password"
              value="********"
              vectorIcon
              propAlignSelf="stretch"
              propFlex="unset"
              propMinWidth="unset"
            />
          </div>
          <Cts
            primary="Sign up"
            alreadyHaveAnAccount="Already have an account?"
            login=" Login"
            showDescription
            propAlignSelf="stretch"
            propWidth="unset"
          />
        </form>
        <div className={styles.descriptionWrapper}>
          <div className={styles.description2}>© 2024 iRecruit</div>
        </div>
      </div>
    </div>
  );
};

export default A;
