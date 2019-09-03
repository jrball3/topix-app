import { createBottomTabNavigator } from 'react-navigation';
import MyGamesScreen from '../screens/my-games/Screen';
import TopixTheme from '../themes/TopixTheme';

MyGamesScreen.navigationOptions = {
  title: 'My Games',
  header: null,
};

const config  = {
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'My Games') {
        iconName = `ios-information-circle${focused ? '' : '-outline'}`;
      }
      return <IconComponent name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: TopixTheme.tintColor,
    inactiveTintColor: TopixTheme.inactiveTintColor,
  },
};

const MainFlow = createBottomTabNavigator({
  'My Games': MyGamesScreen,
}, config);

export default MainFlow;
