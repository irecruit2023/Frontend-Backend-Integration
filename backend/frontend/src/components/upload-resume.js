import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './upload-resume.module.css'; // Ensure you have CSS for modal and upload resume
import ResumeUploaded from "./resume-uploaded";
import ResumeAnalysis from "./resume-analysis";
import ResumeAnalysisTwo from "./resume-analysis-two";

const UploadResume = ({ className = "" }) => {
  const [isUploaded, setIsUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showResumeAnalysis, setShowResumeAnalysis] = useState(false);
  const [showResumeAnalysis2, setShowResumeAnalysis2] = useState(false);

  const handleResumeAnalysis = () => {
    console.log("called")
    // Simulate file upload logic here
    setShowResumeAnalysis(true);
    setShowResumeAnalysis2(false);
  };

  const handleResumeAnalysis2 = () => {
    console.log("called", "showResumeAnalysis2")
    // Simulate file upload logic here
    setShowResumeAnalysis(false)
    setShowResumeAnalysis2(true);
  };


  const handleUploadClick = () => {
    setIsLoading(true);

    // Simulate file upload logic with a timeout
    setTimeout(() => {
      setIsUploaded(true);
      setIsLoading(false);
    }, 2000); // Simulate a 2-second upload time
  };

  return (
    <>
    {showResumeAnalysis &&  !showResumeAnalysis2 && <ResumeAnalysis  handleResumeAnalysis2 = {handleResumeAnalysis2} />}
    {!showResumeAnalysis &&  showResumeAnalysis2 && <ResumeAnalysisTwo/>}
    {!showResumeAnalysis && !showResumeAnalysis2 &&  <div className={[styles.root, className].join(" ")}>
      <a className={styles.awesomeTxt}>Awesome, Vidhi!</a>
      <div className={styles.fillNoFormsContainer}>
        <p className={styles.fillNoForms}>
          Fill no forms, save time and unleash the full potential of your job
          search journey by
        </p>
        <p className={styles.kickstartingItWith}>
          kickstarting it with a polished profile for unparalleled career
          outcomes.
        </p>
      </div>
      <div className={styles.uploadResumeWrapper}>
        <h1 className={styles.uploadResume}>Upload Resume</h1>
      </div>
      {!isUploaded && !isLoading && (
        <div className={styles.dropzoneWrapper}>
          <div className={styles.dropzone} onClick={handleUploadClick}>
            <div className={styles.dropYourFileContainer}>
              <p className={styles.dropYourFileHereOrBrowse}>
                <span className={styles.dropYourFile}>Drop your file here, </span>
                <span className={styles.or}>or</span>
                <span className={styles.browseFromDevice}>
                  <span className={styles.span}> </span>
                  <span>browse from device</span>
                </span>
              </p>
              <p className={styles.blankLine}>
                <span className={styles.blankLine1}>
                  <span>&nbsp;</span>
                </span>
              </p>
              <p className={styles.or1}>or</p>
            </div>
            <div className={styles.secondaryButton}>
              <div className={styles.secondary}>Upload from G drive</div>
            </div>
            <div className={styles.supportsDocxAndContainer}>
              <p className={styles.supportsDocxAnd}>Supports: Docx and Pdf </p>
              <p className={styles.sizeUpto10}>Size: upto 10 MB</p>
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div  style={{"height" : '241px', display:'flex', alignContent:'center', justifyContent:'center', alignItems:'center'}} className={styles.dropzoneWrapper}>
        <div className={styles.loaderWrapper}>
          <p className={styles.uploadingText}>Uploading your file...</p>
          <div className={styles.loader}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        </div>
      )}

    {isUploaded && <ResumeUploaded  handleResumeAnalysis ={handleResumeAnalysis} />}

      <div className={styles.rootInner}>
        <div className={styles.textBoxParent}>
          <div className={styles.textBox} />
          <div className={styles.ofCandidatesWho}>
            88% of candidates who completed their profiles discovered a brighter
            career path.
          </div>
        </div>
      </div>
      <div className={styles.dontHaveAContainer}>
        <span>Don’t have a resume ready?</span>
        <span className={styles.tryOurResume}>
          {" "}
          Try our Resume Builder (AI)
        </span>
      </div>
    </div>
}
</>
  );
};

UploadResume.propTypes = {
  className: PropTypes.string,
};

const Modal = ({ isOpen, onClose, className }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <div className={[styles.modalBody, className].join(" ")}>
          <UploadResume className={styles.uploadResumeContent} />
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export { Modal, UploadResume };
