import React, { useState } from "react";
import styles from "./job-details.module.css";
import TopNavBar from "../components/top-nav-bar";
import { Navigate, useNavigate } from "react-router-dom";

export default (props) => {
  const [input1, onChangeInput1] = useState("");
  const [input2, onChangeInput2] = useState("");
  const [input3, onChangeInput3] = useState("");
  const [input4, onChangeInput4] = useState("");
  const [input5, onChangeInput5] = useState("");

  const navigate = useNavigate()

  return (
    <div className={styles.contain}>
      <div className={styles.scrollView}>
        <TopNavBar />
        <div className={styles.box2}></div>
        <div className={styles.rowView3}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.24645 11.6464L15.3429 5.55L15 5.20711L8.20711 12L15 18.7929L15.3429 18.45L9.24645 12.3536L8.89289 12L9.24645 11.6464Z" fill="#F2665D" stroke="#F2665D" />
          </svg>

          <span className={styles.text6} style={{cursor:'pointer'}} onClick={()=>{navigate('/jobs-search')}}>{"back to all jobs"}</span>
          <div className={styles.box}></div>
          <button className={styles.button2} onClick={() => alert("Pressed!")}>
            <span className={styles.text7}>{"Apply Now"}</span>
          </button>
        </div>
        <div className={styles.rowView4}>
          <div className={styles.column}>
            <span className={styles.text8}>
              {"Job Description - Software Engineer 2024"}
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.1738 4H10.8142C8.52516 4 6.66602 6.08733 6.66602 8.63051V25.5331C6.66602 27.6924 8.05231 28.6041 9.75026 27.5604L14.9946 24.3094C15.5534 23.9616 16.4561 23.9616 17.0041 24.3094L22.2484 27.5604C23.9464 28.6161 25.3327 27.7044 25.3327 25.5331V8.63051C25.3219 6.08733 23.4628 4 21.1738 4Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
            </span>
            
            <span className={styles.text9}>{"Tesla - Gurugram, Haryana"}</span>
            <span className={styles.text10}>
              {"Job ID - TS02345 | Full–time | Department - IT Software"}
            </span>
          </div>

          <div className={styles.box}></div>
          <div className={styles.view2}>
            <svg width="255" height="113" viewBox="0 0 255 113" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 16C0 7.16344 7.16344 0 16 0H239C247.837 0 255 7.16344 255 16V97C255 105.837 247.837 113 239 113H16C7.16344 113 0 105.837 0 97V16Z" fill="white" />
              <g clip-path="url(#clip0_1559_6177)">
                <path d="M127 35.4836L134.842 25.8981C134.842 25.8981 148.275 26.1831 161.661 32.4056C158.234 37.5879 151.432 40.1244 151.432 40.1244C150.973 35.5715 147.784 34.46 137.64 34.46L127.002 94.5024L116.291 34.4481C106.221 34.4481 103.032 35.562 102.573 40.1125C102.573 40.1125 95.7688 37.6021 92.344 32.4175C105.727 26.195 119.163 25.91 119.163 25.91L127.005 35.4836H126.993H127ZM127 23.1384C137.811 23.0386 150.194 24.808 162.872 30.3489C164.568 27.2804 165 25.9337 165 25.9337C151.147 20.4404 138.17 18.5499 127 18.5C115.83 18.5499 102.853 20.4309 89 25.9337C89 25.9337 89.6175 27.6034 91.128 30.3631C103.808 24.7961 116.189 23.041 127 23.1265V23.1384Z" fill="#FF2715" />
              </g>
              <defs>
                <clipPath id="clip0_1559_6177">
                  <rect width="76" height="76" fill="white" transform="translate(89 18.5)" />
                </clipPath>
              </defs>
            </svg>


          </div>
        </div>
        <div className={styles.column2}>
          <span className={styles.text11}>{"Tell me about the role"}</span>
          <textarea
            readOnly
            style={{
              // border: "none",
              outline: "none",
              resize: "none",
              width: "90%",
              boxShadow:'none',
              background: "transparent",
              whiteSpace: "pre-wrap", // Ensures text wraps properly
              wordBreak: "break-word", // Prevents overflow
          
            }}
            placeholder={"We are looking for a Sr. App developer skilled in React Native and Flutter..."}
            value={input2}
            onChange={(event) => onChangeInput2(event.target.value)}
            className={styles.input2}
          />
          <span className={styles.text12}>{"What's expected of me?"}</span>
          <textarea
          readOnly
          style={{
            // border: "none",
            outline: "none",
            resize: "none",
            width: "90%",
            boxShadow:'none',
            background: "transparent",
            whiteSpace: "pre-wrap", // Ensures text wraps properly
            wordBreak: "break-word", // Prevents overflow
        
          }}
            placeholder={"Roles & Responsibilities include Cisco technologies, OSPF, Vulnerability Management..."}
            value={input3}
            onChange={(event) => onChangeInput3(event.target.value)}
            className={styles.input3}
          />
          <span className={styles.text13}>{"How do I increase my chances of being seen?"}</span>
          <textarea
          readOnly
          style={{
            // border: "none",
            outline: "none",
            resize: "none",
            width: "90%",
            boxShadow:'none',
            background: "transparent",
            whiteSpace: "pre-wrap", // Ensures text wraps properly
            wordBreak: "break-word", // Prevents overflow
        
          }}
            placeholder={"Eligibilities: 5 years experience in React Application Development"}
            value={input4}
            onChange={(event) => onChangeInput4(event.target.value)}
            className={styles.input3}
          />
          <span className={styles.text14}>{"Which skills must I have?"}</span>

          <textarea
          readOnly
          style={{
            // border: "none",
            outline: "none",
            resize: "none",
            width: "90%",
            boxShadow:'none',
            background: "transparent",
            whiteSpace: "pre-wrap", // Ensures text wraps properly
            wordBreak: "break-word", // Prevents overflow
        
          }}
            placeholder={"Required Skills\nReact\nAnalytical Thinking\nSelf Learning\nPrioritizing Skills\nTeam Player"}
            value={input4}
            onChange={(event) => onChangeInput4(event.target.value)}
            className={styles.input3}
          />
          <span className={styles.text14}>{"What will my day be like?"}</span>

          <textarea
          readOnly
          style={{
            // border: "none",
            outline: "none",
            resize: "none",
            width: "90%",
            boxShadow:'none',
            background: "transparent",
            whiteSpace: "pre-wrap", // Ensures text wraps properly
            wordBreak: "break-word", // Prevents overflow
        
          }}
            placeholder={"Daily Kickoff - Team meets and shares updates on tasks"}
            value={input4}
            onChange={(event) => onChangeInput4(event.target.value)}
            className={styles.input3}
          />
          <span className={styles.text11}>{"About Company"}</span>
          <textarea
          readOnly
          style={{
            // border: "none",
            outline: "none",
            resize: "none",
            width: "90%",
            boxShadow:'none',
            background: "transparent",
            whiteSpace: "pre-wrap", // Ensures text wraps properly
            wordBreak: "break-word", // Prevents overflow
        
          }}
            placeholder={"Tesla is headquartered in Austin, Texas, and specializes in electric vehicles..."}
            value={input5}
            onChange={(event) => onChangeInput5(event.target.value)}
            className={styles.input4}
          />
          <div className={styles.view5}>
          <div class="job-details_box__mvdtS"></div>
            <button className={styles.button3} onClick={() => alert("Pressed!")}>
              <span className={styles.text7}>{"Apply Now"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
