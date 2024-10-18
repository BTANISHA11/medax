// src/components/PatientDetails.js
import React from 'react';

const PatientDetails = ({ patient }) => {
    return (
        <div>
            <h2>Patient Details</h2>
            <p>Name: {patient.name}</p>
            <p>Age: {patient.age}</p>
            <p>Address: {patient.address}</p>
            {/* Add other patient details as needed */}
        </div>
    );
};

export default PatientDetails;