// import FrameComponent3 from "../components/frame-component3";
// import PrimaryButton from "../components/primary-button1";
import styles from "./profile-creation-page.module.css";
import React, { useEffect, useState } from 'react';

import cIcon from '../assets/images/c@2x.png';
import javascriptIcon from '../assets/images/javascript@2x.png';
import mysqlIcon from '../assets/images/mysql@2x.png';
import employeeskillsindividual1Image from '../assets/images/employeeskillsindividual1-1@2x.png';
import christinawocintechchatcom0zx1bdv5bnyunsplashremovebgpreviewIcon from '../assets/images/christinawocintechchatcom0zx1bdv5bnyunsplashremovebgpreview-1@2x.png';
import codingLanguageIcon from "../assets/images/codinglanguage@2x.png"
import iconarrows2 from "../assets/icons/iconarrows-2.svg"
import rocketIcon from "../assets/icons/lni-lnirocket.svg"
import clgIcon from "../assets/images/8ba615e8c14d1ebb6cb54ead8bd6e175-1@2x.png"
import graph from "../assets/images/graph.png"
import TopNavBar from "../components/top-nav-bar";
import RadarChart from "../components/skill-analysis-chart";
import PrimaryButton from "../components/primary-button-2";
import { getResume, getUserEducation } from "../utils/util";
import editIcon from "../assets/icons/mode-edit.svg"
import DeleteIcon from "../assets/icons/delete.svg"
import WorkExpModal from "../modals/profile-work-exp-modal";
import ObjectiveModal from "../modals/objective-modal";
import DeleteModal from "../modals/delete-modal";
import CertificationModal from "../modals/certification-modal";
import CaseStudyUpload from "../modals/case-study-modal";
import Achievement from "../modals/achievement-modal";
import { getTopSkills, getUserDomain, getUserSummary } from "../utils/util";

const ProfileCreationPage = () => {

  const [isExpModalOpen, setExpModalOpen] = useState(false);
  const [isobjectiveModalOpen, setobjectiveModalOpen] = useState(false);
  const [isDeleteeModalOpen, setDeleteModalOpen] = useState(false);
  const [certification, setCertification] = useState('');
  const [isCaseStudyModalOpen, setisCaseModalOpen] = useState(false);
  const [isAchievementModalOpen, setisAchievementModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [isAchievementCardVisible, setAchievementCardVisible] = useState(true); // To show/hide achievement card
  const [isCertificationCardVisible, setCertificationCardVisible] = useState(true); // To show/hide certification card
  const [skills, setSkills] = useState([]);
  const [userDomain, setuserDomain] = useState("User Domain");
  const [userSummary, setUserSummary] = useState(`Here’s your moment to shine! 
    Share what makes you unforgettable—give the world a reason to stop, smile, and say, ‘Tell me more!`);
  const [educationDetails, setEducationDetails] = useState("");


  // Function to handle the deletion of the achievement card
  const handleDeleteAchievement = () => {
    setAchievementCardVisible(false);
  };

  // Function to handle the deletion of the certification card
  const handleDeleteCertification = () => {
    setCertificationCardVisible(false);
  };


  const handleExpOpenModal = () => setExpModalOpen(true);
  const handleExpCloseModal = () => setExpModalOpen(false);


  const handleObjectiveOpenModal = () => setobjectiveModalOpen(true);
  const handleObjectiveCloseModal = () => setobjectiveModalOpen(false);


  const handleCertificationOpenModal = () => setCertification(true);
  const handleCertificationCloseModal = () => setCertification(false);


  const handleCaseStudyModal = () => setisCaseModalOpen(true);
  const handleCaseStudyCloseModal = () => setisCaseModalOpen(false);

  const handleAchievementModal = () => setisAchievementModalOpen(true);
  const handleAchievementCloseModal = () => setisAchievementModalOpen(false);


  const handleDeleteOpenModal = (item) => {
    setSelectedItem(item);
    setDeleteModalOpen(true)

  };
  const handleDeleteCloseModal = () => setDeleteModalOpen(false);



  const handleResumeClick = () => {

    if (JSON.parse(localStorage.getItem("loginInformation"))) {
      console.log(JSON.parse(localStorage?.loginInformation)?.data)
      const userId = JSON.parse(localStorage?.loginInformation)?.data?.user_id; // Replace this with the actual user ID or fetch it dynamically
      getResume(userId).then(data => {
        console.log(data)
      });
    }
  };



  const fetchTopSkills = async (userId) => {
    try {
      const response = await getTopSkills(userId); // Assume getTop5Skills() is defined elsewhere
      if (response && response.success && response.data) {
        setSkills(response.data); // Update state with the skills array
      }
    } catch (error) {
      console.error('Failed to fetch skills:', error);
    }
  };


  const fetchUserDomain = async (userId) => {
    try {
      const response = await getUserDomain(userId); // Assume getTop5Skills() is defined elsewhere
      if (response && response.success && response.data) {
        setuserDomain(response.data); // Update state with the skills array
      }
    } catch (error) {
      console.error('Failed to fetch skills:', error);
    }
  };


  const fetchUserSummary = async (userId) => {
    try {
      const response = await getUserSummary(userId); // Assume getTop5Skills() is defined elsewhere
      if (response && response.success && response.data) {
        setUserSummary(response.data); // Update state with the skills array
      }
    } catch (error) {
      console.error('Failed to fetch skills:', error);
    }
  };



  const fetchEducationDetails = async (userId) => {
    try {
      const response = await getUserEducation(userId); // Assume getTop5Skills() is defined elsewhere
      if (response && response.success && response.data) {
        setEducationDetails(response.data); // Update state with the skills array
      }
    } catch (error) {
      console.error('Failed to fetch skills:', error);
    }
  };


  useEffect(() => {
    // Fetch top 5 skills from the API
    const userId = JSON.parse(localStorage?.loginInformation)?.data?.user_id;
    // const userId = "88a2eb2d-d76d-4158-ac61-e2a2d5163671"

    fetchTopSkills(userId);
    fetchUserDomain(userId)
    fetchUserSummary(userId)
    fetchEducationDetails(userId)
  }, []);


  return (
    <div className={styles.profileCreationPage}>
      <div className={styles.profileCreationPageChild} />
      <TopNavBar />
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
                      <h1
                        className={styles.vidhiSharma}
                        style={{
                          fontSize:
                            (localStorage?.loginInformation && JSON.parse(localStorage.loginInformation)?.data?.name?.length > 11)
                              ? '1.5rem' // Decreased font size for long names
                              : 'inherit' // Default font size for shorter names
                        }}
                      >
                        {localStorage?.loginInformation ? JSON.parse(localStorage.loginInformation)?.data?.name || '' : ''}
                      </h1>

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
                      src={clgIcon}
                    />
                    <div className={styles.degreeInfo}>
                      <b className={styles.btechComputerScienceContainer}>
                        <p className={styles.btechComputerScience}>
                          {educationDetails.Degree}
                        </p>
                        <p className={styles.amityUniversity}>
                         {educationDetails.Institution} - {educationDetails["Year of course end"]}
                        </p>
                      </b>
                    </div>
                  </div>
                </div>
                <div className={styles.secondaryButtonWrapper} style={{ "cursor": "pointer" }} onClick={handleResumeClick} >
                  <div className={styles.secondaryButton}>
                    <div className={styles.secondary}>My Resume</div>
                  </div>
                </div>
                <div className={styles.experienceSkills}>
                  <div className={styles.experienceSkillsChild} />
                  <div>
                    <div className={styles.internshipworkExperience}>
                      Internship/Work Experience

                    </div>
                    <img style={{ cursor: 'pointer' }} onClick={handleExpOpenModal} className={styles.modeEditIcon} alt="" src={editIcon} />
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
                      {userDomain}
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
                          {skills.map((skill, index) => (
                            <li key={index} className={styles.webDevelopment}>
                              {skill}
                            </li>
                          ))}
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
                      <RadarChart />
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
                  <div style={
                    (!isCertificationCardVisible && !isAchievementCardVisible)
                      ? { height: '558px' }
                      : { height: '267px' }
                  }
                    className={styles.caseStudyHeader}>
                    <div className={styles.caseStudyHeaderChild} />
                    <h3
                      className={styles.committedToAchieving}
                      style={{ fontSize: userSummary.length > 100 ? '1rem' : '1.8rem' }}
                    >
                      {userSummary}
                    </h3>
                    <img style={{ cursor: 'pointer' }} onClick={handleObjectiveOpenModal} className={styles.modeEditIcon} alt="" src={editIcon} />
                  </div>
                  <div>
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
                            onClick={handleCaseStudyModal}
                            className={styles.iconarrows}
                            loading="lazy"
                            alt=""
                            src={iconarrows2}
                          />
                        </div>
                      </div>
                    </div>
                    {(!isCertificationCardVisible && !isAchievementCardVisible) && (
                      <div style={{ marginTop: "20px" }} className={styles.skillsAndButton}>
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
                              src={cIcon}
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
                              src={javascriptIcon}
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
                    )}
                  </div>
                </div>
                <div className={styles.certificationsContentParent}>
                  {isCertificationCardVisible && (<div className={styles.certificationsContent}>
                    <div className={styles.certificationsContentChild} />
                    <div className={styles.certifications}>Certifications
                      <img style={{ cursor: 'pointer' }} onClick={handleCertificationOpenModal} className={styles.modeEditIcon} alt="" src={editIcon} />
                    </div>
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
                    <img style={{ alignSelf: 'self-end', cursor: 'pointer', paddingTop: '32px' }} onClick={() => handleDeleteOpenModal("Certifications")} className={styles.modeEditIcon} alt="" src={DeleteIcon} />
                  </div>)}
                  {isAchievementCardVisible && (<div className={styles.rectangleContainer}>
                    <div className={styles.rectangleDiv} />
                    <div className={styles.achievemnets}>Achievemnets
                      <img style={{ cursor: 'pointer' }} onClick={handleAchievementModal} className={styles.modeEditIcon} alt="" src={editIcon} />
                    </div>
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
                    <img style={{ alignSelf: 'self-end', cursor: 'pointer', paddingTop: '32px' }} onClick={() => handleDeleteOpenModal("Achievements")} className={styles.modeEditIcon} alt="" src={DeleteIcon} />

                  </div>
                  )}
                  {(isCertificationCardVisible || isAchievementCardVisible) && (
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
                            src={cIcon}
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
                            src={javascriptIcon}
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
                  )}
                </div>
              </div>
            </div>
          </div>
          <WorkExpModal isOpen={isExpModalOpen} onClose={handleExpCloseModal} />
          <ObjectiveModal isOpen={isobjectiveModalOpen} onClose={handleObjectiveCloseModal} />
          <DeleteModal
            isOpen={isDeleteeModalOpen}
            onClose={handleDeleteCloseModal}
            selectedItem={selectedItem}
            onDelete={() => {
              if (selectedItem === "Achievements") {
                handleDeleteAchievement(); // Call achievement delete function
              } else if (selectedItem === "Certifications") {
                handleDeleteCertification(); // Call certification delete function
              }
            }} />
          <CertificationModal isOpen={certification} onClose={handleCertificationCloseModal} />
          <CaseStudyUpload isOpen={isCaseStudyModalOpen} onClose={handleCaseStudyCloseModal} />
          <Achievement isOpen={isAchievementModalOpen} onClose={handleAchievementCloseModal} />
        </section>
      </main>
    </div>
  );
};

export default ProfileCreationPage;
