import React from 'react';
import { ListItem } from 'react-native-elements';
import TopixTheme from '../themes/TopixTheme';
import TouchableScale from 'react-native-touchable-scale';
import { LinearGradient } from 'expo-linear-gradient';

const Game = ({
  navigation,
  gameName,
  gameType,
  gameId,
}) => (
  <ListItem
    Component={TouchableScale}
    friction={90}
    tension={100}
    activeScale={0.95}
    title={gameName}
    titleStyle={{ color: TopixTheme.foregroundColor, fontWeight: 'bold' }}
    subtitleStyle={{ color: TopixTheme.foregroundColor }}
    subtitle={gameType}
    chevronColor={TopixTheme.foregroundColor}
    chevron
    containerStyle={{
      marginHorizontal: 16,
      marginVertical: 8,
      borderRadius: 8,
    }}
    onPress={() => navigation.navigate("Play Game", { gameId })}
  />
)

export default Game;

