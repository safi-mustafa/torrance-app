import axios from 'react-native-axios';
import Constants from 'expo-constants';

import { getKey, saveKey } from '../utility';
import { BASE_URL } from './../constants/Misc';

let navigate;
export const setNavigate = func => {
  navigate = func;
};

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 3000,
});

client.interceptors.request.use(
  async function (config) {
    let userMeta = await getKey('user');
    if (userMeta) {
      userMeta = JSON.parse(userMeta);
    }
    if (userMeta?.token)
      config.headers.Authorization = `Bearer ${userMeta?.token}`;

    config.headers['VersionHeader'] = 'X-Version';
    config.headers["X-Version"] = Constants.expoConfig.version;//"1.0.27";

    return config;
  },
  function (error) {
    console.log("🚀 ~ file: api-client.js:32 ~ error:", error)
    // Do something with request error
    if (error.response && error.response.status === 401) {
      navigate('Login');
    }
    return Promise.reject(error);
  }
);

// Add a response interceptor
client.interceptors.response.use(
  function (response) {
    // console.log("🚀 ~ file: api-client.js:44 ~ response:", response)
    // Do something with response data
    return response;
  },
  function (error) {
    if(error){
      const err = JSON.parse(JSON.stringify(error))
      if(err?.response?.status === 401){
        saveKey("user", "");
        navigate('Login');
        return;
      }
    }
    // Do something with response error
    return Promise.reject(error);
  }
);

export default client;
