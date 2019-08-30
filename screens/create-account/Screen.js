import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { View, Text } from 'react-native';
import { Icon, Input, ThemeProvider, Button } from 'react-native-elements';
import TopixTheme from '../../themes/TopixTheme';
import Layout from '../../constants/Layout';
import { updateField, createAccount } from './Actions';
import { selectState } from './Helpers';

const mapDispatchToProps = dispatch => {
  console.log('dispatch is ' + JSON.stringify(dispatch))
  return bindActionCreators({
    updateField,
    createAccount,
  }, dispatch)
};

const mapStateToProps = state => {
  return {
    ...selectState(state),
  };
};

const commonViewStyle = {
  backgroundColor: TopixTheme.backgroundColor,
  alignItems: 'center',
  paddingTop: 30,
  paddingBottom: 30,
}

const CreateAccountScreen = (props) => {
  return (
    <ThemeProvider theme={TopixTheme}>
      <View style={{ 
        ...commonViewStyle,
        width: Layout.window.width,
        height: Layout.window.height,
      }}>
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
          value={props.username}
          onSubmitEditing={() => {
            this.email2Input.focus();
          }}
          onChangeText={text => props.updateField({field: 'username', value: text})}
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
          value={props.email}
          onSubmitEditing={() => {
            this.password2Input.focus();
          }}
          onChangeText={text => props.updateField({field: 'email', value: text})}
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
          onChangeText={text => props.updateField({field: 'password', value: text})}
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
          value={props.confirmPassword}
          ref={input => (this.confirmPassword2Input = input)}
          blurOnSubmit
          onChangeText={text => props.updateField({field: 'confirmPassword', value: text})}
        />

      <View style={{ ...commonViewStyle }}>
        <Button
          title="Create new account"
          onPress={() => props.createAccount({ 
            username: props.username,
            email: props.email,
            password: props.password,
          })}
        />
      </View>

      </View>
    </ThemeProvider>
  );
}

CreateAccountScreen.navigationOptions = {
  header: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountScreen);