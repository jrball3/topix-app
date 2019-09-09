import { createStackNavigator } from 'react-navigation';
import AuthScreen from '../screens/auth/Screen';
import CreateAccountScreen from '../screens/create-account/Screen';

AuthScreen.navigationOptions = {
  header: null
}

CreateAccountScreen.navigationOptions = {
  header: null
}

const AuthFlow = createStackNavigator(
  {
    'Auth': AuthScreen,
    'Create': CreateAccountScreen,
  },
  {
    initialRouteName: 'Auth',
  }
);

export default AuthFlow;
