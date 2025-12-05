import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    console.log('Interceptor - Token:', token ? 'EXISTS' : 'NULL');
    
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
        console.log('Interceptor - Added header:', config.headers.Authorization);
    } else {
        console.log('Interceptor - NO TOKEN FOUND!');
    }
    
    return config;
});

export default api;