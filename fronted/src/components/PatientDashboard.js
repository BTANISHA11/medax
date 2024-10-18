import React, { useEffect, useState } from 'react';
import { getPatients, addPatient } from '../api/patientApi'; // Adjust this import based on your API structure
// import Navbar from './Navbar'; // Ensure you have a Navbar component
// import Footer from './Footer'; // Import the Footer component

const PatientDashboard = () => {
    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [error, setError] = useState(null);
    const [newPatientName, setNewPatientName] = useState(''); // State for new patient name

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const patientsData = await getPatients();
                console.log('Fetched patients data:', patientsData);
                setPatients(patientsData);
            } catch (error) {
                console.error('Error fetching patients:', error);
                setError('Error fetching patients. Please try again later.');
            }
        };
        fetchPatients();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredPatients = patients.filter(patient =>
        patient.name && patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handlePatientClick = (patient) => {
        setSelectedPatient(patient);
    };

    const handleBack = () => {
        setSelectedPatient(null);
    };

    const handleNewPatientChange = (e) => {
        setNewPatientName(e.target.value); // Update state with new patient name
    };

    const handleAddPatient = async () => {
        if (newPatientName.trim()) {
            try {
                const newPatient = { name: newPatientName }; // Create new patient object
                await addPatient(newPatient); // Assuming addPatient sends the new patient data to the API
                setPatients([...patients, newPatient]); // Update the local state
                setNewPatientName(''); // Clear the input field
            } catch (error) {
                console.error('Error adding patient:', error);
                setError('Error adding patient. Please try again later.');
            }
        }
    };

    return (
        <div>
            
            <div className="container mx-auto p-4">
                {error ? (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        <span className="block sm:inline">{error}</span>
                    </div>
                ) : (
                    <>
                        <h1 className="text-3xl font-bold mb-6">Patient Health Dashboard</h1>
                        <input
                            type="text"
                            placeholder="Search Patients"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="border rounded p-2 mb-4 w-full"
                        />
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="New Patient Name"
                                value={newPatientName}
                                onChange={handleNewPatientChange}
                                className="border rounded p-2 mr-2"
                            />
                            <button
                                onClick={handleAddPatient}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                            >
                                Add Patient
                            </button>
                        </div>
                        {!selectedPatient ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredPatients.map((patient) => (
                                    <div
                                        key={patient._id}
                                        onClick={() => handlePatientClick(patient)}
                                        className="cursor-pointer bg-white shadow-md rounded p-4"
                                    >
                                        <h3 className="text-xl font-bold">{patient.name}</h3>
                                        <p>{patient.age ? `Age: ${patient.age}` : 'Age: N/A'}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                <h2 className="text-2xl font-semibold mb-4">{selectedPatient.name}</h2>
                                <button
                                    onClick={handleBack}
                                    className="bg-gray-300 hover:bg-gray- 400 text-black font-bold py-2 px-4 rounded mb-4"
                                >
                                    Back to Patients List
                                </button>
                                <h3 className="text-lg font-semibold">Health Records:</h3>
                                <p><strong>Past Treatments:</strong> {selectedPatient.pastTreatments || 'N/A'}</p>
                                <p><strong>Medication History:</strong> {selectedPatient.medicationHistory || 'N/A'}</p>
                                <p><strong>Lab Results:</strong> {selectedPatient.labResults || 'N/A'}</p>
                            </div>
                        )}
                    </>
                )}
            </div>
            
        </div>
    );
};

export default PatientDashboard;