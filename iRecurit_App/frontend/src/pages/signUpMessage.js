import styles from "./signUpMessage.module.css";
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

const signUpMessage = () => {
  const openGmail = () => {
    window.open('https://mail.google.com', '_blank');
  };

  return (
    <div className={styles.b}>
      <Loading className={styles.loadingIcon} alt=""  />
      <div className={styles.mainContent}>
        <div className={styles.irecruitLogoBigWrapper}>
          <div className={styles.irecruitLogoBig}>
            <Icon
              className={styles.symbolIcon}
              loading="lazy"
              alt=""
            />
            <div className={styles.logo}>
              <div className={styles.i}>
                <div className={styles.iChild} />
                <IconI
                  className={styles.vectorIcon}
                  loading="lazy"
                  alt=""
                />
              </div>
              <div className={styles.recruit}>
                <IconR
                  className={styles.vectorIcon1}
                  loading="lazy"
                  alt=""
                />
                <IconE
                  className={styles.vectorIcon2}
                  loading="lazy"
                  alt=""
                />
                <IconC
                  className={styles.vectorIcon3}
                  loading="lazy"
                  alt=""
                />
                <IconU
                  className={styles.vectorIcon4}
                  loading="lazy"
                  alt=""

                />
                <IconR2
                  className={styles.vectorIcon5}
                  loading="lazy"
                  alt=""
                />
                <IconI2
                  className={styles.vectorIcon6}
                  loading="lazy"
                  alt=""
                />
                <IcontT
                  className={styles.vectorIcon7}
                  loading="lazy"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.newRegistrationEmailConfirm}>
          <div className={styles.description}>
            <div className={styles.description1}>New user Sign up</div>
            <h1 className={styles.description2}>Let’s get you started</h1>
          </div>
          <div className={styles.cts}>
            <div className={styles.description3}>
              <div className={styles.description4}>Sign up through email</div>
              <div className={styles.description5}>
                <p className={styles.weSentA}>
                  We sent a confirmation to the email below.
                </p>
                <p className={styles.pleaseGoTo}>
                  Please go to your Gmail account and confirm your account
                </p>
              </div>
              <div className={styles.description6}>vidhisharma@gmail.com</div>
            </div>
            <div className={styles.textLink} onClick={openGmail}>
              <div className={styles.secondary}>Open Gmail account</div>
            </div>
            <div className={styles.description7}>
              <div className={styles.description8}>
                <p className={styles.signUpThrough}>Sign up through email</p>
                <p className={styles.giveItA}>Give it a couple of minutes</p>
                <p className={styles.makeSureYoure}>
                  Make sure you’re using the above email
                </p>
                <p className={styles.checkYourSpam}>Check your spam folder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.descriptionWrapper}>
        <div className={styles.description9}>© 2024 iRecruit</div>
      </div>
    </div>
  );
};

export default signUpMessage;
