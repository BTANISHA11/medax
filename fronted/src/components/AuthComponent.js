// src/components/AuthComponent.js
import React, { useState } from 'react';
import { loginUser , registerUser  } from '../api/api';
import { Link } from 'react-router-dom';
import './AuthComponent.css'; // Import the CSS file

const AuthComponent = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [isRegistering, setIsRegistering] = useState(true); // Toggle between register and login

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegister = async () => {
        try {
            const data = await registerUser (formData);
            console.log('Registration successful:', data);
            // Handle successful registration (e.g., redirect, show success message)
        } catch (err) {
            setError(err.message); // Set the error message for display
        }
    };

   const handleLogin = async () => {
    try {
        const data = await loginUser ({ email: formData.email, password: formData.password });
        console.log('Login successful:', data);
        setFormData({ name: '', email: '', password: '' }); // Reset form data
        setError(''); // Clear any previous error messages
        // Handle successful login (e.g., store token, redirect)
    } catch (err) {
        console.error('Login error:', err); // Log the entire error object
        const errorMessage = err.response ? err.response.data.message : 'An error occurred';
        setError(errorMessage); // Set the error message for display
    }
};

    return (
        <div className="auth-container">
            <h2>{isRegistering ? 'Register' : 'Login'}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={(e) => { e.preventDefault(); isRegistering ? handleRegister() : handleLogin(); }}>
                {isRegistering && (
                    <div>
                        <label>
                            Name:
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                        </label>
                    </div>
                )}
                <div>
                    <label>
                        Email:
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </label>
                </div>
                <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
                <button type="button" className="toggle-button" onClick={() => setIsRegistering(!isRegistering)}>
                    Switch to {isRegistering ? 'Login' : 'Register'}
                </button>
            </form>
        </div>
    );
};

export default AuthComponent;