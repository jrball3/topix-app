import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { ThemeProvider, ListItem } from 'react-native-elements';
import TopixTheme from '../../themes/TopixTheme';
import { selectState } from './Helpers';
import { View } from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import { LinearGradient } from 'expo-linear-gradient';

const mapDispatchToProps = dispatch => {
  return bindActionCreators({

  }, dispatch)
};

const mapStateToProps = state => {
  return {
    ...selectState(state),
  };
};

const list2 = [
  {
    name: 'Amy Farha',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President',
    linearGradientColors: ['#FF9800', '#F44336'],
  },
  {
    name: 'Chris Jackson',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman',
    linearGradientColors: ['#3F51B5', '#2196F3'],
  },
  {
    name: 'Amanda Martin',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
    subtitle: 'CEO',
    linearGradientColors: ['#FFD600', '#FF9800'],
  },
  {
    name: 'Christy Thomas',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg',
    subtitle: 'Lead Developer',
    linearGradientColors: ['#4CAF50', '#8BC34A'],
  },
  {
    name: 'Melissa Jones',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/nuraika/128.jpg',
    subtitle: 'CTO',
    linearGradientColors: ['#F44336', '#E91E63'],
  },
];

class MyGamesScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(props) {

  }

  render() {
    return (
      <ThemeProvider theme={TopixTheme}>
        <View style={{ backgroundColor: '#ECEFF1', paddingVertical: 8 }}>
          {list2.map((l, i) => (
            <ListItem
              Component={TouchableScale}
              friction={90}
              tension={100}
              activeScale={0.95}
              leftAvatar={{ rounded: true, source: { uri: l.avatar_url } }}
              key={i}
              linearGradientProps={{
                colors: l.linearGradientColors,
                start: [1, 0],
                end: [0.2, 0],
              }}
              ViewComponent={LinearGradient}
              title={l.name}
              titleStyle={{ color: 'white', fontWeight: 'bold' }}
              subtitleStyle={{ color: 'white' }}
              subtitle={l.subtitle}
              chevronColor="white"
              chevron
              containerStyle={{
                marginHorizontal: 16,
                marginVertical: 8,
                borderRadius: 8,
              }}
            />
          ))}
        </View>
      </ThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyGamesScreen);