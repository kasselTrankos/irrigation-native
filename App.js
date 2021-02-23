import React, { useState, useEffect } from 'react';
import { Header } from 'react-native-elements'
import { StyleSheet, View } from 'react-native';
const { prop } = require('ramda')
import { CircularSpinner} from './elements/circular-spìnner'
import {CircularManager} from './elements/circular-manager'
import { getConfig, setConfig } from './lib/services'
const {setTimerDonw} = require('./lib/timer') 



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
  const [duration, setDuration] = useState(10)
  const [ managerDisabled, setManagerDisabled] = useState(false) 
  useEffect(()=> {
    loadConfig((x)=>{
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
              disabled={managerDisabled}
              dialRadius={33}
              dialTextSize={16}
              radius={160}
              value={duration}
              onChange={setDuration}
              onPress={_ => {
                setManagerDisabled(true)
                setTimerDonw(x => setDuration(x), x => setManagerDisabled(false), duration)
                updateConfig(loadConfig)(duration)
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
