export const POST_FEED = 'POST_FEED';
export const PROFILE = 'PROFILE';
export const LOGIN_OR_SIGN_UP = 'LOGIN_OR_SIGN_UP';
export const DEFAULT_HOME = 'DEFAULT_HOME';

export type RootStackParamList = {
  [POST_FEED]: {sort: 'latest' | 'top'} | undefined;
  [PROFILE]: undefined;
  [DEFAULT_HOME]: undefined;
  [LOGIN_OR_SIGN_UP]: undefined;
};
