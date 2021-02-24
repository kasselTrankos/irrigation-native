import React, { useState, useEffect } from 'react';

import { StyleSheet, View } from 'react-native';
const { prop, pipe, curry, __, traverse } = require('ramda')
import { CircularSpinner} from './elements/circular-spìnner'
import {CircularManager} from './elements/circular-manager'
import { getConfig, setConfig, postIrrigate } from './lib/services'
const {setTimerDonw} = require('./lib/timer') 
import Calendar from './elements/date-selector'
import Async from 'crocks/Async';
const { buttonsTpl, modalTpl } = require('./helpers/tpl')


// log :: String -> a -> a
const log = label => x =>
(console.log(`${label}:`, x), x)

// loadConfig :: (a -> b) -> Async {} Error
const loadConfig = f => getConfig()
  .map(prop('duration'))
  .fork(log('00'), f)

// updateConfig -> (a -> b) -> Async {} Error
const updateConfig = f => duration => setConfig(duration)
  .fork(log('error'), f)



const postIrrigations = (dates, time) =>  
  traverse(Async.of, pipe(
    x => new Date(x.setHours(time.hour)).setMinutes(time.minute),
    postIrrigate(__, time.second)
  ), dates) 
  .fork(log('err'), log('succ'))

export default function App() {
  const [loading, setLoading] = useState(true);

  const [duration, setDuration] = useState(10)
  const [ managerDisabled, setManagerDisabled] = useState(false)
  const [ visibleButtons, setVisibleButtons] = useState(false)
  const [ visibleModal, setVisibleModal] = useState(false)
  const [ irrgations, setIrrigations] = useState([])


  useEffect(()=> {
    loadConfig((x)=>{
      setDuration(x)
      setLoading(false)
    })
    
  }, [])


  return (
    <View style={styles.container}>
      { visibleModal && modalTpl(x => {
        setVisibleModal(false)
        setLoading(true)
        postIrrigations( irrgations, x)
      })}
       { loading
          ? <CircularSpinner
              opacity={1}
              backgroundColor="#fff" />
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
                <Calendar style={styles.calendar} 
                  onDates = {(dates)=> {
                    setIrrigations(dates)
                    setVisibleButtons(Boolean(dates.length))
                  }}/>
                { visibleButtons && buttonsTpl(
                  () => setVisibleModal(true) 
                ) }
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
    backgroundColor: '#f7fff7',
    alignItems: 'center',
  },
});
