import { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./secondary-button.module.css";

const SecondaryButton = ({
  className = "",
  secondary,
  secondaryFontWeight,
  secondaryButtonBackgroundColor,
  secondaryColor,
  secondaryButtonPadding,
  secondaryButtonAlignSelf,
  secondaryDisplay,
  secondaryMinWidth,
  secondaryButtonTop,
  secondaryButtonWidth,
  secondaryButtonLeft,
  secondaryButtonHeight
}) => {
  const secondaryStyle = useMemo(() => {
    return {
      fontWeight: secondaryFontWeight,
      color: secondaryColor,
      display: secondaryDisplay,
      minWidth: secondaryMinWidth,
    };
  }, [
    secondaryFontWeight,
    secondaryColor,
    secondaryDisplay,
    secondaryMinWidth,
  ]);

  const secondaryButtonStyle = useMemo(() => {
    return {
      backgroundColor: secondaryButtonBackgroundColor,
      padding: secondaryButtonPadding,
      alignSelf: secondaryButtonAlignSelf,
      top:  secondaryButtonTop,
      width: secondaryButtonWidth,
      left: secondaryButtonLeft,
      height:secondaryButtonHeight,
    };
  }, [
    secondaryButtonBackgroundColor,
    secondaryButtonPadding,
    secondaryButtonAlignSelf,
    secondaryButtonTop,
    secondaryButtonWidth,
    secondaryButtonLeft,
  ]);

  return (
     <div
      style={secondaryButtonStyle}
      className={[styles.secondaryButtonProfile, className].join(" ")}
    >
      <div className={styles.secondary} style={secondaryStyle}>
        {secondary}
      </div>
    </div>
  );
};

SecondaryButton.propTypes = {
  className: PropTypes.string,
  secondary: PropTypes.string,

  /** Style props */
  secondaryFontWeight: PropTypes.any,
  secondaryButtonBackgroundColor: PropTypes.any,
  secondaryColor: PropTypes.any,
  secondaryButtonPadding: PropTypes.any,
  secondaryButtonAlignSelf: PropTypes.any,
  secondaryDisplay: PropTypes.any,
  secondaryMinWidth: PropTypes.any,
};

export default SecondaryButton;
