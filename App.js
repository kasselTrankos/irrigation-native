import React, {useState, useEffect} from 'react';
import { YellowBox, View, ScrollView } from 'react-native';
import WaterManager from '@ats-components/water-manager';
import Spiner from '@ats-components/water-spiner';
import Calendar from '@ats-components/water-calendar';
import emit from './src/socket';
import {getTime, secondsBetween, lt} from './src/time';
import {Future} from './lib/fp';
import {get} from './src/query';
import { CONSTANTS } from './src/constants'; 

const ID = 'made riego';
const emitIrrigation = emit(ID);
const _void =() => {};

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);


const cutDown = duration => setTime=>{
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

const loadConfig = setTime => setLoading => get(CONSTANTS.CONFIG).fork(
  err=> console.log(err), 
  ({duration = 15})=> {
    setTime(duration);
    setLoading(false);
});


export default function App() {
  const [disabled, setDisabled] = useState(false);
  const [time, setTime] = useState(15);
  const [loading, setLoading] = useState(true);
  

  

  const delay = (duration) => {
    cutDown(duration + 1)(setTime).fork(
      _void, 
      () => {
        setDisabled(false);
        setTime(duration);
      }
    );
  }
  useEffect(() => {
    loadConfig(setTime)(setLoading);
  }, []);
  const madeIrrigation = e => {
    setDisabled(true);
    emitIrrigation('hola mundo').fork(_void, ({duration}) => delay(duration))
  };
  return (
    <View style={{flex: 1, alignContent: 'center'}}>
      { loading 
      ? <View style={{position: 'absolute', top:0}}><Spiner  /></View> 
      : <View style={{flex: 1,}}>
        <View style={{ flex:1}}><WaterManager
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
        <View style={{flex:1, top:0}}><Calendar top={0} /></View>
      </View>}
    </View>
  );
}
