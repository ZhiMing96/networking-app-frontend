import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import PostReply from '../Introductions/PostReply';
import CreateNewPost from './CreateNewPost';

import {
  CREATE_NEW_POST,
  PostFeedStackParamList,
  POST_REPLY,
  PUBLIC_FEEDS,
} from './navigationTypes';
import PublicFeeds from './PublicFeeds';

const Stack = createNativeStackNavigator<PostFeedStackParamList>();

const PostFeed = () => {
  return (
    <Stack.Navigator
      initialRouteName={PUBLIC_FEEDS}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={PUBLIC_FEEDS} component={PublicFeeds} />
      <Stack.Screen name={CREATE_NEW_POST} component={CreateNewPost} />
      <Stack.Screen name={POST_REPLY} component={PostReply} />
    </Stack.Navigator>
  );
};

export default PostFeed;
