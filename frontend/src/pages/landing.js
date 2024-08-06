import TopNavBar1 from "../components/top-nav-bar1";
import styles from "./landing.module.css";

const Landing = () => {
  return (
    <div className={styles.landing}>
      <TopNavBar1 />
      <main className={styles.contentContainerWrapper}>
        <section className={styles.contentContainer}>
          <div className={styles.content}>
            <div className={styles.description}>
              <h1 className={styles.connectingTalentWithContainer}>
                <p
                  className={styles.connectingTalent}
                >{`Connecting talent `}</p>
                <p className={styles.withOpportunities}>with opportunities</p>
              </h1>
              <div className={styles.thisPlatformIs}>
                This platform is more than just a portal; it's a gateway to a
                universe of possibilities, designed to celebrate the diversity
                of skills and passions that make you, you. Together, let's
                embark on this journey, where your talent meets its destiny in
                the sprawling landscape of opportunities.
              </div>
            </div>
            <div className={styles.ofCandidatesWhoCompletedThWrapper}>
              <div className={styles.ofCandidatesWho}>
                88% of candidates who completed their profiles discovered a
                brighter career path.
              </div>
            </div>
            <div className={styles.vectorParent}>
              <img className={styles.frameChild} alt="" src="/ellipse-5.svg" />
              <img className={styles.frameItem} alt="" src="/ellipse-6.svg" />
              <img
                className={styles.frameInner}
                loading="lazy"
                alt=""
                src="/group-56.svg"
              />
            </div>
            <div className={styles.primaryButton}>
              <div className={styles.primary}>See how it works</div>
            </div>
          </div>
          <div className={styles.footerText}>
            <div className={styles.description1}>© 2024 iRecruit</div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Landing;
