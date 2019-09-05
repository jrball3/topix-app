import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { ThemeProvider, ListItem } from 'react-native-elements';
import TopixTheme from '../../themes/TopixTheme';
import { selectState } from './Helpers';
import { ScrollView, View, ActivityIndicator, Text } from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import { LinearGradient } from 'expo-linear-gradient';
import { fetchGames } from './Actions';
import { getSession } from '../../Helpers';
import Layout from '../../constants/Layout';

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
    const { games } = this.props;
    return (
      <ScrollView style={{
        ...commonViewStyle,
        height: Layout.window.height,
        width: Layout.window.width,
        paddingVertical: 8,
      }}>
        {games.map((l, i) => (
          <ListItem
            Component={TouchableScale}
            friction={90}
            tension={100}
            activeScale={0.95}
            key={i}
            title={l.name}
            titleStyle={{ color: TopixTheme.foregroundColor, fontWeight: 'bold' }}
            subtitleStyle={{ color: TopixTheme.foregroundColor }}
            subtitle={l.type}
            chevronColor={TopixTheme.foregroundColor}
            chevron
            containerStyle={{
              marginHorizontal: 16,
              marginVertical: 8,
              borderRadius: 8,
            }}
          />
        ))}
      </ScrollView>
    )
  }

  renderError() {
    const { fetchingGamesError } = this.props;
    const message = `We encountered an error ${fetchingGamesError.message}`;
    return (
      <View style={commonViewStyle}>
        <Text>{message}</Text>
      </View>
    );
  }

  renderLoadingContent() {
    return (
      <View style={commonViewStyle}>
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