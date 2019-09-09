import Store from "./Store";
import { Provider } from "react-redux";
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppFlow from './navigation/AppFlow';
import { createAppContainer } from 'react-navigation';
import { setSession } from './Actions';
import { getSessionStore } from './Helpers';
import axios from 'axios';

axios.interceptors.request.use(request => {
  console.log('Starting Request', request)
  return request
})

axios.interceptors.response.use(response => {
  console.log('Response:', response)
  return response
})

export default function App(props) {
  let ret;
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    ret = (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    const App = createAppContainer(AppFlow);
    ret = (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <App />
      </View>
    );
  }
  
  return (
    <Provider store={Store}>
      {ret}
    </Provider>
  )
}

async function loadPersistedSession() {
  try {
    const session = await AsyncStorage.getItem(getSessionStore());
    if (session !== null) {
      console.log('Loading persisted session...')
      const parsed = JSON.parse(session)
      await Store.dispatch(setSession({ session: parsed, store: false }))
      console.log('Persisted session loaded.')
    } else {
      console.log('No persisted session.')
    }
  } catch (error) {
    console.error('Failed to retrieve persisted session.')
    console.error(error)
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
    // loadPersistedSession(),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
