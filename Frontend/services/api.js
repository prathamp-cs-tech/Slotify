import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

const API = axios.create({
    baseURL: 'http://169.254.230.46:3001/api',
});

API.interceptors.request.use(

  async (config) => {

    try {

      const token =
        await AsyncStorage.getItem(
          'token'
        );

      if (token) {

        config.headers.Authorization =
          `Bearer ${token}`;

      }

      return config;

    } catch (error) {

      console.log(error);

      return config;

    }

  },

  (error) => {

    return Promise.reject(error);

  }

);

export default API;