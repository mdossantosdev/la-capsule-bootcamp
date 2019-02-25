import React from 'react';
import { Platform } from 'react-native';
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator,
} from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import CameraScreen from '../screens/CameraScreen';
import LibraryScreen from '../screens/LibraryScreen';

const BottomNavigator = createBottomTabNavigator(
  {
    Camera: CameraScreen,
    Library: LibraryScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        let iconName;
        if (navigation.state.routeName == 'Camera') {
          Platform.OS === 'ios'
            ? (iconName = 'ios-camera')
            : (iconName = 'md-camera');
        } else if (navigation.state.routeName == 'Library') {
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
    Home: HomeScreen,
    BottomNavigator: BottomNavigator,
  },
  { headerMode: 'none' }
);

export default Navigation = createAppContainer(StackNavigator);
