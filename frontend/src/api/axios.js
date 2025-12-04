import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
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