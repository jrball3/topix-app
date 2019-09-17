import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import TopixTheme from '../../themes/TopixTheme';
import { selectState } from './Helpers';
import { 
  ScrollView,
  View,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { 
  ThemeProvider,
  Button,
  Text,
} from 'react-native-elements';
import { fetchFriends } from './Actions';
import { getSession } from '../../Helpers';
import User from '../../components/User';
import Layout from '../../constants/Layout';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddFriendModal from './AddFriendModal';

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
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
  paddingTop: 10,
  paddingBottom: 10,
}

class MyFriendsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.renderFriends = this.renderFriends.bind(this);
    this.renderError = this.renderError.bind(this);
    this.renderLoadingContent = this.renderLoadingContent.bind(this);
    this.performFetch = this.performFetch.bind(this);
    this.handleSetAddFriendOpen = this.handleSetAddFriendOpen.bind(this);
    this.handleSendRequest = this.handleSendRequest.bind(this);

    this.state = {
      addFriendOpen: false,
    }
  }
  
  componentDidMount() {
    this.performFetch();
  }

  performFetch() {
    this.props.fetchFriends({
      authToken: this.props.session.authToken,
    })
  }

  handleSetAddFriendOpen(value) {
    this.setState({ addFriendOpen: value })
  }

  handleSendRequest(username) {
    console.log('Send friend request to ' + username)
    this.handleSetAddFriendOpen(false);
  }

  renderFriends() {
    const { friends } = this.props;
    const { addFriendOpen } = this.state;

    return (
      <View
        style={{
          ...commonViewStyle,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        refreshControl={
          <RefreshControl
            refreshing={this.props.isFetchingFriends}
            onRefresh={this.performFetch}
          />
        }
      >
        <Text
          style={{
            color: 'white',
            fontSize: 30,
            marginVertical: 10,
            fontWeight: '300',
          }}
        >
          My Friends
        </Text>

        <ScrollView 
          style={{
            paddingHorizontal: 10,
            width: Layout.window.width,
          }}
          contentContainerStyle={{
            justifyContent: 'flex-start',
          }}
        >
          {friends.map((g, i) => (
            <User
              key={i}
              user={g}
              containerStyle={{
                marginVertical: 5,
              }}
            />
          ))}
        </ScrollView>

        <View style={{ marginVertical: 5 }}>
          <Button
            icon={
              <Icon
                name="plus-circle"
                size={20}
                color="white"
                style={{ marginRight: 8 }}
              />
            }
            iconLeft
            title="Add a Friend"
            onPress={() => this.handleSetAddFriendOpen(true)}
          />
        </View>

        <AddFriendModal 
          isOpen={addFriendOpen}
          onRequest={this.handleSendRequest}
          onClose={() => this.handleSetAddFriendOpen(false)}
        />

      </View>
    )
  }

  renderError() {
    const { fetchingFriendsError } = this.props;
    const message = `We encountered an error ${fetchingFriendsError.message}`;
    return (
      <View style={{
        ...commonViewStyle,
        alignItems: 'center',
        justifyContent: 'center',
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
        justifyContent: 'center',
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
      fetchingFriendsError,
      isFetchingFriends,
      friends,
    } = this.props;

    let content;
    if (friends.length === 0 && isFetchingFriends) {
      content = this.renderLoadingContent();
    } else if (fetchingFriendsError) {
      content = this.renderError();
    } else {
      content = this.renderFriends();
    }

    return (
      <SafeAreaView style={{
        flex: 1,
        justifyContent: 'flex-end',
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
      }}>
        <ThemeProvider theme={TopixTheme}>
          {content}
        </ThemeProvider>
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyFriendsScreen);