import PropTypes from "prop-types";
import styles from "./button-grid.module.css";
import { ReactComponent as  Iconjob } from "../assets/icons/iconjob-document.svg";
import { ReactComponent as  Iconblogs } from "../assets/icons/iconblogs.svg";
import { ReactComponent as  Iconevents } from "../assets/icons/iconevents.svg";


const ButtonGrid = ({
  className = "",
  description,
  description1,
  iconDocument,
  secondary,
  iconArrows,
  showIconJobDocument,
  iconEvents1,
  iconblogs1,
}) => {
  return (
    <div className={[styles.buttonGrid, className].join(" ")}>
      <div className={styles.content}>
        <div className={styles.content1}>
          <div className={styles.description}>
            <h1 className={styles.description1}>{description}</h1>
          </div>
          <div className={styles.cts}>
            <div className={styles.description2}>
              <div className={styles.description3}>{description1}</div>
            </div>
          </div>
        </div>
        <div className={styles.icon}>
          <img className={styles.icondocument} alt="" src={iconDocument} />
          {showIconJobDocument && (
            <Iconjob
              className={styles.iconjobDocument}
              loading="lazy"
              alt=""
            />
          )}
          {iconEvents1 && (
            <Iconevents className={styles.iconevents} alt="" />
          )}
          {iconblogs1 && (
            <Iconblogs className={styles.iconblogs} alt="" />
          )}
        </div>
      </div>
      <div className={styles.cts1}>
        <div className={styles.textLinkParent}>
          <div className={styles.textLink}>
            <div className={styles.secondary}>{secondary}</div>
          </div>
          <img className={styles.iconarrows} alt="" src={iconArrows} />
        </div>
      </div>
    </div>
  );
};

ButtonGrid.propTypes = {
  className: PropTypes.string,
  description: PropTypes.string,
  description1: PropTypes.string,
  iconDocument: PropTypes.string,
  secondary: PropTypes.string,
  iconArrows: PropTypes.string,
  showIconJobDocument: PropTypes.bool,
  iconEvents1: PropTypes.bool,
  iconblogs1: PropTypes.bool,
};

export default ButtonGrid;
