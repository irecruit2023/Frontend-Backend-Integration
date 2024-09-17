import { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./primary-button1.module.css";

const PrimaryButton = ({
  className = "",
  propPadding,
  propAlignSelf,
  primary,
  propFontSize,
  propColor,
  propDisplay,
  propMinWidth,
  propTextDecoration,
  primaryButtonPosition,
  primaryButtonTop,
  primaryButtonLeft,
  primaryButtonWidth,
  primaryButtonHeight,
}) => {
  const primaryButtonStyle = useMemo(() => {
    return {
      padding: propPadding,
      alignSelf: propAlignSelf,
      position: primaryButtonPosition,
      top: primaryButtonTop,
      left: primaryButtonLeft,
      width: primaryButtonWidth,
      height: primaryButtonHeight,
    };
  }, [
    propPadding,
    propAlignSelf,
    primaryButtonPosition,
    primaryButtonTop,
    primaryButtonLeft,
    primaryButtonWidth,
    primaryButtonHeight,
  ]);

  const primaryStyle = useMemo(() => {
    return {
      fontSize: propFontSize,
      color: propColor,
      display: propDisplay,
      minWidth: propMinWidth,
      textDecoration: propTextDecoration,
    };
  }, [propFontSize, propColor, propDisplay, propMinWidth, propTextDecoration]);

  return (
    <div
      className={[styles.primaryButton, className].join(" ")}
      style={primaryButtonStyle}
    >
      <div className={styles.primary} style={primaryStyle}>
        {primary}
      </div>
    </div>
  );
};

PrimaryButton.propTypes = {
  className: PropTypes.string,
  primary: PropTypes.string,

  /** Style props */
  propPadding: PropTypes.any,
  propAlignSelf: PropTypes.any,
  propFontSize: PropTypes.any,
  propColor: PropTypes.any,
  propDisplay: PropTypes.any,
  propMinWidth: PropTypes.any,
  propTextDecoration: PropTypes.any,
  primaryButtonPosition: PropTypes.any,
  primaryButtonTop: PropTypes.any,
  primaryButtonLeft: PropTypes.any,
  primaryButtonWidth: PropTypes.any,
  primaryButtonHeight: PropTypes.any,
};

export default PrimaryButton;
