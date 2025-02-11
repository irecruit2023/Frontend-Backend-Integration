import PropTypes from "prop-types";
import styles from "./explore-jobs-key-feature-component.module.css";
import { ReactComponent as  Iconarrows1 } from "../assets/icons/iconarrows1.svg";
import { ReactComponent as  Iconarrows2 } from "../assets/icons/iconarrows2.svg";
import { ReactComponent as  FrameIcon } from "../assets/icons/frame-56.svg";
import { ReactComponent as  ToggleIcon } from "../assets/icons/vector1.svg";

const ExploreJobsBlogComponent = ({ className = "" }) => {
  return (
    <div className={[styles.rectangleParent, className].join(" ")}>
      <div className={styles.frameChild} />
      <div className={styles.keyFeaturesWrapper}>
        <div className={styles.keyFeaturesContainer}>
          <div className={styles.keyFeaturesTitleContainer}>
            <h1 className={styles.keyFeatures}>Key Features</h1>
          </div>
          <div className={styles.experienceTheFutureContainer}>
            <p className={styles.experienceTheFuture}>
              Experience the future of searching a job.
            </p>
            <p className={styles.whereEveryFeature}>
              Where every feature is crafted to spotlight your potential and
              pave your path to new opportunities
            </p>
          </div>
        </div>
      </div>
      <div className={styles.featuresContainer}>
        <div className={styles.resumeAnalysisContainer}>
          <h1 className={styles.irecruitResumeAnalysis}>
            iRecruit Resume Analysis
          </h1>
        </div>
        <div className={styles.featureDescription}>
          <div className={styles.descriptionWrapper}>
            <div className={styles.descriptionContainerTwo}>
              <div className={styles.confirmationContainer}>
                <div className={styles.newRegistrationEmailConfirm}>
                  <div className={styles.description}>
                    iRECRUIT RELEVANCE SCORE
                  </div>
                  <div className={styles.cts}>
                    <div className={styles.description1}>
                      <div
                        className={styles.description2}
                      >{`The profile indicates a lack of alignment with the job requirements. To improve your chances enhance you profile with iRecruit AI engine.  `}</div>
                    </div>
                  </div>
                  <div className={styles.scoreContainer}>
                    <div className={styles.score}>
                      <div className={styles.wrapperEmptyScore}>
                        <FrameIcon
                          className={styles.emptyScoreIcon}
                          loading="lazy"
                          alt=""
                        />
                      </div>
                      <div className={styles.div}>4.7</div>
                    </div>
                  </div>
                  <div className={styles.cts1}>
                    <div className={styles.reportLink}>
                      <div className={styles.textLink}>
                        <div className={styles.averageScore}>
                          <div className={styles.averageScoreFor}>
                            Average score for Fresher - 4.2
                          </div>
                        </div>
                      </div>
                      <Iconarrows1
                        className={styles.iconarrows}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.newRegistrationEmailConfirm1}>
                <div className={styles.content}>
                  <div className={styles.description3}>
                    <div className={styles.description4}>Profile Strength</div>
                  </div>
                </div>
                <div className={styles.description5}>
                  <div
                    className={styles.description6}
                  >{`The profile indicates a lack of alignment with the job requirements. To improve your chances enhance you profile with iRecruit AI engine.  `}</div>
                </div>
                <div className={styles.viewDetailedReport}>
                  View detailed Report
                </div>
              </div>
              <div className={styles.analysis}>
                <div className={styles.newRegistrationEmailConfirm2}>
                  <div className={styles.description7}>Skills Rating</div>
                  <div className={styles.cts2}>
                    <div className={styles.description8}>
                      <div
                        className={styles.description9}
                      >{`The profile indicates a lack of alignment with the job requirements. To improve your chances enhance you profile with iRecruit AI engine.  `}</div>
                    </div>
                  </div>
                  <div className={styles.chart}>
                    <div className={styles.chartContainer}>
                      <div className={styles.chartElements} />
                      <div className={styles.chartElements1}>
                        <div className={styles.chartBars} />
                        <div className={styles.chartElementsChild} />
                      </div>
                      <div className={styles.chartElements2} />
                      <div className={styles.chartElements3}>
                        <div className={styles.chartElementsItem} />
                        <div className={styles.chartElementsInner} />
                      </div>
                      <div className={styles.chartElements4}>
                        <div className={styles.rectangleDiv} />
                        <div className={styles.chartElementsChild1} />
                      </div>
                      <div className={styles.chartElements5} />
                      <div className={styles.chartElements6} />
                    </div>
                  </div>
                  <div className={styles.cts3}>
                    <div className={styles.analysisReportLink}>
                      <div className={styles.textLink1}>
                        <div className={styles.viewDetailedReport1}>
                          View detailed Report
                        </div>
                      </div>
                      <Iconarrows2
                        className={styles.iconarrows1}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.searchFuture}>
              <div className={styles.experienceTheFutureContainer1}>
                <p className={styles.experienceTheFuture1}>
                  Experience the future of searching a job.
                </p>
                <p className={styles.whereEveryFeature1}>
                  Where every feature is crafted to spotlight your potential and
                  pave your path to new opportunities
                </p>
              </div>
            </div>
          </div>
          <div className={styles.tickerContainer}>
            <div className={styles.ticker}>
              <div className={styles.tickerItems} />
              <div className={styles.tickerItems1} />
              <div className={styles.tickerItems2} />
              <div className={styles.tickerItems3} />
              <div className={styles.tickerItems4} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ExploreJobsBlogComponent.propTypes = {
  className: PropTypes.string,
};

export default ExploreJobsBlogComponent;
