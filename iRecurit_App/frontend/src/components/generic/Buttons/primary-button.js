import { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./primary-button.module.css";

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
  propTop,
  propWidth,
  propLeft,
  propHeight

}) => {
  const primaryButtonStyle = useMemo(() => {
    return {
      padding: propPadding,
      alignSelf: propAlignSelf,
      top : propTop,
      width : propWidth,
      left :propLeft,
      height: propHeight
    };
  }, [propPadding, propAlignSelf]);

  const primaryStyle = useMemo(() => {
    return {
      fontSize: propFontSize,
      color: propColor,
      display: propDisplay,
      minWidth: propMinWidth,
      textDecoration: propTextDecoration,
    };
  }, [propFontSize, propColor, propDisplay, propMinWidth, propTextDecoration,propTop, propWidth,propLeft]);

  return (
    <div
     style={primaryButtonStyle}
      className={[styles.primaryButton, className].join(" ")}
    >
      <div style={primaryStyle}  className={styles.primary} >
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
  propTop: PropTypes.any,
  propWidth: PropTypes.any,
  propLeft: PropTypes.any,

};

export default PrimaryButton;
