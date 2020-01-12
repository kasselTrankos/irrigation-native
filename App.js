import React, { Component } from 'react';
import {
  TouchableHighlight, StyleSheet, Text, View
  , ScrollView, ActivityIndicator
} from 'react-native';
import { WaterIndicator } from '@ats-components/water-indicator';
import Future from './lib/irrigate';
import SocketIOClient from 'socket.io-client';
const socket = SocketIOClient('http://micasitatucasita.com:3000');
const madeIrrigation = (msg) => {
  socket.emit('made riego', msg);
  return new Future((_, resolve) => {
    socket.on('made riego', (msg) => {
      resolve(msg);
    });
  });
  
}

export default class App extends Component {
  state = { isLoading: false };
  toggle() {
    return new Future((_, resolve) => {
      this.setState(previousState => (
        { isLoading: !previousState.isLoading }
      ));
      resolve(this.state.isLoading);
    });
  }
  _madeIrrigation() {
    this.toggle().chain(() => madeIrrigation('hola mundo')).chain(() => this.toggle()).fork(err=>err, ok=> console.log(ok));
  }
  _renderSpinner() {
    if (this.state.isLoading) {
      return (<View style={styles.spinner}>
        <View style={styles.spinnerBG}></View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>);
    } else {
      return null;
    }
  }
  render() {
    let steps = [1, 2, 3, 4, 9, 10];
    return (
      <ScrollView>
        <View style={styles.container}>
          {this._renderSpinner()}
          <Text style={styles.welcome}>Irrigate v.01.1</Text>
          <TouchableHighlight
            syle={styles.button}
            onPress={() => this._madeIrrigation()}
            underlayColor="white">
            <View style={styles.containerWater}>
              <WaterIndicator
                fontSize="10"
                backgroundColor="#C7E1F4"
                color="#145269"
                style={styles.waterIndicator}
                steps={steps} />
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#fffffe',
    marginTop: 20,
    height: '100%',
  },
  spinner: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: 20,
    flex: 1,
    justifyContent: 'center',
  },
  spinnerBG: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    opacity: 0.8,
  },
  button: {
    flex: 1,
    height: 300,
    backgroundColor: '#eee',
  },
  containerWater: {
    position: 'relative',
    height: 200,
    width: 245,

  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: '#97081A',
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
