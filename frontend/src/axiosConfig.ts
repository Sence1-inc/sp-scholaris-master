import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5001',
  timeout: 10000,
  headers: {
    'Content-Type': '*/*',
    'Access-Control-Allow-Origin': 'http://localhost:5001',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
  },
});

export default instance;
