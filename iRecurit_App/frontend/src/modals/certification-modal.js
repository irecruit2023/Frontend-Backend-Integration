
import PropTypes from "prop-types";
import styles from "./certification-modal.module.css";
import { useState } from "react";

const ObjectiveModal = ({ className = "", isOpen, onClose }) => {


    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={[styles.modalContent, className].join(" ")}>

                <div className={styles.certificationsContainer} >
                    <div className={styles.certificationsContent}>
                    <div  className={styles.upperMessage}>

                        <div className ={styles.certificationHeading}>No certifications yet?</div>
                        <div className={styles.heading}>
                        <div className ={styles.certificationSub1Heading} >No worries! We've got a list to get you started.</div>
                        <div className={styles.certificationSub2Heading}> Recommended certifications list</div>
                        </div>
                    </div>

                    <div  className={styles.lowerList}>

                        <ul>
                            <li className= {styles.items}>Certified Secure Software Lifecycle Professional</li>
                            <li  className= {styles.items}>Certified Software Engineer</li>
                            <li className= {styles.items}>Certified Scrum Developer</li>
                            <li className= {styles.items}>Microsoft Azure certifications</li>
                            <li className= {styles.items}>Microsoft Azure Fundamentals</li>
                        </ul>
                    </div>
                    </div>
                </div>


                    <footer className={styles.secondaryButtonParent}>
                        <div className={styles.secondaryButton} onClick={onClose}>
                            <div className={styles.secondary}>Cancel</div>
                        </div>
                    </footer>
            </div>
        </div>
    );
};

ObjectiveModal.propTypes = {
    className: PropTypes.string,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ObjectiveModal;

