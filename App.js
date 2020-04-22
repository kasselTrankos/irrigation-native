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
import {get, post, delay} from './src/query';
import { KALENDAR, CONFIG, RESTART, CONSTANTS } from './src/constants'; 


const IRRIGATE = 'made riego';
const ON_IRRIGATE = 'on-irrigate';
let initialize = false;
const _void = () => {};

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);
//will be learn 
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
  const [dateEdition, setDateEdition] = useState({hour: '10', minute: '20', second: '00', duration: '00'});
  const [disabled, setDisabled] = useState(false);
  const [time, setTime] = useState(15);
  const [loading, setLoading] = useState(true);
  const toggle = state => x => {
    setDisabled(state);
    return x;
  }
  const [updating, setUpdating] = useState(false);
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
  useEffect(() => {
    get(CONFIG)
      .or(delay(1000).chain(()=> get(CONFIG)))
      .map(({duration}) => duration)
      .map(setTime)
      .fork(console.log, () => setLoading(false));
    return () => {
      console.log('end use Effect');
    }
  }, []);
  const madeIrrigation = e => {
    
    publish(IRRIGATE, 'riego-v3');
  };
  const selDates = e => {
    dates = [...e];
    setUpdating(true);
  }
  const onSave = irrigation => {
    setLoading(true);
    post(KALENDAR, {dates, irrigation})
    .fork( console.error, () => setLoading(false))
  }
  const change = e => {
    setDateEdition({...e});
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
            {updating &&  <View style={{flex: 1}}>
              <Manager value={{...dateEdition}} onSave={onSave} onChange={change} update={!disabled}/>
              </View>}
          </View>
      </View>}
    </View>
  );
}
