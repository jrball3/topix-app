import { createStackNavigator } from 'react-navigation';
import CreateAccountScreen from '../screens/create-account/Screen';
import TopixTheme from '../themes/TopixTheme';

const config  = {
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Home') {
        iconName = `ios-information-circle${focused ? '' : '-outline'}`;
      }
      return <IconComponent name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: TopixTheme.tintColor,
    inactiveTintColor: TopixTheme.inactiveTintColor,
  },
}

CreateAccountScreen.navigationOptions = {
  title: 'Create Account',
  header: null,
}

const AuthStackNav = createStackNavigator({
  CreateAccount: CreateAccountScreen,
}, config);

export default AuthStackNav;
