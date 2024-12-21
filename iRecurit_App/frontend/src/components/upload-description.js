import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './upload-resume.module.css'; // Ensure you have CSS for modal and upload resume
import DescriptionUploaded from "./description-uploaded";
import DescriptionAnalysis from "./description-analysis";
import JobUploadSuccessModal from "../modals/Job-upload-success-modal"
import FailureJDModalJDModal from "../modals/FailureJDModal"
import { uploadResume, generateProfile } from '../utils/util';
import { notifyError, notifySuccess } from '../helper';

const UploadResume = ({ className = "" }) => {
  const [isUploaded, setIsUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessAIAnalysis, setShowSuccessAIAnalysis] = useState(false);
  const [showFailAIAnalysis, setShowFailAIAnalysis] = useState(false);
  const [showAnalysisLoading, setshowAnalysisLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState(null); // State to handle error messages
  const [isDragOver, setIsDragOver] = useState(false); // Drag state


  const handleDescriptionAnalysis = async() => {
    setshowAnalysisLoading(true)
    try {

      await new Promise((resolve) => setTimeout(resolve, 10000));

      // Generate a random true/false success outcome
      const isSuccess = Math.random() < 0.5; // 50% chance of success or failure
      if (isSuccess) {
        setshowAnalysisLoading(false)
        setShowSuccessAIAnalysis(true)
      } else {
        setshowAnalysisLoading(false)
        setShowFailAIAnalysis(true)
      }
    } catch (error) {
      setshowAnalysisLoading(false)
      setShowFailAIAnalysis(true)
    } finally {
      setshowAnalysisLoading(false)
    }
  };



  const handleAfterAIAnalysis = () => {

    setShowResumeAnalysis(false);
    setShowResumeAnalysis2(true);
  };

  const handleClose = () => {
    setIsUploaded(false); // Reset the upload state
    setFileName(''); // Clear the file name
  };

  const handleUploadClick = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setFileName(file.name);
    setIsLoading(true);
  
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 3000)); // 2-second delay
  
      // Simulated successful response
      const response = { success: true, message: "Resume uploaded successfully" };
  
      if (response.success) {
        setFileName(file.name);
        setIsUploaded(true);
        console.log("Resume uploaded successfully:", response);
      } else {
        notifyError(response.message);
      }
    } catch (error) {
      console.log("Error:", error);
      notifyError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };
  

  // Handle file drop
  const handleDrop = async (event) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files[0];
    if (!file) return;
    setFileName(file.name);
    setIsLoading(true);
    // setError(null);

    try {
      const response = await uploadResume(file);
      if (response.success) {
        setFileName(file.name);
        setIsUploaded(true);
        console.log('Resume uploaded successfully:', response);
      } else {
        notifyError(response.message);
      }
    } catch (error) {
      notifyError(error)
      // setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle drag over to highlight dropzone
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  // Handle drag leave to reset styles
  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  return (
    <>
      {showAnalysisLoading && (
        <DescriptionAnalysis handleAfterAIAnalysis={handleAfterAIAnalysis} />
      )}
      {showSuccessAIAnalysis && (
        <JobUploadSuccessModal  />
      )}
      {showFailAIAnalysis && (
        <FailureJDModalJDModal />
      )}
      {!showAnalysisLoading && !showSuccessAIAnalysis &&!showFailAIAnalysis && (
        <div className={[styles.root, className].join(" ")}>
          <div className={styles.fillNoFormsContainer}>
          </div>
          <div className={styles.uploadResumeWrapper}>
            <h1 className={styles.uploadResume} style ={{textWrap:'nowrap'}}>Upload Job Description (PDF and Word)</h1>
          </div>
          <p className={styles.fillNoForms}>
          Upload it in PDF, and we’ll handle the rest. 
          Quick and efficient for instant posting.
            </p>
          {!isUploaded && !isLoading && (
            <div
              className={`${styles.dropzoneWrapper} ${isDragOver ? styles.dragOver : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept=".docx, .pdf"
                style={{ display: 'none' }}
                id="fileInput"
                onChange={handleUploadClick}
              />
              <div className={styles.dropzone} onClick={() => document.getElementById('fileInput').click()}>
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
            <div style={{ height: '241px', display: 'flex', alignContent: 'center', justifyContent: 'center', alignItems: 'center' }} className={styles.dropzoneWrapper}>
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

          {isUploaded && <DescriptionUploaded handleDescriptionAnalysis={handleDescriptionAnalysis} fileName={fileName} onClose={handleClose} />}

          <div className={styles.rootInner}>
            <div className={styles.textBoxParent}>
              <div className={styles.textBox} />
              {/* <div className={styles.ofCandidatesWho}>
                88% of candidates who completed their profiles discovered a brighter
                career path.
              </div> */}
            </div>
          </div>
          <div className={styles.dontHaveAContainer}>
            <span>Don’t have a Job Description ready?</span>
            <span className={styles.tryOurResume}>
              {" "}
              Try Using Our Template
            </span>
          </div>
        </div>
      )}
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
        <button className={styles.closeButton} style ={{color:'black'}} onClick={onClose}>X</button>
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
