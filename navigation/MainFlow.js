import { createBottomTabNavigator } from 'react-navigation';
import MyGamesScreen from '../screens/my-games/Screen';

MyGamesScreen.navigationOptions = {
  title: 'My Games',
  header: null,
}

const MainFlow = createBottomTabNavigator({
  'My Games': MyGamesScreen,
});

export default MainFlow
