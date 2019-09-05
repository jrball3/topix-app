import { createSwitchNavigator } from 'react-navigation';
import CreateAccountScreen from '../screens/create-account/Screen';

const CreateFlow = createSwitchNavigator({
  CreateAccount: CreateAccountScreen,
});

export default CreateFlow;
