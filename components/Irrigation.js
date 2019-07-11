import {isBeforeNow, fromEither} from './../utils';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
const Props = {};
export class Irrigation extends Component<Props> {
  delete (uuid, date) {
  }
  render() {
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
    const {day, hour, minute, duration, uuid} = this.props;
    const date = {day, hour, minute};
    const backgroundColor = fromEither('#9DC7C9')('#2E4057')(isBeforeNow)(date);
    const color = fromEither('#111727')('#D8FAF9')(isBeforeNow)(date);
    return (
      <View style={{ ...styles.view, backgroundColor }}>
        <AnimatedTouchable
          style={{ flexDirection: 'row', justifyContent: 'space-between'}}
          onPress={() => this.delete(uuid, date)}>
          <Text style={{fontSize: 18, color, marginLeft: 12}}>{hour}:{minute}</Text>
          <Text style={{fontSize: 18, marginLeft: 6, color}}>{duration}'</Text>
          {isBeforeNow(date) 
            ? <Icon style={{marginLeft: 10, right:0}} color="#1A090D" name="calendar" size={24} />
            : <Icon style={{marginLeft: 10, right:0}} color="#1A090D" name="trash" size={24} />
          }
        </AnimatedTouchable>
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