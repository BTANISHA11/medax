// src/components/Profile.js
import React, { useState } from 'react';
import './Profile.css'; // Importing the CSS file for styling

const Profile = () => {
    const [user, setUser ] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        bio: 'Software Developer at XYZ Company',
    });

    const handleEdit = () => {
        // Logic for editing user information can be implemented here
        alert('Edit functionality to be implemented!');
    };

    return (
        <div className="profile-container">
            <h1 className="profile-title">Profile</h1>
            <div className="profile-info">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Bio:</strong> {user.bio}</p>
            </div>
            <button className="edit-button" onClick={handleEdit}>Edit Profile</button>
        </div>
    );
};

export default Profile;