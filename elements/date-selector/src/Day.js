import React from 'react';
import {Text, TouchableWithoutFeedback} from 'react-native';
import {Svg, Rect, Circle} from 'react-native-svg';
import { curry, prop, pipe, __, lift} from 'ramda'


// getRadius -> Number -> Number -> Number
const getPercent = curry((max, value) => ( value * 100 ) / max)

// perc2color -> Number -> hexadecimal
const  perc2color = (perc) => {
	var r, g, b = 0;
	if(perc < 50) {
		r = 255;
		g = Math.round(5.1 * perc);
	}
	else {
		g = 255;
		r = Math.round(510 - 5.10 * perc);
	}
	var h = r * 0x10000 + g * 0x100 + b * 0x1;
	return '#' + ('000000' + h.toString(16)).slice(-6);
}

// getPosition -> Number -> Number -> Number
const getPosition = curry((radius, index, length) => {
  const x = radius * (index  + 1) + (index * radius)
 return { x, y: radius * length}
})

const getRadius = curry((radius, index) => (radius / 2) / index)
// getSvgCircle :: Number -> Number -> hexadecimal -> Circle
const getSvgCircle = curry((pos, radius, fill) => (<Circle 
  cx={pos.x}
  cy={pos.y}
  r={radius} 
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
    getPercent(radius * 2, __),
    perc2color
  )(irrigation))
  // getCircle :: {} -> Number -> React Svg Circle
  const getCircle = (irrigation, index) => pipe(
    x => getRadius(radius, irrigations.length),
    x => getSvgCircle(
    getPosition(x, index, irrigations.length),
    x, 
    getColor(radius, irrigation))
  )(irrigation)
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
      {irrigations.map(getCircle)}
      <Text style={{top: radius/2, left: radius/2, color: colorDayText}}>{text}</Text>
    </Svg></TouchableWithoutFeedback>

};

export default Day;