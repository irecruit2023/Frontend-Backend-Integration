import PropTypes from "prop-types";
import styles from "./content-container.module.css";
import { ReactComponent as  Vector } from "../assets/icons/vector-12.svg";
import manPic from '../assets/icons/man-top@2x.png'

const ContentContainer = ({ className = "" }) => {
  return (
    <div className={[styles.contentContainer, className].join(" ")}>
      <div className={styles.content}>
        <h1 className={styles.helloVidhi}>Hello {JSON.parse(localStorage.loginInformation).data.name}!</h1>
        <h1 className={styles.embarkOnThe}>
          Embark on the road to your future, where each step marks the unfolding
          of limitless possibilities from this starting point.
        </h1>
        <div className={styles.manImageContainer}>
          <div className={styles.wrapperVector12}>
            <Vector
              className={styles.wrapperVector12Child}
              alt=""
            />
          </div>
          <img
            className={styles.manTopIcon}
            loading="lazy"
            alt=""
            src={manPic}
          />
        </div>
        <div className={styles.ofCandidatesWhoCompletedThWrapper}>
          <div className={styles.ofCandidatesWho}>
            88% of candidates who completed their profiles discovered a brighter
            career path.
          </div>
        </div>
      </div>
    </div>
  );
};

ContentContainer.propTypes = {
  className: PropTypes.string,
};

export default ContentContainer;
