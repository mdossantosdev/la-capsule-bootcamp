import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
} from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import ChatScreen from '../screens/ChatScreen';

const BottomNavigator = createBottomTabNavigator(
  {
    Map: MapScreen,
    Chat: ChatScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        let iconName;
        if (navigation.state.routeName == 'Map') {
          Platform.OS === 'ios'
            ? (iconName = 'ios-map-outline')
            : (iconName = 'md-map-outline');
        } else if (navigation.state.routeName == 'Chat') {
          Platform.OS === 'ios'
            ? (iconName = 'ios-chatbox')
            : (iconName = 'md-chatbox');
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
    Home: HomeScreen,
    BottomNavigator: BottomNavigator,
  },
  {
    headerMode: 'none',
  }
);

export default Navigation = createAppContainer(StackNavigator);
