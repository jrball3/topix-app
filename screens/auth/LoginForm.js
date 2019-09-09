import React from 'react';
import { View, Text, Keyboard } from 'react-native';
import { Icon, Input, Button } from 'react-native-elements';

const LoginForm = (props) => (
  <View>
    <Text
      style={{
        color: 'white',
        fontSize: 30,
        marginVertical: 10,
        fontWeight: '300',
      }}
    >
      Login
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
      value={props.username}
      onSubmitEditing={() => {
        this.password2Input.focus();
      }}
      onChangeText={text => props.updateField({
        field: 'username',
        value: text
      })}
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
      value={props.password}
      ref={input => (this.password2Input = input)}
      onSubmitEditing={() => {
        Keyboard.dismiss()
      }}
      onChangeText={text => props.updateField({
        field: 'password',
        value: text
      })}
    />

    <Button
      title="Log in"
      onPress={props.onLogin}
    />

    <View style={{ marginTop: 10, marginBelow: 10 }} />

    <Button
      title="Don't have an account? Tap here!"
      onPress={props.onPressCreate}
    />
  </View>
);

export default LoginForm;