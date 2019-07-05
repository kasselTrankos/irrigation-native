import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Content } from 'native-base';
import Scheduler from './Scheduler';



const Props = {};
export class KalendarDay extends Component<Props> {
  render() {
    return (
      <Content contentContainerStyle={styles.view}>
        <Scheduler 
          hours={24} />
      </Content>
    );
  }
}
const styles = StyleSheet.create({
  view: {
    width: '100%',
  },
});