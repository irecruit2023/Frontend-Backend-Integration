import IrecruitLogoSmall from "./irecruit-logo-small";
import Search from "./search";
import User1 from "./user1";
import PropTypes from "prop-types";
import styles from "./content.module.css";

const Content = ({ className = "" }) => {
  return (
    <header className={[styles.content, className].join(" ")}>
      <div className={styles.topNavBar}>
        <div className={styles.navBarShape} />
        <img className={styles.navBarIcon} alt="" src="/vector-21.svg" />
      </div>
      <div className={styles.companyLogo}>
        <div className={styles.logoContainer}>
          <div className={styles.logoImage}>
            <IrecruitLogoSmall />
            <div className={styles.primaryNavigation}>
              <div className={styles.primaryNav}>
                <nav className={styles.jobsEventsBlogsLink}>
                  <a className={styles.jobs}>Jobs</a>
                  <a className={styles.events}>Events</a>
                  <a className={styles.blogs}>Blogs</a>
                </nav>
                <a className={styles.mentor}>Mentor</a>
                <div className={styles.proPlanLink}>
                  <a
                    className={styles.irecruitProPlan}
                  >{`iRecruit Pro Plan  `}</a>
                </div>
              </div>
              <a className={styles.blogs1}>Blogs</a>
            </div>
          </div>
          <div className={styles.searchUser}>
            <div className={styles.searchUserContainer}>
              <div className={styles.searchBar}>
                <Search propAlignSelf="stretch" propWidth="unset" />
              </div>
              <div className={styles.notificationBell}>
                <img
                  className={styles.iconnotificationNew}
                  loading="lazy"
                  alt=""
                  src="/iconnotificationnew.svg"
                />
              </div>
              <User1 />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

Content.propTypes = {
  className: PropTypes.string,
};

export default Content;
