import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./top-nav-bar-default.module.css";
import { ReactComponent as  IrecruitLogo } from "../assets/icons/iRecurit-logo.svg";
import { ReactComponent as  Search } from "../assets/icons/iconsearch.svg";
import { ReactComponent as  More } from "../assets/icons/vector-21.svg";

const TopNavBarDefault= ({ className = "" }) => {
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
              <IrecruitLogo/>
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
                  <Search
                    className={styles.iconsearch}
                    alt=""
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
      <More className={styles.topNavBarItem} alt=""  />
    </header>
  );
};

TopNavBarDefault.propTypes = {
  className: PropTypes.string,
};

export default TopNavBarDefault;
