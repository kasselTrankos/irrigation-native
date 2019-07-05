import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'native-base';
import Slider from 'react-native-slider';
const Props = {};
export class DurationSetter extends Component<Props> {
  render() {
    const {setDuration, duration} = this.props;
    return (
      <View style={styles.duration}>
      <Slider
          style={styles.slider}
          value={Number(duration)}
          step={1}
          minimumValue={0}
          maximumValue={60}
          thumbStyle={styles.thumb}
          thumbTintColor="#236EBA"
          minimumTrackTintColor="#2AB7D9"
          maximumTrackTintColor="#6B9CAB"
          onValueChange={setDuration}></Slider>
          <Text style={styles.textDuration}>{duration}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  duration: {
    flexDirection: 'row',
    marginBottom: 25
  },
  textDuration: {
    marginLeft: "2%",
    fontFamily: "PT_Sans-Narrow-Web-Regular",
    fontSize: 40
  },
  slider: {
    width: '75%',
    height: 60,
    marginLeft: '5%'
  },
  thumb: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: '#2AB7D9',
    borderColor: '#E2FFFF',
    borderWidth: 2,
  },
});