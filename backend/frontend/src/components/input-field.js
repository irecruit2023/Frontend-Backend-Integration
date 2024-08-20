import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./input-field.module.css";

const InputField = ({ className = "", firstName,  initialValue = "", onChange, vectorIcon, placeholder }) => {
  const [value, setValue] = useState(initialValue)
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  const handleChange = (e) => {
    setValue(e.target.value);
    if(onChange)
    {
      onChange(e)
    }
  };

  const handleIconClick = () => {
    setShowPassword(prevState => !prevState); // Toggle password visibility
  };

  return (
    <div className={[styles.inputField, className].join(" ")}>
      <div className={styles.firstName}>{firstName}</div>
      <div className={styles.input}>
        <input
          type={!vectorIcon || showPassword ? "text" : "password"} // Use 'text' if vectorIcon is present and password is to be shown
          style={{ border: 'none', outline: 'none', width: "100%" }}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
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

InputField.propTypes = {
  className: PropTypes.string,
  firstName: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,  // Making value a required prop
  onChange: PropTypes.func.isRequired, // Making onChange a required prop
  vectorIcon: PropTypes.bool,
};

export default InputField;
