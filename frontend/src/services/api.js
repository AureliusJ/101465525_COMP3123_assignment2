import axios from 'axios';

const API = axios.create({
    baseURL: 'http://host.docker.internal:5000/api',
});

// Add token to requests for authenticated routes
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

// Named Exports
export const loginUser = (data) => API.post('/users/login', data);
export const signupUser = (data) => API.post('/users/signup', data);
export const fetchEmployees = (query = '') => API.get(`/employees${query}`);
export const fetchEmployeeById = (id) => API.get(`/employees/${id}`);
export const addEmployee = (data) => API.post('/employees', data);
export const updateEmployee = (id, data) => API.put(`/employees/${id}`, data);
export const deleteEmployee = (id) => API.delete(`/employees/${id}`);
