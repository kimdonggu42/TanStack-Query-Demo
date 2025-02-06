import axios, { AxiosRequestConfig } from 'axios';
import { baseUrl } from '@/pages/lazy-days/axiosInstance/constants';

export const getJWTHeader = (userToken: string | null | undefined): Record<string, string> => {
  return { Authorization: `Bearer ${userToken}` };
};

const config: AxiosRequestConfig = { baseURL: baseUrl };
export const axiosInstance = axios.create(config);
