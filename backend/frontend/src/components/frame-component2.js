import PropTypes from "prop-types";
import styles from "./frame-component2.module.css";
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
import { ReactComponent as  Notification } from "../assets/icons/iconnotificationnew.svg";
import { ReactComponent as  VerticalMenu } from "../assets/icons/overflowmenuvertical.svg";
import { ReactComponent as  Avatar } from "../assets/icons/iconuseravatar.svg";


const FrameComponent2 = ({ className = "" }) => {
  return (
    <header className={[styles.topNavBarParent, className].join(" ")}>
      <div className={styles.topNavBar}>
        <div className={styles.topNavBarChild} />
        <More className={styles.topNavBarItem} alt=""/>
      </div>
      <div className={styles.centralContent}>
        <div className={styles.leftMenu}>
          <div className={styles.logoMenu}>
            <div className={styles.irecruitLogoSmall}>
              <Icon
                className={styles.symbolIcon}
                loading="lazy"
                alt=""
              />
              <div className={styles.logo}>
                <div className={styles.i}>
                  <div className={styles.iChild} />
                  <IconI className={styles.vectorIcon} alt="" />
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
                    <Search
                      className={styles.iconsearch}
                      alt=""

                    />
                  </div>
                </div>
              </div>
              <div className={styles.notification}>
                <Notification
                  className={styles.iconnotificationNew}
                  loading="lazy"
                  alt=""
                />
              </div>
              <div className={styles.user}>
                <div className={styles.userAvatarContainer}>
                  <Avatar
                    className={styles.iconuserAvatar}
                    loading="lazy"
                    alt=""
                  />
                  <div className={styles.userNameContainer}>
                    <a className={styles.hiVidhi}>Hi, Vidhi</a>
                  </div>
                </div>
                <div className={styles.overflowMenu}>
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
    </header>
  );
};

FrameComponent2.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent2;
