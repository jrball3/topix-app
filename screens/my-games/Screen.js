import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { ThemeProvider } from 'react-native-elements';
import TopixTheme from '../../themes/TopixTheme';
import { selectState } from './Helpers';
import { ScrollView, View, ActivityIndicator, Text } from 'react-native';
import { fetchGames } from './Actions';
import { getSession } from '../../Helpers';
import Layout from '../../constants/Layout';
import Game from '../../components/Game';

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchGames,
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
  paddingTop: 30,
  paddingBottom: 30,
}

class MyGamesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.renderGames = this.renderGames.bind(this);
    this.renderError = this.renderError.bind(this);
    this.renderLoadingContent = this.renderLoadingContent.bind(this);
  }
  
  componentDidMount() {
    this.props.fetchGames({
      authToken: this.props.session.authToken,
    })
  }

  renderGames() {
    const { 
      navigation,
      games,
    } = this.props;

    return (
      <ScrollView style={{
        ...commonViewStyle,
        height: Layout.window.height,
        width: Layout.window.width,
        paddingVertical: 8,
      }}>
        {games.map((l, i) => (
          <Game
            key={i}
            navigation={navigation}
            gameName={l.name}
            gameType={l.type}
            gameId={l.id}
          />
        ))}
      </ScrollView>
    )
  }

  renderError() {
    const { fetchingGamesError } = this.props;
    const message = `We encountered an error ${fetchingGamesError.message}`;
    return (
      <View style={{
        ...commonViewStyle,
        alignItems: 'center',
      }}>
        <Text>{message}</Text>
      </View>
    );
  }

  renderLoadingContent() {
    return (
      <View style={{
        ...commonViewStyle,
        alignItems: 'center',
      }}>
        <ActivityIndicator 
          size="large" 
          color={TopixTheme.foregroundColor} 
        />
        <Text>Loading...</Text>
      </View>
    )
  }

  render() {
    const { 
      fetchingGamesError,
      isFetchingGames,
    } = this.props;

    let content;
    if (isFetchingGames) {
      content = this.renderLoadingContent();
    } else if (fetchingGamesError) {
      content = this.renderError();
    } else {
      content = this.renderGames();
    }

    return (
      <ThemeProvider theme={TopixTheme}>
        {content}
      </ThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyGamesScreen);