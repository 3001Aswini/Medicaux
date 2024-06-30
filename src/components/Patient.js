import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { auth } from '../firebase-config';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

function Patient() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      navigate('/patient');
    }
  }, [user, navigate]);

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="authSection">
      <div className="container">
        <h2 className="header">Patient Login</h2>

        <form onSubmit={handleSubmit} className="form">
          <div className="formGroup">
            <label className="label">Username:</label>
            <input
              type="text"
              placeholder="Email..."
              className="input"
              onChange={(event) => {
                setLoginEmail(event.target.value);
              }}
            />
          </div>
          <div className="formGroup">
            <label className="label">Password:</label>
            <input
              type="password"
              placeholder="Password..."
              className="input"
              onChange={(event) => {
                setLoginPassword(event.target.value);
              }}
            />
          </div>
          <button type="submit" className="button">Login</button>
        </form>
        <p className="login-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Patient;