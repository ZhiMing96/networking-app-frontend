import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Post, User} from '../../types/Models';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {PostFeedStackParamList, POST_REPLY} from '../PostFeed/navigationTypes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import IntroductionListItem from './IntroductionListItem';

type NavigationProps = NativeStackScreenProps<
  PostFeedStackParamList,
  typeof POST_REPLY
>;

export interface PostReplyProps {
  post: Post;
  user: User;
}

export interface TmpUser {
  userId: string;
  userName: string;
  shortDescription: string;
  profileUrl: string;
}

const PostReply = ({route, navigation}: NavigationProps) => {
  const {post, user} = route.params;
  const [introSuggestions] = useState<TmpUser[]>([
    {
      userId: '12345',
      userName: 'Peter',
      shortDescription: 'software engineer @ Google',
      profileUrl:
        'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    {
      userId: '67890',
      userName: 'Peter',
      shortDescription: 'software engineer @ Google',
      profileUrl:
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    {
      userId: '325r3246',
      userName: 'Peter',
      shortDescription: 'software engineer @ Google',
      profileUrl:
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
  ]);

  post.tags = [
    {name: 'Entrepreneurship'},
    {name: 'Finance'},
    {name: 'Software Engineering'},
  ];

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Icon
          name="angle-left"
          size={20}
          color="black"
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.headerSecondaryContainer}>
          <Image
            style={styles.profilePicture}
            source={{
              uri: 'https://images.unsplash.com/photo-1466112928291-0903b80a9466?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80',
            }}
          />
          <View>
            <Text style={styles.headerPrimaryText}>{user.username}</Text>
            <Text style={styles.headerSecondaryText}>
              {/* {route.params.user.shortDescription} */}
              Engineer @ Google
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.mainBodyContainer}>
        <Text style={styles.postContent}>{post.content}</Text>
        <View style={styles.tagsSection}>
          {post.tags.map(({name}) => (
            <Text key={name} style={styles.tag}>
              {name}
            </Text>
          ))}
        </View>
        <View style={styles.suggestionsContainer}>
          <Text style={styles.headerPrimaryText}>Suggestions</Text>
          {introSuggestions.map(user => (
            <IntroductionListItem key={user.userId} user={user} />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
  },
  backBtn: {alignSelf: 'center'},
  profilePicture: {
    backgroundColor: 'grey',
    borderRadius: 50,
    width: 50,
    height: 50,
    marginHorizontal: 20,
  },
  headerSecondaryContainer: {flexDirection: 'row'},
  headerPrimaryText: {fontSize: 20, fontWeight: 'bold', marginBottom: 10},
  headerSecondaryText: {fontSize: 14, fontWeight: '600', color: 'dimgrey'},
  mainBodyContainer: {marginHorizontal: 30},
  postContent: {
    marginVertical: 20,
    fontSize: 14,
    fontWeight: '500',
  },
  tagsSection: {flexDirection: 'row', flexWrap: 'wrap'},
  tag: {
    paddingHorizontal: 7,
    paddingVertical: 5,
    // borderWidth: 1,
    marginRight: 5,
    marginVertical: 3,
    borderRadius: 12,
    fontSize: 12,
    color: 'white',
    backgroundColor: 'dimgrey',
    overflow: 'hidden',
  },
  suggestionsContainer: {
    marginVertical: 20,
  },
});

export default PostReply;
