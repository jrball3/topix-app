import React from 'react';
import { ListItem } from 'react-native-elements';
import TopixTheme from '../themes/TopixTheme';

const User = ({
  user,
  onPress,
  containerStyle = {},
  chevron = false,
  chevronColor = TopixTheme.foregroundColor,
  underlayColor = TopixTheme.backgroundColor,
  checkBox = null,
  ...props
}) => (
  <ListItem
    title={user.username}
    titleStyle={{
      color: TopixTheme.foregroundColor,
      fontWeight: 'bold'
    }}
    chevronColor={chevronColor}
    chevron={chevron}
    checkBox={checkBox}
    containerStyle={{
      borderRadius: 8,
      ...containerStyle,
    }}
    underlayColor={underlayColor}
    onPress={onPress ? (() => onPress(user)) : null}
    {...props}
  />
)

export default User;

