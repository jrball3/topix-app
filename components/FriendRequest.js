import React from 'react';
import TopixTheme from '../themes/TopixTheme';
import { View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const FriendRequest = ({
  request,
  onPressAccept,
  onPressReject,
  containerStyle = {},
}) => (
  <View 
    style={{
      backgroundColor: "white",
      foregroundColor: TopixTheme.foregroundColor,
      borderRadius: 8,
      flexDirection: 'row',
      padding: 10,
      ...containerStyle,
    }}
  >
    <View style={{ 
      flex: 2,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center'
    }}>
      <Text style={{ 
        fontWeight: 'bold'
      }}>
        {request.friend.username}
      </Text>
    </View>

    <View style={{
      flex: 2,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center'
    }}>
      <Button
        icon={
          <Icon
            name="thumbs-up"
            size={20}
            color="white"
          />
        }
        onPress={onPressAccept}
        style={{ marginRight: 10 }}
      />

      <Button
        icon={
          <Icon
            name="thumbs-down"
            size={20}
            color="white"
          />
        }
        onPress={onPressReject}
      />

    </View>


  </View>
)

export default FriendRequest;

