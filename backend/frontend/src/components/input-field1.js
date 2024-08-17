import PropTypes from "prop-types";
import styles from "./input-field1.module.css";

const InputField1 = ({ className = "", firstName }) => {
  return (
    <div className={[styles.inputField, className].join(" ")}>
      <div className={styles.firstName}>{firstName}</div>
      <div className={styles.input}>
        <div className={styles.value}>Name</div>
        <img className={styles.vectorIcon} alt="" src="/vector1.svg" />
      </div>
      <div className={styles.error}>Error</div>
    </div>
  );
};

InputField1.propTypes = {
  className: PropTypes.string,
  firstName: PropTypes.string,
};

export default InputField1;
