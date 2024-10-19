import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auths';

// Register API call
export const registerUser  = async (registerData) => {
  try {
      const response = await axios.post(`${API_URL}/register`, registerData);
      return response.data; // Return the token or any other data you need
  } catch (error) {
      // Check if error response exists and handle it
      if (error.response && error.response.data && error.response.data.message) {
          throw new Error(error.response.data.message); // Throw a new error with the message
      } else {
          throw new Error('An unexpected error occurred during registration.'); // General error message
      }
  }
};

// Login API call
export const loginUser  = async (loginData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, loginData);
        return response.data; // Return the token or any other data you need
    } catch (error) {
        // Check if error response exists and handle it
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message); // Throw a new error with the message
        } else {
            throw new Error('An unexpected error occurred during login.'); // General error message
        }
    }
};
