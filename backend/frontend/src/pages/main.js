import FrameComponent2 from "../components/frame-component2";
import ContentContainer from "../components/content-container";
import LowerContent from "../components/lower-content";
import BottomContent from "../components/bottom-content";
import FrameComponent1 from "../components/frame-component1";
import FrameComponent from "../components/frame-component";
import styles from "./main.module.css";
import TopNavBar from "../components/top-nav-bar";

const Main = () => {
  return (
    <div className={styles.root}>
      <TopNavBar />  
      <main className={styles.mainContent}>
        <section className={styles.contentWrapper}>
          <ContentContainer />
          <LowerContent />
          <BottomContent />
          <FrameComponent1 />
          <FrameComponent />
          <div className={styles.footerContainer}>
            <div className={styles.footerContent}>
              <div className={styles.wrapperGroup54}>
                <img
                  className={styles.wrapperGroup54Child}
                  alt=""
                  src="/group-54.svg"
                />
              </div>
              <div className={styles.footerText}>
                <div className={styles.description}>© 2024 iRecruit</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Main;
