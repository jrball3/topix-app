import React from 'react';
import { View, Text } from 'react-native';
import { Icon, Input, Image, ThemeProvider } from 'react-native-elements';
import TopixTheme from '../themes/TopixTheme';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

export default function LoginScreen() {
  return (
  <ThemeProvider theme={TopixTheme}>
    <View
      style={{
        backgroundColor: Colors.backgroundColor,//'rgba(46, 50, 72, 1)',
        width: Layout.window.width,
        height: Layout.window.height,
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 30,
      }}
    >

      <Image
        uri='../assets/images/logo_transparent.png'
      />

      <Text
        style={{
          color: 'white',
          fontSize: 30,
          marginVertical: 10,
          fontWeight: '300',
        }}
      >
        Sign up
      </Text>
      <Input
        leftIcon={
          <Icon
            name="user"
            type="simple-line-icon"
            color="rgba(110, 120, 170, 1)"
            size={25}
          />
        }
        placeholder="Username"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        returnKeyType="next"
        ref={input => (this.usernameInput = input)}
        onSubmitEditing={() => {
          this.email2Input.focus();
        }}
      />
      <Input
        leftIcon={
          <Icon
            name="email-outline"
            type="material-community"
            color="rgba(110, 120, 170, 1)"
            size={25}
          />
        }
        placeholder="Email"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        returnKeyType="next"
        ref={input => (this.email2Input = input)}
        onSubmitEditing={() => {
          this.password2Input.focus();
        }}
      />
      <Input
        leftIcon={
          <Icon
            name="lock"
            type="simple-line-icon"
            color="rgba(110, 120, 170, 1)"
            size={25}
          />
        }
        placeholder="Password"
        autoCapitalize="none"
        secureTextEntry={true}
        autoCorrect={false}
        keyboardType="default"
        returnKeyType="next"
        ref={input => (this.password2Input = input)}
        onSubmitEditing={() => {
          this.confirmPassword2Input.focus();
        }}
      />
      <Input
        leftIcon={
          <Icon
            name="lock"
            type="simple-line-icon"
            color="rgba(110, 120, 170, 1)"
            size={25}
          />
        }
        placeholder="Confirm Password"
        autoCapitalize="none"
        keyboardAppearance="light"
        secureTextEntry={true}
        autoCorrect={false}
        keyboardType="default"
        returnKeyType="done"
        ref={input => (this.confirmPassword2Input = input)}
        blurOnSubmit
      />
    </View>
  </ThemeProvider>
  );
}

LoginScreen.navigationOptions = {
  header: null,
};
