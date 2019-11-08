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
  Platform,
  StatusBar,
} from 'react-native';
import { 
  ThemeProvider,
  Button,
  Text,
} from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import { 
  fetchFriends,
  fetchFriendRequests,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
} from './Actions';
import { getSession } from '../../Helpers';
import User from '../../components/User';
import FriendRequest from '../../components/FriendRequest';
import Layout from '../../constants/Layout';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddFriendModal from './AddFriendModal';

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchFriends,
    fetchFriendRequests,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
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
    this.renderFriendsList = this.renderFriendsList.bind(this);
    this.renderFriendRequests = this.renderFriendRequests.bind(this);
    this.handleAcceptRequest = this.handleAcceptRequest.bind(this);
    this.handleRejectRequest = this.handleRejectRequest.bind(this);

    this.state = {
      addFriendOpen: false,
    }
  }
  
  componentDidMount() {
    this.performFetch();
  }

  performFetch() {
    fetchObj = {
      authToken: this.props.session.authToken,
    }
    this.props.fetchFriends(fetchObj)
    this.props.fetchFriendRequests(fetchObj)
  }

  handleSetAddFriendOpen(value) {
    this.setState({ addFriendOpen: value })
  }

  handleSendRequest(username) {
    this.handleSetAddFriendOpen(false);
    this.props.sendFriendRequest({
      authToken: this.props.session.authToken,
      username,
    })
  }

  handleAcceptRequest(requestId) {
    this.props.acceptFriendRequest({ 
      authToken: this.props.session.authToken,
      friendshipId: requestId,
    })
  }

  handleRejectRequest(requestId) {
    this.props.rejectFriendRequest({ 
      authToken: this.props.session.authToken,
      friendshipId: requestId,
    })
  }

  renderFriendRequests() {
    const { friendRequests } = this.props;
    if (friendRequests.length === 0) return null;
    return (
      <ScrollView 
        style={{
          paddingHorizontal: 10,
          width: Layout.window.width,
        }}
        contentContainerStyle={{
          justifyContent: 'flex-start',
        }}
        refreshControl={
          <RefreshControl
            refreshing={this.props.isFetchingFriends || this.props.isFetchingFR}
            onRefresh={this.performFetch}
          />
        }
      >
        {friendRequests.map((r, i) => (
          <FriendRequest
            key={i}
            request={r}
            containerStyle={{
              marginVertical: 5,
            }}
            onPressAccept={() => this.handleAcceptRequest(r.friend.id)}
            onPressReject={() => this.handleRejectRequest(r.friend.id)}
          />
        ))}
      </ScrollView>
    );
  }

  renderFriendsList() {
    const { friends } = this.props;
    return (
      <ScrollView 
        style={{
          paddingHorizontal: 10,
          width: Layout.window.width,
        }}
        contentContainerStyle={{
          justifyContent: 'flex-start',
        }}
        refreshControl={
          <RefreshControl
            refreshing={this.props.isFetchingFriends || this.props.isFetchingFR}
            onRefresh={this.performFetch}
          />
        }
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
    );
  }

  renderFriends() {
    const { addFriendOpen } = this.state;
    const friendRequests = this.renderFriendRequests();
    const friendsList = this.renderFriendsList();

    return (
      <View
        style={{
          ...commonViewStyle,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 25,
            marginVertical: 10,
            fontWeight: '300',
          }}
        >
          My Friends
        </Text>

        {friendRequests && 
          <View style={{ flex: 2 }}>
            {friendRequests}
          </View>
        }
        <View style={{ flex: 5 }}>
          {friendsList}
        </View>

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

export default connect(mapStateToProps, mapDispatchToProps)(MyFriendsScreen);