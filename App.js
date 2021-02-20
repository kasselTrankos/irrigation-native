import React, { useState, useEffect } from 'react';
import { Header } from 'react-native-elements'
import { StyleSheet, View } from 'react-native';
const { prop } = require('ramda')
import { CircularSpinner} from './elements/circular-spìnner'
import {CircularManager} from './elements/circular-manager'
import { getConfig, setConfig } from './lib/services'
import { set } from 'crocks/core/array';


// log :: String -> a -> a
const log = label => x =>
(console.log(`${label}:`, x), x)

const loadConfig = f => getConfig()
  .map(prop('duration'))
  .fork(log('00'), f)

const updateConfig = f => duration => setConfig(duration)
.fork(log('error'), f)

export default function App() {
  const [loading, setLoading] = useState(true);
  const [duration, setDuration] = useState(true);
  let d= 0
  useEffect(() => {
    d = duration
    console.log(duration, '00000', d)

  }, [duration]);
  // useEffect(() => {
  //   counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
  // }, [duration]);
  const timer = () => {
    const onEndreset = duration;
    let c = duration
    // console.log('from', reset) 
    let interval = setInterval(()=> {
      console.log(c, '123123a')
      --c
      setDuration( c)
      if(c <= 0) {
        setDuration(onEndreset)
        clearInterval(interval)
      }
    }, 1000)
  }
  // let duration = 110
  // const setDuration = x => {
  //   log('UP')(x)
  //   duration = x
  //   console.log(duration, 'q83vu')
  // }
  useEffect(()=> {
    loadConfig((x)=>{
      console.log('LOAD,',x)
      setDuration(x)
      setLoading(false)
    })
    
  }, [])


  return (
    <View style={styles.container}>
      <Header 
       leftComponent={{ icon: 'menu', color: '#fff' }}
       centerComponent={{ text: 'IRRIGATION', style: { color: '#fff' } }}
       rightComponent={{ icon: 'home', color: '#fff' }}
       />
       { loading
          ? <CircularSpinner
              opacity={1}
              backgroundColor="#fff999" />
          : <CircularManager
              top={20}
              dialRadius={33}
              dialTextSize={16}
              radius={160}
              value={duration}
              onChange={setDuration}
              onPress={_ => {
                console.log(d, '9999')
                timer()
                // setLoading(true)
                // updateConfig(loadConfig, duration)
              }} />
        }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
