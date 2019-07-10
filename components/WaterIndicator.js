import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { StepsIrrigation} from './StepsIrrigation.js';
import {vw, vh, vmin, vmax} from 'react-native-expo-viewport-units';
const Props = {};
export class WaterIndicator extends Component<Props> {
  constructor(props) {
    super(props);
  }
  render() {
    const {volumen = 100} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.cube}>
          <View style={{ ...styles.traker, height: `${volumen}%`}} />
          <StepsIrrigation 
            style={styles.steps} 
            steps={['3', '2.5', '2', '1.5', '1', '0.5', '0']}/>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    position:'relative',
    width: '100%',
    marginTop: 20,
    marginBottom:20,
    height: vh(45)
  },
  cube: {
    position: 'relative',
    left: '5%',
    width: '90%',
    height:'100%',
    fontSize: 18,
    textAlign: 'center',
  }, 
  traker: {
    position: 'absolute',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: '#00C3FF',
    height: '100vh',
    zIndex: 5,
    left: 0,
    bottom:0,
    width: '100%',
    overflow: 'hidden'
  },
  steps: {
    left: 0,
    zIndex: 9,
    top: 0,
    width: 70,
    height: 300
  },
  step: {
    flexDirection: 'row',
    paddingBottom: 15
  },
  stepText: {
    color :'#fff',
    paddingRight: 5,
    paddingLeft: 5
  },
  text: {
    color: '#fff'
  }
});