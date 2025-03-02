import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;
console.log('Base URL:', baseURL);
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 1000
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error) => Promise.reject(error)
)

api.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
)

export default api;