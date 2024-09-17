// src/Confirmation.js
import React from 'react';
import styles from  './delete-confirmation.module.css';

const Confirmation = () => {
    return (
        <div  className={styles.confirmationContainer}  >
            <div className ={styles.confirmationContent}>
                <div className="icon-container">
                    <span className="checkmark"><svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M32 4C26.4621 4 21.0486 5.64217 16.444 8.71885C11.8395 11.7955 8.25064 16.1685 6.13139 21.2849C4.01213 26.4012 3.45764 32.0311 4.53802 37.4625C5.61841 42.894 8.28515 47.8831 12.201 51.799C16.1169 55.7149 21.106 58.3816 26.5375 59.462C31.969 60.5424 37.5988 59.9879 42.7151 57.8686C47.8315 55.7494 52.2045 52.1605 55.2812 47.556C58.3578 42.9514 60 37.5379 60 32C60 24.5739 57.05 17.452 51.799 12.201C46.548 6.94999 39.4261 4 32 4ZM28 43.1816L18 33.1816L21.1812 30L28 36.8184L42.82 22L46.0114 25.1718L28 43.1816Z" fill="#52BB77" />
                    </svg>

                    </span>
                </div>

                <div className ={styles.confirmationMessage} >
                <div  className ={styles.confirmationTitle}>Confirmation</div>
                <div className={styles.confirmationWrapper}>
                <div className={styles.confirmationSummary}>Achievements card removed successfully</div>
                <p  className ={styles.undo}>
                    click to <span className ={styles.undoLink} >undo</span>
                </p>
            </div>
            </div>
            </div>
        </div>
    );
};

export default Confirmation;