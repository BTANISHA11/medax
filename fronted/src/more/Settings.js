// src/components/Settings.js
import React, { useState } from 'react';
import './Settings.css'; // Importing the CSS file for styling

const Settings = () => {
    const [email, setEmail] = useState('john.doe@example.com');
    const [password, setPassword] = useState('');
    const [notifications, setNotifications] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic for saving settings can be implemented here
        alert(`Settings updated!\nEmail: ${email}\nNotifications: ${notifications ? 'Enabled' : 'Disabled'}`);
    };

    return (
        <div className="settings-container">
            <h1 className="settings-title">Settings</h1>
            <form onSubmit={handleSubmit} className="settings-form">
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">New Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={notifications}
                            onChange={() => setNotifications(!notifications)}
                        />
                        Enable Notifications
                    </label>
                </div>
                <button type="submit" className="submit-button">Save Settings</button>
            </form>
        </div>
    );
};

export default Settings;