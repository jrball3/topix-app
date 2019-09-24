import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import Layout from '../constants/Layout';
import User from './User';

const PlayerTicker = ({ players }) => (
  <ScrollView 
    horizontal 
    style={{ width: Layout.window.width - 30 }}
    ref={ref => this.scrollView = ref}
    contentContainerStyle={{
      padding: 5,
      height: 80,
    }}
    onContentSizeChange={(contentWidth, contentHeight)=>{        
        this.scrollView.scrollToEnd({animated: true});
    }}
  >
    { 
      players.map((p, i) => (
        <User 
          key={i}
          user={p} 
          containerStyle={{
            marginHorizontal: 4,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      ))
    }
  </ScrollView>
);

export default PlayerTicker;