import axios from 'axios';

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5001') + '/api/auth';

export const registerUser = async (userData: any) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};

export const loginUser = async (credentials: any) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
};

export const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};
