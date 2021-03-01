import React, { useState, useRef } from 'react';
import { View, Dimensions, PanResponder, ScrollView, Vibration } from 'react-native';
import Day from './src/Day';
import datetime from './src/date';
import { curry, __ } from 'ramda'
import {getMonday, getDate, getMonth, setMidnight, min, max} from './src/utils'
const { getTop } = require('../../utils/calendar')

const getDay = date => {
  const D = new datetime(date);
  const today = new datetime(new Date());
  const monday = D.concat(D.map(getMonday));
  return value => {
    const dayAdd = datetime.from(new Date(value * 24 * 60 * 60 * 1000));
    const currentDay = monday.concat(dayAdd);
    const isToday = currentDay.map(setMidnight).equals(today.map(setMidnight));
    return {
      month: currentDay.map(getMonth).value,
      day: currentDay.map(getDate).value,
      date: currentDay,
      isToday,
      isPassed: !isToday && currentDay.map(setMidnight).lte(today.map(setMidnight))
    }; 
  }
}

// updateDay :: Number -> {} -> {}
const updateDay = curry((coord, day) => Object.assign({}, day, {selected: day.key >= coord && day.key <= coord}))

// updateDays :: [{}] -> Number -> [{}] 
const updateDays = curry((days, coord) => days.map(updateDay(coord, __)))
// _onPanResponderMove :: ( a -> b) -> [] -> {} -> []
const _onPanResponderMove = curry((setDays, days, event) =>pipe(
  getTop,
  updateDays(days),
  x => setDays([ ...x ])
)(event))

const Calendar = props => {
  
  const {
    amount = 200,
    startDate = new Date(),
    rows = 7,
    colorDayText = '#192965',
    inactiveColor = '#fff',
    activeColor = '#2988B1',
    vibrationDuration = 100,
    passedDay = '#0f4c75',
    currentDay = '#edf7fa',
    onDates = ()=> {},
    calHeight = 280,
    irrigations = []
  } = props

  const view = useRef();
  const [cellStart, setCellStart] = useState(0);
  const [height, setHeight] = useState(300);
  const [top, setTop] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [dragging, setDragging] = useState(true);
  const {width} = Dimensions.get('window');
  const radius = Math.round((width) / rows);
  const getEnd = max(cellStart);
  const getStart = min(cellStart);

  // isSameDaye :: datetime a -> Date b -> Boolean
  const isSameDay = curry((a, b) => {
    const dateB = new datetime(new Date(b.date))
    return a.map(setMidnight).equals(dateB.map(setMidnight))
  })


  const [days, setDays] = useState( Array(amount).fill().map((v, index) => {
    const {day, isToday, isPassed, date} = getDay(startDate)(index);
    return {
      selected: false,
      key: index,
      day, isPassed, isToday, date
    };
  }));
  const onDatesSelected = () => {
    const selected = days.filter(({selected}) => selected).map(x=> x.date);
    onDates([ ...selected]);
  };
  const onPress = key => {
    days[key].selected = !days[key].selected;
    setDays([ ...days]);
    onDatesSelected();
  }
  const activateDays = (start, end) => days.map(({selected, key, day, isPassed, isToday, date}) => ({
    selected: key >= start && key <= end, 
    key, day, isPassed, isToday, date
  }))
  const onPresent = evt => view.current.measure((x, y, width, height, pageX, pageY) =>{
    setTop(pageY);
    setHeight(height);
  });
  
  // handleScrollTop :: {} -> Number
  const handleScrollTop = e =>
    setScrollTop(Number(e.nativeEvent.contentOffset.y))
  
  const handleMultiple = ()=> {
    Vibration.vibrate(vibrationDuration);
    setDragging(false)
  };
  const panResponde = PanResponder.create({
    // prevent children interactuact prevented.
    onMoveShouldSetPanResponderCapture: () => !dragging,
    onPanResponderGrant: nativeEvent => {
      const coords = getTop(rows, radius, top, nativeEvent);
      setCellStart(coords);
      setDays([...activateDays(cellStart, cellStart)])
    },
    onPanResponderMove: _onPanResponderMove(setDays, days, __),
    onPanResponderRelease: () => {
      setDragging(true);
      onDatesSelected();
    },
    onPanResponderTerminationRequest: () => true,
  });
  
  return (<ScrollView
    onScroll={handleScrollTop}
    style={{
      position: 'absolute',
      height: calHeight,
      width: '100%',
      bottom: 80,
    }}>
    <View style={{
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      top: 0,
      width: '100%',
      height: '100%',
    }}
    ref={view}
    onLayout={onPresent}
    {...panResponde.panHandlers}>
    {days.map(({selected, key, day, isToday, isPassed, date}, index)=> 
     <Day 
      onLongPress = {handleMultiple}
      onPress = {onPress}
      selected = {selected}
      fillColor = { selected ? activeColor : inactiveColor}
      text = {day}
      passedDay = {passedDay}
      irrigations = {irrigations.filter(isSameDay(date))}
      isToday = {isToday}
      isPassed = {isPassed}
      currentDay={currentDay}
      dataId={key}
      key={index}
      colorDayText={colorDayText}
      radius={radius} 
      />)}
  </View></ScrollView>);
}

export default Calendar;