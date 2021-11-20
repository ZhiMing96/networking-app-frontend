import AsyncStorage from '@react-native-async-storage/async-storage';

import {postRequestWithoutJwt, getRequestWithJwt} from './index';
import {JwtPayload} from '../types/Global';

interface LoginBody {
  username: string;
  password: string;
}

interface SignUpBody {
  username: string;
  password: string;
  emailAddress: string;
}

export type LoginResponse = JwtPayload & {access_token: string};
export type TokenVerificationResponse = JwtPayload & {access_token?: string};

export const login = async (loginCreds: LoginBody): Promise<JwtPayload> => {
  const response = await postRequestWithoutJwt<LoginBody, LoginResponse>({
    urlPath: 'app/login',
    body: loginCreds,
  });
  const {access_token, ...payload} = response.data;
  await saveJwtAndPayloadToStorage(access_token, payload);
  return payload;
};

export const signUp = async (signUpCreds: SignUpBody): Promise<JwtPayload> => {
  const response = await postRequestWithoutJwt<LoginBody, LoginResponse>({
    urlPath: 'app/signup',
    body: signUpCreds,
  });
  const {access_token, ...payload} = response.data;
  await saveJwtAndPayloadToStorage(access_token, payload);
  return payload;
};

export const checkToken = async (): Promise<TokenVerificationResponse> => {
  const {data} = await getRequestWithJwt<TokenVerificationResponse>('token');
  const {access_token, ...payload} = data;
  if (!access_token) {
    return payload;
  }

  await saveJwtAndPayloadToStorage(access_token, payload);
  return payload;
};

const saveJwtAndPayloadToStorage = async (
  access_token: string,
  user: JwtPayload,
) => {
  await AsyncStorage.setItem('@access_token', access_token);
  await AsyncStorage.setItem('@user_jwt', JSON.stringify(user));
};
