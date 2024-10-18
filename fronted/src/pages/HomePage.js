// /src/pages/HomePage.js
import React, { useState } from 'react';
import PatientDashboard from '../components/PatientDashboard';
import PriorAuthorizationForm from '../components/PriorAuthorizationForm';

const HomePage = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);

  return (
    <div className="container mx-auto p-4">
      {!selectedPatient ? (
        <PatientDashboard onSelectPatient={setSelectedPatient} />
      ) : (
        <PriorAuthorizationForm patient={selectedPatient} />
      )}
      
    </div>
  );
};

export default HomePage;
