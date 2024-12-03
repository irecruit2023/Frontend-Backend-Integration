import React from "react";
import styles from "./ManageJobsTable.module.css";

const ManageJobsTable = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Manage Jobs</h1>
        <div className={styles.sortContainer}>
          <span>Sort by:</span>
          <input type="text" placeholder="Search" className={styles.searchInput} />
        </div>
      </header>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Job ID</th>
            <th>Job Type</th>
            <th>Location</th>
            <th>Department</th>
            <th>Type</th>
            <th>Status</th>
            <th>Applicants</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.jobRow}>
            <td>
              <input type="checkbox" />
            </td>
            <td className={styles.jobID}>T102345</td>
            <td>Sr. Software Engineer</td>
            <td>Gurugram, India</td>
            <td>IT Software</td>
            <td>Full Time</td>
            <td className={styles.activeStatus}>Active</td>
            <td>29</td>
            <td>
              <button className={styles.viewDetailsButton}>View Details</button>
            </td>
          </tr>
          <tr>
            <td colSpan="9" className={styles.jobDescription}>
              We are looking for a Sr. App developer skilled in building performant mobile apps on both
              iOS and Android platforms. You will be responsible for developing cross-platform mobile
              applications using the React Native framework, as well as coordinating...
            </td>
          </tr>

          {/* Add Candidate Rows */}
          <tr>
            <td colSpan="9">
              <table className={styles.candidateTable}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Candidate Name</th>
                    <th>Location</th>
                    <th>Interview</th>
                    <th>iRecruit Relevant Score</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>28/11/2024</td>
                    <td>Vishal Sharma</td>
                    <td>Gurugram, India</td>
                    <td>Schedule</td>
                    <td>3.7</td>
                    <td className={styles.acceptedStatus}>Accepted</td>
                    <td>
                      <button className={styles.acceptButton}>Accept</button>
                      <button className={styles.rejectButton}>Reject</button>
                    </td>
                  </tr>
                  <tr>
                    <td>29/11/2024</td>
                    <td>Ashish Kumar</td>
                    <td>Gurugram, India</td>
                    <td>In Progress</td>
                    <td>3.0</td>
                    <td className={styles.rejectedStatus}>Rejected</td>
                    <td>
                      <button className={styles.acceptButton}>Accept</button>
                      <button className={styles.rejectButton}>Reject</button>
                    </td>
                  </tr>
                  {/* Add more candidate rows as needed */}
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ManageJobsTable;
