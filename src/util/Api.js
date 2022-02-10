import axios from 'axios';
import { URL_BASE_LOCAL } from '../constants/Config';

export const httpClient = axios.create({
  baseURL: URL_BASE_LOCAL, //YOUR_API_URL HERE
  headers: {
    'Content-Type': 'application/json',
  },
});
