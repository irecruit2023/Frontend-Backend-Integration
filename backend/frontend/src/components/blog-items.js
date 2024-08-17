import PropTypes from "prop-types";
import styles from "./blog-items.module.css";

const BlogItems = ({
  className = "",
  howWeImprovedPushProcessi,
  onGitHubAnalysis,
  description,
}) => {
  return (
    <div className={[styles.blogItems, className].join(" ")}>
      <div className={styles.blogPostList}>
        <div className={styles.content}>
          <div className={styles.description}>
            <div className={styles.description1}>
              <p className={styles.howWeImproved}>
                {howWeImprovedPushProcessi}
              </p>
              <p className={styles.onGithubAnalysis}>{onGitHubAnalysis}</p>
            </div>
          </div>
          <div className={styles.description2}>
            <div className={styles.description3}>Engineering</div>
          </div>
          <div className={styles.cts}>
            <div className={styles.description4}>
              <div className={styles.description5}>{description}</div>
            </div>
          </div>
        </div>
        <div className={styles.cts1}>
          <div className={styles.postLinkItems}>
            <div className={styles.textLink}>
              <div className={styles.willHaltomJuneContainer}>
                <a
                  className={styles.willHaltom}
                  href="https://github.blog/author/willhalto/"
                  target="_blank"
                >
                  <span>
                    <span className={styles.willHaltom1}>Will Haltom</span>
                  </span>
                </a>
                <span> June 11, 2024</span>
              </div>
            </div>
            <img className={styles.iconarrows} alt="" src="/iconarrows2.svg" />
          </div>
        </div>
      </div>
    </div>
  );
};

BlogItems.propTypes = {
  className: PropTypes.string,
  howWeImprovedPushProcessi: PropTypes.string,
  onGitHubAnalysis: PropTypes.string,
  description: PropTypes.string,
};

export default BlogItems;
