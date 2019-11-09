import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { ThemeProvider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import TopixTheme from '../../themes/TopixTheme';
import { 
  View, 
  Text,
  Platform,
} from 'react-native';
import { Header } from 'react-navigation';
import { getSession } from '../../Helpers';
import { selectState } from './Helpers';
import ScoreboardModal from './ScoreboardModal';

const mapDispatchToProps = dispatch => {
  return bindActionCreators({

  }, dispatch)
};

const mapStateToProps = state => {
  return {
    ...selectState(state),
    session: getSession(state),
  };
};

class PlayGameHeader extends React.Component {

  constructor(props) {
    super(props);
    this.getUserScore = this.getUserScore.bind(this);
    this.state = {
      scoreboardOpen: false,
    }
    this.openScoreboard = this.openScoreboard.bind(this);
    this.closeScoreboard = this.closeScoreboard.bind(this);
  }

  getUserScore() {
    const { session, scores } = this.props;
    const { user } = session;
    const scoreIdx = scores.findIndex(s => s.player.username === user.username)
    const scoreObj = scores[scoreIdx]
    const scoreValue = scoreObj ? scoreObj.score : null;
    return [scoreIdx + 1, scoreValue];
  }

  openScoreboard() {
    this.setState({ scoreboardOpen: true })
  }

  closeScoreboard() {
    this.setState({ scoreboardOpen: false })
  }

  render() {
    const { session, scores } = this.props;
    const { user } = session;
    const { scoreboardOpen } = this.state;
    const [rank, score] = this.getUserScore();
    return (
      <ThemeProvider theme={TopixTheme}>
        <ScoreboardModal 
          isOpen={scoreboardOpen}
          user={user}
          scores={scores} 
          onClose={this.closeScoreboard}
        />
        <View
          style={{
            height: Header.HEIGHT + (Platform.OS === 'android' ? 0 : 40),
            marginTop: Platform.OS === 'android' ? 24 : 0,
            paddingTop: Platform.OS === 'ios' ? 48 : 0,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: TopixTheme.foregroundColor,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 7,
            },
            shadowOpacity: 0.4,
            shadowRadius: 9,
            elevation: 14,
          }}
        >
          <View style={{ 
            flex: 1, 
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
            <Icon.Button
              name='arrow-left'
              size={25}
              color='white'
              backgroundColor={null}
              onPress={() => this.props.navigation.goBack()}
            />

            <View>
              <Text style={{ color: "white", fontWeight: 'bold', fontSize: 20 }}>
                {this.props.game.name}
              </Text>
            </View>
          </View>

          <View style={{ 
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
              <Text style={{ color: "white" }}>
                Score (#{rank}): {score}
              </Text>

              <Icon.Button
                name='list-ol'
                size={20}
                color='white'
                backgroundColor={null}
                onPress={() => this.openScoreboard()}
              />

          </View>

        </View>
      </ThemeProvider>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(PlayGameHeader);