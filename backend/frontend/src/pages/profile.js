import ContentWrapper from "../components/content-wrapper";
import PrimaryButton from "../components/primary-button";
import SecondaryButton from "../components/secondary-button-profile";
import cIcon from '../assets/images/c@2x.png';
import javascriptIcon from '../assets/images/javascript@2x.png';
import mysqlIcon from '../assets/images/mysql@2x.png';
import employeeskillsindividual1Image from '../assets/images/employeeskillsindividual1-1@2x.png';
import christinawocintechchatcom0zx1bdv5bnyunsplashremovebgpreviewIcon from '../assets/images/christinawocintechchatcom0zx1bdv5bnyunsplashremovebgpreview-1@2x.png';
import editIcon from "../assets/icons/mode-edit-1.svg"
import editIcon2 from "../assets/icons/mode-edit.svg"
import maskgroupImage from "../assets/images/mask-group@2x.png"
import vector42Icon from "../assets/icons/vector-42.svg"
import vector62Icon from "../assets/icons/vector-62.svg"
import emptyContainerImage from "../assets/icons/empty-container@2x.png"
import codingLanguageIcon  from "../assets/images/codinglanguage@2x.png"
import group47Icon from "../assets/icons/group-47.svg"
import rocketIcon from "../assets/icons/lni-lnirocket.svg"
import clgIcon from "../assets/images/8ba615e8c14d1ebb6cb54ead8bd6e175-1@2x.png" 
import styles from "./profile.module.css";
import TopNavBar from "../components/top-nav-bar";
import { getResume } from "../utils/util";

const EploreLanding = () => {

  const handleResumeClick = () => {
    console.log(JSON.parse(localStorage.loginInformation).data)
    const userId = JSON.parse(localStorage.loginInformation).data.user_id; // Replace this with the actual user ID or fetch it dynamically
    getResume(userId).then(data=>{
      console.log(data)
    });
};


  return (
    <div className={styles.root}>
    <div className={styles.eploreLanding}>
    <TopNavBar />  
      <ContentWrapper />
      <div className= {styles.profilePage}>
      <div className={styles.eploreLandingChild} />
      <div className={styles.eploreLandingItem} />
      <img
        className={styles.ba615e8c14d1ebb6cb54ead8bd6e17Icon}
        alt=""
        src={clgIcon}
      />
      <div className={styles.eploreLandingInner} />
      <img className={styles.maskGroupIcon} alt="" src={maskgroupImage} />
      <div className={styles.rectangleDiv} />
      <div className={styles.makeAnImpact}>Make an impact on recruiters.</div>
      <div className={styles.uploadACase}>Upload a case study</div>
      <div className={styles.eploreLandingChild1} />
      <div className={styles.eploreLandingChild2} />
      <div className={styles.eploreLandingChild3} />
      <div className={styles.eploreLandingChild4} />
      <div className={styles.eploreLandingChild5} />
      <div className={styles.eploreLandingChild6} />
      <div className={styles.eploreLandingChild7} />
      <div className={styles.caseStudy}>Case Study</div>
      <div className={styles.certifications}>Certifications</div>

      <b className={styles.databaseManagementExpert}>
        Database Management Expert
      </b>
      <div className={styles.eploreLandingChild8} />
      <img
        className={styles.employeeSkillsIndividual11Icon}
        alt=""
        src={employeeskillsindividual1Image}
      />
      <div className={styles.skillAnalysis}>Skill Analysis</div>
      <div className={styles.achievemnets}>Achievemnets</div>
      <div className={styles.myProfile}>My Profile</div>
      <div className={styles.vidhiSharma}>Vidhi Sharma</div>
      <div className={styles.softwareEngineer}>Software Engineer</div>
      <div className={styles.eploreLandingChild9} />
      <div className={styles.eploreLandingChild10} />
      <div className={styles.topTechSkills}>Top Tech Skills</div>
      <div className={styles.mbti}>MBTI</div>
      <div className={styles.webDevelopmentObjectOrienteContainer}>
        <ul className={styles.webDevelopmentObjectOriente}>
          <li className={styles.webDevelopment}>Web Development</li>
          <li className={styles.webDevelopment}>
            Object-Oriented Programming (OOP)
          </li>
          <li className={styles.webDevelopment}>Database Management</li>
          <li>{`Algorithms & Data Structures`}</li>
        </ul>
      </div>
      <div className={styles.advanceJavaProgrammingContainer}>
        <p className={styles.advanceJavaProgramming}>
          Advance Java Programming
        </p>
        <p className={styles.advanceJavaProgramming}>Coursera - Jan 2024</p>
      </div>
      <div className={styles.chatBotImplementationContainer}>
        <p className={styles.advanceJavaProgramming}>Chat Bot Implementation</p>
        <p className={styles.advanceJavaProgramming}>1mg</p>
        <p className={styles.advanceJavaProgramming}>
          Developed chatbot, which helped customer to reduce in their customer
          support department
        </p>
      </div>
      <div className={styles.pythonForDataContainer}>
        <p className={styles.advanceJavaProgramming}>Python for Data Science</p>
        <p className={styles.advanceJavaProgramming}>Coursera - Oct 2023</p>
      </div>
      <img className={styles.modeEditIcon} alt="" src= {editIcon}/>
      <img className={styles.modeEditIcon1} alt="" src={editIcon} />
      <img className={styles.modeEditIcon2} alt="" src={editIcon} />
      <img className={styles.modeEditIcon3} alt="" src={editIcon} />
      <img className={styles.vectorIcon} alt="" src={vector42Icon}/>
      <div className={styles.ellipseDiv} />
      <div className={styles.eploreLandingChild11} />
      <div className={styles.eploreLandingChild12} />
      <div className={styles.internshipworkExperience}>
        Internship/Work Experience
      </div>
      <div className={styles.razorpaySoftwareEngineeringContainer}>
        <p className={styles.advanceJavaProgramming}>Razorpay</p>
        <p className={styles.advanceJavaProgramming}>
          Software Engineering Internship
        </p>
        <p className={styles.jan2024}>Jan 2024 - Present - Full Time</p>
        <p className={styles.advanceJavaProgramming}>Gurgaon, India</p>
      </div>
      <div className={styles.mgSoftwareEngineeringContainer}>
        <p className={styles.advanceJavaProgramming}>1mg</p>
        <p className={styles.advanceJavaProgramming}>
          Software Engineering Internship
        </p>
        <p className={styles.jan2024}>Oct 2023 - Dec 2023 - Full Time</p>
        <p className={styles.advanceJavaProgramming}>Gurgaon, India</p>
      </div>
      <img className={styles.modeEditIcon4} alt="" src={editIcon} />
      <img className={styles.modeEditIcon5} alt="" src={editIcon2} />
      <b className={styles.btechComputerScienceContainer}>
        <p className={styles.btechComputerScience}>B.Tech Computer Science</p>
        <p className={styles.amityUniversity}>Amity University - 2022</p>
      </b>
      <div className={styles.eploreLandingChild13} />
      <div className={styles.eploreLandingChild14} />
      <b className={styles.message}>Message</b>
      <b className={styles.follow}>Follow</b>
      <div className={styles.committedToAchieving}>
        Committed to achieving excellence in everything I do, utilise my skills,
        dedication and strong work ethic, and ensuring that every action I take
        is driven by integrity and good values.
      </div>
      <div className={styles.div}>“</div>
      <img
        className={styles.eploreLandingChild15}
        alt=""
        src= {vector62Icon}
      />
      <img
        className={styles.eploreLandingChild16}
        alt=""
        src= {vector62Icon}
      />
      <img
        className={styles.lniLniRocketIcon}
        alt=""
        src={rocketIcon}
      />
      <div className={styles.eploreLandingChild17} />
      <div className={styles.eploreLandingChild18} />
      <div className={styles.eploreLandingChild19} />
      <div className={styles.eploreLandingChild20} />
      <div className={styles.eploreLandingChild21} />
      <img className={styles.mysqlIcon} alt="" src={mysqlIcon} />
      <img className={styles.cIcon} alt="" src={cIcon} />
      <img className={styles.javaScriptIcon} alt="" src={javascriptIcon} />
      <img
        className={styles.codingLanguageIcon}
        alt=""
        src= {codingLanguageIcon}
      />
      <img className={styles.icon} alt="" src= {emptyContainerImage} />
      <PrimaryButton
        propTop ="1811px"
        propLeft ="1289px"
        propWidth= "395px"
        propPadding="8px"
        propAlignSelf="unset"
        primary="Try iRecruit Premium "
        propFontSize="19px"
        propColor="#f5f5f5"
        propDisplay="unset"
        propMinWidth="unset"
        propTextDecoration="unset"
        propHeight="66px"
      />
      <img
        className={styles.christinaWocintechchatCom0zIcon}
        alt=""
        src= {christinawocintechchatcom0zx1bdv5bnyunsplashremovebgpreviewIcon}
      />
      <div className={styles.eploreLandingChild22} />
      <div className={styles.fresher}>Fresher</div>
      <img className={styles.groupIcon} alt="" src={group47Icon} />
      <div style={{"cursor":"pointer"}} onClick={handleResumeClick}>
      <SecondaryButton
        secondary="My Resume"
        secondaryFontWeight="600"
        secondaryButtonBackgroundColor="#fff"
        secondaryColor="#f2665d"
        secondaryButtonPadding="8px"
        secondaryButtonAlignSelf="unset"
        secondaryDisplay="unset"
        secondaryMinWidth="unset"
        secondaryButtonTop ="1811px"
        secondaryButtonWidth ="395px"
        secondaryButtonLeft ="459px"
        secondaryButtonHeight ='66px'
      />
      </div>
      <div className={styles.eploreLandingChild23} />
      <div className={styles.vidhiYourProfileContainer}>
        <p
          className={styles.advanceJavaProgramming}
        >{`Vidhi, your profile has been created. Kindly go through it and see if you like to make additions, improve the the text. `}</p>
        <p className={styles.advanceJavaProgramming}>
          You can edit each section by simply clicking on edit icon shown in
          every section.
        </p>
        <p className={styles.advanceJavaProgramming}>&nbsp;</p>
        <p className={styles.advanceJavaProgramming}>
          If your happy with your profile creation, kindly confirm by clicking
          the button.
        </p>
      </div>
      <SecondaryButton
        secondary="Confirm and Create Profile"
        secondaryFontWeight="500"
        secondaryButtonBackgroundColor="#fff"
        secondaryColor="#f2665d"
        secondaryButtonPadding="8px"
        secondaryButtonAlignSelf="unset"
        secondaryDisplay="unset"
        secondaryMinWidth="unset"
        secondaryButtonTop ="573px"
        secondaryButtonWidth ="255px"
        secondaryButtonLeft ="1337px"
        secondaryButtonHeight="51px"
      />
      <div
        className={styles.takeUpPersonality}
      >{`Take up personality test and see how you can `}</div>
  
    </div>
    </div>

    </div>
  );
};

export default EploreLanding;
