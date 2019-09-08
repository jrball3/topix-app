import React from 'react';
import { View, Keyboard } from 'react-native';
import { Icon, Input, ThemeProvider } from 'react-native-elements';
import TopixTheme from '../themes/TopixTheme';
import Layout from '../constants/Layout';

const ChatInputTheme = {
  ...TopixTheme,
  Input: {
    ...TopixTheme.Input,
    containerStyle: {
      ...TopixTheme.Input.containerStyle,
      width: Layout.window.width,
    },
  }
}

class ChatInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
    }
    this.handleSend = this.handleSend.bind(this);
  }

  handleSend() {
    const { text } = this.state;
    const { onSend } = this.props;
    onSend(text);
    Keyboard.dismiss();
    this.setState({ text: '' })
  }

  render() {
    return (
      <View>
        <ThemeProvider theme={ChatInputTheme}>
        <Input
          placeholder="Type a message..."
          autoCapitalize="none"
          autoCorrect={true}
          value={this.state.text}
          returnKeyType="done"
          onSubmitEditing={() => this.handleSend()}
          onChangeText={newText => this.setState({ text: newText })}
          rightIcon={
            <Icon
              name='paper-plane'
              size={20}
              type='font-awesome'
              color={TopixTheme.foregroundColor}
              onPress={this.handleSend}
            />
          }
          rightIconContainerStyle={{
            marginRight: 15,
          }}
        />
        </ThemeProvider>
      </View>
    );
  }
}

export default ChatInput;