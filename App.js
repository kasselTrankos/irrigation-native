import React, { Component } from 'react';
import {
  TouchableHighlight, StyleSheet, Text, View
  , ScrollView, ActivityIndicator
} from 'react-native';
import { YellowBox } from 'react-native'
import { WaterIndicator } from '@ats-components/water-indicator';
import {Future, IO} from './lib/irrigate';
import SocketIOClient from 'socket.io-client';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);


const socket = SocketIOClient('http://micasitatucasita.com:3000');
const madeIrrigation = msg => {
  socket.emit('made riego', msg);
  return new Future((_, resolve) => {
    socket.off('made riego');
    socket.on('made riego', (msg) => {
      resolve(msg);
    });
  });
};


const second = begin => end => new Date(getTime(end) -getTime(begin)).getSeconds();
const getTime = date => date.getTime();

export default class App extends Component {
  state = { isLoading: false, counter: 0, visibleCounter: false, irrigate: false };
  delay(time) {
    const now = new Date();
    const end = new Date(getTime(now) + (time * 1000));
    this.setState(() => ({counter: time, visibleCounter: true }));
    const count = ()=> {
      const current = new Date();
      if(getTime(current) < getTime(end)) {
        this.setState(() => (
          { counter: second(current)(end)}
        ));
        return requestAnimationFrame(count);
      }
      this.setState(() => ({ isLoading: false, visibleCounter: false }));
    };
    count();
  };
  toggle() {
    this.setState(previous => (
      { isLoading: !previous.isLoading, irrigate: true }
    ));
  }
  _madeIrrigation() {
    this.toggle();
    madeIrrigation('hola mundo')
    .fork(()=>{}, ({duration}) => this.delay(duration));
  }
  _renderSpinner() {
    if (this.state.isLoading) {
      return (<View style={styles.spinner}>
        <View style={styles.spinnerBG}></View>
      { this.state.visibleCounter
        && <Text style={styles.counter}>{this.state.counter}</Text> }
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
  counter: {
    position: 'absolute',
    zIndex: 80,
    color: '#ff0099',
    fontSize: 100,
    top: 75,
    textAlign: 'center',
    width: '100%',
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
