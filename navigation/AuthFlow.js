import { createSwitchNavigator } from 'react-navigation';
import AuthScreen from '../screens/auth/Screen';

const AuthStackNav = createSwitchNavigator({
  AuthScreen: AuthScreen,
});

export default AuthStackNav;
