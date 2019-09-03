import { createSwitchNavigator } from 'react-navigation';
import AuthFlow from './AuthFlow';
import MainFlow from './MainFlow';
import CreateFlow from './CreateFlow';

export default createSwitchNavigator(
  {
    Auth: AuthFlow,
    Create: CreateFlow,
    App: MainFlow,
  },
  {
    initialRouteName: 'Auth',
  }
)