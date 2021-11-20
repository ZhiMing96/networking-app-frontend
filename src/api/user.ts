import {getRequestWithJwt} from '.';
import {User} from '../types/Models';
import {Uuid} from '../types/Utils';

export const getUserDetails = async (userId: Uuid): Promise<User> => {
  const {data} = await getRequestWithJwt<User>(`user/${userId}`);
  return data;
};
export const getAllUserDetails = async (): Promise<User[]> => {
  const {data} = await getRequestWithJwt<User[]>('user');
  return data;
};
