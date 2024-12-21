import SecondaryButton from "./secondary-button";
import styles from "./resume-analysis.module.css";
import dice from "../assets/images/dice.png"


const DescriptionAnalysis = ({ className = "", handleAfterAIAnalysis }) => {
    return (
        <div className={[styles.root, className].join(" ")}>
            <section className={styles.sitBackAndSeeTheMaParent}>
                <h3 className={styles.sitBack}>
                    Please, sit back and see the magic unfold!
                </h3>
                <div className={styles.thisShouldTakeContainer}>
                    <p className={styles.thisShouldTake}>This should take a moment.</p>
                    <p
                        className={styles.thisShouldTake}
                    >{`Please hold tight while our AI engine works its magic! 
In just a few minutes, we’ll thoroughly analyze your uploaded Job Description, ensuring it’s complete, optimized, and ready to attract top talent. 
 `}</p>
                    <div className="mt-2" style={{ fontSize: '15px', color: 'black' }}><b> Your perfect job post is almost there - thanks for your patience! </b></div>
                </div>
            </section>
            <div className={styles.secondaryButtonWrapper} onClick={handleAfterAIAnalysis}>
            </div>
            <img
                className={styles.screenrecording20240124at22Icon}
                // loading="lazy"
                alt=""
                src={dice}
            />
            <div className={styles.resumeAnalysisPoweredByIreWrapper}>
                <div className={styles.resumeAnalysisPowered}>
                    Resume analysis powered by iRecruit AI Engine
                </div>
            </div>
        </div>
    );
};


export default DescriptionAnalysis;
