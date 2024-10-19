import React, { useState } from 'react';
import { loginUser  } from '../api/api';
import { Link } from 'react-router-dom';
import './Login.css'; // Import the CSS file for styling

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState (null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await loginUser (username, password);
      localStorage.setItem('token', data.token); // Store token in local storage
      window.location.href = '/'; // Redirect to home or dashboard
    } catch (error) {
      setError(error.error || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
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
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <button type="submit">Login</button>
        {error && <div className="error">{error}</div>}
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;