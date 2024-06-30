import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DoctorPage.css';
import { signOut } from 'firebase/auth'; // Import signOut from firebase/auth
import { auth } from '../firebase-config'; // Import your Firebase config
import PatientHistoryModal from './PatientHistoryModal';

const appointments = [
  {
    id: 1,
    patientName: 'John Doe',
    date: '2024-07-01',
    time: '10:00 AM',
    status: 'Confirmed',
    dob: '1990-01-01',
    medicalHistory: 'No significant medical history.'
  },
  {
    id: 2,
    patientName: 'Jane Smith',
    date: '2024-07-01',
    time: '11:00 AM',
    status: 'Pending',
    dob: '1985-05-15',
    medicalHistory: 'Asthma, High blood pressure.'
  },
  {
    id: 3,
    patientName: 'Jim Brown',
    date: '2024-07-01',
    time: '01:00 PM',
    status: 'Cancelled',
    dob: '1978-02-20',
    medicalHistory: 'Diabetes, Allergies.'
  }
];

const  DoctorPage= () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate= useNavigate();

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Redirect to the login page after sign out
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  };

  return (
    <div className="appointment-details">
      <h2>Patient Appointment Details</h2>
      <table>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => (
            <tr key={appointment.id}>
              <td
                className="patient-name"
                onClick={() => handlePatientClick(appointment)}
              >
                {appointment.patientName}
              </td>
              <td>{appointment.date}</td>
              <td>{appointment.time}</td>
              <td className={`status-${appointment.status.toLowerCase()}`}>{appointment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <PatientHistoryModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        patient={selectedPatient}
      />
      <button style={{float:"right", justifyContent:"end"}} onClick={handleSignOut} className="button">Sign Out</button>
    </div>
  );
};



export default DoctorPage;
