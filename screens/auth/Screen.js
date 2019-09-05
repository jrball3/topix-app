import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { View, ActivityIndicator, Text } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import TopixTheme from '../../themes/TopixTheme';
import Layout from '../../constants/Layout';
import { updateField, checkSession, login } from './Actions';
import { selectState } from './Helpers';
import { getSession } from '../../Helpers';
import LoginForm from './LoginForm';

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    updateField,
    checkSession,
    login,
  }, dispatch)
};

const mapStateToProps = state => {
  return {
    ...selectState(state),
    session: getSession(state),
  };
};

const commonViewStyle = {
  backgroundColor: TopixTheme.backgroundColor,
  alignItems: 'center',
  paddingTop: 30,
  paddingBottom: 30,
}

class AuthScreen extends React.Component {
  constructor(props) {
    super(props);
    this.performChecks = this.performChecks.bind(this);
    this.renderLoginForm = this.renderLoginForm.bind(this);
    this.renderLoadingContent = this.renderLoadingContent.bind(this);
  }

  componentDidMount() {
    this.performChecks();
  }

  componentDidUpdate() {
    this.performChecks();
  }

  performChecks() {
    const { 
      navigation,
      sessionChecked,
      checkingSession,
      session,
    } = this.props;
    
    const { authToken } = session;
    if (authToken && !checkingSession && !sessionChecked) {
      this.props.checkSession({ navigation, authToken });
    }
  }

  renderLoadingContent() {
    return (
      <View style={commonViewStyle}>
        <ActivityIndicator 
          size="large" 
          color={TopixTheme.foregroundColor} 
        />
        <Text>Loading...</Text>
      </View>
    )
  }

  renderLoginForm() {
    return <LoginForm {...this.props} />
  }

  render() {
    const {
      sessionChecked,
      needLogin,
      session,
    } = this.props;

    const { authToken } = session;

    let content;
    if (!authToken || (sessionChecked && needLogin)) {
      content = this.renderLoginForm();
    } else {
      content = this.renderLoadingContent();
    }

    return (
      <ThemeProvider theme={TopixTheme}>
        <View style={{
          ...commonViewStyle,
          width: Layout.window.width,
          height: Layout.window.height,
        }}>
          { content }
        </View>
      </ThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);