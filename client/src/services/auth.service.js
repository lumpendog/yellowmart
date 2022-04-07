import axios from 'axios';
import localStorageService from './local.storage.service';
import configFile from '../config.json';

const apiEndpoint =
  process.env.NODE_ENV === 'development'
    ? configFile.apiEndpointDevelopment
    : configFile.apiEndpointProduction;

const httpAuth = axios.create({
  baseURL: apiEndpoint + 'auth/'
});

const authService = {
  register: async (payload) => {
    const { data } = await httpAuth.post(`signUp`, payload);
    return data;
  },
  login: async (email, password) => {
    const { data } = await httpAuth.post(`signInWithPassword`, {
      email,
      password
    });
    return data;
  },
  refresh: async () => {
    const { data } = await httpAuth.post('token', {
      refresh_token: localStorageService.getRefreshToken()
    });
    return data;
  }
};

export default authService;
