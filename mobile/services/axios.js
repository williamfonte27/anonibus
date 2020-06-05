import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://us-central1-anonibus-23bbf.cloudfunctions.net',
  baseURL: ' https://us-central1-anonibus-sw27.cloudfunctions.net',
});

export default api;
