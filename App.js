import React, { useState, useEffect } from 'react';
import { Button } from 'react-native-elements'
import { StyleSheet, View } from 'react-native';
const { prop } = require('ramda')
import { CircularSpinner} from './elements/circular-spìnner'
import {CircularManager} from './elements/circular-manager'
import { getConfig, setConfig } from './lib/services'
const {setTimerDonw} = require('./lib/timer') 
import { Icon } from 'react-native-elements'
import Calendar from './elements/date-selector'


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
       { loading
          ? <CircularSpinner
              opacity={1}
              backgroundColor="#fff999" />
          : <View
              style={styles.manager}>
              <CircularManager
                style={{
                  flex: 1
                }}
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
                <Calendar style={styles.calendar} />
                <Button
                  buttonStyle={{backgroundColor: '#5ca4a9'}}
                  containerStyle={{  marginBottom:5}}
                  title="Editar"
                />
              </View>
        }
    </View>
  );
}

const styles = StyleSheet.create({
  calendar: {
  }, 
  manager: {    
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    height: '100%',
    width: '100%'
  },
  container: {
    flex: 1,
    // flexDirection: 'row',
    backgroundColor: '#f7fff7',
    alignItems: 'center',
  },
});
