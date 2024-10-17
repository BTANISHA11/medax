// src/components/PatientDashboard.js
import React, { useEffect, useState } from 'react';
import { getPatients } from '../api/patientApi';
import Navbar from './Navbar';

const PatientDashboard = () => {
    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);

    useEffect(() => {
        const fetchPatients = async () => {
            const patientsData = await getPatients();
            setPatients(patientsData);
        };
        fetchPatients();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handlePatientClick = (patient) => {
        setSelectedPatient(patient);
    };

    const handleBack = () => {
        setSelectedPatient(null);
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6">Patient Health Dashboard</h1>
                <input
                    type="text"
                    placeholder="Search Patients"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="border rounded p-2 mb-4 w-full"
                />
                {!selectedPatient ? (
                    <>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredPatients.map(patient => (
                                <li
                                    key={patient._id}
                                    className="border rounded-lg shadow-lg p-4 bg-white hover:bg-gray-100 transition duration-200 cursor-pointer"
                                    onClick={() => handlePatientClick(patient)}
                                >
                                    <h2 className="text-xl font-semibold">{patient.name}</h2>
                                    <p className="text-gray-700">Age: {patient.age}</p>
                                    <p className="text-gray-500">Condition: {patient.condition || 'N/A'}</p>
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <h2 className="text-2xl font-semibold mb-4">{selectedPatient.name}</h2>
                        <button
                            onClick={handleBack}
                            className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded mb-4"
                        >
                            Back to Patients List
                        </button>
                        <h3 className="text-lg font-semibold">Health Records:</h3>
                        <p><strong>Past Treatments:</strong> {selectedPatient.pastTreatments || 'N/A'}</p>
                        <p><strong>Medication History:</strong> {selectedPatient.medicationHistory || 'N/A'}</p>
                        <p><strong>Lab Results:</strong> {selectedPatient.labResults || 'N/A'}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientDashboard;