import React from 'react';
import { View, Animated} from 'react-native';
import Svg, { Path} from 'react-native-svg';

const compose = (...fns) => x => fns.reduceRight((v, f)=> f(v), x);
const sin = value => Math.sin(value);
const cos = value => Math.cos(value);
const floor = value => Math.floor(value);
const random = () => Math.random();
const add = a => b => a + b;
const product = a => b => a * b;
const getRadians = angle => (angle-90) * Math.PI / 180.0;
const rnd = value => compose(floor, product(random()))(value)

const AnimatedPath = Animated.createAnimatedComponent(Path);

const polarToCartesian = (x, y, radius, angleInDegrees) => ({
  x: compose(add(x), product(radius), cos, getRadians)(angleInDegrees),
  y: compose(add(y), product(radius), sin, getRadians)(angleInDegrees)
});
const describeArc = (x, y, radius, startAngle, endAngle) =>{

  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}



const Spinner = props => {
  const {
    dialWidth = 40,
    timeIn = 2000,
    timeOut = 700,
    radius =180,
    opacity = 0.5,
    backgroundColor = '#999',
    colors = ['#505AFC', '#8527B7', '#F2BE22']
  } = props;
  const spinerWheel = (color, index) => {
    const wheel  = new Animated.Value(0);
    const sequences = [
      Animated.delay(500 * index),
      Animated.timing(
        wheel,
        {
          toValue: 1,
          duration: timeIn,
          useNativeDriver: true
        }
      ),
      Animated.timing(
        wheel,
        {
          toValue: 0,
          duration: timeOut,
          useNativeDriver: true
        }
      ),
    // Call on self when animation completes
    ];
    const anim = () => {
      Animated.sequence(sequences).start(anim);
    };
    const strokeWidth = rnd(dialWidth);
    const start = rnd(360);
    const long = Array.from({length: 360}, (_, i) => i);
    const rotation = wheel.interpolate({
      inputRange: long.map(i => i /(360 -1)),
      outputRange: long.map(i => describeArc(radius , radius, radius/2, start, i + start))
    });
    anim();
    return <AnimatedPath 
        key={index} 
        d={rotation}
        stroke={color} 
        strokeWidth={strokeWidth} fill="none"/>;
  }
  
  return ( <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems:'center',

    }}>
      <View
        style={{
          position: 'absolute',
          alignSelf: 'center',
          justifyContent:"flex-start",
          backgroundColor, 
          opacity,
          top: 0,
          width: '100%',
          height: '100%',
      }}
      ></View>
      <Svg
        width={radius * 2}
        height={radius *2}>
          {colors.map(spinerWheel)}
        </Svg>
      
    </View>
  );
};
export default Spinner;    

  
