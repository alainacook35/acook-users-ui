import axios, { type AxiosInstance } from 'axios';
import { useMemo } from 'react';

const BASE_URL = 'http://localhost:8080';

const useAxios = (): AxiosInstance => {
  const instance = useMemo(() => {
    return axios.create({
      baseURL: BASE_URL,
    });
  }, []);

  return instance;
};

export default useAxios;