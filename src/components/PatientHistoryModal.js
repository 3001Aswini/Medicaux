import React from 'react';
import Modal from 'react-modal';
import './PatientHistoryModal.css';

const PatientHistoryModal = ({ isOpen, onRequestClose, patient }) => {
  if (!patient) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Patient History"
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Patient History for {patient.patientName}</h2>
      <div className="patient-history">
        {/* Add patient history details here */}
        <p><strong>Date of Birth:</strong> {patient.dob}</p>
        <p><strong>Medical History:</strong> {patient.medicalHistory}</p>
        {/* Add more patient details as needed */}
      </div>
      <button onClick={onRequestClose} className="close-button">Close</button>
    </Modal>
  );
};

export default PatientHistoryModal;
