import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./jobs-template.style.module.css";  // Import custom CSS module

import TopNavBar from "../components/top-nav-bar";
import WelcomeHeader from "../components/welcome-header";

import { ReactComponent as Ellipse1 } from "../assets/icons/ellipse-6.svg";
import { ReactComponent as Ellipse2 } from "../assets/icons/ellipse-5.svg";
import { ReactComponent as RightHomeIcon } from "../assets/icons/right.svg";

const JobDescriptionTemplate = () => {
    const [isPasswordUpdated, setPasswordUpdated] = useState(false);
    const [jobTitle, setJobTitle] = useState("");
    const [jobType, setJobType] = useState({ fullTime: false, remote: false });
    const [location, setLocation] = useState({ country: "", city: "", state: "" });
    const [rolesResponsibility, setRolesResponsibility] = useState("");
    const [eligibilities, setEligibilities] = useState("");
    const [requiredSkills, setRequiredSkills] = useState("");
    const [highlights, setHighlights] = useState("");
    const [aboutCompany, setAboutCompany] = useState("");

    const navigate = useNavigate();

    const handlePasswordSubmit = () => {
        setPasswordUpdated(true);
    };

    const handleConfirm = () => {
        navigate("/important-details");
    };

    const handleSkip = () => {
        navigate("/main");
    };

    const handleJobTypeChange = (e) => {
        setJobType({ ...jobType, [e.target.name]: e.target.checked });
    };

    const handleLocationChange = (e) => {
        setLocation({ ...location, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Form submitted successfully!");
        // Perform form submission logic here
    };


    return (
        <div className={styles.root}>

            <TopNavBar userType="template" />
            <main className={styles.contentContainerWrapper}>
                <section className={styles.contentContainer}>
                    <WelcomeHeader userType="template" />
                    <div className={styles.benefitsContainerWrapper}>
                        <div className={styles.benefitsContainer}>

                            {/* <div className={styles.unleashTheFullPotentialOfParent}> */}
                            <div className={`container mt-4 ${styles.formContainer}`}>
                                <div className={`p-4 mb-3 ${styles.header}`}>Job Description</div>
                                <form className={`p-4 ${styles.form}`}>
                                    {/* Job Title */}
                                    <div className={`mb-3 ${styles.inputGroup}`}>
                                        <label htmlFor="jobTitle" className={`form-label ${styles.label}`}>Job Title</label>
                                        <input
                                            type="text"
                                            className={`form-control ${styles.input}`}
                                            id="jobTitle"
                                            value={jobTitle}
                                            onChange={(e) => setJobTitle(e.target.value)}
                                            required
                                        />
                                    </div>

                                    {/* Job Type */}
                                    <div className={`mb-3 ${styles.inputGroup}`}>
                                        <label className={`form-label ${styles.label}`}>Job Type</label>
                                        <div>
                                            <div className="form-check form-check-inline" style={{ fontSize: "19px" }}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="fullTime"
                                                    name="fullTime"
                                                    checked={jobType.fullTime}
                                                    onChange={handleJobTypeChange}
                                                />
                                                <label className="form-check-label" htmlFor="fullTime">Full-Time</label>
                                            </div>
                                            <div className="form-check form-check-inline" style={{ fontSize: "19px" }}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="remote"
                                                    name="remote"
                                                    checked={jobType.remote}
                                                    onChange={handleJobTypeChange}
                                                />
                                                <label className="form-check-label" htmlFor="remote">Remote</label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div className={`mb-3 ${styles.inputGroup}`}>
                                        <label className={`form-label ${styles.label}`}>Location</label>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <input
                                                    type="text"
                                                    className={`form-control ${styles.input}`}
                                                    placeholder="Country"
                                                    name="country"
                                                    value={location.country}
                                                    onChange={handleLocationChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <input
                                                    type="text"
                                                    className={`form-control ${styles.input}`}
                                                    placeholder="City"
                                                    name="city"
                                                    value={location.city}
                                                    onChange={handleLocationChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <input
                                                    type="text"
                                                    className={`form-control ${styles.input}`}
                                                    placeholder="State"
                                                    name="state"
                                                    value={location.state}
                                                    onChange={handleLocationChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Roles and Responsibilities */}
                                    <div className={`mb-3 ${styles.inputGroup}`}>
                                        <label htmlFor="rolesResponsibility" className={`form-label ${styles.label}`}>Roles and Responsibilities</label>
                                        <textarea
                                            className={`form-control ${styles.textarea}`}
                                            id="rolesResponsibility"
                                            rows="4"
                                            value={rolesResponsibility}
                                            onChange={(e) => setRolesResponsibility(e.target.value)}
                                            required
                                        ></textarea>
                                    </div>

                                    {/* Eligibilities */}
                                    <div className={`mb-3 ${styles.inputGroup}`}>
                                        <label htmlFor="eligibilities" className={`form-label ${styles.label}`}>Eligibilities</label>
                                        <textarea
                                            className={`form-control ${styles.textarea}`}
                                            id="eligibilities"
                                            rows="4"
                                            value={eligibilities}
                                            onChange={(e) => setEligibilities(e.target.value)}
                                            required
                                        ></textarea>
                                    </div>

                                    {/* Required Skills */}
                                    <div className={`mb-3 ${styles.inputGroup}`}>
                                        <label htmlFor="requiredSkills" className={`form-label ${styles.label}`}>Required Skills</label>
                                        <textarea
                                            className={`form-control ${styles.textarea}`}
                                            id="requiredSkills"
                                            rows="4"
                                            value={requiredSkills}
                                            onChange={(e) => setRequiredSkills(e.target.value)}
                                            required
                                        ></textarea>
                                    </div>

                                    {/* Highlights */}
                                    <div className={`mb-3 ${styles.inputGroup}`}>
                                        <label htmlFor="highlights" className={`form-label ${styles.label}`}>Highlights</label>
                                        <textarea
                                            className={`form-control ${styles.textarea}`}
                                            id="highlights"
                                            rows="4"
                                            value={highlights}
                                            onChange={(e) => setHighlights(e.target.value)}
                                            required
                                        ></textarea>
                                    </div>

                                    {/* About Company */}
                                    <div className={`mb-3 ${styles.inputGroup}`}>
                                        <label htmlFor="aboutCompany" className={`form-label ${styles.label}`}>About Company</label>
                                        <textarea
                                            className={`form-control ${styles.textarea}`}
                                            id="aboutCompany"
                                            rows="4"
                                            value={aboutCompany}
                                            onChange={(e) => setAboutCompany(e.target.value)}
                                            required
                                        ></textarea>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="mt-4 d-flex justify-content-between">
                                        <button type="submit" className={`btn btn-primary ${styles.button}`}>Confirm & Proceed</button>
                                    </div>
                                </form>
                            </div>
                            {/* </div> */}
                            <div className={styles.vectorParent}>
                                <Ellipse2 className={styles.frameChild} alt="" />
                                <Ellipse1 className={styles.frameItem} alt="" />
                                <RightHomeIcon className={styles.rightIcon} loading="lazy" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className={styles.footerText}>
                        <div className={styles.description}>© 2024 iRecruit</div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default JobDescriptionTemplate;

