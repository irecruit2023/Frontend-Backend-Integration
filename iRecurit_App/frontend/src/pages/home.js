import TopNavBar from "../components/top-nav-bar";
import styles from "./home.module.css";
import { Modal } from '../components/upload-resume';
import {React,useState} from 'react';
import { useNavigate } from "react-router-dom";
import { ReactComponent as  Ellipse1 } from "../assets/icons/ellipse-6.svg";
import { ReactComponent as  Ellipse2 } from "../assets/icons/ellipse-5.svg";
import { ReactComponent as  RightHomeIcon } from "../assets/icons/right.svg";




const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => { console.log("called"), setModalOpen(true)};
  const closeModal = () => setModalOpen(false);
  const navigateMain =()=>{ navigate("/main")}

  return (
    <div className={styles.root}>
      <TopNavBar />
      <main className={styles.contentContainerWrapper}>
        <section className={styles.contentContainer}>
          <div className={styles.content}>
            <h2 className={styles.helloVidhiAndContainer}>
              <span>Hello {JSON.parse(localStorage.loginInformation).data.name},</span>
              <span className={styles.andWelcomeTo}>
                {" "}
                and welcome to iRecruit!
              </span>
            </h2>
            <div className={styles.thisPlatformIs}>
              This platform is more than just a portal; it's a gateway to a
              universe of possibilities, designed to celebrate the diversity of
              skills and passions that make you, you. Together, let's embark on
              this journey, where your talent meets its destiny in the sprawling
              landscape of opportunities.
            </div>
          </div>
          <div className={styles.benefitsContainerWrapper}>
            <div className={styles.benefitsContainer}>
              <div className={styles.unleashTheFullPotentialOfParent}>
                <h1 className={styles.unleashTheFull}>
                  Unleash the full potential of your job search journey by
                  kickstarting it with a polished profile for unparalleled
                  career outcomes.
                </h1>
                <div className={styles.ofCandidatesWhoCompletedThWrapper}>
                  <div className={styles.ofCandidatesWho}>
                    88% of candidates who completed their profiles discovered a
                    brighter career path.
                  </div>
                </div>
              </div>
              <div className={styles.primaryButtonParent}>
                <div className={styles.primaryButton}>
                  <div className={styles.primary} style ={{cursor:"pointer"}} onClick={openModal} >Complete Profile Now</div>
                </div>
                <div className={styles.secondaryButton} > 
                  <div className={styles.secondary} style ={{cursor:"pointer"}}   onClick={navigateMain} >Skip and Explore</div>
                </div>
              </div>
              <div className={styles.vectorParent}>
                <Ellipse2
                  className={styles.frameChild}
                  alt=""
                />
                <Ellipse1 className={styles.frameItem} alt="" />
                <RightHomeIcon
                  className={styles.rightIcon}
                  loading="lazy"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className={styles.footerText}>
            <div className={styles.description}>© 2024 iRecruit</div>
          </div>
        </section>
      </main>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Home;
