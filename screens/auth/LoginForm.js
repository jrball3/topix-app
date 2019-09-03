import React from 'react';
import { View, Text } from 'react-native';
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
        this.email2Input.focus();
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
        this.confirmPassword2Input.focus();
      }}
      onChangeText={text => props.updateField({
        field: 'password',
        value: text
      })}
    />

    <Button
      title="Log in"
      onPress={() => {
        props.login({
          naviation: props.navigation,
          username: props.username,
          password: props.password,
        })
      }}
    />

    <View style={{ marginTop: 10, marginBelow: 10 }} />

    <Button
      title="Don't have an account? Tap here!"
      onPress={() => {
        props.navigation.navigate("Create")
      }}
    />
  </View>
);

export default LoginForm;