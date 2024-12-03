import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField2 from "../components/input-field2";
import Cts from "../components/cts";
import InputField3 from "../components/input-field3";
import styles from "./signUp.module.css";
import { signup } from "../utils/util";
import { ReactComponent as Loading } from "../assets/icons/loading.svg";
import { ReactComponent as Icon } from "../assets/icons/symbol1.svg";
import { ReactComponent as IconI } from "../assets/icons/vector.svg";
import { ReactComponent as IconR } from "../assets/icons/vector-11.svg";
import { ReactComponent as IconE } from "../assets/icons/vector-21.svg";
import { ReactComponent as IconC } from "../assets/icons/vector-31.svg";
import { ReactComponent as IconU } from "../assets/icons/vector-41.svg";
import { ReactComponent as IconR2 } from "../assets/icons/vector-51.svg";
import { ReactComponent as IconI2 } from "../assets/icons/vector-61.svg";
import { ReactComponent as IcontT } from "../assets/icons/vector-71.svg";
import { Navigate } from "react-router-dom";




const SignUp = () => {
    const [formState, setFormState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        reEnterPassword: "",
    });
    const navigate = useNavigate();

    const handleChange = (e, fieldName) => {
        const { value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [fieldName]: value,
        }));
    };

    return (
        <div className={styles.a} >
            <Loading className={styles.loadingIcon} alt="" />
            <div className={styles.irecruitLogoBigWrapper} >
                <div className={styles.irecruitLogoBig}>
                    <Icon
                        className={styles.symbolIcon}
                        loading="lazy"
                        alt=""
                    />
                    <div className={styles.logo}>
                        <div className={styles.i}>
                            <div className={styles.iChild} />
                            <IconI
                                className={styles.vectorIcon}
                                loading="lazy"
                                alt=""

                            />
                        </div>
                        <div className={styles.recruit}>
                            <IconR
                                className={styles.vectorIcon1}
                                loading="lazy"
                                alt=""
                            />
                            <IconE
                                className={styles.vectorIcon2}
                                loading="lazy"
                                alt=""
                            />
                            <IconC
                                className={styles.vectorIcon3}
                                loading="lazy"
                                alt=""

                            />
                            <IconU
                                className={styles.vectorIcon4}
                                loading="lazy"
                                alt=""

                            />
                            <IconR2
                                className={styles.vectorIcon5}
                                loading="lazy"
                                alt=""

                            />
                            <IconI2
                                className={styles.vectorIcon6}
                                loading="lazy"
                                alt=""

                            />
                            <IcontT
                                className={styles.vectorIcon7}
                                loading="lazy"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.newSignUpForm} >
                <div className={styles.description}>
                    <div className={styles.deswcription}>New user Sign up</div>
                    <div className={styles.deswcription1}>Let’s get you started</div>
                </div>
                <div className={styles.body}>
                    <div className={styles.levelOne}>
                        <InputField2
                            firstName="First Name*"
                            value={formState.firstName}
                            placeholder="Enter your first name"
                            vectorIcon={false}
                            propAlignSelf="unset"
                            propFlex="1"
                            propMinWidth="151px"
                            onChange={(e) => handleChange(e, "firstName")}
                            name="firstName"
                        />
                        <InputField2
                            firstName="Last Name*"
                            value={formState.lastName}
                            placeholder="Enter your last name"
                            vectorIcon={false}
                            propAlignSelf="unset"
                            propFlex="1"
                            propMinWidth="151px"
                            onChange={(e) => handleChange(e, "lastName")}
                            name="lastName"
                        />
                    </div>
                    <InputField2
                        firstName="Email*"
                        value={formState.email}
                        placeholder="Enter your email"
                        vectorIcon={false}
                        propAlignSelf="stretch"
                        propFlex="unset"
                        propMinWidth="unset"
                        onChange={(e) => handleChange(e, "email")}
                        name="email"
                    />
                    <InputField2
                        firstName="Password"
                        value={formState.password}
                        placeholder="Enter your password"
                        vectorIcon
                        propAlignSelf="stretch"
                        propFlex="unset"
                        propMinWidth="unset"
                        onChange={(e) => handleChange(e, "password")}
                        name="password"
                    />
                    <InputField2
                        firstName="Re-enter Password"
                        value={formState.reEnterPassword}
                        placeholder="Re-enter your password"
                        vectorIcon
                        propAlignSelf="stretch"
                        propFlex="unset"
                        propMinWidth="unset"
                        onChange={(e) => handleChange(e, "reEnterPassword")}
                        name="reEnterPassword"
                    />
                </div>
                <Cts
                    primary="Sign up"
                    alreadyHaveAnAccount="Already have an account?"
                    login=" Login"
                    showDescription
                    propAlignSelf="stretch"
                    propWidth="unset"
                    formData={formState}
                />
            </div>
            <div className={styles.newSignUpFormParent} style={{ width: "996px" }}>
                <form className={styles.newSignUpForm1}>
                    <div style={{ width: '100%' }} className={styles.description1}>
                        <div className={styles.deswcription2}>New Recruiter Sign-up</div>
                        <h1 className={styles.deswcription3}>Hire your next great candidate</h1>
                    </div>
                    <div className={styles.body1}>
                        <div className={styles.levelOne1}>
                            <InputField3
                                firstName="Company Name*"
                                value={formState.firstName}
                                placeholder="Enter your company name"
                                onChange={(e) => handleChange(e, "firstName")}
                                name="firstName"
                            />
                            <InputField3
                                firstName="No. Of employee*"
                                placeholder="Number of employee"
                                value={formState.lastName}
                                onChange={(e) => handleChange(e, "lastName")}
                                name="lastName"
                            />
                        </div>

                        <div className={styles.levelOne1}>
                            <InputField3
                                firstName="Contact Person Name*"
                                value={formState.firstName}
                                placeholder="Enter your contact name"
                                onChange={(e) => handleChange(e, "firstName")}
                                name="firstName"
                            />
                            <InputField3
                                firstName="Email*"
                                value={formState.lastName}
                                placeholder="Enter your email "
                                onChange={(e) => handleChange(e, "lastName")}
                                name="lastName"
                            />
                        </div>

                        <div className={styles.levelOne1}>
                            <InputField3
                                firstName="Phone No.*"
                                value={formState.firstName}
                                placeholder="Enter your phone naumber"
                                onChange={(e) => handleChange(e, "firstName")}
                                name="firstName"
                            />
                            <InputField3
                                firstName="Position*"
                                value={formState.lastName}
                                placeholder="Your Postition"
                                onChange={(e) => handleChange(e, "lastName")}
                                name="lastName"
                            />
                        </div>
                        <div className={styles.levelOne1}>
                            <InputField3
                                firstName="Recruitment Timeframe*"
                                value={formState.firstName}
                                placeholder="Enter your company name"
                                onChange={(e) => handleChange(e, "firstName")}
                                name="firstName"
                            />
                            <div className={`mb-3 ${styles.inputGroup}`} style={{ width: '48%' }}>
                                <label className={`form-label ${styles.label}`} style={{ fontWeight: "500", gap: "var(--space-200)" }}>Prefered Time Slot*</label>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className="form-check form-check-inline" style={{ fontSize: "19px" }}>
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="fullTime"
                                            name="fullTime"
                                        // checked={jobType.fullTime}
                                        // onChange={handleJobTypeChange}
                                        />
                                        <label className="form-check-label" htmlFor="fullTime" style={{ fontSize: "1rem" }}>First Half</label>
                                    </div>
                                    <div className="form-check form-check-inline" style={{ fontSize: "19px" }}>
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="remote"
                                            name="remote"
                                        // checked={jobType.remote}
                                        // onChange={handleJobTypeChange}
                                        />
                                        <label className="form-check-label" htmlFor="remote" style={{ fontSize: "1rem" }}>Second Half</label>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div
                            className={styles.levelOne1}
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                alignItems: "flex-start",
                                gap: "20px",
                            }}
                        >
                            <div style={{ flex: "1 1 45%", padding: "0 10px", color: '#6e6e6e' }}>
                                <div>We assure you we will not spam your inbox</div>
                                <div>Already have a recruiters account? <span style={{ color: "#f2665d" }}>Login </span></div>
                            </div>
                            <div style={{ flex: "1 1 45%", display: "flex", justifyContent: "space-between", gap: "10px" }}>
                                <button className={` btn-block ${styles.primaryButton}`} style={{ flex: "1 1 48%", padding: "10px 20px" }} onClick={() => { navigate("/organization-thankyou") }}>
                                    Interested
                                </button>
                                <button className={` btn-block ${styles.secondaryButton}`} style={{ flex: "1 1 48%", padding: "10px 20px" }}  onClick={() => { navigate("/organization-thankyou") }} >
                                    Request Demo
                                </button>
                            </div>
                        </div>



                    </div>
                </form>
                <div className={styles.descriptionWrapper}>
                    <div className={styles.description2}>© 2024 iRecruit</div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
