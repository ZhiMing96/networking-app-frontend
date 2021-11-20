import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {TmpUser} from './PostReply';

interface Props {
  user: TmpUser;
}

const IntroductionListItem = ({user}: Props) => {
  return (
    <View style={styles.mainContainer}>
      <Image style={styles.profileImage} source={{uri: user.profileUrl}} />
      <View>
        <Text>{user.userName}</Text>
        <Text>{user.shortDescription}</Text>
      </View>
      <Pressable style={styles.introButton}>
        <Text>Intro</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  profileImage: {
    backgroundColor: 'grey',
    borderRadius: 50,
    width: 35,
    height: 35,
  },
  introButton: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: 'center',
  },
});

export default IntroductionListItem;
