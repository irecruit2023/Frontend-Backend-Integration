import ButtonGrid from "./button-grid";
import PropTypes from "prop-types";
import styles from "./lower-content.module.css";
import { ReactComponent as  DocumentIcon } from "../assets/icons/icondocument.svg";
import { ReactComponent as  JobIcon } from "../assets/icons/iconjob-document.svg";
import { ReactComponent as  EventIcon } from "../assets/icons/iconevents.svg";
import { ReactComponent as  Iconblogs } from "../assets/icons/iconblogs.svg";
import { ReactComponent as  Iconarrows } from "../assets/icons/iconarrows.svg";
import iconarrows1 from "../assets/icons/iconarrows-1.svg";
import iconarrows2  from "../assets/icons/iconarrows-2.svg";
import iconarrows3 from "../assets/icons/iconarrows-3.svg";

const LowerContent = ({ className = "" }) => {
  return (
    <div className={[styles.lowerContent, className].join(" ")}>
      <div className={styles.actionButtons}>
        <h1 className={styles.actions}>Actions</h1>
        <div className={styles.buttonContainer}>
          <div className={styles.buttonGrid}>
            <div className={styles.content}>
              <div className={styles.content1}>
                <div className={styles.description}>
                  <h1 className={styles.description1}>Resume Analysis</h1>
                </div>
                <div className={styles.cts}>
                  <div className={styles.description2}>
                    <div className={styles.description3}>
                      <p className={styles.createYourProfile}>
                        Create your profile and thrive in dynamic environments,
                        leveraging your diverse skill set and passion for
                        excellence to drive impactful results.
                      </p>
                      <p className={styles.blankLine}>&nbsp;</p>
                      <p className={styles.blankLine1}>&nbsp;</p>
                      <p className={styles.poweredByIrecruit}>
                        Powered by iRecruit AI Engine
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.icon}>
                <DocumentIcon
                  className={styles.icondocument}
                  loading="lazy"
                  alt=""
                />
                <JobIcon
                  className={styles.iconjobDocument}
                  alt=""
                />
                <EventIcon
                  className={styles.iconevents}
                  alt=""

                />
                <Iconblogs className={styles.iconblogs} alt="" />
              </div>
            </div>
            <div className={styles.cts1}>
              <div className={styles.linkContainerGrid}>
                <div className={styles.textLink}>
                  <div className={styles.secondary}>Create Now</div>
                </div>
                <Iconarrows
                  className={styles.iconarrows}
                  alt=""
                />
              </div>
            </div>
          </div>
          <ButtonGrid
            description="Explore Jobs"
            description1="With user-friendly interfaces and tailored filters, our platforms streamline the job search process, making it more accessible and efficient for fresh graduates eager to kickstart their careers."
            iconDocument="/icondocument1.svg"
            secondary="Explore"
            iconArrows={iconarrows1}
            showIconJobDocument
            iconEvents1
            iconblogs1
          />
          <ButtonGrid
            description="Discover Events"
            description1="Navigating these curated events equips fresher candidates with the knowledge and connections necessary for a successful transition from academia to the professional landscape."
            iconDocument="/icondocument2.svg"
            secondary="Discover"
            iconArrows={iconarrows2}
            showIconJobDocument={false}
            iconEvents1
            iconblogs1={false}
          />
          <ButtonGrid
            description="Latest Blogs"
            description1="Navigating these curated events equips fresher candidates with the knowledge and connections necessary for a successful transition from academia to the professional landscape."
            iconDocument="/icondocument3.svg"
            secondary="Read"
            iconArrows={iconarrows3}
            showIconJobDocument={false}
            iconEvents1={false}
            iconblogs1
          />
        </div>
      </div>
    </div>
  );
};

LowerContent.propTypes = {
  className: PropTypes.string,
};

export default LowerContent;
