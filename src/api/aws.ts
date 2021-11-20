import axios from 'axios';
import {getRequestWithJwt} from '.';

export const getProfileImgUploadLink = async () => {
  const {data} = await getRequestWithJwt<string>('aws/profileImgLink');
  console.log('url: ', data);
  return data;
};

export const uploadProfileImage = async (
  s3UploadLink: string,
  formData: any,
) => {
  console.log('Uploading to s3');
  const {data} = await axios.put(s3UploadLink, formData, {
    headers: {'Content-Type': 'image/jpeg'},
  });
  console.log('Uploaded to s3');
  console.log(data);
};
