import PropTypes from "prop-types";
import styles from "./user1.module.css";

const User1 = ({ className = "" }) => {
  return (
    <div className={[styles.user, className].join(" ")}>
      <div className={styles.userAvatarContainer}>
        <img
          className={styles.iconuserAvatar}
          loading="lazy"
          alt=""
          src="/iconuseravatar.svg"
        />
        <div className={styles.userNameContainer}>
          <a className={styles.hiVidhi}>Hi, {JSON.parse(localStorage.loginInformation).data.name}</a>
        </div>
      </div>
      <div className={styles.overflowMenu}>
        <img
          className={styles.overflowMenuVerticalIcon}
          loading="lazy"
          alt=""
          src="/overflowmenuvertical.svg"
        />
      </div>
    </div>
  );
};

User1.propTypes = {
  className: PropTypes.string,
};

export default User1;
