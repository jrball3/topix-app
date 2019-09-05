import { createSwitchNavigator } from 'react-navigation';
import AuthScreen from '../screens/auth/Screen';

const AuthFlow = createSwitchNavigator({
  AuthScreen: AuthScreen,
});

export default AuthFlow;
