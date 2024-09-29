import PrimaryButton from "./primary-button"; // Ensure this is used or remove it if not needed
import PropTypes from "prop-types";
import styles from "./achievement-modal.module.css";
import React, { useState, useEffect } from 'react';


const Achievement = ({ className = "", isOpen, onClose }) => {
    const [objective, setObjective] = useState(
        "Built a new feature for a web app that improved user experience and increased usage by 20% Automated a key process that saved the team 10 hours of work each week. Fixed bugs that improved app performance and reduced crashes by 40%"
    );
    const [charCount, setCharCount] = useState(objective.length);
    const [currentIndex, setCurrentIndex] = useState(0);
    const items = [
        "“You actively contributed to a university tech club by brainstorming and building an innovative app, playing a key role in the development process and collaborating with peers to bring ideas to life”",
        "You led the organization and management of a major tech event at university, overseeing both technical support and logistics. Coordinated a team to ensure smooth event operations, set up hardware and software systems, and resolved technical issues in real-time.",
        "Text 3: Join us today!",
    ];


    if (!isOpen) return null;


    const handleInputChange = (e) => {
        const newValue = e.target.value;
        setObjective(newValue);
        setCharCount(newValue.length);
    };

    const handleSave = () => {
        // Logic to save the objective can go here
        console.log("Objective saved:", objective);
        onClose();
    };

    const handleClose = () => {
        // Call the parent onClose function to handle actual closing
        onClose();
    };


    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    };




    return (
        <div className={styles.modalOverlay}>
            <div className={[styles.modalContent, className].join(" ")}>
                <div className={styles.caseStudyContainer}>
                    <div className={styles.caseStudyContent}>
                        <div className={styles.upperMessage}>
                            <div className={styles.upperMessageHeading}>Time to brag a little</div>
                            <div className={styles.heading}>
                                <div className={styles.recommendation}>
                                    <div>Scratching your head on what to add?</div>
                                    No worries! Your achievements, your story! Few suggestions:
                                </div>
                                <div className={styles.gettingStarted}>Few suggestions</div>
                            </div>
                        </div>

                        <div className={styles.carousel}>
                            <div className={styles.carouselContent}>
                                <div className={styles.carouselItem} >
                                    {items[currentIndex]}
                                </div>
                            </div>
                            <div className="arrows">
                                <svg style ={{cursor:'pointer'}} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path onClick={prevSlide} d="M8.75 14L17.5 5.25L18.725 6.475L11.2 14L18.725 21.525L17.5 22.75L8.75 14Z" fill="#0A324C" />
                                </svg>

                                <svg style ={{cursor:'pointer'}} onClick={nextSlide} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.25 14L10.5 5.25L9.275 6.475L16.8 14L9.275 21.525L10.5 22.75L19.25 14Z" fill="#0A324C" />
                                </svg>

                            </div>
                        </div>

                        <div className={styles.objectiveContainer}>
                            <div className={styles.internshipworkExperienceWrapper}>
                                <div className={styles.internshipworkExperience}>
                                    Add Your Achievements
                                </div>
                            </div>
                            <section className={styles.frameParent}>
                                <textarea
                                    className={styles.frameWrapper} // Ensure styling in CSS
                                    value={objective}
                                    onChange={handleInputChange}
                                    rows="6"
                                    maxLength="1000"
                                    placeholder="Enter your objective here..."
                                />
                                <div className={styles.div}>{charCount}/1000</div>
                            </section>
                            <footer className={styles.secondaryButtonParent}>
                                <div className={styles.secondaryButton} onClick={onClose}>
                                    <div className={styles.secondary}>Cancel</div>
                                </div>
                                <PrimaryButton
                                    propPadding="7.5px 57px"
                                    propAlignSelf="unset"
                                    primary="Save"
                                    propFontSize="19px"
                                    propColor="#f5f5f5"
                                    propDisplay="inline-block"
                                    propMinWidth="48px"
                                    propTextDecoration="unset"
                                    primaryButtonPosition="unset"
                                    primaryButtonTop="unset"
                                    primaryButtonLeft="unset"
                                    primaryButtonWidth="unset"
                                    primaryButtonHeight="unset"
                                    onClick={handleSave} // Handle saving the objective
                                />
                            </footer>
                        </div>


                    </div>
                </div>

            </div>
        </div>
    );
};

Achievement.propTypes = {
    className: PropTypes.string,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Achievement;
