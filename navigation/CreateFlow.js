import { createSwitchNavigator } from 'react-navigation';
import CreateAccountScreen from '../screens/create-account/Screen';

const CreateStackNav = createSwitchNavigator({
  CreateAccount: CreateAccountScreen,
});

export default CreateStackNav;
