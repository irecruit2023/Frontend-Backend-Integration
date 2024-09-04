import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./top-nav-bar-default.module.css";
import { ReactComponent as  Icon } from "../assets/icons/symbol.svg";
import { ReactComponent as  IconI } from "../assets/icons/vector.svg";
import { ReactComponent as  IconR } from "../assets/icons/vector-1.svg";
import { ReactComponent as  IconE } from "../assets/icons/vector-2.svg";
import { ReactComponent as  IconC } from "../assets/icons/vector-3.svg";
import { ReactComponent as  IconU } from "../assets/icons/vector-4.svg";
import { ReactComponent as  IconR2 } from "../assets/icons/vector-5.svg";
import { ReactComponent as  IconI2 } from "../assets/icons/vector-6.svg";
import { ReactComponent as  IcontT } from "../assets/icons/vector-7.svg";
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
              <Icon
                className={styles.symbolIcon}
                loading="lazy"
                alt=""
              />
              <div className={styles.logo}>
                <div className={styles.i}>
                  <div className={styles.iChild} />
                  <IconI className={styles.vectorIcon} alt=""  />
                </div>
                <div className={styles.recruit}>
                  <IconR
                    className={styles.vectorIcon1}
                    alt=""
                  />
                  <IconE
                    className={styles.vectorIcon2}
                    alt=""
                  />
                  <IconC
                    className={styles.vectorIcon3}
                    alt=""
                  />
                  <IconU
                    className={styles.vectorIcon4}
                    alt=""
                  />
                  <IconR2
                    className={styles.vectorIcon5}
                    alt=""
                  />
                  <IconI2
                    className={styles.vectorIcon6}
                    alt=""
                  />
                  <IcontT
                    className={styles.vectorIcon7}
                    alt=""

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
