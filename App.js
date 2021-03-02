import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

const { prop, 
  pipe, flatten, map,
  curry, __, traverse, 
  lift, chain } = require('ramda')
import { CircularSpinner} from './elements/circular-spìnner'
import {CircularManager} from './elements/circular-manager'
const {CurrentIrrigations} = require('./elements/current-irrigations') 
import { getConfig, 
  setConfig, 
  postIrrigate, 
  getIrrigations,
  deleteIrrigate } from './lib/services'
const { isSameDay, toDate, getTime } = require('./utils/date')
const {setTimerDonw} = require('./lib/timer') 
import Calendar from './elements/date-selector'
import Async from 'crocks/Async';
const { buttonsTpl, modalTpl } = require('./helpers/tpl')


// log :: String -> a -> a
const log = label => x =>
(console.log(`${label}:`, x), x)

// initalLoad :: (a -> b) -> Async {} Error
const initialLoad = setInitialData => 
  lift(setInitialData)(
    getConfig().map(prop('duration')),
    getIrrigations()
  )

// postIrrigation :: datetime a -> Async {} Error 
const postIrrigation = curry((date, time) =>  pipe(
  x => x.inspect(),
  x => new Date(x.setHours(time.hour)).setMinutes(time.minute),
  postIrrigate(__, time.second)
)(date))

// postIrrigations :: [] -> Number -> Async Error []
const postIrrigations = curry((dates, time) => pipe(
  () => traverse(Async.of, postIrrigation(__, time), dates),
  chain(()=> getIrrigations())
)())

const irrigationDelete = pipe(
  prop('date'),
  toDate,
  getTime,
  deleteIrrigate
)

// deleteIrrigate :: [] -> Async Error []
const deleteIrrigations = curry((irrigations, dates) => pipe(
  map(d => irrigations.filter(isSameDay(d))),
  flatten,
  x  => traverse(Async.of, irrigationDelete, x),
  chain(()=> getIrrigations())
)(dates))






export default function App() {
  const [loading, setLoading] = useState(true);

  const [duration, setDuration] = useState(10)
  const [ managerDisabled, setManagerDisabled] = useState(false)
  const [ visibleButtons, setVisibleButtons] = useState(false)
  const [ visibleModal, setVisibleModal] = useState(false)
  const [ irrigations, setIrrigations] = useState([])
  const [ irrigationsCalendar, setIrrigationsCalendar] = useState([])


  useEffect(()=> {
    initialLoad(
      (duration, irrigations)=> {
        setDuration(duration)
        setIrrigationsCalendar(irrigations)
      }, 
    ).fork(log('error'), () => setLoading(false))
    
  }, [])


  return (
    <View style={styles.container}>
      { visibleModal && modalTpl(time => {
        setVisibleModal(false)
        setLoading(true)
        postIrrigations( irrigations, time)
          .fork(log('err'), (irrigations) => {
            setLoading(false)
            setVisibleButtons(false)
            setIrrigationsCalendar(irrigations)
          })
      }, ()=> setVisibleModal(false))}
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
                  setConfig(duration).fork(log('err'), log('succ'))
              }} />
              <CurrentIrrigations
                style={styles.current}
                data={ irrigationsCalendar } />
                <Calendar
                  irrigations = {irrigationsCalendar}
                  style={styles.calendar} 
                  onDates = {(dates)=> {
                    setIrrigations(dates)
                    setVisibleButtons(Boolean(dates.length))
                  }}/>
                { visibleButtons && buttonsTpl(
                  () => setVisibleModal(true),
                  () =>{ 
                    setLoading(true)
                    deleteIrrigations(irrigationsCalendar, irrigations)
                      .fork(log('ERROR'), x =>{
                         setLoading(false)
                         setVisibleButtons(false)
                         setIrrigationsCalendar(x)
                      })
                  }
                ) }
              </View>
        }
    </View>
  );
}

const styles = StyleSheet.create({
  calendar: {
  }, 
  current: {
    position: 'absolute',
    top: 100
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
