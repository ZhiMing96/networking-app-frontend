import React, {useEffect, useState} from 'react';
// import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  DEFAULT_HOME,
  LOGIN_OR_SIGN_UP,
  RootStackParamList,
} from './src/screens/rootNavigationTypes';
import LoginOrSignUp from './src/screens/Auth/LoginOrSignUp';

import Toast from 'react-native-toast-message';
import {getIsLoggedInStatus} from './src/utils/auth';
import BottomTabNavigator from './src/components/BottomTabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      // await AsyncStorage.multiRemove(['@access_token', '@user', '@user_jwt']);
      const loginStatus = await getIsLoggedInStatus();
      setIsLoggedIn(loginStatus);
    })();
  }, []);
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {isLoggedIn ? (
            <Stack.Screen name={DEFAULT_HOME} component={BottomTabNavigator} />
          ) : (
            <Stack.Screen name={LOGIN_OR_SIGN_UP} component={LoginOrSignUp} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
};

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
