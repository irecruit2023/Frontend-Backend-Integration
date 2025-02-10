import TopNavBar from "../components/top-nav-bar";
import styles from "./jobs.module.css";
import { Modal } from '../components/upload-description';
import WelcomeHeader from "../components/welcome-header";
import { React, useState } from 'react';
import InputField from "../components/input-field";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Ellipse1 } from "../assets/icons/ellipse-6.svg";
import { ReactComponent as Ellipse2 } from "../assets/icons/ellipse-5.svg";
import { ReactComponent as RightHomeIcon } from "../assets/icons/right.svg";




const Jobs = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const openModal = () => { console.log("called"), setModalOpen(true) };
  const closeModal = () => setModalOpen(false);
  const navigateMain = () => { navigate("/main") }



  const JobDescription = () => {
    return (
      <div>
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={styles.card}>
              <div className={styles.cardBody}>
                <h5 className={styles.cardTitle}>Upload Job Description (PDF and Word)</h5>
                <h6 className={styles.subTitle}>Have a JD ready?</h6>
                <p className={styles.cardText}>
                  Upload it in PDF, and we’ll handle the rest. Quick and efficient for instant posting.
                </p>
                <a className={styles.btnPrimary} onClick={openModal}>
                  Upload Now
                </a>
              </div>
            </div>
          </div>
          <div className={styles.orSection}>
            <span className={styles.orText}>OR</span>
          </div>
          <div className={styles.col}>
            <div className={styles.card}>
              <div className={styles.cardBody}>
                <h5 className={styles.cardTitle}>Create Job Description Using Our Template</h5>
                <h6 className={styles.subTitle}>Need structure?</h6>
                <p className={styles.cardText}>
                  Our template guides you through key sections to create a clear, complete job post effortlessly.
                </p>
                <a href="/jobs-template" className={styles.btnPrimary}>
                  Create Now
                </a>
              </div>
            </div>
          </div>
        </div>
  
        {/* Skip or Do it Later Section */}
        <div className={styles.skipSection}>
          <a href="#" className={styles.skipLink}>
            Skip or Do it Later
          </a>
        </div>
      </div>
    );
  };
   





  return (
    <div className={styles.root}>
      <TopNavBar userType="recuriter" />
      <main className={styles.contentContainerWrapper}>
        <section className={styles.contentContainer}>
          <WelcomeHeader userType="jobs" />
          <div  style ={{width:'100%'}}className={styles.benefitsContainerWrapper}>
            <div   style ={{width:"100%"}} className={styles.benefitsContainer}>
              <JobDescription/>
             
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

export default Jobs;
