import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {FlatList, Pressable, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getUserFromStorage} from '../../api';
import {checkToken} from '../../api/auth';
import {getUserPosts} from '../../api/posts';
import {getAllUserDetails} from '../../api/user';
import {Post, User} from '../../types/Models';
import {showToast, ToastType} from '../../utils/toastMessage';
import FeedItem from './FeedItem';
import {
  CREATE_NEW_POST,
  PostFeedStackParamList,
  PUBLIC_FEEDS,
} from './navigationTypes';
type Props = NativeStackScreenProps<
  PostFeedStackParamList,
  typeof PUBLIC_FEEDS
>;
const PublicFeeds = ({navigation}: Props) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    (async () => {
      try {
        let userId = (await getUserFromStorage()).id;
        if (!userId) {
          await checkToken();
          userId = (await getUserFromStorage()).id;
        }
        setPosts(await getUserPosts(userId));
      } catch (err: any) {
        console.log(err);
        showToast('An Error Occurred', err.message, ToastType.ERROR);
      }
    })();
    (async () => {
      try {
        const userData = await getAllUserDetails();
        setUsers(userData);
      } catch (err: any) {
        console.log(err);
        showToast('An Error Occurred', err.message, ToastType.ERROR);
      }
    })();
  }, []);

  const renderFeedItem = (item: Post): JSX.Element => {
    const userObj = users.find(({id}) => id === item.userId);
    if (!userObj) {
      return <></>;
    }
    return <FeedItem user={userObj} post={item} navigation={navigation} />;
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.headerText}>Feed</Text>

      <FlatList
        data={posts}
        renderItem={({item}) => renderFeedItem(item)}
        keyExtractor={item => item.id}
      />
      <Pressable
        style={styles.createPostBtn}
        onPress={() => navigation.navigate(CREATE_NEW_POST)}>
        <Text>Create Post</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 15,
    paddingHorizontal: 30,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  createPostBtn: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default PublicFeeds;
