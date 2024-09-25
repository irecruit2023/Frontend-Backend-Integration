import PrimaryButton from "./primary-button";
import PropTypes from "prop-types";
import styles from "./case-study-modal.module.css";
import { useState } from "react";

const CaseStudyUpload = ({ className = "", isOpen, onClose }) => {
    const [loading, setLoading] = useState(false); // For showing the loader
    const [text, setText] = useState("We highly recommend adding a case study to your profile."); // Initial text
    const [uploadText, setUploadText] = useState("Getting you started");

    if (!isOpen) return null;

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLoading(true); // Show loader
            setText("Awesome Vidhi!");
            setUploadText("You are about to upload a case study");
            // Simulate file upload (replace this with actual file upload logic)
            setTimeout(() => {
                setLoading(false); // Hide loader after upload completes
                setText("We highly recommend adding a case study to your profile.");
                setUploadText("Getting you started");
            }, 5000); // Simulating a 5-second upload delay
        }
    };

    const handleClose = () => {
        // Reset the text when closing the modal
        setText("We highly recommend adding a case study to your profile.");
        onClose(); // Call the parent onClose function to handle actual closing
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={[styles.modalContent, className].join(" ")}>
                <div className={styles.caseStudyContainer}>
                    <div className={styles.caseStudyContent}>
                        <div className={styles.upperMessage}>
                            <div className={styles.upperMessageHeading}>Make an impact on recruiters!</div>
                            <div className={styles.heading}>
                                <div className={styles.recommendation}>
                                    {text} {/* Updated text */}
                                </div>
                                <div className={styles.gettingStarted}>{uploadText}</div>
                            </div>
                        </div>

                        <div className={styles.lowerList}>
                            {!loading && (
                                <div className={styles.templateWrapper}>
                                    <div className={styles.templateInfo}>
                                        We've created a template to help you showcase your work with all the essentials for a comprehensive case study. Simply download the iRecruit Case Study Template.
                                    </div>
                                    <button className={styles.templateDownloadButton}>
                                        iRecruit Case Study Template
                                    </button>
                                </div>
                            )}

                            <div className={styles.uploadWrapper}>
                                <div className={styles.uploadHeading}>or Upload Case Study</div>
                                <div className={styles.uploadSection}>
                                    <div className={styles.dropYourFileContainer}>
                                        {loading ? (
                                            <div style={{ height: '241px', display: 'flex', alignContent: 'center', justifyContent: 'center', alignItems: 'center' }} className={styles.dropzoneWrapper}>
                                                <div className={styles.loaderWrapper}>
                                                    <p className={styles.uploadingText}>Uploading  files</p>
                                                    <div className={styles.loader}>
                                                        <div></div>
                                                        <div></div>
                                                        <div></div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className={styles.dropYourFileHereOrBrowse}>
                                                    <span className={styles.dropYourFile}>Drop your file here, </span>
                                                    <span className={styles.or}>or</span>
                                                    <span className={styles.browseFromDevice}>
                                                        <label htmlFor="file-upload" className={styles.browseLink}>
                                                            <span className={styles.span}> </span>
                                                            <span>browse from device</span>
                                                        </label>
                                                        <input
                                                            id="file-upload"
                                                            type="file"
                                                            style={{ display: "none" }}
                                                            onChange={handleFileUpload}
                                                        />
                                                    </span>
                                                </div>
                                                <p className={styles.blankLine}>
                                                    <span className={styles.blankLine1}>
                                                        <span>&nbsp;</span>
                                                    </span>
                                                </p>
                                                <p className={styles.or1}>or</p>
                                            </>
                                        )}
                                    </div>

                                    {!loading && (
                                        <>
                                            <div className={styles.secondaryButton}>
                                                <div className={styles.secondary}>Upload from G Drive</div>
                                            </div>

                                            <div className={styles.supportsDocxAndContainer}>
                                                <div className={styles.supportsDocxAnd}>Supports: Docx and Pdf</div>
                                                <div className={styles.sizeUpto10}>Size: up to 10 MB</div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className={styles.secondaryButtonParent}>
                    <div className={styles.secondaryButton} onClick={handleClose}>
                        <div className={styles.secondary}>Close</div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

CaseStudyUpload.propTypes = {
    className: PropTypes.string,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default CaseStudyUpload;
