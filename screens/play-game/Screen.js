import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { ThemeProvider } from 'react-native-elements';
import TopixTheme from '../../themes/TopixTheme';
import { selectState } from './Helpers';
import { ScrollView, View, ActivityIndicator, Text, FlatList } from 'react-native';
import { fetchPosts } from './Actions';
import { getSession } from '../../Helpers';
import Post from '../../components/Post';
import ChatInput from '../../components/ChatInput';
import Layout from '../../constants/Layout';

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchPosts,
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
  paddingTop: 10,
  paddingBottom: 10,
}

class PlayGameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.renderGame = this.renderGame.bind(this);
    this.renderError = this.renderError.bind(this);
    this.renderLoadingContent = this.renderLoadingContent.bind(this);
    this.onSend = this.onSend.bind(this);
  }
  
  componentDidMount() {
    this.props.fetchPosts({
      authToken: this.props.session.authToken,
      gameId: this.props.navigation.state.params.gameId,
    })
  }

  onSend(post) {
    console.log('Sending ' + JSON.stringify(post))
  }

  renderGame() {
    const { posts } = this.props;
    return (
      <View style={{
        ...commonViewStyle,
        height: Layout.window.height,
        width: Layout.window.width,
        flex: 10,
      }}>
        <ScrollView style={{
          flex: 8,
        }}>
          {
            posts.map((p, i) => (
              <Post
                key={i}
                id={p.id}
                author={p.author}
                message={p.message}
                upvotes={p.upvotes}
                downvotes={p.downvotes}
              />
            ))
          }
        </ScrollView>
        <ChatInput 
          style={{ flex: 2 }} 
          onSend={this.onSend}
        />
      </View>
    )
  }

  renderError() {
    const { fetchingPostsError } = this.props;
    const message = `We encountered an error ${fetchingPostsError.message}`;
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
      fetchingPostsError,
      isFetchingPosts,
    } = this.props;

    let content;
    if (isFetchingPosts) {
      content = this.renderLoadingContent();
    } else if (fetchingPostsError) {
      content = this.renderError();
    } else {
      content = this.renderGame();
    }

    return (
      <ThemeProvider theme={TopixTheme}>
        {content}
      </ThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayGameScreen);