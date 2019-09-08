import React from 'react';
import { View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import TopixTheme from '../themes/TopixTheme';


class Post extends React.PureComponent {
  render() {

    const {
      id,
      author,
      message,
      upvotes,
      downvotes,
    } = this.props;

    return (
      <View style={{ 
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        alignItems: 'flex-start',
        width: 'auto',
        height: 100,
        borderRadius: 20,
        padding: 15,
        marginBottom: 10,
      }}>

        {/* Message / Upper Row */}
        <View style={{ flex: 2, justifyContent: 'flex-start' }}>
          <Text style={{ color: TopixTheme.foregroundColor }}>{message}</Text>
        </View>

        {/* Voting / Bottom Row */}
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: 120 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Icon type='font-awesome' name='thumbs-up' color={TopixTheme.foregroundColor} />
            <Text style={{ marginLeft: 5 }}>{upvotes}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5 }}>
            <Icon type='font-awesome' name='thumbs-down' color={TopixTheme.foregroundColor} />
            <Text style={{ marginLeft: 5 }}>{downvotes}</Text>
          </View>
          <View>
          </View>
        </View>
      </View>
    );

  }
}

export default Post;