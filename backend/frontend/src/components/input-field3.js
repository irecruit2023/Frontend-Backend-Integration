import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./input-field3.module.css";
import { ReactComponent as  ToggleIcon } from "../assets/icons/vector1.svg";


const InputField3 = ({
  className = "",
  firstName,
  initialValue = "",
  placeholder = "",
  onChange, // Receive onChange prop
}) => {
  const [value, setValue] = useState(initialValue);

  // Handle change using onChange prop
  const handleChange = (e) => {
    setValue(e.target.value);
    if (onChange) {
      onChange(e); // Pass the event object to parent's onChange handler
    }
  };

  return (
    <div className={[styles.inputField, className].join(" ")}>
      <div className={styles.firstName}>{firstName}</div>
      <div className={styles.input}>
        <input
          type="text"
          className={styles.value}
          value={value}
          placeholder={placeholder} // Add placeholder here
          onChange={handleChange}
          style={{ border: 'none', outline: 'none', width: '100%' }}
        />
        <ToggleIcon className={styles.vectorIcon} alt="" />
      </div>
      <div className={styles.error}>Error</div>
    </div>
  );
};

InputField3.propTypes = {
  className: PropTypes.string,
  firstName: PropTypes.string,
  initialValue: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func, // Define onChange prop as a function
};

export default InputField3;
