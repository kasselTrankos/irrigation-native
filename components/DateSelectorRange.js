/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import moment from 'moment';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { arrayExpression } from '@babel/types';
type Props = {};
export class DateSelectorRange extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      markedDates: {},
      beginDate: null,
      untilDate: null,
    };
  }
  setRange () {
    const {beginDate, untilDate} = this.state;
    format = 'YYYY-MM-DD';
    const begin = moment(beginDate, format);
    const until = (untilDate === null) ? start : moment(untilDate, format);
    const start = begin.isBefore(until) ? begin : until;
    console.log(beginDate, 'kkkkk', this.state);
    console.log('start', start,'begin', begin.format(format));
    console.log('until', until);
    // const end = start.isSame(begin) ? until : begin;
    // const days = start.diff(end, 'days');
    // const arrdays = Array.from({length: days}, (_, i)=> start.add(i, 'days'));
    // const marked = arrdays.reduce((acc, el, index, add)=>{
    //   if(index ===arrayExpression.length -1){
    //     acc[el.format('YYYY-MM-DD')] = {selected: true, endingDay: true, color: 'green', textColor: 'white'};
    //   }else {
    //     acc[el.format('YYYY-MM-DD')] = {color: 'green', textColor: 'white'};
    //   }
    //   return acc  
    // },{[start.format('YYYY-MM-DD')]: {startingDay: true, color: 'green', textColor: 'white'}});
    // console.log(days, arrdays, marked);
  }
  selectDay(date) {
    const {beginDate, untilDate} = this.state;
    const {dateString} = date;
    if(beginDate && untilDate) {
      this.setState(()=> ({untilDate: null, beginDate: dateString}))
    }
    if(beginDate === null) {
      console.log('set state ');
      this.setState(()=> ({beginDate: dateString}))
    }
    if(beginDate && untilDate === null) {
      this.setState(()=> ({untilDate: dateString}))
    }
    console.log(date, 'dateString is', dateString, beginDate, untilDate);
    this.setRange();
  }
  render() {
    const {close, select} = this.props;
    const {beginDate, untilDate} = this.state;
    const markedDates = {
      '2019-07-02': {startingDay: true, color: 'green'},
      '2019-07-03': {color: 'green'},
      '2019-07-04': {color: 'green'},
      '2019-07-05': {color: 'green'},
      '2019-07-06': {selected: true, endingDay: true, color: 'green', textColor: 'gray'},
    }
    // const markedDates = {
    //   [beginDate]:  {startingDay: true, color: 'green'},
    //   [untilDate]:  {selected: true, endingDay: true, color: 'green', textColor: 'gray'},
    // };
    console.log(markedDates, 'markedDates');
    return (
      <View style={styles.view}>
        <View style={{}}>
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
            onDayPress={day => this.selectDay(day)}
          />
        </View>
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
