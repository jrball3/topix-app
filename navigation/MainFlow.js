import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import MyGamesScreen from '../screens/my-games/Screen';
import CreateGameScreen from '../screens/create-game/Screen';
import MyFriendsScreen from '../screens/my-friends/Screen';
import TopixTheme from '../themes/TopixTheme';
import PlayGame from '../screens/play-game/Screen';

const navigatorConfig  = {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'My Games') {
        iconName = "gamepad";
      } else if (routeName === 'Create Game') {
        iconName = 'plus-circle';
      } else if (routeName === 'My Friends') {
        iconName = 'users';
      }
      return <Icon type="font-awesome" name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: TopixTheme.tabIconSelected,
    inactiveTintColor: TopixTheme.tabIconDefault,
  },
};

const routeConfigs = {
  'My Games': MyGamesScreen,
  'Create Game': CreateGameScreen,
  'My Friends': MyFriendsScreen,
};


const BottomNav = createBottomTabNavigator(routeConfigs, navigatorConfig);

BottomNav.navigationOptions = {
  header: null,
}

const MainFlow = createStackNavigator({
  BottomNav,
  "Play Game": PlayGame,
})

export default MainFlow;
