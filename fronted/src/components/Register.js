import React, { useState } from 'react';
import { registerUser } from '../api/api';
import { Link } from 'react-router-dom';
import './Register.css'; // Import the CSS file for styling

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Reset error message before submission

    try {
      const data = await registerUser({ username, email, password }); // Adjusted to send an object
      localStorage.setItem('token', data.token); // Store token in local storage
      window.location.href = '/'; // Redirect to home or dashboard
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed'); // Improved error handling
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        
        <button type="submit">Register</button>
        {error && <div className="error">{error}</div>}
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
