import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.6:3001/api',
  headers: {'Access-Control-Allow-Origin': '*'}
});

export default api;

