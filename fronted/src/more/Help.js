// src/components/Help.js
import React, { useState } from 'react';
import './Help.css'; // Importing the CSS file for styling

const Help = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic for submitting the help request can be implemented here
        alert(`Help request submitted!\nEmail: ${email}\nMessage: ${message}`);
        setEmail('');
        setMessage('');
    };

    return (
        <div className="help-container">
            <h1 className="help-title">Help & Support</h1>
            <div className="faq-section">
                <h2>Frequently Asked Questions</h2>
                <ul className="faq-list">
                    <li><strong>Q: How do I reset my password?</strong><br />A: You can reset your password by clicking on the "Forgot Password" link on the login page.</li>
                    <li><strong>Q: How do I contact support?</strong><br />A: You can contact support through the form below or email us at support@example.com.</li>
                    <li><strong>Q: Where can I find the user guide?</strong><br />A: The user guide is available in the "Documentation" section of our website.</li>
                </ul>
            </div>
            <div className="contact-form">
                <h2>Contact Us</h2>
                <form onSubmit={handleSubmit}>
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
                        <label htmlFor="message">Message:</label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Help;