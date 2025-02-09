import TopNavBar from "../components/top-nav-bar";
import styles from "./home.module.css";
import { Modal } from '../components/upload-resume';
import WelcomeHeader from "../components/welcome-header";
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



  const messages = {
    user: {
      greeting: `Hello ${JSON.parse(localStorage?.getItem("loginInformation") || "{}")?.data?.name || ""}, and welcome to iRecruit!`,
      description: [
        "This platform is your gateway to countless opportunities, crafted to help you showcase your skills and find your dream career.",
        "Together, let's embark on this journey, where your talent meets its destiny in the sprawling landscape of opportunities.",
      ],
    },
    organization: {
      greeting: `Hello ${JSON.parse(localStorage?.getItem("loginInformation") || "{}")?.data?.name || ""}, and welcome to iRecruit for Organizations!`,
      description: [
        "This platform empowers your organization to discover the best talent and streamline your recruitment process like never before.",
        "Use our cutting-edge tools to post jobs, manage applications, and connect with top talent efficiently.",
      ],
    },
    job: {
      greeting: `Job`,
      description: [
        `Our portal streamlines the hiring process, offering a seamless way to add job opportunities and attract the perfect candidate—faster, simpler, and more effectively. 

        Choose to upload your job description as a PDF or build it out using our intuitive template with ready-to-go sections. With our tools, you’ll be set up to connect with top talent effortlessly!

        Next - Our advanced AI Engine verifies and validates your submission to ensure all required sections are present, so only complete, high-quality job descriptions are posted—enhancing your listing's appeal and attracting better candidate responses. If any details are missing, you’ll be notified instantly, giving you the chance to fine-tune your JD for maximum impact. `,
      ],
    },

    Account: {
      greeting: `Job`,
      description: [
        `Please review the details and confirm if everything is accurate, or make any necessary updates where needed.`,
      ],
    },
  };




  return (
    <div className={styles.root}>
      <TopNavBar />
      <main className={styles.contentContainerWrapper}>
        <section className={styles.contentContainer}>
          <WelcomeHeader userType="user"/>
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
