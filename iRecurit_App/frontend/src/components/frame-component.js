import BlogItems from "./blog-items";
import PropTypes from "prop-types";
import styles from "./frame-component.module.css";

const FrameComponent = ({ className = "" }) => {
  return (
    <div className={[styles.blogContentWrapper, className].join(" ")}>
      <div className={styles.blogContent}>
        <div className={styles.blogHeader}>
          <div className={styles.blogTitle}>
            <div className={styles.blogHeading}>
              <h1 className={styles.blogs}>Blogs</h1>
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
        <div className={styles.blog}>
          <BlogItems
            howWeImprovedPushProcessi="How we improved push processing "
            onGitHubAnalysis="on GitHub Analysis"
            description="Pushing code to GitHub is one of the most fundamental interactions that  developers have with GitHub every day. Read how we have significantly  improved the ability of our monolith to correctly and fully process  pushes from our users."
          />
          <BlogItems
            howWeImprovedPushProcessi="How GitHub reduced testing time"
            onGitHubAnalysis="for iOS apps with new runner..."
            description="Pushing code to GitHub is one of the most fundamental interactions that  developers have with GitHub every day. Read how we have significantly  improved the ability of our monolith to correctly and fully process  pushes from our users."
          />
          <BlogItems
            howWeImprovedPushProcessi="How we improved push processing "
            onGitHubAnalysis="on GitHub Analysis"
            description="Pushing code to GitHub is one of the most fundamental interactions that  developers have with GitHub every day. Read how we have significantly  improved the ability of our monolith to correctly and fully process  pushes from our users.`"
          />
          <BlogItems
            howWeImprovedPushProcessi="How we improved push processing "
            onGitHubAnalysis="on GitHub Analysis"
            description="Pushing code to GitHub is one of the most fundamental interactions that  developers have with GitHub every day. Read how we have significantly  improved the ability of our monolith to correctly and fully process  pushes from our users."
          />
          <BlogItems
            howWeImprovedPushProcessi="How we improved push processing "
            onGitHubAnalysis="on GitHub Analysis"
            description="Pushing code to GitHub is one of the most fundamental interactions that  developers have with GitHub every day. Read how we have significantly  improved the ability of our monolith to correctly and fully process  pushes from our users."
          />
        </div>
      </div>
    </div>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent;
