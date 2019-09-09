import { createSwitchNavigator } from 'react-navigation';
import AuthFlow from './AuthFlow';
import MainFlow from './MainFlow';

export default createSwitchNavigator(
  {
    AuthFlow,
    MainFlow,
  },
  {
    initialRouteName: 'AuthFlow',
  }
)