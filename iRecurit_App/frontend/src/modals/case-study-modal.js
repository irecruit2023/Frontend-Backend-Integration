// src/CaseStudyUpload.js
import React from 'react';
import './case-study-modal.module.css';

const CaseStudyUpload = () => {
  return (
    <div className="case-study-container">
      <div className="case-study-content">
        <h1>Make an impact on recruiters!</h1>
        <p className="recommendation">
          We highly recommend adding a case study to your profile. It not only demonstrates your work but also highlights your thought process and execution skills.
        </p>
        <h2>Getting you started</h2>
        <p className="template-info">
          We've created a template to help you showcase your work with all the essentials for a comprehensive case study. Simply download the iRecruit Case Study Template.
        </p>
        <button className="download-button">iRecruit Case study template</button>
        <h2>or Upload Case study</h2>
        <div className="upload-section">
          <p>Drop your file here, or <span className="browse-link">browse from device</span></p>
          <p>or</p>
          <button className="upload-button">Upload from G drive</button>
          <p className="support-info">Supports: Docx and Pdf<br />Size: upto 10 MB</p>
        </div>
        <button className="close-button">Close</button>
      </div>
    </div>
  );
};

export default CaseStudyUpload;