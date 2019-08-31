import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import CreateAccountScreen from '../screens/create-account/Screen';
import { createAppContainer } from 'react-navigation';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const CreateAccountStack = createStackNavigator(
  {
    CreateAccount: CreateAccountScreen,
  },
  config
);

export default createAppContainer(CreateAccountStack);
