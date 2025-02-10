import React, { useState } from "react";
import styles from "./job-details-edit.module.css";
import TopNavBar from "../components/top-nav-bar";

export default (props) => {
  const [input1, onChangeInput1] = useState('');
  const [input2, onChangeInput2] = useState('');
  const [input3, onChangeInput3] = useState('');
  const [input4, onChangeInput4] = useState('');
  const [input5, onChangeInput5] = useState('');
  const [input6, onChangeInput6] = useState('');

  return (
    <div className={styles.contain}>
      <div className={styles["scroll-view"]}>
        <TopNavBar />
        <div className={styles.box2}></div>
        <div className={styles["row-view5"]}>
          <div className={styles.column2}>
            <span className={styles.text10}>Job Description - Sr. Software Engineer 2024</span>
            <span className={styles.text11}>Tesla - Gurugram, Haryana</span>
            <span className={styles.text12}>Job ID - TS02345 | Full–time | Department - IT Software</span>
          </div>
          <div className={styles.view2}>
            {/* <svg width="255" height="113" viewBox="0 0 255 113" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 16C0 7.16344 7.16344 0 16 0H239C247.837 0 255 7.16344 255 16V97C255 105.837 247.837 113 239 113H16C7.16344 113 0 105.837 0 97V16Z" fill="white" />
              <g clip-path="url(#clip0_1148_2799)">
                <path d="M127 35.4836L134.842 25.8981C134.842 25.8981 148.275 26.1831 161.661 32.4056C158.234 37.5879 151.432 40.1244 151.432 40.1244C150.973 35.5715 147.784 34.46 137.64 34.46L127.002 94.5024L116.291 34.4481C106.221 34.4481 103.032 35.562 102.573 40.1125C102.573 40.1125 95.7688 37.6021 92.344 32.4175C105.727 26.195 119.163 25.91 119.163 25.91L127.005 35.4836H126.993H127ZM127 23.1384C137.811 23.0386 150.194 24.808 162.872 30.3489C164.568 27.2804 165 25.9337 165 25.9337C151.147 20.4404 138.17 18.5499 127 18.5C115.83 18.5499 102.853 20.4309 89 25.9337C89 25.9337 89.6175 27.6034 91.128 30.3631C103.808 24.7961 116.189 23.041 127 23.1265V23.1384Z" fill="#FF2715" />
              </g>
              <defs>
                <clipPath id="clip0_1148_2799">
                  <rect width="76" height="76" fill="white" transform="translate(89 18.5)" />
                </clipPath>
              </defs>
            </svg> */}

          </div>
        </div>

        <>
          <div className={styles.box2}></div>
          <span className={styles.text13}>Description</span>
          <textarea
           readOnly
          style={{
            border: "none",
            outline: "none",
            resize: "none",
            width: "90%",
            boxShadow:'none',
            background: "transparent",
            whiteSpace: "pre-wrap", // Ensures text wraps properly
            wordBreak: "break-word", // Prevents overflow
        
          }}
            placeholder={"We are looking for a Sr. App  developer skilled in building performant mobile apps on both the iOS and Android platforms. You will be responsible for developing  cross-platform mobile applications using the React Native, Flutter  framework, as well as coordinating with the client with the daily  updates on the technical tickets. Building a product is a highly  collaborative effort, and as such, a strong team player with a commitment to perfection is required."}
            value={input2}
            onChange={(event) => onChangeInput2(event.target.value)}
            className={styles.input2}
          />
          <span className={styles.text13}>Roles & Responsibilities</span>
          <textarea
            placeholder={"• Build pixel-perfect UIs..."}
            value={input3}
            readOnly
            style={{
              border: "none",
              outline: "none",
              resize: "none",
              width: "90%",
              boxShadow:'none',
              background: "transparent",
              whiteSpace: "pre-wrap", // Ensures text wraps properly
              wordBreak: "break-word", // Prevents overflow
          
            }}
            onChange={(event) => onChangeInput3(event.target.value)}
            className={styles.input3}
          />
          <span className={styles.text13}>Eligibilities</span>
          <textarea
            placeholder={"Proven track record of shipping software..."}
            value={input4}
            readOnly
            style={{
              border: "none",
              outline: "none",
              resize: "none",
              width: "90%",
              boxShadow:'none',
              background: "transparent",
              whiteSpace: "pre-wrap", // Ensures text wraps properly
              wordBreak: "break-word", // Prevents overflow
          
            }}
            onChange={(event) => onChangeInput4(event.target.value)}
            className={styles.input4}
          />
          <span className={styles.text14}>Required Skills</span>
          <textarea
            placeholder={"• Experience with Flutter framework..."}
            value={input5}
            readOnly
            style={{
              border: "none",
              outline: "none",
              resize: "none",
              width: "90%",
              boxShadow:'none',
              background: "transparent",
              whiteSpace: "pre-wrap", // Ensures text wraps properly
              wordBreak: "break-word", // Prevents overflow
          
            }}
            onChange={(event) => onChangeInput5(event.target.value)}
            className={styles.input3}
          />
          <span className={styles.text15}>About Company</span>
          <textarea
            placeholder={"Headquartered in Austin, Texas..."}
            value={input6}
            readOnly
            style={{
              border: "none",
              outline: "none",
              resize: "none",
              width: "90%",
              boxShadow:'none',
              background: "transparent",
              whiteSpace: "pre-wrap", // Ensures text wraps properly
              wordBreak: "break-word", // Prevents overflow
          
            }}
            onChange={(event) => onChangeInput6(event.target.value)}
            className={styles.input5}
          />
        </>
        <div className={styles["row-view7"]}>
          <button className={styles.button2} onClick={() => alert("Pressed!")}>Save and publish later</button>
          <button className={styles.button3} onClick={() => alert("Pressed!")}>Confirm and publish now</button>
        </div>


      </div>
    </div>
  );
};