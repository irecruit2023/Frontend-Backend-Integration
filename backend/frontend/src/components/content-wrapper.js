import PropTypes from "prop-types";
import styles from "./content-wrapper.module.css";


const ContentWrapper = ({ className = "" }) => {
  return (
    <div className={[styles.eploreLandingInner, className].join(" ")}>
      <div className={styles.newRegistrationEmailConfirmParent}>
        <div className={styles.newRegistrationEmailConfirm}>
          <div className={styles.content}>
            <div className={styles.description}>
              <div className={styles.description1}>
                iRECRUIT RELEVANCE SCORE
              </div>
            </div>
            <div className={styles.cts}>
              <div className={styles.description2}>
                <div
                  className={styles.description3}
                >{`The profile indicates a lack of alignment with the job requirements. To improve your chances enhance you profile with iRecruit AI engine.  `}</div>
              </div>
            </div>
          </div>
          <div className={styles.frameParent}>
            <img className={styles.frameChild} alt="" src="/frame-56.svg" />
            <div className={styles.wrapper}>
              <div className={styles.div}>4.7</div>
            </div>
          </div>
          <div className={styles.cts1}>
            <div className={styles.textLinkParent}>
              <div className={styles.textLink}>
                <div className={styles.averageScoreForFresher4Wrapper}>
                  <div className={styles.averageScoreFor}>
                    Average score for Fresher - 4.2
                  </div>
                </div>
              </div>
              <img
                className={styles.iconarrows}
                alt=""
                src="/iconarrows1.svg"
              />
            </div>
          </div>
        </div>
        <div className={styles.newRegistrationEmailConfirm1}>
          <div className={styles.description2}>
            <div className={styles.description4}>
              <div className={styles.description1}>Profile Strength</div>
            </div>
          </div>
          <div className={styles.description6}>
            <div
              className={styles.description7}
            >{`The profile indicates a lack of alignment with the job requirements. To improve your chances enhance you profile with iRecruit AI engine.  `}</div>
          </div>
          <div className={styles.viewDetailedReport}>View detailed Report</div>
        </div>
        <div className={styles.newRegistrationEmailConfirm2}>
          <div className={styles.content2}>
            <div className={styles.description4}>
              <div className={styles.description1}>Skills Rating</div>
            </div>
            <div className={styles.cts}>
              <div className={styles.description2}>
                <div
                  className={styles.description3}
                >{`The profile indicates a lack of alignment with the job requirements. To improve your chances enhance you profile with iRecruit AI engine.  `}</div>
              </div>
            </div>
          </div>
          <div className={styles.rectangleParent}>
            <div className={styles.frameItem} />
            <div className={styles.frameInner} />
            <div className={styles.rectangleDiv} />
            <div className={styles.frameChild1} />
            <div className={styles.frameChild2} />
            <div className={styles.frameChild3} />
            <div className={styles.frameChild4} />
            <div className={styles.frameChild5} />
            <div className={styles.frameChild6} />
            <div className={styles.frameChild7} />
          </div>
          <div className={styles.cts3}>
            <div className={styles.textLinkGroup}>
              <div className={styles.textLink}>
                <div className={styles.tapToEnlarge}>Tap to enlarge</div>
              </div>
              <img
                className={styles.iconarrows}
                alt=""
                src="/iconarrows2.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ContentWrapper.propTypes = {
  className: PropTypes.string,
};

export default ContentWrapper;
