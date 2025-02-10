import React from "react";
import styles from "./explore-job-modal.module.css";
import { Navigate, useNavigate } from "react-router-dom";


const JobModal = ({ isOpen, setIsOpen }) => {
  if (!isOpen) return null;
  const navigate = useNavigate()

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.contain}>
          <div className={styles.scrollView}>
            <div className={styles.column}>
              <div className={styles.column2}>
                <span className={styles.text}>{"Explore Jobs"}</span>
                <span className={styles.text2}>
                  {
                    "Select your preferences from a curated array of 3 to 5 tabs that pique your interest."
                  }
                </span>
              </div>
              <span className={styles.text3}>{"Popular tags"}</span>
              <div className={styles.rowView}>
                <button className={styles.button} onClick={() => alert("Pressed!")}>
                  <span className={styles.text2}>{"Data Science"}</span>
                </button>
                <button className={styles.button2} onClick={() => alert("Pressed!")}>
                  <span className={styles.text2}>{"Full Stack Developer"}</span>
                </button>
                <button className={styles.button2} onClick={() => alert("Pressed!")}>
                  <span className={styles.text2}>{"Reactjs"}</span>
                </button>
                <button className={styles.button} onClick={() => alert("Pressed!")}>
                  <span className={styles.text2}>{"Data Science"}</span>
                </button>
                <button className={styles.button4} onClick={() => alert("Pressed!")}>
                  <span className={styles.text2}>{"Java"}</span>
                </button>
              </div>
              <div className={styles.rowView2}>
                <button className={styles.button5} onClick={() => alert("Pressed!")}>
                  <span className={styles.text2}>{"UI/UX"}</span>
                </button>
                <button className={styles.button6} onClick={() => alert("Pressed!")}>
                  <span className={styles.text2}>{"Generative AI"}</span>
                </button>
                <button className={styles.button7} onClick={() => alert("Pressed!")}>
                  <span className={styles.text2}>{"Product Management"}</span>
                </button>
                <button className={styles.button8} onClick={() => alert("Pressed!")}>
                  <span className={styles.text2}>{"Angular"}</span>
                </button>
                <button className={styles.button9} onClick={() => alert("Pressed!")}>
                  <span className={styles.text2}>{"Android Dev"}</span>
                </button>
              </div>
              <span className={styles.text3}>{"Location"}</span>
              <div className={styles.rowView3}>
                <button className={styles.button10} onClick={() => alert("Pressed!")}>
                  <span className={styles.text2}>{"Gurgaon"}</span>
                </button>
                <button className={styles.button11} onClick={() => alert("Pressed!")}>
                  <span className={styles.text2}>{"Bengaluru"}</span>
                </button>
                <button className={styles.button12} onClick={() => alert("Pressed!")}>
                  <span className={styles.text2}>{"Hyderabad"}</span>
                </button>
                <button className={styles.button13} onClick={() => alert("Pressed!")}>
                  <span className={styles.text2}>{"Mumbai"}</span>
                </button>
              </div>
              <span className={styles.text4}>{"Type"}</span>
              <div className={styles.rowView4}>
                <button className={styles.button14} onClick={() => alert("Pressed!")}>
                  <span className={styles.text2}>{"Full Time"}</span>
                </button>
                <button className={styles.button15} onClick={() => alert("Pressed!")}>
                  <span className={styles.text2}>{"Part Time"}</span>
                </button>
                <button className={styles.button16} onClick={() => alert("Pressed!")}>
                  <span className={styles.text2}>{"Work From Home"}</span>
                </button>
                <button className={styles.button17} onClick={() => alert("Pressed!")}>
                  <span className={styles.text2}>{"Internship"}</span>
                </button>
              </div>
              <div className={styles.column3}>
                <div className={styles.rowView5}>
                  <button className={styles.button18} onClick={ ()=>{setIsOpen(false)}}>
                    <span className={styles.text5}>{"Cancel"}</span>
                  </button>
                  <button className={styles.button19} onClick={() => navigate("/jobs-search")}>
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
