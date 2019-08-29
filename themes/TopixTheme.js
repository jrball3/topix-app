import Layout from '../constants/Layout';

const tintColor = '#2f95dc';

const Colors = {
  tintColor,
  tabIconDefault: '#ccc',
  tabIconSelected: tintColor,
  tabBar: '#fefefe',
  errorBackground: 'red',
  errorText: '#fff',
  warningBackground: '#EAEB5E',
  warningText: '#666804',
  noticeBackground: tintColor,
  noticeText: '#fff',
  backgroundColor: '#fbd157',
  foregroundColor: '#54445b',
  textColor: '#fff',
}

const Input = {
  containerStyle: {
    width: Layout.window.width - 50,
  },
  inputContainerStyle: {
    borderRadius: 40,
    borderWidth: 1,
    borderColor: Colors.foregroundColor,
    height: 50,
    marginVertical: 10,
  },
  placeholderTextColor: Colors.textColor,
  inputStyle: {
    marginLeft: 10,
    color: 'white',
  },
  keyboardAppearance: 'light',
  blurOnSubmit: false,
}

const Icon = {
  iconStyle: {
    color: Colors.foregroundColor,
  }
}

const Button = {
  buttonStyle: {
    backgroundColor: Colors.foregroundColor,
  },
}

export default {
  ...Colors,
  Icon,
  Input,
  Button,
}