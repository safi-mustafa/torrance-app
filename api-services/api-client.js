import axios from 'react-native-axios';
import { getKey } from '../utility';
import {BASE_URL} from './../constants/Misc';

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 3000,
});

// Add a request interceptor
client.interceptors.request.use(
  async function (config) {
    let userMeta = await getKey('user');
    if (userMeta) {
      userMeta = JSON.parse(userMeta);
    }
    if (userMeta?.token)
      config.headers.Authorization = `Bearer ${userMeta?.token}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
client.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default client;
