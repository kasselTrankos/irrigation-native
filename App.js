import React, {useState, useEffect} from 'react';
import { YellowBox, View, ScrollView } from 'react-native';
import WaterManager from '@ats-components/water-manager';
import Spiner from '@ats-components/water-spiner';
import Calendar from '@ats-components/water-calendar';
import {listen, publish} from './src/socket';
import {getTime, secondsBetween, lt} from './src/time';
import Task from './lib/task';
import {get} from './src/query';
import { CONSTANTS } from './src/constants'; 

const IRRIGATE = 'made riego';
const ON_IRRIGATE = 'on-irrigate'
const emit = id => on_response => msg => {
  publish(id)(msg);
  return new Task((_, resolve) => listen(on_response)(msg=> resolve(msg)));
};
const emitIrrigation = emit(IRRIGATE)(ON_IRRIGATE);
const _void =() => {};

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);



const cutDown = setTime => duration => {
  const end = new Date(getTime(new Date()) + (duration * 1000));
  const secondsFromNow = secondsBetween(end);
  return new Task((_, resolve) => {
    const counter = () => {
      if(lt(end)) {
        setTime(secondsFromNow());
        return requestAnimationFrame(counter);
      }
      resolve(duration);
    }
    counter();
  });
};

export default function App() {
  const [disabled, setDisabled] = useState(false);
  const [time, setTime] = useState(15);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get(CONSTANTS.CONFIG)
    .map(x=> x.duration)
    .map(setTime)
    .fork(_void, () => setLoading(false));
  }, []);

  const madeIrrigation = e => {
    setDisabled(true);
    emitIrrigation('riego v2')
    .map(x=> x.duration)
    .chain(cutDown(setTime))
    .map(setTime)
    .fork(_void, () => setDisabled(false));
  };
  return (
    <View style={{flex: 1, alignContent: 'center'}}>
      { loading 
      ? <View style={{position: 'absolute', top:'50%', height: '100%'}}><Spiner backgroundColor="#fff" /></View> 
      : <View style={{flex: 1,}}>
          <View style={{ flex:1}}>
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
              dialColor = {disabled ? '#666' : '#3c70a4'} /></View>
          <View style={{flex:1, top:0}}>
            <Calendar top={0} height={160}/></View>
      </View>}
    </View>
  );
}
