import { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./secondary-button.module.css";

const SecondaryButton = ({
  className = "",
  secondary,
  secondaryFontWeight,
  secondaryButtonBackgroundColor,
  secondaryColor,
}) => {
  const secondary1Style = useMemo(() => {
    return {
      fontWeight: secondaryFontWeight,
      color: secondaryColor,
    };
  }, [secondaryFontWeight, secondaryColor]);

  const secondaryButtonStyle = useMemo(() => {
    return {
      backgroundColor: secondaryButtonBackgroundColor,
    };
  }, [secondaryButtonBackgroundColor]);

  return (
    <div
      className={[styles.secondaryButton, className].join(" ")}
      style={secondaryButtonStyle}
    >
      <div className={styles.secondary} style={secondary1Style}>
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
};

export default SecondaryButton;
