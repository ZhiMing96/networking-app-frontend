import Toast from 'react-native-toast-message';

export enum ToastType {
  SUCCESS = 'success',
  INFO = 'info',
  ERROR = 'error',
}

export const showToast = (
  title: string,
  toastMessage: string,
  type: ToastType,
) => {
  Toast.show({
    type,
    text1: title,
    text2: toastMessage,
  });
};
