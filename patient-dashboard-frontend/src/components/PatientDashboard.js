import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PatientDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      const res = await axios.get('/api/patients');
      setPatients(res.data);
    };
    fetchPatients();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl">Patient Dashboard</h2>
      <div className="flex space-x-4">
        <div className="w-1/3">
          <ul>
            {patients.map(patient => (
              <li key={patient._id} onClick={() => setSelectedPatient(patient)} className="cursor-pointer">
                {patient.name} (Age: {patient.age})
              </li>
            ))}
          </ul>
        </div>
        <div className="w-2/3">
          {selectedPatient && (
            <div>
              <h3>{selectedPatient.name}</h3>
              <p>Age: {selectedPatient.age}</p>
              <p>Condition: {selectedPatient.condition}</p>
              {/* Add more patient details */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
