import axios, { type AxiosError } from 'axios';
import Cookies from 'js-cookie';

import { CookieKeys } from '@/plugins/data/cookies';
import { store } from '@/store';
import { pushNotification } from '@/store/modules/root';

export type BaseResponse<T = null> = {
  data: T;
};
type ServerError = {
  error: string;
  message: string;
  statusCode: number;
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API + '/api',
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json'
  },
  responseEncoding: 'utf-8',
  responseType: 'json'
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get(CookieKeys.USER_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error: AxiosError<ServerError>) => {
    const serverData = error.response?.data;
    let message = '';
    switch (error.status) {
      case 400:
        message =
          'Algo no ha ido como debería, revisa todos los campos e inténtalo de nuevo. Si el error persiste contacta con el administrador.';
        break;
      case 401:
        message = 'Usuario no autenticado.';
        window.localStorage.clear();
        Cookies.remove(CookieKeys.USER_TOKEN);
        window.location.href = '/login';
        break;
      case 403:
        message = 'Usuario no autorizado.';
        break;
      case 404:
        message = 'Recurso no disponible.';
        break;
      case 500:
        message = 'Servicio no disponible en estos momentos. Por favor, inténtalo de nuevo más tarde.';
        break;
      default:
        message = serverData ? serverData.message : 'Unknown Error';
        break;
    }
    store.dispatch(pushNotification({ type: 'error', message }));
  }
);

export default axiosInstance;
