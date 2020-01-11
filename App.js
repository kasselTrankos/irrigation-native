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
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.welcome}>Irrigate v.01.1</Text>
          <View style={styles.containerWater}>
            <WaterIndicator
              fontSize="10"
              backgroundColor="#eee"
              color="#aa33ee"
              style={styles.waterIndicator} 
              steps={steps}/>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    flexDirection: 'column',
    backgroundColor: '#fffffe',
    marginTop: 20,
  },
  containerWater: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    textAlign: 'center',
    position: 'relative',
    height: 150,
    width: 245,
    
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
