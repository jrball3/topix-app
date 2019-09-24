import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { View, ScrollView, Text, Platform, Keyboard, StatusBar } from 'react-native';
import { Icon, Input, ThemeProvider, Button } from 'react-native-elements';
import TopixTheme from '../../themes/TopixTheme';
import Layout from '../../constants/Layout';
import { 
  updateField,
  createGame,
  addPlayer,
  removePlayer,
} from './Actions';
import { fetchFriends } from '../my-friends/Actions';
import { selectState } from './Helpers';
import { getSession } from '../../Helpers';
import PlayerSelector from '../../components/PlayerSelector';
import { SafeAreaView } from 'react-navigation';

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    updateField,
    createGame,
    addPlayer,
    removePlayer,
    fetchFriends,
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

class CreateGameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.handleUpdateGameName = this.handleUpdateGameName.bind(this);
    this.handleCreateGame = this.handleCreateGame.bind(this);
  }

  componentDidMount() {
    const { session } = this.props;
    const { authToken } = session;
    this.props.fetchFriends({ authToken });
  }

  handleUpdateGameName(name) {
    this.props.updateField({
      field: 'gameName',
      value: name,
    })
  }

  handleCreateGame() {
    const {
      navigation,
      gameName,
      gameType,
      players,
      session,
      createGame,
    } = this.props;

    const { 
      authToken,
    } = session;

    createGame({ 
      navigation,
      authToken,
      gameName,
      gameType,
      players,
    });
  }
  
  render() {
    const {
      gameName,
      players,
      friends,
    } = this.props;

    const buttonHeight = null; //60;
    const scrollViewHeight = null; //Layout.window.height - buttonHeight;

    return (
      <ThemeProvider theme={TopixTheme}>
        <SafeAreaView style={{ 
          ...commonViewStyle,
          flex: 1,
          justifyContent: 'flex-end',
          paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        }}>

          <View style={{ flex: 1 }}>
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
          </View>

          <View 
            style={{ flex: 1 }} 
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          > 
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
              returnKeyType="done"
              ref={input => (this.gameNameInput = input)}
              value={gameName}
              onSubmitEditing={() => {
                // this.typePicker.focus();
                Keyboard.dismiss();
              }}
              onChangeText={text => this.handleUpdateGameName(text)}
            />
          </View>

          {/* <Picker
            selectedValue={props.gameType}
            ref={picker => (this.typePicker = picker)}
            style={{height: 50, width: 200}}
            onValueChange={itemValue => props.updateField({field: 'gameType', value: itemValue})}>
            <Picker.Item label="Karma Hole" value="KARMA_HOLE" />
          </Picker> */}

          <View style={{ flex: 5, marginTop: 10 }}>
            <PlayerSelector 
              gameName={gameName}
              selectedPlayers={players}
              selectablePlayers={friends}
              onAddPlayer={this.props.addPlayer}
              onRemovePlayer={this.props.removePlayer}
              nestedScrollEnabled={true}
            />
          </View>

          <View style={{ 
            flex: 1,
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Button
              title="Create new game"
              onPress={this.handleCreateGame}
              disabled={players.length < 3}
            />
          </View>
        </SafeAreaView>
      </ThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGameScreen);