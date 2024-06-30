import React, { useState } from 'react';
import './ManufacturerPage.css'; 
import { signOut } from 'firebase/auth'; 
import { auth } from '../firebase-config'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const ManufacturerPage = () => {
   
    const [doctorName, setDoctorName] = useState('');
    const [medicineName, setMedicineName] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    
    const handleSubmit = (event) => {
        event.preventDefault();
       
        console.log('Appointment submitted:', { doctorName, medicineName, appointmentDate, file });
      
        setDoctorName('');
        setMedicineName('');
        setAppointmentDate('');
        setFile(null);
    };

 
    const handleFileUpload = (event) => {
        const uploadedFile = event.target.files[0];
        setFile(uploadedFile);
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
        <div className="manufacturer-page">
            <h2>Manufacturer Page</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="doctorName">Doctor Name:</label>
                <input
                    type="text"
                    id="doctorName"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    required
                />
                <label htmlFor="medicineName">Medicine Name:</label>
                <input
                    type="text"
                    id="medicineName"
                    value={medicineName}
                    onChange={(e) => setMedicineName(e.target.value)}
                    required
                />
                <label htmlFor="appointmentDate">Appointment Date:</label>
                <input
                    type="date"
                    id="appointmentDate"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    required
                />
               
                <label htmlFor="fileUpload">Upload Product Information:</label>
                <div className="file-upload-container">
                    <input
                        type="file"
                        id="fileUpload"
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={handleFileUpload}
                        style={{ display: 'none' }} // Hide the original file input
                    />
                    <label htmlFor="fileUpload" className="file-upload-label">
                        <FontAwesomeIcon icon={faUpload} />
                        <span>Choose File</span>
                    </label>
                </div>
                <button type="submit">Make Appointment</button>
            </form>
            <button style={{float:"right", justifyContent:"end"}} onClick={handleSignOut} className="button">Sign Out</button>
        </div>
    );
};

export default ManufacturerPage;
