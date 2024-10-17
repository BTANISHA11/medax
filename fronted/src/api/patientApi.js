import axios from 'axios';

const API_URL = 'http://localhost:5000/api/patients';
const AUTHORIZATION_URL = 'http://localhost:5000/api/authorization-requests'; // Separate URL for authorization requests

export const getPatients = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createPatient = async (patientData) => {
    const response = await axios.post(API_URL, patientData);
    return response.data;
};

export const submitAuthorization = async (authData) => {
    const response = await axios.post(AUTHORIZATION_URL, authData); // Use the correct authorization URL
    return response.data;
};