import React, { useState, useRef, useEffect } from 'react';
import { Animated, Text, FlatList, View, StyleSheet, Dimensions } from 'react-native';
const { pipe, prop, map, is } = require('ramda')
import Arrow from 'crocks/Arrow'
import Either from 'crocks/Either'
import either from 'crocks/pointfree/either'

const { Left, Right } = Either

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const toDate = x => new Date(x)
const isObject = x => is(Object, x)
const toString = either(x => x, x => x)
const toEither = value => pipe(
  isObject,
  x => x ? Right(value) : Left(value)
)(value)
const addZero = x => x <= 9 ? `0${x}` : x
const getDate = x => x.getDate()
const day =  pipe(
  getDate,
  addZero
)
const getMonth = x => x.getMonth()
const month = pipe(
  getMonth,
  addZero
)

const formatDate  = x => `${day(x)}-${month(x)} ${x.getHours()}:${x.getMinutes()}`



const getDateStr = pipe(
  toEither,
  map(prop('date')),
  map(toDate),
  map(formatDate),
  toString,
)
export const CurrentIrrigations = props => {
  
  const {
    data = [],
  } = props
  const list = ['', '', ...data, '', '']
  

  
  const flatListRef = React.useRef(null)
  
  const [itemSize, setItemSize] = useState(130);
  const scrollListener = useRef(0);
  const active = useRef({current: 392});

  const scrollX = useRef(new Animated.Value(0)).current;

  const changeItemWidth = ({nativeEvent}) => {
    const {width} = nativeEvent.layout;
    !itemSize && setItemSize(width / 5);
  };


  useEffect(() => {
    scrollListener.current && clearInterval(scrollListener.current);
    scrollListener.current = scrollX.addListener(({value}) => (active.current = value));
    return () => {
      clearInterval(scrollListener.current);
    };
  }, [scrollX]);

  const renderItem = ({item, index}) => {
    const makeAnimated = (a, b, c) => {
      return {
        inputRange: [...list.map((_, i) => i * itemSize)],
        outputRange: [
          ...list.map((_, i) => {
            const center = i + 1;
            if (i === 0) {
              return a
            } else if (center === index) {
              return a
            } else if (center + 1 === index  || center - 1 === index) {
              return b;
            } else {
              return c;
            }
          }),
        ],
      };
    };

    return (
      <Animated.View
        style={[
          {
            width: itemSize,
            opacity: scrollX.interpolate(makeAnimated(1, 0.6, 0.3)),
            transform: [
              {onDateChange
                scale: scrollX.interpolate(makeAnimated(1.5, 0.6, 0.5)),
              },
              {
                scaleX:  1,
              },
            ],
          },
        ]}>
        <Text style={styles.item}>
          {getDateStr(item)} {item.duration}
        </Text>
      </Animated.View>
    );
  };

  const view =  (
    <View  style={styles.row} onLayout={changeItemWidth}>
      <AnimatedFlatList
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{nativeEvent: { contentOffset: {x: scrollX } } } ], {
          useNativeDriver: true,
        })}
        initialScrollIndex={1}
        ref={flatListRef}
        horizontal
        snapToInterval={itemSize}
        decelerationRate={'fast'}
        data={list}
        keyExtractor={(_, i) => String(i)}
        renderItem={renderItem}
        
      />
    </View>
  )
  return view
};

const styles = 
  StyleSheet.create({
    row: {
      position: 'absolute',
      flexDirection: 'column',
      paddingTop: 40,
      alignItems: 'center',
      marginVertical: 0,
      right: 0,
    },
    item: {
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      fontSize: 16,
      color: '#219ebc',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 15,
    },
  });