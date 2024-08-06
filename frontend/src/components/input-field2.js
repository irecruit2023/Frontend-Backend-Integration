import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./input-field2.module.css";

const InputField2 = ({
  className = "",
  firstName,
  initialValue = "",
  placeholder = "",
  vectorIcon,
  propAlignSelf,
  propFlex,
  propMinWidth,
  onChange, // Receive onChange prop
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

  // Handle change using onChange prop
  const handleChange = (e) => {
    setValue(e.target.value);
    if (onChange) {
      onChange(e); // Pass the event object to parent's onChange handler
    }
  };

  const handleIconClick = () => {
    setShowPassword((prevState) => !prevState); // Toggle password visibility
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
          style={{ border: "none", outline: "none", width: "100%" }}
          value={value}
          placeholder={placeholder} // Add placeholder here
          onChange={handleChange} // Use the handleChange function
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
  placeholder: PropTypes.string,
  vectorIcon: PropTypes.bool,

  /** Style props */
  propAlignSelf: PropTypes.any,
  propFlex: PropTypes.any,
  propMinWidth: PropTypes.any,

  onChange: PropTypes.func, // Define onChange prop as a function
};

export default InputField2;
