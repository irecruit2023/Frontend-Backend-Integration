import PropTypes from "prop-types";
import styles from "./bottom-content.module.css";
import { ReactComponent as  Iconclick } from "../assets/icons/iconclick-on.svg";
import { ReactComponent as  Iconcelebrated } from "../assets/icons/iconcelebrated.svg";
import { ReactComponent as  LineIcon } from "../assets/icons/line.svg";
import { ReactComponent as  Icondocument } from "../assets/icons/icondocument-1.svg";
import { ReactComponent as  Iconpersonalised } from "../assets/icons/iconpersonalised.svg";
import { ReactComponent as  VectorIcon } from "../assets/icons/vector-13.svg";
import girlPic from '../assets/icons/girl@2x.png';


const BottomContent = ({ className = "" }) => {
  return (
    <div className={[styles.bottomContent, className].join(" ")}>
      <div className={styles.contentWrapperTwo}>
        <div className={styles.content}>
          <div className={styles.descriptionContainer}>
            <h1 className={styles.searchingForThe}>
              Searching for the perfect job is now simpler than ever.
            </h1>
            <div className={styles.withThisEasy}>
              With this easy process, you'll discover matches and apply with
              ease.
            </div>
          </div>
          <div className={styles.ofCandidatesWhoCompletedThWrapper}>
            <div className={styles.ofCandidatesWho}>
              88% of candidates who completed their profiles discovered a
              brighter career path.
            </div>
          </div>
          <VectorIcon
            className={styles.contentChild}
            loading="lazy"
            alt=""
          />
          <img
            className={styles.girlIcon}
            loading="lazy"
            alt=""
            src= {girlPic}
          />
          <div className={styles.iconContainer}>
            <div className={styles.iconGridContainer}>
              <div className={styles.iconGridWrapper}>
                <div className={styles.iconList}>
                  <Icondocument
                    className={styles.icondocument}
                    alt=""
                  />
                  <div className={styles.iconsList}>
                    <LineIcon className={styles.lineIcon} alt=""  />
                  </div>
                  <Iconpersonalised
                    className={styles.iconpersonalised}
                    loading="lazy"
                    alt=""
                  />
                  <div className={styles.iconsList1}>
                    <LineIcon className={styles.lineIcon1} alt=""  />
                  </div>
                  <Iconclick
                    className={styles.iconclickOn}
                    loading="lazy"
                    alt=""
                  />
                  <div className={styles.iconsList2}>
                    <LineIcon className={styles.lineIcon2} alt="" />
                  </div>
                  <Iconcelebrated
                    className={styles.iconcelebrated}
                    loading="lazy"
                    alt=""
                  />
                </div>
              </div>
              <div className={styles.featureList}>
                <div className={styles.irecruitResumeAnalysisContainer}>
                  <p className={styles.irecruitResume}>iRecruit Resume</p>
                  <p className={styles.analysis}>Analysis</p>
                </div>
                <div className={styles.personalisedJobCurationWrapper}>
                  <div className={styles.personalisedJobCurationContainer}>
                    <p className={styles.personalised}>{`Personalised `}</p>
                    <p className={styles.jobCuration}>Job Curation</p>
                  </div>
                </div>
                <div className={styles.applyJobsWrapper}>
                  <div className={styles.applyJobs}>
                    <p className={styles.apply}>Apply</p>
                    <p className={styles.jobs}>Jobs</p>
                  </div>
                </div>
                <div className={styles.endlessPossibilities}>
                  <p className={styles.endless}>Endless</p>
                  <p className={styles.possibilities}>Possibilities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.primaryButtonContainer}>
          <div className={styles.primaryButton}>
            <div className={styles.primary}>Get Started</div>
          </div>
        </div>
      </div>
    </div>
  );
};

BottomContent.propTypes = {
  className: PropTypes.string,
};

export default BottomContent;
