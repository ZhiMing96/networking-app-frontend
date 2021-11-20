import {PostReplyProps} from '../Introductions/PostReply';

export const CREATE_NEW_POST = 'New Post';
export const PUBLIC_FEEDS = 'Feeds';
export const POST_REPLY = 'POST_REPLY';

export type PostFeedStackParamList = {
  [CREATE_NEW_POST]: undefined;
  [POST_REPLY]: PostReplyProps;
  [PUBLIC_FEEDS]: {sort: 'latest' | 'top'} | undefined;
};
