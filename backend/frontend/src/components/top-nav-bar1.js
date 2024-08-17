import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./top-nav-bar1.module.css";

const TopNavBar1 = ({ className = "" }) => {
  const navigate = useNavigate();

  const onLoginSignClick = useCallback((e) => {
    const text = e.target.textContent.trim();
    if (text.includes("Login")) {
      navigate("/login");
    } else {
      navigate("/signup");
    }
  }, [navigate]);

  return (
    <header className={[styles.topNavBar, className].join(" ")}>
      <div className={styles.topNavBarChild} />
      <div className={styles.navbarContainer}>
        <div className={styles.frameParent}>
          <div className={styles.irecruitLogoSmallParent}>
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
            <nav className={styles.blogLinks}>
              <a className={styles.about}>About</a>
              <a className={styles.blogs}>Jobs</a>
              <a className={styles.blogs1}>Blogs</a>
            </nav>
          </div>
          <div className={styles.searchLoginContainer}>
            <div className={styles.searchParent}>
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
              <div className={styles.loginSignUpWrapper}>
                <a className={styles.loginSign} onClick={onLoginSignClick}>
                  Login | Sign up
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img className={styles.topNavBarItem} alt="" src="/vector-21.svg" />
    </header>
  );
};

TopNavBar1.propTypes = {
  className: PropTypes.string,
};

export default TopNavBar1;
