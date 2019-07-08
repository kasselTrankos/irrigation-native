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
    const format = 'YYYY-MM-DD';
    const {beginDate, untilDate} = state;
    const selected = {selected: true, color: 'green', textColor: 'white'};
    const begin = moment(beginDate, format);
    const until = (untilDate === null) ? begin : moment(untilDate, format);
    const start = begin.isBefore(until) ? begin : until;
    
    const end = start.isSame(begin) ? until : begin;
    const days = end.diff(start, 'days');
    const arrdays = Array.from({length: days}, (_, i)=> start.add(1, 'days').format(format));
    const markedDates = arrdays.reduce((acc, day, index, arr)=>{
      if(index ===arr.length -1){
        acc[day] = {endingDay: true, ...selected};
      }else {
        acc[day] = {...selected};
      }
      return acc; 
    },{[beginDate]: {startingDay: true, ...selected}});
    this.setState(()=> ({markedDates}))
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
    const {close, select} = this.props;
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
