import axios from 'axios';
const baseURL = 'http://localhost:3001';

export default axios.create({
    baseURL: baseURL,
})

export const axiosPrivate = axios.create({
    baseURL: baseURL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})