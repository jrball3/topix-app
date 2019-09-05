import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import MyGamesScreen from '../screens/my-games/Screen';
import TopixTheme from '../themes/TopixTheme';

const navigatorConfig  = {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'My Games') {
        iconName = "logo-game-controller-a";
      }
      return <Icon type="ionicon" name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: TopixTheme.tabIconSelected,
    inactiveTintColor: TopixTheme.tabIconDefault,
  },
};

const routeConfigs = {
  'My Games': MyGamesScreen,
};

const MainFlow = createBottomTabNavigator(routeConfigs, navigatorConfig);

export default MainFlow;
