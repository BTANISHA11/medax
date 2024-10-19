import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auths';

// Login API call
export const loginUser = async (loginData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, loginData);
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
};

// Register API call
export const registerUser = async (registerData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, registerData);
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
};
