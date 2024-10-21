import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./signUpMessage.module.css";
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
import { checkEmailConfirmation } from "../utils/util";

const SignUpMessage = () => {
  const [confirmationStatus, setConfirmationStatus] = useState(null); // Store confirmation status
  const [elapsedTime, setElapsedTime] = useState(0); // Track elapsed time for 5-minute limit
  const navigate = useNavigate();

  // Open Gmail in a new tab
  const openGmail = () => {
    window.open('https://mail.google.com', '_blank');
  };

  // Function to check email confirmation from the backend
//   const checkEmailConfirmation = async (email) => {
//     try {
//         // Make the request with the email dynamically passed
//         const response = await fetch(`http://localhost:8000/api/Check_Confirmation/?email=${email}`);

//         // If the response is not OK (i.e., status code not 2xx), throw an error
//         if (!response.ok) {
//             const errorData = await response.json();  // Extract the error details
//             throw new Error(JSON.stringify(errorData)); // Throw an error with the error details
//         }

//         // If the response is OK, parse the JSON body
//         const data = await response.json();
//         console.log("Success:", data);

//     } catch (error) {
//         // Handle both HTTP errors and network issues
//         try {
//             const errorObject = JSON.parse(error.message);  // Parse the error object from the error message
//             console.error("Error:", errorObject.message);
//             console.log("Full error data:", errorObject);
//         } catch (parseError) {
//             // Handle any parsing errors or network issues
//             console.error("Failed to parse error message:", error.message);
//         }
//     }
// };



  // Poll every 5 seconds to check the confirmation status
  useEffect(() => {
    const intervalId = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 5); // Increase time by 5 seconds
      checkEmailConfirmation(JSON.parse(localStorage.getItem('loginInformation'))?.data?.email);
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []);

  // Navigate based on confirmation status
  useEffect(() => {
    if (confirmationStatus === 'confirmed') {
      navigate('/login'); // Redirect to login page if confirmed
    } 
  }, [confirmationStatus, navigate]);

  // Navigate to expired page after 5 minutes if not confirmed
  useEffect(() => {
    if (elapsedTime >= 300 && confirmationStatus !== 'confirmed') { // 5 minutes (300 seconds)
      navigate('/login'); // Navigate to expired if not confirmed
    }
  }, [elapsedTime, confirmationStatus, navigate]);

  return (
    <div className={styles.b}>
      <Loading className={styles.loadingIcon} alt="" />
      <div className={styles.mainContent}>
        <div className={styles.irecruitLogoBigWrapper}>
          <div className={styles.irecruitLogoBig}>
            <Icon className={styles.symbolIcon} loading="lazy" alt="" />
            <div className={styles.logo}>
              <div className={styles.i}>
                <div className={styles.iChild} />
                <IconI className={styles.vectorIcon} loading="lazy" alt="" />
              </div>
              <div className={styles.recruit}>
                <IconR className={styles.vectorIcon1} loading="lazy" alt="" />
                <IconE className={styles.vectorIcon2} loading="lazy" alt="" />
                <IconC className={styles.vectorIcon3} loading="lazy" alt="" />
                <IconU className={styles.vectorIcon4} loading="lazy" alt="" />
                <IconR2 className={styles.vectorIcon5} loading="lazy" alt="" />
                <IconI2 className={styles.vectorIcon6} loading="lazy" alt="" />
                <IcontT className={styles.vectorIcon7} loading="lazy" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.newRegistrationEmailConfirm}>
          <div className={styles.description}>
            <div className={styles.description1}>New user Sign up</div>
            <h1 className={styles.description2}>Let’s get you started</h1>
          </div>
          <div className={styles.cts}>
            <div className={styles.description3}>
              <div className={styles.description4}>Sign up through email</div>
              <div className={styles.description5}>
                <p className={styles.weSentA}>We sent a confirmation to the email below.</p>
                <p className={styles.pleaseGoTo}>Please go to your Gmail account and confirm your account</p>
              </div>
              <div className={styles.description6}>
                {JSON.parse(localStorage.getItem('loginInformation'))?.data?.email}
              </div>
            </div>
            <div className={styles.textLink} onClick={openGmail}>
              <div className={styles.secondary}>Open Gmail account</div>
            </div>
            <div className={styles.description7}>
              <div className={styles.description8}>
                <p className={styles.signUpThrough}>Sign up through email</p>
                <p className={styles.giveItA}>Give it a couple of minutes</p>
                <p className={styles.makeSureYoure}>Make sure you’re using the above email</p>
                <p className={styles.checkYourSpam}>Check your spam folder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.descriptionWrapper}>
        <div className={styles.description9}>© 2024 iRecruit</div>
      </div>
    </div>
  );
};

export default SignUpMessage;
