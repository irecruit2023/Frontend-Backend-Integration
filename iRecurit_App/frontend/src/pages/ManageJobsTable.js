import React, { useState } from "react";

import "./manage.css";
import styles from "./manage.css"
import TopNavBar from "../components/top-nav-bar";
import { ReactComponent as Shortlisted } from "../assets/icons/shortlist-font.svg";
import { ReactComponent as Rejected } from "../assets/icons/rejected-font.svg";
import { ReactComponent as Progress } from "../assets/icons/in-progress-font.svg";



const JobDashboard = () => {
  return (
    <div className="dashboard-graph-container">
      <div className="card logo-card">
        {/* <img src="/path/to/tesla-logo.png" alt="Tesla Logo" className="logo" /> */}
        <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M38 16.9836L45.8423 7.39812C45.8423 7.39812 59.2752 7.68312 72.6608 13.9056C69.2336 19.0879 62.4316 21.6244 62.4316 21.6244C61.9733 17.0715 58.7836 15.96 48.64 15.96L38.0024 76.0024L27.2911 15.9481C17.2211 15.9481 14.0315 17.062 13.5731 21.6125C13.5731 21.6125 6.76875 19.1021 3.344 13.9175C16.7271 7.695 30.1625 7.41 30.1625 7.41L38.0048 16.9836H37.9929H38ZM38 4.63837C48.811 4.53862 61.1943 6.308 73.872 11.8489C75.5677 8.78037 76 7.43375 76 7.43375C62.1466 1.94038 49.1696 0.049875 38 0C26.8304 0.049875 13.8534 1.93088 0 7.43375C0 7.43375 0.6175 9.10337 2.128 11.8631C14.8081 6.29612 27.189 4.541 38 4.6265V4.63837Z" fill="#F72525" />
        </svg>

      </div>

      <div className="candidates-card">
        <h3 className="card-title">Position</h3>
        <div style={{ display: 'flex', justifyContent: "space-around" }}>
          <div className="main-stat">12</div>
          <div className="candidates-stats">
            <div className="sub-stats">
              <div className="sub-stat-value">5</div>
              <div className="sub-stat-label">Open</div>
            </div>
            <div className="sub-stats">
              <div className="sub-stat-value">7</div>
              <div className="sub-stat-label">Closed</div>
            </div>
          </div>
        </div>
      </div>


      <div className="card graph-card">
        {/* <svg width="717" height="316" viewBox="0 0 717 316" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="717" height="316" rx="16" fill="#F6F7FF" />
        </svg> */}

      </div>

      <div className="card stats-card">
        <div className="card-heading-jobs">Jobs Posted</div>
        <diV style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div className="main-stat">12</div>
          <div>
            <button style={{ marginLeft: '12px' }} className="add-new">Add New</button>
          </div>
        </diV>
      </div>




      <div className="candidates-card">
        <h3 className="card-title">CANDIDATES APPLIED</h3>
        <div style={{ display: 'flex', justifyContent: "space-around" }}>
          <div className="main-stat">32</div>
          <div className="candidates-stats">
            <div className="sub-stats">
              <div className="sub-stat-value">12</div>
              <div className="sub-stat-label">ACCEPTED</div>
            </div>
            <div className="sub-stats">
              <div className="sub-stat-value">20</div>
              <div className="sub-stat-label">REJECTED</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};






const JobTable = () => {
  const [expandedRow, setExpandedRow] = useState(null);


  const jobs = [
    {
      id: "TS02345",
      dateCreated: "18/11/2024",
      jobType: "Sr. Software Engineer",
      location: "Gurugram, India",
      department: "IT Software",
      type: "Full Time",
      status: "Active",
      applicants: 29,
      description:
        "We are looking for a Sr. App developer skilled in building performant mobile apps on both the iOS and Android platforms. You will be responsible for developing cross-platform mobile applications using the React Native and Flutter frameworks, as well as coordinating with the team to deliver high-quality solutions.",

    },
    {
      id: "TS0245",
      dateCreated: "18/11/2024",
      jobType: "Sr. Software Engineer",
      location: "Gurugram, India",
      department: "IT Software",
      type: "Full Time",
      status: "Active",
      applicants: 29,
      description:
        "We are looking for a Sr. App developer skilled in building performant mobile apps on both the iOS and Android platforms. You will be responsible for developing cross-platform mobile applications using the React Native and Flutter frameworks, as well as coordinating with the team to deliver high-quality solutions.",

    },
  ];

  const candidates = [
    {
      date: "29/11/2024",
      name: "Vidhi Sharma",
      location: "Gurugram, India",
      score: 3.7,
      status: "Shortlisted",
      interviewDate: 'Decline'
    },
    {
      date: "25/11/2024",
      name: "Ashish Kumar",
      location: "Gurugram, India",
      score: 3.9,
      status: "Rejected",
      interviewDate: 'Rejected'
    },
    {
      date: "18/11/2024",
      name: "Nidhi Rawat",
      location: "Gurugram, India",
      score: 3.4,
      status: "Shortlisted",
      interviewDate: 'In Progress'
    },
  ];

  const toggleExpand = (rowId) => {
    setExpandedRow(expandedRow === rowId ? null : rowId);
  };

  return (
    <div className="jobTableContainer">
      <table className="mainTable">
        <thead>
          <tr className="tableRow">
            <th>                 <input
              type="checkbox"
              checked={true}

            /> Job ID</th>
            <th>Date Created</th>
            <th>Job Type</th>
            <th>Location</th>
            <th>Department</th>
            <th>Type</th>
            <th>Status</th>
            <th style={{ width: "0px" }}>Applicants</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {jobs.map((job) => (
            <React.Fragment key={job.id}>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={true}

                  /> <span style={{ color: 'red' }}>{job.id} </span></td>
                <td>{job.dateCreated}</td>
                <td>{job.jobType}</td>
                <td>{job.location}</td>
                <td>{job.department}</td>
                <td>{job.type}</td>
                <td className={styles.active}>{job.status}</td>
                <td style={{ width: "0px" }}>{job.applicants}</td>
                <td className="actionButtons">
                  <svg style={{ marginLeft: '0rem' }} width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.54194 20.0201C4.93194 20.0201 4.36194 19.81 3.95194 19.42C3.43194 18.93 3.18194 18.19 3.27194 17.39L3.64194 14.15C3.71194 13.54 4.08194 12.73 4.51194 12.29L12.7219 3.60005C14.7719 1.43005 16.9119 1.37005 19.0819 3.42005C21.2519 5.47005 21.3119 7.61005 19.2619 9.78005L11.0519 18.47C10.6319 18.92 9.85194 19.34 9.24194 19.4401L6.02194 19.99C5.85194 20 5.70194 20.0201 5.54194 20.0201ZM15.9319 3.41005C15.1619 3.41005 14.4919 3.89005 13.8119 4.61005L5.60194 13.3101C5.40194 13.5201 5.17194 14.0201 5.13194 14.3101L4.76194 17.55C4.72194 17.88 4.80194 18.15 4.98194 18.32C5.16194 18.49 5.43194 18.55 5.76194 18.5L8.98194 17.9501C9.27194 17.9001 9.75194 17.64 9.95194 17.43L18.1619 8.74005C19.4019 7.42005 19.8519 6.20005 18.0419 4.50005C17.2419 3.73005 16.5519 3.41005 15.9319 3.41005Z" fill="#303030" />
                    <path d="M17.3404 11.45C17.3204 11.45 17.2904 11.45 17.2704 11.45C14.1504 11.14 11.6404 8.76997 11.1604 5.66997C11.1004 5.25997 11.3804 4.87997 11.7904 4.80997C12.2004 4.74997 12.5804 5.02997 12.6504 5.43997C13.0304 7.85997 14.9904 9.71997 17.4304 9.95997C17.8404 9.99997 18.1404 10.37 18.1004 10.78C18.0504 11.16 17.7204 11.45 17.3404 11.45Z" fill="#303030" />
                    <path d="M21 23.25H3C2.59 23.25 2.25 22.91 2.25 22.5C2.25 22.09 2.59 21.75 3 21.75H21C21.41 21.75 21.75 22.09 21.75 22.5C21.75 22.91 21.41 23.25 21 23.25Z" fill="#303030" />
                  </svg>
                  <svg style={{ marginLeft: '0.2rem' }} width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 20V20.5H4.5H19.5H20V20V5V4.5H19.5H4.5H4V5V20ZM4.5 4H19.5C19.7652 4 20.0196 4.10536 20.2071 4.29289C20.3946 4.48043 20.5 4.73478 20.5 5V20C20.5 20.2652 20.3946 20.5196 20.2071 20.7071C20.0196 20.8946 19.7652 21 19.5 21H4.5C4.23478 21 3.98043 20.8946 3.79289 20.7071C3.60536 20.5196 3.5 20.2652 3.5 20V5C3.5 4.73478 3.60536 4.48043 3.79289 4.29289C3.98043 4.10536 4.23478 4 4.5 4Z" fill="#303030" stroke="#303030" />
                    <rect x="9" y="8.5" width="2" height="8" fill="#303030" />
                    <rect x="13" y="8.5" width="2" height="8" fill="#303030" />
                  </svg>

                  <svg style={{ marginLeft: '0.2rem' }} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.3775 4.5L10.9425 7.0575L11.3775 7.5H21V19.5H3V4.5H8.3775ZM8.3775 3H3C2.60218 3 2.22064 3.15804 1.93934 3.43934C1.65804 3.72064 1.5 4.10218 1.5 4.5V19.5C1.5 19.8978 1.65804 20.2794 1.93934 20.5607C2.22064 20.842 2.60218 21 3 21H21C21.3978 21 21.7794 20.842 22.0607 20.5607C22.342 20.2794 22.5 19.8978 22.5 19.5V7.5C22.5 7.10218 22.342 6.72065 22.0607 6.43934C21.7794 6.15804 21.3978 6 21 6H12L9.4425 3.4425C9.30296 3.30212 9.13701 3.19075 8.95423 3.11481C8.77144 3.03886 8.57543 2.99984 8.3775 3Z" fill="#303030" />
                  </svg>


                  {expandedRow == job.id ? <svg style={{ marginLeft: '0.2rem' }} onClick={() => toggleExpand(job.id)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.3536 9.24645L18.45 15.3429L18.7929 15L12 8.20711L5.20711 15L5.55 15.3429L11.6464 9.24645L12 8.89289L12.3536 9.24645Z" fill="#F2665D" stroke="#F2665D" />
                  </svg>
                    :
                    <svg width="24" height="24" style={{ marginLeft: '0.2rem' }}  onClick={() => toggleExpand(job.id)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.6464 14.7536L5.55 8.65711L5.20711 9L12 15.7929L18.7929 9L18.45 8.65711L12.3536 14.7536L12 15.1071L11.6464 14.7536Z" fill="#303030" stroke="#303030" />
                    </svg>

                  }
                </td>
              </tr>
              {expandedRow === job.id && (
                <tr className="tableRow">

                  <td style={{ "padding": "0px" }} colSpan="9">
                    <div className="expandedContent">
                      <p className="description">
                        <span style={{ width: "90%" }}>{job.description}</span>
                        <button className='viewDetails' >View Details</button>
                      </p>

                      <table className="subTable">
                        <thead>
                          <tr className="tableRow">
                            <th>                  <input
                              type="checkbox"
                              checked={true}

                            /> Date</th>
                            <th>Candidate Name</th>
                            <th>Location</th>
                            <th>Relevant Score</th>
                            <th>Status</th>
                            <th>Interview Date</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {candidates.map((candidate, index) => (
                            <tr className="tableRow" key={index}>

                              <td>
                                <div style={{ display: 'flex', flexDirection: "row", alignItems: 'center' }}>
                                  <div className="bar" style={{ marginRight: "12px" }}></div>
                                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div style={{ marginRight: "12px" }}>
                                      <input
                                        type="checkbox"
                                        checked={true}

                                      />
                                    </div>
                                    <div>{candidate.date}</div>

                                  </div>
                                </div>
                              </td>

                              <td>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M21.8673 17.7916L21.87 17.7986L21.873 17.8055L21.9562 18L21.873 18.1945L21.87 18.2014L21.8673 18.2084C21.4396 19.2978 20.7016 20.2378 19.7448 20.9118C18.7922 21.5829 17.6644 21.9609 16.5 21.9997C15.3356 21.9609 14.2078 21.5829 13.2552 20.9118C12.2984 20.2378 11.5604 19.2978 11.1327 18.2084L11.13 18.2014L11.127 18.1945L11.0438 18L11.127 17.8055L11.13 17.7986L11.1327 17.7916C11.5604 16.7022 12.2984 15.7622 13.2552 15.0882C14.2078 14.4171 15.3356 14.039 16.5 14.0003C17.6644 14.039 18.7922 14.4171 19.7448 15.0882C20.7016 15.7622 21.4396 16.7022 21.8673 17.7916ZM16.5 21.5H16.5006C17.4284 21.499 18.3178 21.1299 18.9739 20.4739C19.6299 19.8178 19.999 18.9284 20 18.0006V18C20 17.3078 19.7947 16.6311 19.4101 16.0555C19.0256 15.4799 18.4789 15.0313 17.8394 14.7664C17.1999 14.5015 16.4961 14.4322 15.8172 14.5673C15.1383 14.7023 14.5146 15.0356 14.0251 15.5251C13.5356 16.0146 13.2023 16.6383 13.0673 17.3172C12.9322 17.9961 13.0015 18.6999 13.2664 19.3394C13.5313 19.9789 13.9799 20.5256 14.5555 20.9101C15.1311 21.2947 15.8078 21.5 16.5 21.5ZM2.5 21V21.5H3H8.5V22L3.00144 22C3.00124 22 3.00105 22 3.00085 22C2.7357 21.9991 2.48166 21.8933 2.29416 21.7058C2.10667 21.5183 2.00094 21.2643 2 20.9992V3.00079C2.00094 2.73566 2.10667 2.48165 2.29416 2.29416C2.48165 2.10667 2.73566 2.00094 3.00079 2H16.4992C16.7643 2.00094 17.0184 2.10667 17.2058 2.29416C17.3933 2.48166 17.4991 2.7357 17.5 3.00085C17.5 3.00105 17.5 3.00124 17.5 3.00144L17.5 10.75H17V3V2.5H16.5H3H2.5V3V21ZM17.5 18C17.5 18.5523 17.0523 19 16.5 19C15.9477 19 15.5 18.5523 15.5 18C15.5 17.4477 15.9477 17 16.5 17C17.0523 17 17.5 17.4477 17.5 18ZM5.75 13.25H8.5V13.75H5.75V13.25ZM5.75 9.5H13.75V10H5.75V9.5ZM5.75 5.75H13.75V6.25H5.75V5.75Z" fill="#303030" stroke="#303030" />
                                </svg>
                                <span style={{ marginLeft: '12px' }}>
                                  {candidate.name}
                                </span></td>
                              <td>{candidate.location}</td>
                              <td>{candidate.score}</td>
                              <td>
                                {candidate.status === "Shortlisted" ? <Shortlisted /> : <Rejected />}


                              </td>
                              <td>

                                {candidate.interviewDate === "In Progress" ? <Progress /> : candidate.interviewDate === "Decline" ? <div style={{ color: 'red' }}>Decline</div> : <div style={{ color: 'green' }}>Active</div>}

                              </td>
                              <td>
                                <svg style={{ marginRight: '12px' }} width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <mask id="path-1-inside-1_1179_2650" fill="white">
                                    <path d="M0 18C0 8.05888 8.05888 0 18 0C27.9411 0 36 8.05888 36 18C36 27.9411 27.9411 36 18 36C8.05888 36 0 27.9411 0 18Z" />
                                  </mask>
                                  <path d="M0 18C0 8.05888 8.05888 0 18 0C27.9411 0 36 8.05888 36 18C36 27.9411 27.9411 36 18 36C8.05888 36 0 27.9411 0 18Z" fill="white" />
                                  <path d="M18 35C8.61116 35 1 27.3888 1 18H-1C-1 28.4934 7.50659 37 18 37V35ZM35 18C35 27.3888 27.3888 35 18 35V37C28.4934 37 37 28.4934 37 18H35ZM18 1C27.3888 1 35 8.61116 35 18H37C37 7.50659 28.4934 -1 18 -1V1ZM18 -1C7.50659 -1 -1 7.50659 -1 18H1C1 8.61116 8.61116 1 18 1V-1Z" fill="#F2665D" mask="url(#path-1-inside-1_1179_2650)" />
                                  <path d="M24.5 9V8.5H24H12H11.5V9V26.0625V26.8756L12.2256 26.5087L17.5486 23.8172L17.5506 23.8162L18 23.5915L18.4494 23.8162L18.4514 23.8172L23.7744 26.5087L24.5 26.8756V26.0625V9ZM18.2236 24.3028L18 24.191L17.7764 24.3028L11 27.691V9C11 8.73478 11.1054 8.48043 11.2929 8.29289C11.4804 8.10536 11.7348 8 12 8H24C24.2652 8 24.5196 8.10536 24.7071 8.29289L25.0607 7.93934L24.7071 8.29289C24.8946 8.48043 25 8.73478 25 9V27.691L18.2236 24.3028Z" fill="#F2665D" stroke="#F2665D" />
                                </svg>

                                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <mask id="path-1-inside-1_1179_2763" fill="white">
                                    <path d="M0 18C0 8.05888 8.05888 0 18 0C27.9411 0 36 8.05888 36 18C36 27.9411 27.9411 36 18 36C8.05888 36 0 27.9411 0 18Z" />
                                  </mask>
                                  <path d="M0 18C0 8.05888 8.05888 0 18 0C27.9411 0 36 8.05888 36 18C36 27.9411 27.9411 36 18 36C8.05888 36 0 27.9411 0 18Z" fill="white" />
                                  <path d="M18 35C8.61116 35 1 27.3888 1 18H-1C-1 28.4934 7.50659 37 18 37V35ZM35 18C35 27.3888 27.3888 35 18 35V37C28.4934 37 37 28.4934 37 18H35ZM18 1C27.3888 1 35 8.61116 35 18H37C37 7.50659 28.4934 -1 18 -1V1ZM18 -1C7.50659 -1 -1 7.50659 -1 18H1C1 8.61116 8.61116 1 18 1V-1Z" fill="#BBBBBB" mask="url(#path-1-inside-1_1179_2763)" />
                                  <path d="M15 15H16.5V24H15V15ZM19.5 15H21V24H19.5V15Z" fill="#BBBBBB" />
                                  <path d="M9 10.5V12H10.5V27C10.5 27.3978 10.658 27.7794 10.9393 28.0607C11.2206 28.342 11.6022 28.5 12 28.5H24C24.3978 28.5 24.7794 28.342 25.0607 28.0607C25.342 27.7794 25.5 27.3978 25.5 27V12H27V10.5H9ZM12 27V12H24V27H12ZM15 7.5H21V9H15V7.5Z" fill="#BBBBBB" />
                                </svg>

                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};






const ManageJobsTable = () => {

  return (
    <div className="dashboard-container">
      <TopNavBar userType="jobs" />

      <div style={{ margin: "44px" }}>
        <JobDashboard />
        <div className="table-section">
          <div className="manage-jobs-heading">Manage Job Openings</div>
          <JobTable />
        </div>
      </div>
    </div>
  );
};

export default ManageJobsTable;
