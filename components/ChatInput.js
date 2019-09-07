import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';

class ChatInput extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { onSend } = this.props;

    return (
      <View>
        <Text> YOURE GONNA WRITE STUFF HURR! </Text>
        <Button
          title="Send!"
          onPress={() => onSend('a message')}
        />
      </View>
    );
  }
}

export default ChatInput;