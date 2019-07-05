import {isBeforeNow, fromEither} from './../utils';
import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Icon } from 'native-base';
const Props = {};
export class Irrigation extends Component<Props> {
  render() {
    const {day, hour, minute, duration} = this.props;
    const date = {day, hour, minute};
    const backgroundColor = fromEither('#9DC7C9')('#2E4057')(isBeforeNow)(date);
    const color = fromEither('#111727')('#D8FAF9')(isBeforeNow)(date);
    return (
      <View style={{ ...styles.view, backgroundColor }}>
        <Text style={{fontSize: 18, color}}>{hour}:{minute}</Text>
        <Text style={{fontSize: 18, marginLeft: 6, color}}>{duration}'</Text>
        {isBeforeNow(date) 
          ? <Icon style={{marginRight: 5, right:0, color: '#1A090D'}} name='person' />
          : <Icon style={{marginRight: 5, right:0, color: '#1A090D'}} name='trash' />
        }
      </View>
    );
  }
}
const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 120,
    height: 28,
    marginTop: 0,
    color: '#0E7186',
    backgroundColor: '#9DC7C9',
    paddingLeft: 12,
    fontSize: 30,
    paddingTop: 1,
    borderRadius: 8 / 2,
  },
});