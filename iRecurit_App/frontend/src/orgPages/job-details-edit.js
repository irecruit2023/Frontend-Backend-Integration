import React, { useState } from "react";
import styles from "./job-details-edit.module.css";
import TopNavBar from "../components/top-nav-bar";
import { useNavigate } from "react-router-dom";

export default (props) => {
  const [input1, onChangeInput1] = useState('');
  const [input2, onChangeInput2] = useState('');
  const [input3, onChangeInput3] = useState('');
  const [input4, onChangeInput4] = useState('');
  const [input5, onChangeInput5] = useState('');
  const [input6, onChangeInput6] = useState('');
  const [isEdit, setIsEdit] = useState(false)
  const navigate = useNavigate()

  return (
    <div className={styles.contain}>
      <div className={styles["scroll-view"]}>
        <TopNavBar userType="recuriter" />
        <div className={styles.box2}></div>
        <div className={styles["row-view3"]}>
          <div style={{ cursor: 'pointer' }} onClick={() => { navigate("/manage-jobs") }}>
            <svg style={{ marginRight: "0.5rem" }} width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.24645 7.64645L8.34289 1.55L8 1.20711L1.20711 8L8 14.7929L8.34289 14.45L2.24645 8.35355L1.89289 8L2.24645 7.64645Z" fill="#F2665D" stroke="#F2665D" />
            </svg>

            <span className={styles.text5}>back to manage jobs</span>
          </div>
          <div className={styles.box}></div>
          <span className={styles.text6}>Status</span>
          <span className={styles.text7}>Active</span>
          <span className={styles.text8}>Applicants</span>
          <div className={styles.column}>

            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="6" cy="6" r="5.5" fill="#F2665D" stroke="white" />
            </svg>
            <span className={styles.text9}>29</span>

          </div>
          <span className={styles.text6}>Action</span>
          {!isEdit ? <svg onClick={() => { setIsEdit(true) }} style={{ marginRight: "0.5rem", cursor: 'pointer' }} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.54194 19.5201C4.93194 19.5201 4.36194 19.31 3.95194 18.92C3.43194 18.43 3.18194 17.69 3.27194 16.89L3.64194 13.65C3.71194 13.04 4.08194 12.23 4.51194 11.79L12.7219 3.10005C14.7719 0.930049 16.9119 0.870049 19.0819 2.92005C21.2519 4.97005 21.3119 7.11005 19.2619 9.28005L11.0519 17.97C10.6319 18.42 9.85194 18.84 9.24194 18.9401L6.02194 19.49C5.85194 19.5 5.70194 19.5201 5.54194 19.5201ZM15.9319 2.91005C15.1619 2.91005 14.4919 3.39005 13.8119 4.11005L5.60194 12.8101C5.40194 13.0201 5.17194 13.5201 5.13194 13.8101L4.76194 17.05C4.72194 17.38 4.80194 17.65 4.98194 17.82C5.16194 17.99 5.43194 18.05 5.76194 18L8.98194 17.4501C9.27194 17.4001 9.75194 17.14 9.95194 16.93L18.1619 8.24005C19.4019 6.92005 19.8519 5.70005 18.0419 4.00005C17.2419 3.23005 16.5519 2.91005 15.9319 2.91005Z" fill="#303030" />
            <path d="M17.3404 10.95C17.3204 10.95 17.2904 10.95 17.2704 10.95C14.1504 10.64 11.6404 8.26997 11.1604 5.16997C11.1004 4.75997 11.3804 4.37997 11.7904 4.30997C12.2004 4.24997 12.5804 4.52997 12.6504 4.93997C13.0304 7.35997 14.9904 9.21997 17.4304 9.45997C17.8404 9.49997 18.1404 9.86997 18.1004 10.28C18.0504 10.66 17.7204 10.95 17.3404 10.95Z" fill="#303030" />
            <path d="M21 22.75H3C2.59 22.75 2.25 22.41 2.25 22C2.25 21.59 2.59 21.25 3 21.25H21C21.41 21.25 21.75 21.59 21.75 22C21.75 22.41 21.41 22.75 21 22.75Z" fill="#303030" />
          </svg>
            : <svg width="24" height="24" style={{ marginRight: "0.5rem", cursor: 'pointer' }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.54194 19.5201C4.93194 19.5201 4.36194 19.31 3.95194 18.92C3.43194 18.43 3.18194 17.69 3.27194 16.89L3.64194 13.65C3.71194 13.04 4.08194 12.23 4.51194 11.79L12.7219 3.10005C14.7719 0.930049 16.9119 0.870049 19.0819 2.92005C21.2519 4.97005 21.3119 7.11005 19.2619 9.28005L11.0519 17.97C10.6319 18.42 9.85194 18.84 9.24194 18.9401L6.02194 19.49C5.85194 19.5 5.70194 19.5201 5.54194 19.5201ZM15.9319 2.91005C15.1619 2.91005 14.4919 3.39005 13.8119 4.11005L5.60194 12.8101C5.40194 13.0201 5.17194 13.5201 5.13194 13.8101L4.76194 17.05C4.72194 17.38 4.80194 17.65 4.98194 17.82C5.16194 17.99 5.43194 18.05 5.76194 18L8.98194 17.4501C9.27194 17.4001 9.75194 17.14 9.95194 16.93L18.1619 8.24005C19.4019 6.92005 19.8519 5.70005 18.0419 4.00005C17.2419 3.23005 16.5519 2.91005 15.9319 2.91005Z" fill="#BBBBBB" />
              <path d="M17.3404 10.9501C17.3204 10.9501 17.2904 10.9501 17.2704 10.9501C14.1504 10.6401 11.6404 8.27009 11.1604 5.17009C11.1004 4.76009 11.3804 4.38009 11.7904 4.31009C12.2004 4.25009 12.5804 4.53009 12.6504 4.94009C13.0304 7.36009 14.9904 9.22009 17.4304 9.46009C17.8404 9.50009 18.1404 9.87009 18.1004 10.2801C18.0504 10.6601 17.7204 10.9501 17.3404 10.9501Z" fill="#BBBBBB" />
              <path d="M21 22.75H3C2.59 22.75 2.25 22.41 2.25 22C2.25 21.59 2.59 21.25 3 21.25H21C21.41 21.25 21.75 21.59 21.75 22C21.75 22.41 21.41 22.75 21 22.75Z" fill="#BBBBBB" />
            </svg>}


          <svg style={{ marginRight: "0.5rem", cursor: 'pointer' }} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 19.5V20H4.5H19.5H20V19.5V4.5V4H19.5H4.5H4V4.5V19.5ZM4.5 3.5H19.5C19.7652 3.5 20.0196 3.60536 20.2071 3.79289C20.3946 3.98043 20.5 4.23478 20.5 4.5V19.5C20.5 19.7652 20.3946 20.0196 20.2071 20.2071C20.0196 20.3946 19.7652 20.5 19.5 20.5H4.5C4.23478 20.5 3.98043 20.3946 3.79289 20.2071C3.60536 20.0196 3.5 19.7652 3.5 19.5V4.5C3.5 4.23478 3.60536 3.98043 3.79289 3.79289C3.98043 3.60536 4.23478 3.5 4.5 3.5Z" fill="#303030" stroke="#303030" />
            <rect x="9" y="8" width="2" height="8" fill="#303030" />
            <rect x="13" y="8" width="2" height="8" fill="#303030" />
          </svg>
          <svg style={{ marginRight: "0.5rem", cursor: 'pointer' }} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.3775 4.5L10.9425 7.0575L11.3775 7.5H21V19.5H3V4.5H8.3775ZM8.3775 3H3C2.60218 3 2.22064 3.15804 1.93934 3.43934C1.65804 3.72064 1.5 4.10218 1.5 4.5V19.5C1.5 19.8978 1.65804 20.2794 1.93934 20.5607C2.22064 20.842 2.60218 21 3 21H21C21.3978 21 21.7794 20.842 22.0607 20.5607C22.342 20.2794 22.5 19.8978 22.5 19.5V7.5C22.5 7.10218 22.342 6.72065 22.0607 6.43934C21.7794 6.15804 21.3978 6 21 6H12L9.4425 3.4425C9.30296 3.30212 9.13701 3.19075 8.95423 3.11481C8.77144 3.03886 8.57543 2.99984 8.3775 3Z" fill="#303030" />
          </svg>


        </div>
        <div className={styles["row-view5"]}>
          <div className={styles.column2}>
            <span className={styles.text10}>Job Description - Sr. Software Engineer 2024</span>
            <span className={styles.text11}>Tesla - Gurugram, Haryana</span>
            <span className={styles.text12}>Job ID - TS02345 | Full–time | Department - IT Software</span>
          </div>
          <div className={styles.view2}>
            <svg width="255" height="113" viewBox="0 0 255 113" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 16C0 7.16344 7.16344 0 16 0H239C247.837 0 255 7.16344 255 16V97C255 105.837 247.837 113 239 113H16C7.16344 113 0 105.837 0 97V16Z" fill="white" />
              <g clip-path="url(#clip0_1148_2799)">
                <path d="M127 35.4836L134.842 25.8981C134.842 25.8981 148.275 26.1831 161.661 32.4056C158.234 37.5879 151.432 40.1244 151.432 40.1244C150.973 35.5715 147.784 34.46 137.64 34.46L127.002 94.5024L116.291 34.4481C106.221 34.4481 103.032 35.562 102.573 40.1125C102.573 40.1125 95.7688 37.6021 92.344 32.4175C105.727 26.195 119.163 25.91 119.163 25.91L127.005 35.4836H126.993H127ZM127 23.1384C137.811 23.0386 150.194 24.808 162.872 30.3489C164.568 27.2804 165 25.9337 165 25.9337C151.147 20.4404 138.17 18.5499 127 18.5C115.83 18.5499 102.853 20.4309 89 25.9337C89 25.9337 89.6175 27.6034 91.128 30.3631C103.808 24.7961 116.189 23.041 127 23.1265V23.1384Z" fill="#FF2715" />
              </g>
              <defs>
                <clipPath id="clip0_1148_2799">
                  <rect width="76" height="76" fill="white" transform="translate(89 18.5)" />
                </clipPath>
              </defs>
            </svg>

          </div>
        </div>

        <>
          <div className={styles.box2}></div>
          <span className={styles.text13}>Description</span>
          <textarea
            placeholder={"We are looking for a Sr. App developer..."}
            readOnly={!isEdit} // Apply readOnly only when isEdit is false
            style={{
              ...(!isEdit && { // Apply styles only when isEdit is false
                border: "none",
                outline: "none",
                resize: "none",
                width: "90%",
                boxShadow: "none",
                background: "transparent",
                whiteSpace: "pre-wrap", // Ensures text wraps properly
                wordBreak: "break-word", // Prevents overflow
              })
            }}
            value={input2}
            onChange={(event) => onChangeInput2(event.target.value)}
            className={styles.input2}
          />
          <span className={styles.text13}>Roles & Responsibilities</span>
          <textarea
            placeholder={"• Build pixel-perfect UIs..."}
            value={input3}
            readOnly={!isEdit} // Apply readOnly only when isEdit is false
            style={{
              ...(!isEdit && { // Apply styles only when isEdit is false
                border: "none",
                outline: "none",
                resize: "none",
                width: "90%",
                boxShadow: "none",
                background: "transparent",
                whiteSpace: "pre-wrap", // Ensures text wraps properly
                wordBreak: "break-word", // Prevents overflow
              })
            }}
            onChange={(event) => onChangeInput3(event.target.value)}
            className={styles.input3}
          />
          <span className={styles.text13}>Eligibilities</span>
          <textarea
          readOnly={!isEdit} // Apply readOnly only when isEdit is false
          style={{
            ...( !isEdit && { // Apply styles only when isEdit is false
              border: "none",
              outline: "none",
              resize: "none",
              width: "90%",
              boxShadow: "none",
              background: "transparent",
              whiteSpace: "pre-wrap", // Ensures text wraps properly
              wordBreak: "break-word", // Prevents overflow
            })
          }}
            placeholder={"Proven track record of shipping software..."}
            value={input4}
            onChange={(event) => onChangeInput4(event.target.value)}
            className={styles.input4}
          />
          <span className={styles.text14}>Required Skills</span>
          <textarea
          readOnly={!isEdit} // Apply readOnly only when isEdit is false
          style={{
            ...( !isEdit && { // Apply styles only when isEdit is false
              border: "none",
              outline: "none",
              resize: "none",
              width: "90%",
              boxShadow: "none",
              background: "transparent",
              whiteSpace: "pre-wrap", // Ensures text wraps properly
              wordBreak: "break-word", // Prevents overflow
            })
          }}
            placeholder={"• Experience with Flutter framework..."}
            value={input5}
            onChange={(event) => onChangeInput5(event.target.value)}
            className={styles.input3}
          />
          <span className={styles.text15}>About Company</span>
          <textarea
          readOnly={!isEdit} // Apply readOnly only when isEdit is false
          style={{
            ...( !isEdit && { // Apply styles only when isEdit is false
              border: "none",
              outline: "none",
              resize: "none",
              width: "90%",
              boxShadow: "none",
              background: "transparent",
              whiteSpace: "pre-wrap", // Ensures text wraps properly
              wordBreak: "break-word", // Prevents overflow
            })
          }}
            placeholder={"Headquartered in Austin, Texas..."}
            value={input6}
            onChange={(event) => onChangeInput6(event.target.value)}
            className={styles.input5}
          />
        </>
        {isEdit && <>

          <div className={styles["row-view6"]}>
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.25 12.75L11.75 12.75L11.75 13.25L11.75 18L12.25 18L12.25 13.25L12.25 12.75L12.75 12.75L17.5 12.75L17.5 12.25L12.75 12.25L12.25 12.25L12.25 11.75L12.25 7L11.75 7L11.75 11.75L11.75 12.25L11.25 12.25L6.5 12.25L6.5 12.75L11.25 12.75Z" fill="#F2665D" stroke="#F2665D" />
            </svg>

            <span className={styles.text16}>Add a new section</span>
            <button className={styles.button} onClick={() => alert("Pressed!")}>
              <span className={styles.text17}>eg. Health coverage, Travel etc.</span>
            </button>
          </div>

          <div className={styles["row-view7"]}>
            <button className={styles.button2} onClick={() => { setIsEdit(false) }}  >Cancel</button>
            <button className={styles.button3} onClick={() => { setIsEdit(false) }} >Update Changes</button>
          </div>

        </>}


      </div>
    </div>
  );
};