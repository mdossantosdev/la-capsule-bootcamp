import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';

import AccountScreen from '../screens/AccountScreen';
import FollowingScreen from '../screens/FollowingScreen';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

const MainNavigator = createBottomTabNavigator(
  {
    Account: AccountScreen,
    Search: SearchScreen,
    Following: FollowingScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        let iconName;
        if (navigation.state.routeName == 'Account') {
          Platform.OS === 'ios'
            ? (iconName = 'ios-information-circle')
            : (iconName = 'md-information-circle');
        } else if (navigation.state.routeName == 'Search') {
          Platform.OS === 'ios'
            ? (iconName = 'ios-search')
            : (iconName = 'md-search');
        } else if (navigation.state.routeName == 'Following') {
          Platform.OS === 'ios'
            ? (iconName = 'ios-people')
            : (iconName = 'md-people');
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),

    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);

const StackNavigator = createStackNavigator(
  {
    MainNavigator: MainNavigator,
    Home: HomeScreen,
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
  },
  { headerMode: 'none' }
);

export default Navigation = createAppContainer(StackNavigator);
