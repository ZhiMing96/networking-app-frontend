import React, {useState} from 'react';
import {
  Keyboard,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {createPost} from '../../api/posts';
import {getUserFromStorage} from '../../api';
import {showToast, ToastType} from '../../utils/toastMessage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  CREATE_NEW_POST,
  PostFeedStackParamList,
  PUBLIC_FEEDS,
} from './navigationTypes';
type Props = NativeStackScreenProps<
  PostFeedStackParamList,
  typeof CREATE_NEW_POST
>;
const CreateNewPost = ({navigation}: Props) => {
  const [postContentInput, setPostContentInput] = useState('');

  const submitForm = async () => {
    try {
      await createPost({
        content: postContentInput,
        userId: (await getUserFromStorage()).id,
      });
      showToast('Posted Successfully', '', ToastType.SUCCESS);
      navigation.navigate(PUBLIC_FEEDS);
    } catch (err) {
      console.error(err);
      showToast('Something went wrong', 'please try again', ToastType.ERROR);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.mainComponent}>
        <View style={styles.inputContainer}>
          <TextInput
            multiline
            style={styles.textInput}
            onChangeText={setPostContentInput}
            value={postContentInput}
            placeholder="Type Something"
          />
        </View>
        <Pressable onPress={submitForm} style={styles.submitButton}>
          <Text style={styles.submitText}>Submit</Text>
        </Pressable>
        {/* <Button
          title="Go To Feed"
          onPress={() => navigation.navigate(PUBLIC_FEEDS)}
        /> */}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  mainComponent: {
    flex: 1,
    margin: 12,
    justifyContent: 'space-between',
  },
  inputContainer: {padding: 10},
  textInput: {
    margin: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  submitButton: {
    width: 100,
    padding: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 10,
    borderColor: 'grey',
    backgroundColor: 'white',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  submitText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'dimgrey',
  },
});

export default CreateNewPost;
