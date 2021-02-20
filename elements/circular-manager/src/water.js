// water
import React  from 'react';
import { View } from 'react-native';
import {Svg, Circle, Defs, Mask, Rect, Use} from 'react-native-svg';


const Water = props => {
  const {
    onPress =  ()=>{},
    volumen ='0%',
    backgroundColor = '#EDC75C',
    sizes = [1, 2, 3, 'Empty'],
    radius = 190
  } = props;
  return (
    <View style={{ width: radius * 2, height: radius * 2, top: 0,}}>
      <Svg  style={{flex: 1}}>
        <Defs>  
          <Mask 
            id="Mask" 
            x={0}
            y={volumen} 
            width={radius * 2} 
            height={radius *2}>  
            <Rect
              x={0}
              y={0}
              width={radius * 2}
              height={radius * 2}
              fill="#fff"
              strokeWidth="0"
              stroke={backgroundColor}
              maskUnits="userSpaceOnUse"
            />
          </Mask>  
          <Circle 
            id="Circle"
            r={radius} 
            cx={radius} 
            cy={radius}
            fill-opacity={1}
            fill={backgroundColor} />
        </Defs>
        <Use href="#Circle" mask="url(#Mask)" />
      </Svg>
    </View>
  );
}


export default Water;
