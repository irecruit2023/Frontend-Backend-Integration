import React, { useState } from "react";
import styles from "./explore-job-modal.module.css";
import { useNavigate } from "react-router-dom";

const tags = {
  "Popular Tags": [
    "Data Science", "Full Stack Developer", "Reactjs", "Java",
    "UI/UX", "Generative AI", "Product Management", "Angular"
  ],
  "Location": [
    "Gurgaon", "Bengaluru", "Hyderabad", "Mumbai"
  ],
};

const jobTypes = {
  "Type": ["Full Time", "Part Time", "Work From Home", "Internship"]
};

const JobModal = ({ isOpen, setIsOpen }) => {
  if (!isOpen) return null;
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState({});

  const handleTagClick = (category, tag) => {
    setSelectedTags((prev) => ({
      ...prev,
      [`${category}-${tag}`]: !prev[`${category}-${tag}`], // Toggle selection
    }));
  };

  const getButtonWidth = (tag) => {
    const baseWidth = 80; // Minimum width
    const extraWidth = tag.length * 7; // Adjust width based on text length
    return `${baseWidth + extraWidth}px`;
  };

  const renderTags = (category, items) => (
    <>
      <span className={styles.text3}>{category}</span>
      {items.reduce((rows, tag, index) => {
        if (index % 4 === 0) rows.push([]);
        rows[rows.length - 1].push(tag);
        return rows;
      }, []).map((row, rowIndex) => (
        <div className={styles.rowView} key={rowIndex}>
          {row.map((tag, i) => {
            const isSelected = selectedTags[`${category}-${tag}`];

            return (
              <button
                key={i}
                className={styles.button}
                style={{
                  width: getButtonWidth(tag),
                  backgroundColor: isSelected ? "#FFECEB" : "#fff",
                  border: isSelected ? "1px solid #F2665D" : "1px solid #BBBBBB",
                  padding: "10px 15px",
                  fontSize: "14px",
                }}
                onClick={() => handleTagClick(category, tag)}
              >
                <span className={styles.text2}>{tag}</span>
              </button>
            );
          })}
        </div>
      ))}
    </>
  );

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.contain}>
          <div className={styles.scrollView}>
            <div className={styles.column}>
              <div className={styles.column2}>
                <span className={styles.text}>{"Explore Jobs"}</span>
                <span className={styles.text2}>
                  {"Select your preferences from a curated array of 3 to 5 tabs that pique your interest."}
                </span>
              </div>

              {Object.entries(tags).map(([category, items]) => renderTags(category, items))}
              {Object.entries(jobTypes).map(([category, items]) => renderTags(category, items))}

              <div className={styles.column3}>
                <div className={styles.rowView5}>
                  <button className={styles.cancelButton} onClick={() => setIsOpen(false)}>
                    <span className={styles.text5}>{"Cancel"}</span>
                  </button>
                  <button className={styles.proceedButton} onClick={() => navigate("/jobs-search")}>
                    <span className={styles.text6}>{"Proceed"}</span>
                  </button>
                </div>
                <div className={styles.box}></div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobModal;
