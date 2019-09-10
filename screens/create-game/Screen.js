import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { ScrollView, Text, Picker } from 'react-native';
import { Icon, Input, ThemeProvider, Button } from 'react-native-elements';
import TopixTheme from '../../themes/TopixTheme';
import Layout from '../../constants/Layout';
import { 
  updateField,
  createGame,
  addPlayer,
  removePlayer,
  fetchFriends,
} from './Actions';
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

    return (
      <ThemeProvider theme={TopixTheme}>
        <SafeAreaView style={{ 
          ...commonViewStyle,
          flex: 1,
        }}>
          <ScrollView 
            style={{ 
              flex: 9
            }} 
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          > 
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
              ref={input => (this.gameNameInput = input)}
              value={gameName}
              onSubmitEditing={() => {
                this.typePicker.focus();
              }}
              onChangeText={text => this.handleUpdateGameName(text)}
            />

            {/* <Picker
              selectedValue={props.gameType}
              ref={picker => (this.typePicker = picker)}
              style={{height: 50, width: 200}}
              onValueChange={itemValue => props.updateField({field: 'gameType', value: itemValue})}>
              <Picker.Item label="Karma Hole" value="KARMA_HOLE" />
            </Picker> */}

            <PlayerSelector 
              gameName={gameName}
              selectedPlayers={players}
              selectablePlayers={friends}
              onAddPlayer={this.props.addPlayer}
              onRemovePlayer={this.props.removePlayer}
            />
          </ScrollView>

          <Button
            style={{ flex: 1, marginTop: 5 }}
            title="Create new game"
            onPress={this.handleCreateGame}
            disbled={players.length < 3}
          />
        </SafeAreaView>
      </ThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGameScreen);