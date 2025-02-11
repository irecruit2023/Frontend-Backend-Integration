import React, { useState } from "react";
import styles from "./Modal.module.css";

const Modal = ({ isOpen, onClose, title, children, width = "400px", height = "300px" }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer} style={{ width, height }}>
        <button className={styles.modalClose} onClick={onClose}>&times;</button>
        <h2 className={styles.modalTitle}>{title}</h2>
        <div className={styles.modalContent}>{children}</div>
        <div className={styles.modalFooter}>
          <button className={styles.modalButton} onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};



export default Modal