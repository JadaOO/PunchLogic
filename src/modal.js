import React from "react";
import ReactDOM from "react-dom";
import "./modal.css"; // Assuming you have some basic styles for the modal

const Modal = ({ modalIsOpen, children, onClose, data }) => {
  if (!modalIsOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          X
        </button>
        <div>{data.employee}</div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
