import {AxiosResponse} from 'axios';
import {getRequestWithJwt, postRequestWithJwt} from '.';
import {Post} from '../types/Models';

type CreatePostPayload = Partial<Post> & {userId: string};

export const createPost = async (
  // userId: string,
  payload: CreatePostPayload,
) => {
  return await postRequestWithJwt<CreatePostPayload, AxiosResponse<Post>>({
    urlPath: 'post',
    body: payload,
  });
};

export const getUserPosts = async (userId: string): Promise<Post[]> => {
  try {
    const {data} = await getRequestWithJwt<Post[]>(`post/${userId}`);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getFeedPosts = async () => {
  // const {data} = await postRequestWithJwt<CreatePostPayload, AxiosResponse<Post>>({
  //   urlPath:
  // })
};
