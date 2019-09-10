import React from 'react';
import { ListItem } from 'react-native-elements';
import TopixTheme from '../themes/TopixTheme';
import TouchableScale from 'react-native-touchable-scale';
import { LinearGradient } from 'expo-linear-gradient';

const Game = ({
  game,
  onSelect,
  containerStyle = {},
  chevron = true,
  chevronColor = TopixTheme.foregroundColor,
  checkBox = null,
}) => (
  <ListItem
    Component={TouchableScale}
    friction={90}
    tension={100}
    activeScale={0.95}
    title={game.name}
    titleStyle={{ color: TopixTheme.foregroundColor, fontWeight: 'bold' }}
    subtitleStyle={{ color: TopixTheme.foregroundColor }}
    // subtitle={game.type}
    subtitle={`${game.players.length} Players`}
    chevronColor={chevronColor}
    chevron={chevron}
    checkBox={checkBox}
    containerStyle={{
      marginHorizontal: 16,
      marginVertical: 8,
      borderRadius: 8,
      ...containerStyle,
    }}
    onPress={() => onSelect(game)}
  />
)

export default Game;

