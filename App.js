import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View
, ScrollView} from 'react-native';
import {WaterIndicator} from '@ats-components/water-indicator';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

export default class App extends Component {
  render() {
    let steps = [1,2,3,4, 9, 10];
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.welcome}>Irrigate v.01</Text>
        <View style={styles.containerWater}>
          <WaterIndicator style={styles.waterIndicator} steps={steps}/>
        </View>
        <Text style={styles.welcome}>The ScrollView is a generic scrolling container that can contain multiple components and views. The scrollable items need not be homogeneous, and you can scroll both vertically and horizontally (by setting the horizontal property).

This example creates a vertical ScrollView with both images and text mixed together.1</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#fffffe',
    marginTop: 20,
  },
  containerWater: {
    position: 'relative',
    height: 900,
    
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  waterIndicator: {
    position: 'relative',
    marginTop: 0,
  },
});
