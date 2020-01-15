import React, { Component } from 'react';
import app from './data/styles'; 
import {TouchableHighlight, StyleSheet, Text, View, ScrollView} from 'react-native';
import { YellowBox } from 'react-native'
import {doNothig} from './lib/irrigate';
import { WaterIndicator } from '@ats-components/water-indicator';
import emit from './lib/socket';
import cutDown from './lib/cutDown';

const ID = 'made riego';
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);
const emitIrrigation = emit(ID);

export default class App extends Component {
  state = { isLoading: false, counter: 0, visibleCounter: false, irrigate: false };
  _delay(time) {
    this.setState(() => ({counter: time, visibleCounter: true }));
    cutDown.call(this, time + 1).fork(doNothig, 
      () => this.setState(() => ({ isLoading: false, visibleCounter: false }))
    );
  }
  _madeIrrigation() {
    this.setState(previous => ({ isLoading: !previous.isLoading, irrigate: true }));
    emitIrrigation('hola mundo').fork(doNothig, ({duration}) => this._delay(duration));
  }
  _renderSpinner() {
    return (this.state.isLoading && <View style={styles.spinner}>
        <View style={styles.spinnerBG}></View>
        { this.state.visibleCounter  && <Text style={styles.counter}>{this.state.counter}</Text> }
      </View>);
  }
  render() {
    const steps = [1, 2, 3];
    return (
      <ScrollView>
        <View style={styles.container}>
          {this._renderSpinner()}
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

const styles = StyleSheet.create(app);
