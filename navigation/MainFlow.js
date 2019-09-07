import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import MyGamesScreen from '../screens/my-games/Screen';
import CreateGameScreen from '../screens/create-game/Screen';
import TopixTheme from '../themes/TopixTheme';
import PlayGame from '../screens/play-game/Screen';

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
  'Create Game': CreateGameScreen,
};


const BottomNav = createBottomTabNavigator(routeConfigs, navigatorConfig);

BottomNav.navigationOptions = {
  header: null,
}

const MainFlow = createStackNavigator({
  BottomNav,
  "Play Game": {
    screen: PlayGame,
    navigationOptions: ({ navigation }) => ({
      title: "Play Game",
    }),
  }
})

export default MainFlow;
