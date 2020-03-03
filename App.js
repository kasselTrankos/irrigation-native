import React, {useState, useEffect} from 'react';
import { YellowBox, View, ScrollView } from 'react-native';
import WaterManager from '@ats-components/water-manager';
import Spiner from '@ats-components/water-spiner';
import Calendar from '@ats-components/water-calendar';
import Manager from  '@ats-components/manager-irrigation';
import {prop} from './lib/fp';


import {listen, publish} from './src/socket';

import {getTime, secondsBetween, lt} from './src/time';
import Task from './lib/task';
import {get} from './src/query';
import { CONSTANTS } from './src/constants'; 

const IRRIGATE = 'made riego';
const ON_IRRIGATE = 'on-irrigate';
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
  let dates = [];
  const [disabled, setDisabled] = useState(false);
  const [time, setTime] = useState(15);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  
  useEffect(() => {
    get(CONSTANTS.CONFIG)
    .map(x=> x.duration)
    .map(setTime)
    .fork(_void, () => setLoading(false));
  }, []);
  listen(ON_IRRIGATE)
    .map(prop('duration'))
    .chain(cutDown(setTime))
    .map(setTime)
    .fork(_void, () => setDisabled(false));

  const madeIrrigation = e => {
    setDisabled(true);
    publish(IRRIGATE, 'riego-v3');
  };
  const selDates = e => {
    dates = [...e];
    setUpdating(true);
  }
  return (
    <View style={{flex: 1, alignContent: 'center'}}>
      { loading 
      ? <View style={{position: 'absolute', top:'50%', height: '100%'}}>
          <Spiner backgroundColor="#fff" /></View> 
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
          <View style={{flex:1, top:0,}}>
            <View style={{flex:1}}><Calendar top={0} height={160} onDates={selDates}/></View>
            {updating &&  <View style={{flex: 1}}><Manager /></View>}
          </View>
      </View>}
    </View>
  );
}
