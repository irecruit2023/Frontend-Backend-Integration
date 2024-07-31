import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./top-nav-bar.module.css";

const TopNavBar = ({ className = "" }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <header className={[styles.topNavBar, className].join(" ")}>
      <div className={styles.topNavBarChild} />
      <div className={styles.topNavBarInner}>
        <div className={styles.logoContainerParent}>
          <div className={styles.logoContainer}>
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
            <div className={styles.primaryNav}>
              <a className={styles.jobs}>Jobs</a>
              <a className={styles.events}>Events</a>
              <a className={styles.blogs}>Blogs</a>
              <div className={styles.irecruitProPlanWrapper}>
                <a className={styles.irecruitProPlan}>
                  iRecruit Pro Plan
                </a>
              </div>
            </div>
          </div>
          <div className={styles.userNavContainerWrapper}>
            <div className={styles.userNavContainer}>
              <div className={styles.userNavItems}>
                <div className={styles.search}>
                  <div className={styles.input}>
                    <input
                      style ={{width:"100%", border:"none", outline:"none", fontSize:'15px'}}
                      type="text"
                      value={searchValue}
                      onChange={handleSearchChange}
                      placeholder="Search"
                     // Add a class for custom styling
                    />
                    <img
                      className={styles.iconsearch}
                      alt=""
                      src="/iconsearch.svg"
                    />
                  </div>
                </div>
              </div>
              <div className={styles.iconnotificationNewWrapper}>
                <img
                  className={styles.iconnotificationNew}
                  loading="lazy"
                  alt=""
                  src="/iconnotificationnew.svg"
                />
              </div>
              <div className={styles.user}>
                <div className={styles.iconuserAvatarParent}>
                  <img
                    className={styles.iconuserAvatar}
                    loading="lazy"
                    alt=""
                    src="/iconuseravatar.svg"
                  />
                  <div className={styles.hiVidhiWrapper}>
                    <a className={styles.hiVidhi}>Hi, Vidhi</a>
                  </div>
                </div>
                <div className={styles.overflowMenuVerticalWrapper}>
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
      <img className={styles.topNavBarItem} alt="" src="/vector-21.svg" />
    </header>
  );
};

TopNavBar.propTypes = {
  className: PropTypes.string,
};

export default TopNavBar;
