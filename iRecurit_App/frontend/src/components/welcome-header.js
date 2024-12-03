import { React, useState } from 'react';
import styles from "./welcome-header.module.css";





const WelcomeHeader = ({ userType = "user" }) => {
    console.log(userType)

    const messages = {
        user: {
            greeting: `Hello ${JSON.parse(localStorage.loginInformation).data.name}, and welcome to iRecruit!`,
            description: [
                "This platform is your gateway to countless opportunities, crafted to help you showcase your skills and find your dream career.",
                "Together, let's embark on this journey, where your talent meets its destiny in the sprawling landscape of opportunities.",
            ],
        },
        organization: {
            greeting: `Hello and welcome to iRecruit`,
            description: [
                "Welcome aboard! Our platform is your gateway to a universe of possibilities, crafted to celebrate the unique skills and passions that set them apart. Together, let's navigate this journey where you find talents that are perfect match in a world full of opportunities..",
            ],
        },
        jobs: {
            greeting: `Job`,
            description: [
                `
    Our portal streamlines the hiring process, offering a seamless way to add job opportunities and attract the perfect candidate—faster, simpler, and more effectively.<br><br>

    Choose to upload your job description as a PDF or build it out using our intuitive template with ready-to-go sections. With our tools, you’ll be set up to connect with top talent effortlessly!<br><br>

    Next - Our advanced AI Engine verifies and validates your submission to ensure all required sections are present, so only complete, high-quality job descriptions are posted—enhancing your listing's appeal and attracting better candidate responses. If any details are missing, you’ll be notified instantly, giving you the chance to fine-tune your JD for maximum impact.
  `,
            ],
        },

        account: {
            greeting: `Account`,
            description: [
                `Please review the details and confirm if everything is accurate, or make any necessary updates where needed.`,
            ],
        },
        template: {
            greeting: `Template - Job Description`,
            description: [
                `Our template guides you through key sections to create a clear, complete job post effortlessly.`,
            ],
        },
    };

    return (
        <div className={styles.content}>
        <h2 className={styles.WelcomeContainer}>
            {messages[userType].greeting}
        </h2>
        <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: messages[userType].description }}
        />
    </div>

    );
};

export default WelcomeHeader;
