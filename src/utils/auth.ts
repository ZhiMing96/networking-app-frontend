import AsyncStorage from '@react-native-async-storage/async-storage';
import {checkToken} from '../api/auth';

export const getIsLoggedInStatus = async () => {
  const token = await AsyncStorage.getItem('@access_token');
  if (!token) {
    return false;
  }
  try {
    await checkToken();
    return true;
  } catch (e) {
    return false;
  }
};
