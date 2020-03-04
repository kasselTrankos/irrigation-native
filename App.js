import React, {useState, useEffect} from 'react';
import { YellowBox, View, ScrollView, NativeMethodsMixin } from 'react-native';
import WaterManager from '@ats-components/water-manager';
import Spiner from '@ats-components/water-spiner';
import Calendar from '@ats-components/water-calendar';
import Manager from  '@ats-components/manager-irrigation';
import {prop} from './lib/fp';


import {listen, publish} from './src/socket';

import {getTime, secondsBetween, lt} from './src/time';
import Task from './lib/task';
import {get, post} from './src/query';
import { CONSTANTS } from './src/constants'; 
import { emitNotification } from 'expo/build/Notifications/Notifications';
let i = 0;
const IRRIGATE = 'made riego';
const ON_IRRIGATE = 'on-irrigate';
const CLOSE = 'cut-and-close';
let initialize = false;
const _void =() => {};

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);
const mockingbird = fn => (...args) => fn(fn, ...args);
const Counter = setTime => {
  let running = false;
  return duration => {
    const end = new Date(getTime(new Date()) + (duration * 1000));
    const secondsFromNow = secondsBetween(end);
    if(running) return new Task((reject)=> reject(0)); 

    return new Task((_, resolve) => {
      const counter = () => {
        if(lt(end)) {
          setTime(secondsFromNow());
          return requestAnimationFrame(counter);
        }
        running = false;
        resolve(duration);
      }
      counter();
      running = true;
      
    }, ()=> _continue = false);
  }
};


export default function App() {
  let dates = [];
  const [disabled, setDisabled] = useState(false);
  const [time, setTime] = useState(15);
  const [loading, setLoading] = useState(true);
  const toggle = state => x => {
    setDisabled(state);
    return x;
  }
  const [updating, setUpdating] = useState(false);
  useEffect(() => {
    get(CONSTANTS.CONFIG)
      .map(x=> x.duration)
      .map(setTime)
      .map(toggle(false))
      .fork(console.error, _void);
    return () => {
      console.log('noiuis');
    }
  }, []);
  if(!initialize) {
    const cutDown = Counter(setTime);
    listen(ON_IRRIGATE)
      .map(prop('duration'))
      .map(toggle(true))
      .chain(cutDown)
      .map(setTime)
      .map(toggle(false))
      .fork(_void, _void);
    }
  const madeIrrigation = e => {
    
    publish(IRRIGATE, 'riego-v3');
  };
  const selDates = e => {
    dates = [...e];
    setUpdating(true);
  }
  const onSave = irrigation => {
    setLoading(true);
    post(CONSTANTS.KALENDAR, {dates, irrigation})
    .fork( console.error, () => setLoading(false))
  }
  initialize = true;
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
            {updating &&  <View style={{flex: 1}}><Manager onSave={onSave} /></View>}
          </View>
      </View>}
    </View>
  );
}
