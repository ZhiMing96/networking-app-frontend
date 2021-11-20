import React, {useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import isEmail from 'validator/lib/isEmail';
import {showToast, ToastType} from '../../utils/toastMessage';
import {login, signUp} from '../../api/auth';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  DEFAULT_HOME,
  LOGIN_OR_SIGN_UP,
  RootStackParamList,
} from '../rootNavigationTypes';

type Props = NativeStackScreenProps<
  RootStackParamList,
  typeof LOGIN_OR_SIGN_UP
>;

const LoginOrSignUp = ({navigation}: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const resetInputs = () => {
    setUsername('');
    setPassword('');
    setEmailAddress('');
  };

  const toggleLogin = () => {
    resetInputs();
    setIsLogin(true);
  };
  const toggleSignUp = () => {
    resetInputs();
    setIsLogin(false);
  };

  const loginHandler = async () => {
    try {
      await login({username: username.toLowerCase(), password});
      navigation.navigate(DEFAULT_HOME);
    } catch (err: any) {
      console.log(err);
      showToast('Login Failed', err.message, ToastType.ERROR);
    }
  };
  const signUpHandler = async () => {
    if (!isEmail(emailAddress)) {
      showToast('Invalid Email', 'eg. example@email.com', ToastType.ERROR);
      return;
    }
    try {
      await signUp({
        username: username.toLowerCase(),
        password,
        emailAddress: emailAddress.toLowerCase(),
      });
      navigation.navigate(DEFAULT_HOME);
    } catch (err: any) {
      console.log(err);
      showToast('Sign up Failed', err.message, ToastType.ERROR);
    }
  };

  const handleSubmit = async () => {
    if (isLogin) {
      return await loginHandler();
    }
    return await signUpHandler();
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.mainContainer}>
          <View style={styles.headerContainer}>
            <Text
              style={isLogin ? styles.headerSelectedText : styles.headerText}
              onPress={toggleLogin}>
              Login
            </Text>
            <Text style={styles.headerText}>|</Text>
            <Text
              style={isLogin ? styles.headerText : styles.headerSelectedText}
              onPress={toggleSignUp}>
              Sign Up
            </Text>
          </View>
          <View>
            <Text style={styles.textLabel}>Username</Text>
            <TextInput
              style={styles.textInput}
              value={username}
              onChangeText={setUsername}
            />
            <Text style={styles.textLabel}>Password</Text>
            <TextInput
              style={styles.textInput}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
            {!isLogin && (
              <>
                <Text style={styles.textLabel}>Email</Text>
                <TextInput
                  style={styles.textInput}
                  value={emailAddress}
                  onChangeText={setEmailAddress}
                />
              </>
            )}
            <Pressable onPress={handleSubmit} style={styles.submitButton}>
              <Text style={styles.submitText}>Submit</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    padding: 30,
  },
  headerText: {
    alignSelf: 'center',
    fontSize: 24,
    marginHorizontal: 5,
  },
  headerSelectedText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 5,
  },
  textLabel: {
    fontWeight: 'bold',
    color: 'dimgray',
    fontSize: 14,
    marginHorizontal: 30,
  },
  textInput: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    marginHorizontal: 30,
  },
  submitButton: {
    width: 100,
    padding: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
    borderColor: 'grey',
    alignItems: 'center',
    alignSelf: 'center',
  },
  submitText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'dimgrey',
  },
});

export default LoginOrSignUp;
