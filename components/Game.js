import React from 'react';
import { ListItem } from 'react-native-elements';
import TopixTheme from '../themes/TopixTheme';
import TouchableScale from 'react-native-touchable-scale';
import { LinearGradient } from 'expo-linear-gradient';

const Game = ({
  game,
  onSelect,
}) => (
  <ListItem
    Component={TouchableScale}
    friction={90}
    tension={100}
    activeScale={0.95}
    title={game.name}
    titleStyle={{ color: TopixTheme.foregroundColor, fontWeight: 'bold' }}
    subtitleStyle={{ color: TopixTheme.foregroundColor }}
    subtitle={game.type}
    chevronColor={TopixTheme.foregroundColor}
    chevron
    containerStyle={{
      marginHorizontal: 16,
      marginVertical: 8,
      borderRadius: 8,
    }}
    onPress={() => onSelect(game)}
  />
)

export default Game;

