import React, {useState} from 'react';
import { YellowBox, View } from 'react-native';
import WaterManager from '@ats-components/water-manager';
import emit from './src/socket';
import {getTime, secondsBetween, lt} from './src/time';
import {Future} from './lib/fp'; 

const ID = 'made riego';
const emitIrrigation = emit(ID);
const _void =() => {};

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);




export default function App() {
  const [disabled, setDisabled] = useState(false);
  const [time, setTime] = useState(15);

  const cutDown = duration =>{
    const end = new Date(getTime(new Date()) + (duration * 1000));
    const secondsFromNow = secondsBetween(end);
    return new Future((_, resolve) => {
      const counter = () => {
        if(lt(end)) {
          setTime(secondsFromNow());
          return requestAnimationFrame(counter);
        }
        resolve();
      }
      counter();
    });
  };

  const delay = (duration) => {
    cutDown(duration + 1).fork(
      _void, 
      () => setDisabled(false)
    );
  }
  const madeIrrigation = e => {
    setDisabled(true);
    emitIrrigation('hola mundo').fork(_void, ({duration}) => delay(duration))
  };
  return (
    <View style={{flex: 1, alignContent: 'center'}}>
      <WaterManager
      strokeWidth={2}
      dialWidth={3}
      strokeColor="#87c0cd"
      disabled={disabled}
      maxDial={90}
      value={time}
      onPress={madeIrrigation}
      fontColor={disabled ? '#5E807F': '#87c0cd'}
      waterColor= {disabled ? '#B2B2B2' :'#eaf5ff'}
      dialColor = {disabled ? '#666' : '#3c70a4'} />
    </View>
  );
}
