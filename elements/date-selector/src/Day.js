import React from 'react';
import {Text, TouchableWithoutFeedback} from 'react-native';
import {Svg, Rect, Circle} from 'react-native-svg'
import { curry, prop, pipe, __, lift} from 'ramda'


// getRadius -> Number -> Number -> Number
const getPercent = curry((max, value) => ( value * 100 ) / max)

// perc2color -> Number -> hexadecimal
const  perc2color = (perc) => {
  return `rgb(144, 224, 239, ${perc / 100})`
}

// getPosition -> Number -> Number -> Number
const getPosition = curry((radius, index, length) => {
  const x = radius * (index  + 1) + (index * radius)
 return { x, y: radius * length}
})

// getRadius :: Number -> Number -> Number
const getRadius = curry((radius, index) => (radius / 2) / index)

// getSvgCircle :: Number -> Number -> hexadecimal -> Circle
const getSvgCircle = curry((pos, radius, fill, index) => (<Circle 
  cx={pos.x}
  cy={pos.y}
  r={radius}
  strokeWidth={0}
  key={index}
  fill={fill} />))


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
    irrigations = []
  } = props;
  const getColor = curry((radius, irrigation) => pipe(
    prop('duration'),
    x => Math.min(radius * 2 - 30, x),
    getPercent(130, __),
    perc2color
  )(irrigation))
  // getCircle :: {} -> Number -> React Svg Circle
  const getCircle = (irrigation, index) => pipe(
    () => getRadius(radius, irrigations.length),
    x => getSvgCircle(
    getPosition(x, index, irrigations.length),
    x, 
    getColor(radius, irrigation),
    index)
  )(irrigation)
  const color = isToday ? currentDay : isPassed? passedDay :  fillColor;
  return <TouchableWithoutFeedback
    style={{
      width: 100,
      height: 100,
      flex: 1
    }}
    onLongPress={onLongPress}
    onPress={()=> onPress(dataId)}
  ><Svg
    stroke="#5C73F2"
    strokeWidth={0.1}
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
    {irrigations.map(getCircle)}
    <Text style={{top: radius/2, left: radius/2, color: colorDayText}}>{text}</Text>
  </Svg></TouchableWithoutFeedback>

};

export default Day;