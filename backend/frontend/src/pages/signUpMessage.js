import styles from "./signUpMessage.module.css";

const signUpMessage = () => {
  const openGmail = () => {
    window.open('https://mail.google.com', '_blank');
  };

  return (
    <div className={styles.b}>
      <img className={styles.loadingIcon} alt="" src="/loading.svg" />
      <div className={styles.mainContent}>
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
                  src="/vector-211.svg"
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
