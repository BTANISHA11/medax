import axios from 'axios';

// Base URLs for Patients and Authorization Requests
const API_URL = 'http://localhost:5000/api/patients';
const AUTHORIZATION_URL = 'http://localhost:5000/api/authorization'; // Separate URL for authorization requests

// Function to fetch all patients
export const getPatients = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching patients:', error.response?.data || error.message);
        throw error.response?.data || error; // Rethrow the error for further handling
    }
};

// Function to create a new patient
export const createPatient = async (patientData) => {
    try {
        const response = await axios.post(API_URL, patientData);
        return response.data;
    } catch (error) {
        console.error('Error creating patient:', error.response?.data || error.message);
        throw error.response?.data || error; // Rethrow the error for further handling
    }
};

// Function to add a new patient (consolidated with createPatient)
export const addPatient = createPatient; // Reuses createPatient function

// Function to submit prior authorization requests
export const submitAuthorization = async (authData) => {
    try {
        console.log('Submitting authorization with data:', authData); // Log the data being submitted
        const response = await axios.post(AUTHORIZATION_URL, authData);
        return response.data;
    } catch (error) {
        console.error('Error submitting authorization:', error.response?.data || error.message);
        throw error.response?.data || error; // Rethrow the error for further handling
    }
};