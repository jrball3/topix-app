import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { View, Text, Picker } from 'react-native';
import { Icon, Input, ThemeProvider, Button } from 'react-native-elements';
import TopixTheme from '../../themes/TopixTheme';
import Layout from '../../constants/Layout';
import { updateField, createGame } from './Actions';
import { selectState } from './Helpers';
import { getSession } from '../../Helpers';
import { NavigationActions } from 'react-navigation'


const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    updateField,
    createGame,
  }, dispatch)
};

const mapStateToProps = state => {
  return {
    ...selectState(state),
    session: getSession(state),
  };
};

const commonViewStyle = {
  backgroundColor: TopixTheme.backgroundColor,
  alignItems: 'center',
  paddingTop: 30,
  paddingBottom: 30,
}

const CreateGameScreen = (props) => {
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
          Create a Game
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
          placeholder="Game Name"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType="next"
          ref={input => (this.gameName = input)}
          value={props.gameName}
          onSubmitEditing={() => {
            this.email2Input.focus();
          }}
          onChangeText={text => props.updateField({field: 'gameName', value: text})}
        />

        <Picker
          selectedValue={this.props.gameType}
          style={{height: 50, width: 100}}
          onValueChange={itemValue => props.updateField({field: 'gameType', value: itemValue})}>
          <Picker.Item label="Karma Hole" value="Karma Hole" />
        </Picker>

        <Button
          title="Create new game"
          onPress={() => props.CreateGame({ 
            authToken: props.session.authToken,
            gameName: props.gameName,
            gameType: props.gameType,
            players: props.players,
          })}
        />

      </View>
    </ThemeProvider>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGameScreen);