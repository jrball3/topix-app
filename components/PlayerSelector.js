import React from 'react';
import PlayerTicker from './PlayerTicker';
import { View, FlatList } from 'react-native';
import { Text } from 'react-native-elements';
import User from './User';
import TopixTheme from '../themes/TopixTheme';
import Layout from '../constants/Layout';


class PlayerSelector extends React.Component {
  constructor(props) {
    super(props);
    this.isPlayerSelected = this.isPlayerSelected.bind(this);
    this.toggleSelection = this.toggleSelection.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  isPlayerSelected(player) {
    const { selectedPlayers } = this.props;
    return selectedPlayers.some(s => s.id === player.id);
  }

  toggleSelection(player) {
    if (this.isPlayerSelected(player)) {
      this.props.onRemovePlayer(player);
    } else {
      this.props.onAddPlayer(player);
    }
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => {
    const pressHandler = () => this.toggleSelection(item);
    return (
      <User
        user={item}
        containerStyle={{
          backgroundColor: TopixTheme.backgroundColor,
          marginVertical: 0,
          marginHorizontal: 0,
        }}
        checkBox={{
          checked: this.isPlayerSelected(item),
          onPress: pressHandler
        }}
        onPress={pressHandler}
      />
    );
  }

  render() {
    const {
      selectedPlayers,
      selectablePlayers,
      nestedScrollEnabled,
      height = 250,
    } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <Text>Players</Text>
        <PlayerTicker players={selectedPlayers} />
        <View style={{ padding: 5 }} />
        <Text>Suggested</Text>

        {/* <View style={{ width: Layout.window.width - 50 }}> */}
          <FlatList
            style={{ 
              width: Layout.window.width - 50,
              height,
            }}
            nestedScrollEnabled={nestedScrollEnabled}
            keyExtractor={this.keyExtractor}
            data={selectablePlayers}
            renderItem={this.renderItem}
          />
        {/* </View> */}
      </View>
    )
  }
}

export default PlayerSelector;