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
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-navigation'
import { 
  fetchPosts,
  createPost,
  fetchScores,
  upvotePost,
  downvotePost,
} from './Actions';
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
    upvotePost,
    downvotePost
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
    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleDownvote = this.handleDownvote.bind(this);
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
  
  handleUpvote(post) {
    this.props.upvotePost({ 
      authToken: this.props.session.authToken,
      postId: post.id 
    })
  }

  handleDownvote(post) {
    this.props.downvotePost({ 
      authToken: this.props.session.authToken,
      postId: post.id 
    })
  }

  renderGame() {
    const { posts } = this.props;
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset = {Header.HEIGHT + 20}
        style={{
          flex: 1,
          justifyContent: 'flex-end',
        }}
        behavior="padding"
        enabled
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
                upvotes={p.upvotes.length}
                downvotes={p.downvotes.length}
                onUpvote={() => this.handleUpvote(p)}
                onDownvote={() => this.handleDownvote(p)}
              />
            ))
          }
        </ScrollView>
        <ChatInput 
          style={{ flex: 2 }}
          onSend={this.onSend}
        />
      </KeyboardAvoidingView>
    )
  }

  renderError() {
    const { fetchingPostsError } = this.props;
    const message = `We encountered an error ${fetchingPostsError.message}`;
    return (
      <View style={{
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
        <SafeAreaView style={{
          ...commonViewStyle,
          flex: 1,
          justifyContent: 'flex-end',
          paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        }}>
          {content}
        </SafeAreaView>
      </ThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayGameScreen);