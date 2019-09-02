import { createSwitchNavigator } from 'react-navigation';
import AuthFlow from './AuthFlow';
import MainFlow from './MainFlow';

export default createSwitchNavigator(
  {
    // AuthLoading: AuthLoadingScreen,
    Auth: AuthFlow,
    App: MainFlow,
  },
  {
    initialRouteName: 'Auth',
  }
)