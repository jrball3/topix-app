import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { ThemeProvider, Icon } from 'react-native-elements';
import TopixTheme from '../../themes/TopixTheme';
import { selectState } from './Helpers';
import { 
  ScrollView, 
  KeyboardAvoidingView,
  View, 
  ActivityIndicator, 
  Text,
  SafeAreaView,
} from 'react-native';
import { fetchPosts, createPost, fetchScores } from './Actions';
import { getSession } from '../../Helpers';
import Post from '../../components/Post';
import ChatInput from '../../components/ChatInput';
import { Header } from 'react-navigation';
import PlayGameHeader from './Header';

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchPosts,
    createPost,
    fetchScores,
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
  static navigationOptions = ({ navigation }) => ({
    header: <PlayGameHeader navigation={navigation} /> 
  });

  constructor(props) {
    super(props);
    this.renderGame = this.renderGame.bind(this);
    this.renderError = this.renderError.bind(this);
    this.renderLoadingContent = this.renderLoadingContent.bind(this);
    this.onSend = this.onSend.bind(this);
    this.performFetch = this.performFetch.bind(this);
  }
  
  componentDidMount() {
    this.performFetch();
  }

  performFetch() {
    const { game } = this.props;
    this.props.fetchPosts({
      authToken: this.props.session.authToken,
      gameId: game.id,
    })
    this.props.fetchScores({
      authToken: this.props.session.authToken,
      gameId: game.id,
    })
  }

  onSend(message) {
    const { game } = this.props;
    this.props.createPost({
      authToken: this.props.session.authToken,
      gameId: game.id,
      message,
    })
  }

  renderGame() {
    const { posts } = this.props;
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset = {Header.HEIGHT + 20}
        style={{
          ...commonViewStyle,
          flex: 1,
          justifyContent: 'flex-end',
        }}
        behavior="padding"
        enabled
      >
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}
        >
          <ScrollView
            ref={ref => this.scrollView = ref}
            onContentSizeChange={(contentWidth, contentHeight)=>{        
                this.scrollView.scrollToEnd({animated: true});
            }}
          >
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
        </SafeAreaView>
      </KeyboardAvoidingView>
    )
  }

  renderError() {
    const { fetchingPostsError } = this.props;
    const message = `We encountered an error ${fetchingPostsError.message}`;
    return (
      <View style={{
        ...commonViewStyle,
        alignItems: 'center',
        flex: 1,
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
        flex: 1,
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