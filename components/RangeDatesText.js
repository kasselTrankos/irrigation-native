import React, {Component} from 'react';
import {getDaysBetween, DDMMYYYY} from './../utils/kalendar';
import { StyleSheet, Text, View } from 'react-native';
const Props = {};
export class RangeDatesText extends Component<Props> {
  getDates() {
    const {start, end, hour, minute } = this.props;
    const ranges = getDaysBetween(new Date(start))(new Date(end));
    const [first, ...dates] = ranges.map(({date})=> `${DDMMYYYY(date)} ${hour}:${minute}`);
    return dates;
  }  
  render() {
    const {start, end, hour, minute} = this.props;
    return (
      <View style={styles.view}>
      <Text style={Object.assign({}, styles.label, styles.dates)}>
        <Text style={styles.important}>desde </Text>
        <Text style={styles.datehour}>
            {DDMMYYYY(new Date(start))} {hour}:{minute}
        </Text>
        </Text>
        <Text>{this.getDates().join(', ')}</Text>
        <Text style={Object.assign({}, styles.label, styles.dates)}>
        <Text style={styles.important}>hasta </Text>
        <Text style={Object.assign({}, styles.datehour)}>
            {DDMMYYYY(new Date(end))} {hour}:{minute}
        </Text>
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  view: {
    width: '100%',
    paddingLeft: '2%',
  },
  label: {
    marginLeft: "2%",
    fontFamily: "PT_Sans-Narrow-Web-Regular",
    fontSize: 21,
  },
  dates: {
    marginLeft: "12%",
  },
  important: {
    fontSize: 14,
    color: 'blue'
  },
  datehour: {
    fontSize: 24
  },
});