import React from 'react';
import { View } from 'react-native';
import { Button, Text, Overlay, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import TopixTheme from '../../themes/TopixTheme';

class AddFriendModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }
    this.setUsername = this.setUsername.bind(this);
  }

  setUsername(username) {
    this.setState({ username })
  }

  render() {
    const {
      isOpen,
      onRequest,
      onClose,
    } = this.props;
    const { username } = this.state;

    return (
      <Overlay 
        isVisible={isOpen}
        overlayBackgroundColor={TopixTheme.backgroundColor}
        height={200}
      >
        <View style={{ 
          justifyContent: 'center',
          alignContent: 'center',
          flex: 6,
        }}>
          <View style={{ flex: 2 }}>
            <Input
              leftIcon={
                <Icon
                  name="user"
                  color="white"
                  size={25}
                />
              }
              placeholder="Username"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="done"
              value={username}
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
              containerStyle= {{
                width: null,
              }}
              onChangeText={this.setUsername}
            />
          </View>

          <View style={{ flex: 1, marginBottom: 5 }}>
            <Button 
              onPress={() => onRequest(username)}
              title="Send Friend Request" 
            />
          </View>
          
          <View style={{ flex: 1 }}>
            <Button 
              onPress={onClose}
              title="Close" 
            />
          </View>

        </View>
      </Overlay>
    );
  }
}

export default AddFriendModal;