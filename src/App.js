import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import Admin from './components/Admin';
import Doctor from './components/Doctor';
import Patient from './components/Patient';
import Aboutus from './components/Aboutus';
import Signup from './components/Signup';
import Community from './components/Community'
import DoctorPage from './components/DoctorPage';
import PatientPage from './components/PatientPage';
import ManufacturerPage from './components/ManufacturerPage.js';

import './App.css'; // Import the CSS file
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

function App() {
  return (
    <Router>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="nav-logo">
            Médicaux
          </Link>
          <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/signup" className="nav-link">Sign Up</Link>
          <Link to="/community" className="nav-link">Community</Link>
            <Link to="/about" className="nav-link">About Us</Link>
            
          </div>
        </div>
      </nav>

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/manufacturer-login" element={<Admin />} />
          <Route path="/doctor-login" element={<Doctor />} />
          <Route path="/patient-login" element={<Patient />} />
          {/* Add additional routes for About Us and Sign Up */}
          <Route path="/community" element={<Community/>} />
          <Route path="/about" element={<Aboutus/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/doctor" element={<DoctorPage/>} />
          <Route path="/patient" element={<PatientPage/>} />
          <Route path="/manufacturer" element={<ManufacturerPage/>} />
        </Routes>

        <div className="nav-container">
          <pre>
            <h1 className="medicaux-heading">Médicaux</h1>
            <div className="nav-buttons">
            <h2 >Continue as</h2>
            
            
              
              <Link to="/doctor-login" className="nav-button">
                <i className="fas fa-user-md nav-icon"></i>
                Doctor
              </Link>
              <Link to="/patient-login" className="nav-button">
                <i className="fas fa-user nav-icon"></i>
                Patient
              </Link>
              <Link to="/manufacturer-login" className="nav-button">
                <i className="fas fa-user-shield nav-icon"></i>
                Manufacturer
              </Link>
            </div>
          </pre>
        </div>
      </div>
    </Router>
  );
}

export default App;
