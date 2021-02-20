// water manager
import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import Water from './water';
import Slider from './slider';



const WaterManager  = props => {
  const {
    disabled = false,
    dialWidth = 9,
    dialRadius = 20,
    dialColor = "#5BC0EB",
    dialTextSize = 22,
    dialTextColor = '#fff',
    fillColor = 'none',
    fontSize = 100,
    fontColor = '#3F88C5',
    maxDial = 360,
    minDial = 0,
    meterColor = '#333',
    onChange = (e)=> {}, 
    onPress = () => {console.log('is presssed')}, 
    radius = 140,
    sizes = [1, 2, 3, 'Empty'],
    strokeWidth = 10,
    strokeColor = '#3F88C5',
    value = 120,
    volumen = 100,
    waterColor= '#A9CEF4',
  } = props;
  const width = radius * 2;
  const height = radius * 2;
  return <TouchableHighlight
    disabled={disabled} 
    onPress={onPress}
    underlayColor="white"
    style={{
      position: 'absolute', 
      top: 0, 
      flex: 1,
      width: width + 90,
      height: height + dialRadius * 2,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    <View style={{ width, height: (height + dialRadius * 2), top: 0,}}>
      <View style={{
          top: dialRadius,
          left: 0,
          position: 'absolute',
        }}>
        <Water
          radius={radius}
          onPress={onPress}
          volumen={100 - volumen} 
          backgroundColor={waterColor} />
      </View>
      <View>
        <Text style={{
          position: 'absolute',
          fontSize, 
          height: radius * 2 + dialRadius * 2,
          // textAlignVertical: 'bottom',
          width: '100%', 
          top: radius * 2 - fontSize + strokeWidth, 
          textAlign: 'center', 
          color: fontColor,
          }}>{`${volumen}%`}</Text>
      </View>
      <View style={{left: -dialRadius, top: 0}}>
        <Slider 
          dialColor={dialColor}
          dialRadius={dialRadius}
          dialTextSize={dialTextSize}
          dialTextColor={dialTextColor}
          dialWidth={dialWidth}
          fillColor = {fillColor}
          maxDial={maxDial}
          meterColor={meterColor}
          minDial={minDial}
          onChange={onChange}
          strokeWidth={strokeWidth} 
          strokeColor={strokeColor} 
          radius = {radius}
          value={value} />
      </View>
    </View>

  </TouchableHighlight>
};


export default WaterManager;