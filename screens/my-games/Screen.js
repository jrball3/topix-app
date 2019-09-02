import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { View, Text } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import TopixTheme from '../../themes/TopixTheme';
import Layout from '../../constants/Layout';
import { selectState } from './Helpers';

const mapDispatchToProps = dispatch => {
  return bindActionCreators({

  }, dispatch)
};

const mapStateToProps = state => {
  return {
    ...selectState(state),
  };
};

const commonViewStyle = {
  backgroundColor: TopixTheme.backgroundColor,
  alignItems: 'center',
  paddingTop: 30,
  paddingBottom: 30,
}

const MyGamesScreen = (props) => {
  return (
    <ThemeProvider theme={TopixTheme}>
      <View style={{ 
        ...commonViewStyle,
        width: Layout.window.width,
        height: Layout.window.height,
      }}>
        <Text>MY GAMES!</Text>
      </View>
    </ThemeProvider>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MyGamesScreen);