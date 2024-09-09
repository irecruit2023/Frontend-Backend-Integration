// import FrameComponent3 from "../components/frame-component3";
// import PrimaryButton from "../components/primary-button1";
import styles from "./profile-creation-page.module.css";

import cIcon from '../assets/images/c@2x.png';
import javascriptIcon from '../assets/images/javascript@2x.png';
import mysqlIcon from '../assets/images/mysql@2x.png';
import employeeskillsindividual1Image from '../assets/images/employeeskillsindividual1-1@2x.png';
import christinawocintechchatcom0zx1bdv5bnyunsplashremovebgpreviewIcon from '../assets/images/christinawocintechchatcom0zx1bdv5bnyunsplashremovebgpreview-1@2x.png';
import codingLanguageIcon  from "../assets/images/codinglanguage@2x.png"
import iconarrows2 from "../assets/icons/iconarrows-2.svg"
import rocketIcon from "../assets/icons/lni-lnirocket.svg"
import clgIcon from "../assets/images/8ba615e8c14d1ebb6cb54ead8bd6e175-1@2x.png" 
import graph from "../assets/images/graph.png" 
import TopNavBar from "../components/top-nav-bar";
import RadarChart  from "../components/skill-analysis-chart";
import PrimaryButton from "../components/primary-button-2";
import { getResume } from "../utils/util";


const ProfileCreationPage = () => {
  
  const handleResumeClick = () => {

    if(JSON.parse(localStorage.getItem("loginInformation"))){
    console.log(JSON.parse(localStorage?.loginInformation)?.data)
    const userId = JSON.parse(localStorage?.loginInformation)?.data?.user_id; // Replace this with the actual user ID or fetch it dynamically
    getResume(userId).then(data=>{
      console.log(data)
    });
  }
};

  return (
    <div className={styles.profileCreationPage}>
      <div className={styles.profileCreationPageChild} />
    <TopNavBar/>   
      <main className={styles.profileContent}>
        <section className={styles.frameParent}>
          <div className={styles.myProfileParent}>
            <h1 className={styles.myProfile}>My Profile</h1>
            <div className={styles.profileActions}>
              <div className={styles.actionButtons}>
                <a className={styles.viewAnalysis}>View Analysis</a>
                <div className={styles.editMyProfile}>Edit my profile</div>
              </div>
            </div>
          </div>
          <div className={styles.frameGroup}>
            <div className={styles.infoContainerWrapper}>
              <div className={styles.infoContainer}>
                <div className={styles.infoContainerInner}>
                  <div className={styles.rectangleParent}>
                    <div className={styles.frameChild} />
                    <div className={styles.nameRole}>
                      <h1 className={styles.vidhiSharma}>Vidhi Sharma</h1>
                      <div className={styles.softwareEngineer}>
                        Software Engineer
                      </div>
                    </div>
                    <div className={styles.photoExperienceWrapper}>
                      <div className={styles.photoExperience}>
                        <img
                          className={styles.christinaWocintechchatCom0zIcon}
                          loading="lazy"
                          alt=""
                          src={christinawocintechchatcom0zx1bdv5bnyunsplashremovebgpreviewIcon}
                        />
                        {/* <div  className={styles.profileEditImageText}> click to upload photo </div>                        */}
                        <div className={styles.fresherWrapper}>
                          <div className={styles.fresher}>Fresher</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.educationContainerWrapper}>
                  <div className={styles.educationContainer}>
                    <div className={styles.educationContainerChild} />
                    <img
                      className={styles.ba615e8c14d1ebb6cb54ead8bd6e17Icon}
                      loading="lazy"
                      alt=""
                      src= {clgIcon}
                    />
                    <div className={styles.degreeInfo}>
                      <b className={styles.btechComputerScienceContainer}>
                        <p className={styles.btechComputerScience}>
                          B.Tech Computer Science
                        </p>
                        <p className={styles.amityUniversity}>
                          Amity University - 2022
                        </p>
                      </b>
                    </div>
                  </div>
                </div>
                <div className={styles.secondaryButtonWrapper}  style={{"cursor":"pointer"}} onClick={handleResumeClick} >
                  <div className={styles.secondaryButton}>
                    <div className={styles.secondary}>My Resume</div>
                  </div>
                </div>
                <div className={styles.experienceSkills}>
                  <div className={styles.experienceSkillsChild} />
                  <div className={styles.internshipworkExperience}>
                    Internship/Work Experience
                  </div>
                  <img
                    className={styles.experienceSkillsItem}
                    loading="lazy"
                    alt=""
                    src="/vector-6.svg"
                  />
                  <div className={styles.experiences}>
                    <div className={styles.experienceItems}>
                      <div className={styles.experienceDetails}>
                        <div className={styles.experienceIcons} />
                      </div>
                      <div
                        className={styles.razorpaySoftwareEngineeringContainer}
                      >
                        <p className={styles.razorpay}>Razorpay</p>
                        <p className={styles.softwareEngineeringInternshi}>
                          Software Engineering Internship
                        </p>
                        <p className={styles.jan2024}>
                          Jan 2024 - Present - Full Time
                        </p>
                        <p className={styles.softwareEngineeringInternshi}>
                          Gurgaon, India
                        </p>
                      </div>
                    </div>
                    <div className={styles.experienceItems}>
                      <div className={styles.experienceDetails}>
                        <div className={styles.experienceIcons} />
                      </div>
                      <div
                        className={styles.razorpaySoftwareEngineeringContainer}
                      >
                        <p className={styles.razorpay}>1mg</p>
                        <p className={styles.softwareEngineeringInternshi}>
                          Software Engineering Internship
                        </p>
                        <p className={styles.jan2024}>
                          Oct 2023 - Dec 2023 - Full Time
                        </p>
                        <p className={styles.softwareEngineeringInternshi}>
                          Gurgaon, India
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.skillsExpertise}>
              <div className={styles.expertiseContainerParent}>
                <div className={styles.expertiseContainer}>
                  <div className={styles.rectangleGroup}>
                    <div className={styles.frameInner} />
                    <div className={styles.databaseManagementExpert}>
                      Database Management Expert
                    </div>
                  </div>
                  <div className={styles.technicalSkills}>
                    <div className={styles.skillsContainer}>
                      <div className={styles.skillsContainerChild} />
                      <div className={styles.topTechSkillsWrapper}>
                        <div className={styles.topTechSkills}>
                          Top Tech Skills
                        </div>
                      </div>
                      <div
                        className={styles.webDevelopmentObjectOrienteContainer}
                      >
                        <ul className={styles.webDevelopmentObjectOriente}>
                          <li className={styles.webDevelopment}>
                            Web Development
                          </li>
                          <li className={styles.webDevelopment}>
                            Object-Oriented Programming (OOP)
                          </li>
                          <li className={styles.webDevelopment}>
                            Database Management
                          </li>
                          <li>{`Algorithms & Data Structures`}</li>
                        </ul>
                      </div>
                    </div>
                    <div className={styles.personalityTest}>
                      <div className={styles.personalityTestChild} />
                      <div className={styles.testDescription}>
                        <div className={styles.mbti}>MBTI</div>
                        <blockquote className={styles.takeAPersonality}>
                          "Take a personality test and discover how you can make
                          a difference."
                        </blockquote>
                      </div>
                      <div className={styles.secondaryButton1}>
                        <div className={styles.secondary1}>
                          Take the test now
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.skillAssessment}>
                  <div className={styles.skillAssessmentChild} />
                  <div className={styles.skillAnalysis}>Skill Analysis</div>
                  <div className={styles.assessmentChart}>
                    <div className={styles.employeeSkillsIndividual11Parent}>
                      <RadarChart/>
                      {/* <img
                        className={styles.employeeSkillsIndividual11Icon}
                        alt=""
                        src= {employeeskillsindividual1Image}
                      />
                      <img
                        className={styles.screenshot20240830At1150}
                        alt=""
                        src={graph}
                      /> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.caseStudyContainerParent}>
                <div className={styles.expertiseContainerParent}>
                  <div className={styles.caseStudyHeader}>
                    <div className={styles.caseStudyHeaderChild} />
                    <h3 className={styles.committedToAchieving}>
                      Committed to achieving excellence in everything I do,
                      utilise my skills, dedication and strong work ethic, and
                      ensuring that every action I take is driven by integrity
                      and good values.
                    </h3>
                  </div>
                  <div className={styles.caseStudy}>
                    <div className={styles.caseStudyChild} />
                    <div className={styles.achievemnets}>Case Study</div>
                    <div className={styles.caseStudyIcon}>
                      <img
                        className={styles.lniLniRocketIcon}
                        loading="lazy"
                        alt=""
                        src={rocketIcon}
                      />
                    </div>
                    <div className={styles.impactRecruiters}>
                      <h3 className={styles.makeAnImpact}>
                        Make an impact on recruiters.
                      </h3>
                    </div>
                    <div className={styles.uploadCaseStudy}>
                      <div className={styles.uploadContainer}>
                        <div className={styles.uploadACaseStudyWrapper}>
                          <div className={styles.uploadACase}>
                            Upload a case study
                          </div>
                        </div>
                        <img
                          className={styles.iconarrows}
                          loading="lazy"
                          alt=""
                          src={iconarrows2}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.certificationsContentParent}>
                  <div className={styles.certificationsContent}>
                    <div className={styles.certificationsContentChild} />
                    <div className={styles.certifications}>Certifications</div>
                    <img
                      className={styles.certificationsDividerIcon}
                      loading="lazy"
                      alt=""
                      src="/vector-5.svg"
                    />
                    <div className={styles.certificationsList}>
                      <div className={styles.experienceItems}>
                        <div className={styles.experienceDetails}>
                          <div className={styles.ellipseDiv} />
                        </div>
                        <div className={styles.advanceJavaProgrammingContainer}>
                          <span
                            className={styles.advanceJavaProgramming}
                          >{`Advance Java Programming Coursera `}</span>
                          <span className={styles.jan20241}>Jan 2024</span>
                        </div>
                      </div>
                      <div className={styles.experienceItems}>
                        <div className={styles.ellipseContainer}>
                          <div className={styles.ellipseDiv} />
                        </div>
                        <div className={styles.pythonForDataContainer}>
                          <p className={styles.pythonForData}>
                            Python for Data Science Coursera
                          </p>
                          <p className={styles.developedChatbotWhich}>
                            Oct 2023
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.rectangleContainer}>
                    <div className={styles.rectangleDiv} />
                    <div className={styles.achievemnets}>Achievemnets</div>
                    <div className={styles.achievementItem}>
                      <div className={styles.experienceDetails}>
                        <div className={styles.achievementIcon} />
                      </div>
                      <div className={styles.btechComputerScienceContainer}>
                        <p className={styles.pythonForData}>
                          Chat Bot Implementation 1mg
                        </p>
                        <p className={styles.developedChatbotWhich}>
                          Developed chatbot, which helped customer to reduce in
                          their customer support department
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={styles.skillsAndButton}>
                    <div className={styles.frameParent1}>
                      <div className={styles.rectangleParent1}>
                        <div className={styles.frameChild2} />
                        <img
                          className={styles.codingLanguageIcon}
                          loading="lazy"
                          alt=""
                          src={codingLanguageIcon}
                        />
                      </div>
                      <div className={styles.rectangleParent1}>
                        <div className={styles.frameChild2} />
                        <img
                          className={styles.codingLanguageIcon}
                          loading="lazy"
                          alt=""
                          src= {cIcon}
                        />
                      </div>
                    </div>
                    <div className={styles.frameParent1}>
                      <div className={styles.rectangleParent1}>
                        <div className={styles.frameChild2} />
                        <img
                          className={styles.codingLanguageIcon}
                          loading="lazy"
                          alt=""
                          src={mysqlIcon}
                        />
                      </div>
                      <div className={styles.rectangleParent1}>
                        <div className={styles.frameChild2} />
                        <img
                          className={styles.codingLanguageIcon}
                          loading="lazy"
                          alt=""
                          src= {javascriptIcon}
                        />
                      </div>
                    </div>
                    <PrimaryButton
                        propPadding="22.5px 20px"
                        propAlignSelf="stretch"
                        primary="Try iRecruit Premium "
                        propFontSize="19px"
                        propColor="#fff"
                        propDisplay="unset"
                        propMinWidth="unset"
                        propTextDecoration="unset"
                        primaryButtonPosition="unset"
                        primaryButtonTop="unset"
                        primaryButtonLeft="unset"
                        primaryButtonWidth="unset"
                        primaryButtonHeight="unset"
                      /> 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProfileCreationPage;
