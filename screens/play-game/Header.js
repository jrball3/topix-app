import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { ThemeProvider, Icon } from 'react-native-elements';
import TopixTheme from '../../themes/TopixTheme';
import { 
  View, 
  Text,
  Platform,
} from 'react-native';
import { Header } from 'react-navigation';
import { getSession } from '../../Helpers';
import { selectState } from './Helpers';

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
  }

  getUserScore() {
    const { session, scores } = this.props;
    const { user } = session;
    const scoreObj = scores.filter(
      s => s.player.username === user.username
    )[0]
    const scoreValue = scoreObj ? scoreObj.score : null;
    return scoreValue;
  }

  render() {
    return (
      <ThemeProvider theme={TopixTheme}>
        <View
          style={{
            height: Header.HEIGHT,
            marginTop: Platform.OS === 'android' ? 24 : 20,
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
            <Icon 
              type='material-community'
              name='arrow-left'
              size={30}
              iconStyle={{
                color: "white"
              }}
              underlayColor="white"
              onPress={() => this.props.navigation.goBack()}
            />

            <View>
              <Text style={{ color: "white", fontWeight: 'bold' }}>
                {this.props.game.name}
              </Text>
            </View>
          </View>

          <View style={{ 
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginRight: 10,
          }}>
            <Text style={{ color: "white" }}>
              Score: {this.getUserScore()}
            </Text>
          </View>

        </View>
      </ThemeProvider>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(PlayGameHeader);