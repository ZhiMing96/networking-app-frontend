import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  POST_FEED,
  PROFILE,
  RootStackParamList,
} from '../screens/rootNavigationTypes';
import PostFeed from '../screens/PostFeed';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator<RootStackParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      // tabBar={props => <MyTabBar {...props} />}
      screenOptions={{headerShown: false}}
      initialRouteName={POST_FEED}>
      <Tab.Screen
        name={POST_FEED}
        component={PostFeed}
        options={{
          tabBarLabel: 'Feed',
          tabBarLabelStyle: {fontSize: 12},
          tabBarIcon: ({color}) => (
            <Icon name="stream" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={PROFILE}
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarLabelStyle: {fontSize: 12},
          tabBarIcon: ({color}) => (
            <Icon name="user-circle" size={20} color={color} solid />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
