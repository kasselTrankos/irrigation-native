import React, {Component} from 'react';
import moment from 'moment';
import { StyleSheet, Text, View } from 'react-native';
const Props = {};
export class RangeDatesText extends Component<Props> {
  getDates() {
    const {start, end, hour, minute } = this.props;
    const s =  moment(start);
    const e = moment(end);
    const diff = Math.abs(s.diff(e, 'days'));
    const [first, ...dates] = Array.from({length: diff}, (_, i) => moment(start).add(i, 'days')).map(date => moment(date).format('DD/MM/YYYY'));
    return dates;
  }  
  render() {
    const {start, end, hour, minute} = this.props;
    return (
      <View style={styles.view}>
      <Text style={Object.assign({}, styles.label, styles.dates)}>
        <Text style={styles.important}>desde </Text>
        <Text style={styles.datehour}>
            {moment(start).format('DD/MM/YYYY')} {hour}:{minute}
        </Text>
        </Text>
        <Text>{this.getDates().join(', ')}</Text>
        <Text style={Object.assign({}, styles.label, styles.dates)}>
        <Text style={styles.important}>hasta </Text>
        <Text style={Object.assign({}, styles.datehour)}>
            {moment(end).format('DD/MM/YYYY')} {hour}:{minute}
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