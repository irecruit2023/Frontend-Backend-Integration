import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./input-field2.module.css";

const InputField2 = ({
  className = "",
  firstName,
  initialValue = "",
  vectorIcon,
  propAlignSelf,
  propFlex,
  propMinWidth,
}) => {
  const [value, setValue] = useState(initialValue);
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  const inputFieldStyle = useMemo(() => {
    return {
      alignSelf: propAlignSelf,
      flex: propFlex,
      minWidth: propMinWidth,
    };
  }, [propAlignSelf, propFlex, propMinWidth]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleIconClick = () => {
    setShowPassword(prevState => !prevState); // Toggle password visibility
  };

  return (
    <div
      className={[styles.inputField, className].join(" ")}
      style={inputFieldStyle}
    >
      <div className={styles.firstName}>{firstName}</div>
      <div className={styles.input}>
        <input
          type={!vectorIcon || showPassword ? "text" : "password"} // Use 'text' if vectorIcon is present and password is to be shown
          style={{ border: 'none', outline: 'none', width: '100%' }}
          value={value}
          onChange={handleChange}
        />
        {vectorIcon && (
          <img
            className={styles.vectorIcon}
            alt="Toggle visibility"
            src="/vector1.svg"
            onClick={handleIconClick} // Add click handler
          />
        )}
      </div>
      <div className={styles.error}>Error</div>
    </div>
  );
};

InputField2.propTypes = {
  className: PropTypes.string,
  firstName: PropTypes.string,
  initialValue: PropTypes.string,
  vectorIcon: PropTypes.bool,

  /** Style props */
  propAlignSelf: PropTypes.any,
  propFlex: PropTypes.any,
  propMinWidth: PropTypes.any,
};

export default InputField2;
