import PropTypes from "prop-types";
import styles from "./frame-component2.module.css";

const FrameComponent2 = ({ className = "" }) => {
  return (
    <header className={[styles.topNavBarParent, className].join(" ")}>
      <div className={styles.topNavBar}>
        <div className={styles.topNavBarChild} />
        <img className={styles.topNavBarItem} alt="" src="/vector-21.svg" />
      </div>
      <div className={styles.centralContent}>
        <div className={styles.leftMenu}>
          <div className={styles.logoMenu}>
            <div className={styles.irecruitLogoSmall}>
              <img
                className={styles.symbolIcon}
                loading="lazy"
                alt=""
                src="/symbol.svg"
              />
              <div className={styles.logo}>
                <div className={styles.i}>
                  <div className={styles.iChild} />
                  <img className={styles.vectorIcon} alt="" src="/vector.svg" />
                </div>
                <div className={styles.recruit}>
                  <img
                    className={styles.vectorIcon1}
                    alt=""
                    src="/vector-1.svg"
                  />
                  <img
                    className={styles.vectorIcon2}
                    alt=""
                    src="/vector-2.svg"
                  />
                  <img
                    className={styles.vectorIcon3}
                    alt=""
                    src="/vector-3.svg"
                  />
                  <img
                    className={styles.vectorIcon4}
                    alt=""
                    src="/vector-4.svg"
                  />
                  <img
                    className={styles.vectorIcon5}
                    alt=""
                    src="/vector-5.svg"
                  />
                  <img
                    className={styles.vectorIcon6}
                    alt=""
                    src="/vector-6.svg"
                  />
                  <img
                    className={styles.vectorIcon7}
                    alt=""
                    src="/vector-7.svg"
                  />
                </div>
              </div>
            </div>
            <div className={styles.primaryMenu}>
              <div className={styles.primaryNav}>
                <a className={styles.jobs}>Jobs</a>
                <a className={styles.events}>Events</a>
                <a className={styles.blogs}>Blogs</a>
                <div className={styles.proPlan}>
                  <a
                    className={styles.irecruitProPlan}
                  >{`iRecruit Pro Plan  `}</a>
                </div>
              </div>
              <a className={styles.blogs1}>Blogs</a>
            </div>
          </div>
          <div className={styles.userMenu}>
            <div className={styles.userActions}>
              <div className={styles.searchUser}>
                <div className={styles.search}>
                  <div className={styles.input}>
                    <a className={styles.search1}>Search</a>
                    <img
                      className={styles.iconsearch}
                      alt=""
                      src="/iconsearch.svg"
                    />
                  </div>
                </div>
              </div>
              <div className={styles.notification}>
                <img
                  className={styles.iconnotificationNew}
                  loading="lazy"
                  alt=""
                  src="/iconnotificationnew.svg"
                />
              </div>
              <div className={styles.user}>
                <div className={styles.userAvatarContainer}>
                  <img
                    className={styles.iconuserAvatar}
                    loading="lazy"
                    alt=""
                    src="/iconuseravatar.svg"
                  />
                  <div className={styles.userNameContainer}>
                    <a className={styles.hiVidhi}>Hi, Vidhi</a>
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
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

FrameComponent2.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent2;
