// bullet

import React, {useState} from 'react';
import { View, PanResponder } from 'react-native';
import {Svg, Circle, G} from 'react-native-svg';


const Bullet = props => {
  const {
    position = {x: 0, y:0},
    bulletRadius = 10,
    bulletColor = '#C05746',
  } = props;
  return <View style={{ 
    position: 'absolute',
    left: position.x - bulletRadius /2,
    top: 0, 
    backgroundColor: 'blue',
    opacity: 0.6,
    width: bulletRadius,
    height: bulletRadius,}}>
      <Svg 
        width={bulletRadius * 2} 
        height={bulletRadius * 2} 
        style={{top: -bulletRadius /2, left:-bulletRadius /2}} >
        <Circle 
          cx="50%" cy="50%" r={bulletRadius / 2}
          fill={bulletColor} />
      </Svg>
  </View>
};

export default Bullet;
