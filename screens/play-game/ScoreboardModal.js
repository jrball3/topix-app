import React from 'react';
import { View } from 'react-native';
import { Text, Overlay } from 'react-native-elements';
import TopixTheme from '../../themes/TopixTheme';
import _ from 'lodash';
import { ScrollView } from 'react-native-gesture-handler';

class ScoreboardModal extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { isOpen, onClose } = this.props;
    const { user, scores } = this.props;
    const sortedScores = _.reverse(scores ? (_.sortBy(scores, s => s.score)) : []);
    return (
      <Overlay 
        isVisible={isOpen}
        overlayBackgroundColor={TopixTheme.backgroundColor}
        height={200}
        onBackdropPress={onClose}
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
        }}>
          <Text h3>Scoreboard</Text>
        </View>

        <View style={{ flex: 3 }}>

          <View style={{ flexDirection: 'row' }}>
            <Text style={{ flex: 1 }}>Rank</Text>
            <Text style={{ flex: 1 }}>Player</Text>
            <Text style={{ flex: 1 }}>Score</Text>
          </View>

          <ScrollView>
            { _.map(sortedScores, (score, idx) => (
              <View 
                key={idx}
                style={{
                  backgroundColor: (idx % 2 == 0) ? TopixTheme.lightBackgroundColor : 'white',
                  flexDirection: 'row' 
                }}
              >
                <Text style={{ flex: 1 }}>{idx + 1}</Text>
                <Text style={{ 
                  flex: 1,
                  fontWeight: 
                    score.player.username === user.username 
                    ? 'bold' 
                    : null 
                }}>
                  {score.player.username}
                </Text>
                <Text style={{ flex: 1 }}>{score.score}</Text>
              </View>
            ))}
          </ScrollView>

        </View>

      </Overlay>
    );
  }
}

export default ScoreboardModal;