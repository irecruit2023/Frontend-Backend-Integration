import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./top-nav-bar.module.css";
import { ReactComponent as  IrecruitLogo } from "../assets/icons/iRecurit-logo.svg";
import { ReactComponent as  Search } from "../assets/icons/iconsearch.svg";
import { ReactComponent as  More } from "../assets/icons/vector-21.svg";
import { ReactComponent as  Notification } from "../assets/icons/iconnotificationnew.svg";
import { ReactComponent as  VerticalMenu } from "../assets/icons/overflowmenuvertical.svg";
import { ReactComponent as  Avatar } from "../assets/icons/iconuseravatar.svg";
import { useNavigate } from "react-router-dom";

const TopNavBar = ({ className = "" }) => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <header className={[styles.topNavBar, className].join(" ")}>
      <div className={styles.topNavBarChild} />
      <div className={styles.topNavBarInner}>
        <div className={styles.logoContainerParent}>
          <div className={styles.logoContainer}>
            <div className={styles.irecruitLogoSmall} onClick={()=>{navigate("/home")}}>
              <IrecruitLogo/>
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
                    <Search
                      className={styles.iconsearch}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className={styles.iconnotificationNewWrapper}>
                <Notification
                  className={styles.iconnotificationNew}
                  loading="lazy"
                  alt=""
                />
              </div>
              <div className={styles.user} style ={{cursor:'pointer'}}>
                <div className={styles.iconuserAvatarParent}  onClick={()=>{navigate('/profile')}}>
                  <Avatar
                    className={styles.iconuserAvatar}
                    loading="lazy"
                    alt=""
                  />
                  <div className={styles.hiVidhiWrapper}>
                    <a className={styles.hiVidhi}>Hi, {JSON.parse(localStorage.loginInformation).data.name}</a>
                  </div>
                </div>
                <div className={styles.overflowMenuVerticalWrapper}>
                  <VerticalMenu
                    className={styles.overflowMenuVerticalIcon}
                    loading="lazy"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <More className={styles.topNavBarItem} alt=""  />
    </header>
  );
};

TopNavBar.propTypes = {
  className: PropTypes.string,
};

export default TopNavBar;
