import axios from 'axios';

const API_URL = 'http://localhost:5000';  // כתובת ה-API שלך

// פונקציה לכניסת משתמש
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// פונקציה לרישום משתמש
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};

// פונקציה להוספת משמרת
export const addShift = async (shiftData) => {
  try {
    const response = await axios.post(`${API_URL}/shifts`, shiftData);
    return response.data;
  } catch (error) {
    console.error("Error adding shift:", error);
    throw error;
  }
};
