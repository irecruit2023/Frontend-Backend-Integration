import TopNavBar from "../components/top-nav-bar";
import styles from "./home.module.css";
import WelcomeHeader from "../components/welcome-header";
import { React, useState } from "react";
import InputField from "../components/input-field";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Ellipse1 } from "../assets/icons/ellipse-6.svg";
import { ReactComponent as Ellipse2 } from "../assets/icons/ellipse-5.svg";
import { ReactComponent as RightHomeIcon } from "../assets/icons/right.svg";

const Organization = () => {
  const [isPasswordUpdated, setPasswordUpdated] = useState(false); // Tracks whether the password was successfully submitted
  const navigate = useNavigate();

  const handlePasswordSubmit = () => {
    setPasswordUpdated(true); // Show the success message and new buttons
  };

  const handleConfirm = () => {
    navigate("/account"); // Navigate to the important details page
  };

  const handleSkip = () => {
    navigate("/account"); // Navigate to the main page
  };

  return (
    <div className={styles.root}>
      <TopNavBar userType="organization" />
      <main className={styles.contentContainerWrapper}>
        <section className={styles.contentContainer}>
          <WelcomeHeader userType="organization" />
          <div className={styles.benefitsContainerWrapper}>
            <div className={styles.benefitsContainer}>
              <div className={styles.unleashTheFullPotentialOfParent}>
                {!isPasswordUpdated ? (
                  <>
                    <h1 className={styles.unleashTheFull}>Change Password</h1>
                    <div
                      style={{
                        width: "100%",
                        maxWidth: "448px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "24px",
                      }}
                    >
                      <InputField
                        style={{ marginTop: "8px", height: "44px" }}
                        firstName="New Password"
                        name="password"
                        vectorIcon={true}
                        placeholder="password"
                      />
                      <InputField
                        firstName="Confirm Password"
                        style={{ marginTop: "8px", height: "44px" }}
                        name="password"
                        vectorIcon={true}
                        placeholder="confirm password"
                      />
                    </div>
                    <div className={styles.primaryButtonParent} style={{ marginTop: "24px" }}>
                      <div className={styles.primaryButton}>
                        <div className={styles.primary} style={{ cursor: "pointer" }}>
                          Cancel
                        </div>
                      </div>
                      <div className={styles.secondaryButton}>
                        <div
                          className={styles.secondary}
                          style={{ cursor: "pointer" }}
                          onClick={handlePasswordSubmit}
                        >
                          Submit
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h1 className={styles.unleashTheFull}>
                    Password Successfully Updated
                    </h1>
                    <p  style ={{fontSize:'27px', fontWeight:'600'}} className={styles.unleashTheFull}>
                    Next, please fill up mandatory company details
                    </p>
                    <div className={styles.primaryButtonParent} style={{ marginTop: "24px" }}>
                      <button
                        className={styles.primaryButton}
                        style={{ cursor: "pointer", border:'none', color:'white', maxHeight:'44px' }}
                        onClick={handleConfirm}
                      >
                        Confirm and Proceed
                      </button>
                      <button
                        className={styles.secondaryButton}
                        style={{ cursor: "pointer", maxHeight:'44px' }}
                        onClick={handleSkip}
                      >
                        Skip and fill later
                      </button>
                    </div>
                  </>
                )}
              </div>

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

export default Organization;
