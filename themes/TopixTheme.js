import { Dimensions } from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;

export default {
  Input: {
    containerStyle: {
      width: SCREEN_WIDTH - 50,
    },
    inputContainerStyle: {
      borderRadius: 40,
      borderWidth: 1,
      borderColor: 'rgba(110, 120, 170, 1)',
      height: 50,
      marginVertical: 10,
    },
    placeholderTextColor: 'rgba(110, 120, 170, 1)',
    inputStyle: {
      marginLeft: 10,
      color: 'white',
    },
    keyboardAppearance: 'light',
    blurOnSubmit: false,
  },
}