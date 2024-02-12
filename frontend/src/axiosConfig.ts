import axios, { AxiosInstance } from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001';

const instance: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': '*/*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': '*'
  },
});

export default instance;
