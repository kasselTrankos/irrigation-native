import React from 'react';
import {Text, TouchableWithoutFeedback} from 'react-native';
import {Svg, Rect} from 'react-native-svg';



const Day = props => {
  const {
    dataId = 1,
    colorDayText = '#192965',
    radius = 10,
    fillColor = '#AF5D7C',
    text = 0,
    onLongPress = ()=> {},
    onPress = () => {},
    isToday = false,
    isPassed = false,
    passedDay = '#0f4c75',
    currentDay= '#edf7fa',
  } = props;
  const color = isToday ? currentDay : isPassed? passedDay :  fillColor;
  return <TouchableWithoutFeedback
    style={{
      backgroundColor: 'red',
      width: 100,
      height: 100,
      flex: 1
    }}
    onLongPress={onLongPress}
    onPress={()=> onPress(dataId)}
  ><Svg
      style={{}}
      width={radius}
      height={radius}>
        <Rect
          x={1}
          y={1}
          width={radius}
          height={radius}
          fill={color}
          rx={8}
        />
      {/* <Circle 
        r={radius /2}
        cx={radius /2}
        cy={radius /2}
        fill={fillColor} /> */}
      <Text style={{top: radius/2, left: radius/2, color: colorDayText}}>{text}</Text>
    </Svg></TouchableWithoutFeedback>

};

export default Day;