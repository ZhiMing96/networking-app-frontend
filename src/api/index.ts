import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from '../types/Models';

// export const baseUrl = 'https://networking-backend.kohzhiming.com';
export const baseUrl = 'http://localhost:3000';

interface PostRequestParams<B> {
  urlPath: string;
  body: B;
  config?: AxiosRequestConfig;
}

export const postRequestWithoutJwt = async <B, R>({
  urlPath,
  body,
  config,
}: PostRequestParams<B>): Promise<AxiosResponse<R>> => {
  return await axios.post<B, AxiosResponse<R>>(
    `${baseUrl}/${urlPath}`,
    body,
    config,
  );
};

export const getRequestWithJwt = async <R>(
  urlPath: string,
  config: AxiosRequestConfig = {},
) => {
  const token = await getJwtFromStorage();
  if (!token) {
    throw new Error('Missing token for user, please login again');
  }
  config.headers = {...config.headers, Authorization: `Bearer ${token}`};
  return await axios.get<R>(`${baseUrl}/${urlPath}`, config);
};

export const postRequestWithJwt = async <B, R>({
  urlPath,
  body,
  config = {},
}: PostRequestParams<B>): Promise<AxiosResponse<R>> => {
  const token = await getJwtFromStorage();
  if (!token) {
    throw new Error('Missing token for user, please login again');
  }
  config.headers = {...config.headers, Authorization: `Bearer ${token}`};
  console.log('---CONFIG: ', config.headers);
  return await axios.post<B, AxiosResponse<R>>(
    `${baseUrl}/${urlPath}`,
    body,
    config,
  );
};

export const getJwtFromStorage = async (): Promise<string | null> => {
  return await AsyncStorage.getItem('@access_token');
};

export const getUserFromStorage = async (): Promise<User> => {
  const userString = await AsyncStorage.getItem('@user_jwt');
  if (!userString) {
    throw new Error('No user object found in storage');
  }
  return JSON.parse(userString);
};
