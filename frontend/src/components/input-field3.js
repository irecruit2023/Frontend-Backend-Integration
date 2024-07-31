import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./input-field3.module.css";

const InputField3 = ({ className = "", firstName, initialValue = "" }) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={[styles.inputField, className].join(" ")}>
      <div className={styles.firstName}>{firstName}</div>
      <div className={styles.input}>
        <input
          type="text"
          className={styles.value}
          value={value}
          onChange={handleChange}
          style={{ border: 'none', outline: 'none', width: '100%' }}
        />
        <img className={styles.vectorIcon} alt="" src="/vector1.svg" />
      </div>
      <div className={styles.error}>Error</div>
    </div>
  );
};

InputField3.propTypes = {
  className: PropTypes.string,
  firstName: PropTypes.string,
  initialValue: PropTypes.string,
};

export default InputField3;
