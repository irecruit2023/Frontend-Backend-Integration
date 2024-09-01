import { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./search.module.css";

const Search = ({ className = "", propAlignSelf, propWidth }) => {
  const searchStyle = useMemo(() => {
    return {
      alignSelf: propAlignSelf,
      width: propWidth,
    };
  }, [propAlignSelf, propWidth]);

  return (
    <div className={[styles.search, className].join(" ")} style={searchStyle}>
      <div className={styles.input}>
        <a className={styles.search1}>Search</a>
        <img className={styles.iconsearch} alt="" src="/iconsearch.svg" />
      </div>
    </div>
  );
};

Search.propTypes = {
  className: PropTypes.string,

  /** Style props */
  propAlignSelf: PropTypes.any,
  propWidth: PropTypes.any,
};

export default Search;
