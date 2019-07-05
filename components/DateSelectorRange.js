/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import DatepickerRange from 'react-native-range-datepicker';

type Props = {};
export class DateSelectorRange extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      beginDate: null,
      untilDate: null
    };
  }
  render() {
    const {close, select} = this.props;
    return (
      <View style={styles.view}>
        <View style={{}}>
          <DatepickerRange
            startDate= {this.state.beginDate}
            untilDate ={this.state.untilDate}
            onClose = {close}
            onConfirm = {(startDate, untilDate) => select(startDate, untilDate)}
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
