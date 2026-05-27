import axios from 'axios';

import AsyncStorage
from '@react-native-async-storage/async-storage';

const API = axios.create({

  baseURL:
    'http://172.20.10.3:3001/api',

  timeout: 10000,

});

API.interceptors.request.use(

  async (config) => {

    try {

      console.log(
        'REQUEST URL:',
        config.baseURL + config.url
      );

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

  }

);

export default API;