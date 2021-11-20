import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Post, User} from '../../types/Models';
import {
  PostFeedStackParamList,
  POST_REPLY,
  PUBLIC_FEEDS,
} from './navigationTypes';

interface Props {
  user: User;
  post: Post;
  navigation: NativeStackNavigationProp<
    PostFeedStackParamList,
    typeof PUBLIC_FEEDS
  >;
}

const FeedItem = ({user, post, navigation}: Props) => {
  const postReplyHandler = () => {
    navigation.navigate(POST_REPLY, {post, user});
  };
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.username}>{user.username}</Text>
      <Text style={styles.postContent}>{post.content}</Text>
      <View>
        <Pressable onPress={postReplyHandler} style={styles.replyButton}>
          <Text style={styles.replyBtnText}>Reply</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'dim grey',
    borderRadius: 5,
    padding: 10,
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  username: {fontSize: 18, fontWeight: '600', paddingBottom: 10},
  postContent: {fontSize: 14},
  replyButton: {
    width: 80,
    padding: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    borderColor: 'grey',
    backgroundColor: 'white',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  replyBtnText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default FeedItem;
