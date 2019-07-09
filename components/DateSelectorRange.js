/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import {getDaysBetween, isBefore, YYYMMDD} from './../utils/kalendar';
import { CalendarList } from 'react-native-calendars';
type Props = {};
export class DateSelectorRange extends Component<Props> {
  state = {
    markedDates: {},
    beginDate: null,
    untilDate: null,
  };
  
  constructor(props) {
    super(props);
  }
  setRange (state) {
    const {setRange} = this.props;
    const {beginDate, untilDate} = state;
    const selected = {selected: true, color: 'green', textColor: 'white'};

    const begin = new Date(beginDate);
    const until = (untilDate === null) ? begin : new Date(untilDate);
    const start = isBefore(begin)(until) ? begin : until;
    const end = isBefore(begin)(until) ? until : begin;
    const markedDates = getDaysBetween(start)(end).reduce((acc, {date}, index, arr)=>{
      if(index === arr.length -1){
        acc[YYYMMDD(date)] = {endingDay: true, ...selected};
      }else {
        acc[YYYMMDD(date)] = {...selected};
      }
      return acc; 
    },{[beginDate]: {startingDay: true, ...selected}});
    this.setState(()=> ({markedDates}))
    setRange(beginDate, untilDate ? untilDate : beginDate);
  }
  selectDay(date) {
    const {beginDate, untilDate} = this.state;
    const tmp = { beginDate, untilDate};
    const {dateString} = date;
    if(beginDate && untilDate) {
      tmp.beginDate = dateString; tmp.untilDate = null;
      this.setState(()=> ({untilDate: null, beginDate: dateString}))
    }
    if(beginDate === null) {
      tmp.beginDate = dateString;
      this.setState(()=> ({beginDate: dateString}))
    }
    if(beginDate && untilDate === null) {
      tmp.untilDate = dateString;
      this.setState(()=> ({untilDate: dateString}))
    }
    this.setRange(tmp);
  }
  render() {
    const {markedDates} = this.state;
    return (
      <View style={styles.view}>
        <CalendarList
        // Callback which gets executed when visible months change in scroll view. Default = undefined
          onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
          // Max amount of months allowed to scroll to the past. Default = 50
          pastScrollRange={50}
          // Max amount of months allowed to scroll to the future. Default = 50
          futureScrollRange={50}
          // Enable or disable scrolling of calendar list
          scrollEnabled={true}
          // Enable or disable vertical scroll indicator. Default = false
          showScrollIndicator={true}
          markedDates={markedDates}
          markingType={'period'}
          onDayPress={day => this.selectDay(day)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: 'center'
  }
});
