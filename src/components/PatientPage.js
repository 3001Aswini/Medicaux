import React, { useState, useEffect } from 'react';
import './PatientPage.css';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth'; // Import signOut from firebase/auth
import { auth } from '../firebase-config'; // Import your Firebase config

const PatientPage = () => {
  // State to hold prescribed medicines and appointment request form data
  const [medicines, setMedicines] = useState([]);
  const [appointmentData, setAppointmentData] = useState({
    doctor: '',
    date: '',
    time: '',
    reason: ''
  });
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false); // State to manage dropdown visibility
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const [lastVisit, setLastVisit] = useState(null); // State to hold details of last visit
  const navigate = useNavigate();

  

  useEffect(() => {
    const doctorList = [
      'Dr. John Doe',
      'Dr. Jane Smith',
      'Dr. William Brown',
      'Dr. Emily Davis',
    ];
    setDoctors(doctorList);
  }, []);

  useEffect(() => {
    setFilteredDoctors(
      doctors.filter(doctor =>
        doctor.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, doctors]);

  // Mock function to fetch last visit details (replace with actual logic)
  const fetchLastVisit = () => {
    // Simulated data for last visit (replace with actual fetch logic)
    const mockLastVisit = {
      id: 1,
      date: '2024-06-27',
      doctor: 'Dr. John Doe',
      prescribedMedicines: ['Dolo', 'Azithromycin'],
    };
    setLastVisit(mockLastVisit);
  };

  useEffect(() => {
    fetchLastVisit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handler for opening the modal with last visit details
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Handler for closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Handler for appointment form submission
  const handleAppointmentSubmit = (event) => {
    event.preventDefault();
    console.log('Appointment data:', appointmentData);

    fetch('/api/submit-appointment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      setAppointmentData({ date: '', time: '', reason: '', doctor: '' });
      setSearchTerm('');
      setShowModal(false); // Close modal on successful submission
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  // Handler for appointment form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAppointmentData({ ...appointmentData, [name]: value });
  };

  // Handler for selecting a doctor from dropdown
  const handleDoctorSelect = (doctor) => {
    setAppointmentData({ ...appointmentData, doctor });
    setSearchTerm(doctor);
    setShowDropdown(false);
  };

  // Handler for signing out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  };

  return (
    <div className="PatientPage">
      <h1>Welcome to Your Patient Page</h1>

      
      {lastVisit && (
        <div className="last-visit-details">
          
          <h2>Prescribed Medicines:</h2>
          <ul>
            {lastVisit.prescribedMedicines.map((medicine, index) => (
              <li key={index}>{medicine}</li>
            ))}
          </ul>
          <button onClick={handleOpenModal}>View Details</button>
        </div>
      )}

      {/* Modal for Last Visit Details */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>Last Visit Details</h2>
            <p>Date: {lastVisit.date}</p>
            <p>Doctor: {lastVisit.doctor}</p>
            
          </div>
        </div>
      )}

      <h2>Request Appointment</h2>
      <form onSubmit={handleAppointmentSubmit}>
        <label>
          Doctor:
          <div className="doctor-search">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowDropdown(true);
              }}
              placeholder="Search doctor"
            />
            {showDropdown && (
              <ul className="doctor-dropdown">
                {filteredDoctors.map((doctor, index) => (
                  <li
                    key={index}
                    onClick={() => handleDoctorSelect(doctor)}
                    className="doctor-option"
                  >
                    {doctor}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </label>
        <br />
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={appointmentData.date}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Time:
          <input
            type="time"
            name="time"
            value={appointmentData.time}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Reason for Appointment:</label>
          <textarea
            name="reason"
            value={appointmentData.reason}
            onChange={handleInputChange}
            required
          />
      
        <br />
        <button type="submit">Submit Appointment Request</button>
      </form>

      <button style={{ float: "right" }} onClick={handleSignOut} className="button">Sign Out</button>
    </div>
  );
};

export default PatientPage;
