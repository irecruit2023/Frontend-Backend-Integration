import React from "react";
import styles from "./ThankYouComponent.module.css";

const ThankYouComponent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.icon}>✔️</div>
        <h1 className={styles.title}>Amazing!</h1>
        <p className={styles.subtitle}>Thank you, We have received your details</p>
        <p className={styles.text}>
          Next, we will reach out to you on your preferred time slot. <br />
          Expect to hear from us in the next 2-3 days. If you need to
          communicate with us for anything, feel free to reach out to us at{" "}
          <a href="mailto:infor@irecruit.com" className={styles.email}>
            infor@irecruit.com
          </a>
        </p>
        <div className={styles.additionalInfo}>
          Additionally, we like to know: How did you hear about us and what are
          you interested in?
        </div>
        <textarea
          className={styles.textarea}
          placeholder="Type here"
        ></textarea>
        <p className={styles.footerText}>
          And finally, before you leave - We would appreciate it if you would spread
          the word. Share this link with your industry colleagues.{" "}
          <a href="#" className={styles.copyLink}>
            copy link
          </a>
        </p>
      </div>
    </div>
  );
};

export default ThankYouComponent;
