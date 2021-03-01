import React, { useState, useRef } from 'react';
import { Animated, Text, FlatList, View, StyleSheet } from 'react-native';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
export const CurrentIrrigations = props => {
  
  const {
    data = [],
    itemSize = 220,
  } = props

  const scrollAnimatedValue = useRef(new Animated.Value(0)).current;
  const renderItem = ({item, index}) => {
    const makeAnimated = (a, b, c) => {
      return {
        inputRange: [...data.map((_, i) => i * itemSize)],
        outputRange: [
          ...data.map((_, i) => {
            const center = i + 2;
            if (center === index) {
              return a;
            } else if (center + 1 === index || center - 1 === index) {
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
            opacity: scrollAnimatedValue.interpolate(makeAnimated(1, 0.6, 0.3)),
            transform: [
              {
                scale: scrollAnimatedValue.interpolate(makeAnimated(1.2, 0.9, 0.8)),
              },
              {
                scaleX:  1,
              },
            ],
          },
        ]}>
        <Text style={styles.item}>
          {item.date}
        </Text>
      </Animated.View>
    );
  };


  return (
    <View  style={styles.row}>
      <AnimatedFlatList
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        snapToInterval={itemSize}
        decelerationRate={'fast'}
        data={data}
        keyExtractor={(_, i) => String(i)}
        renderItem={renderItem}
        
      />
    </View>
  );
};

const styles = 
  StyleSheet.create({
    container: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      right: 0,
      borderRadius: 10,
      flexDirection: 'column',
      backgroundColor: '#fff',
      // justifyContent: 'center',
      zIndex: 999,
    },
    row: {
      position: 'absolute',
      flexDirection: 'column',
      paddingTop: 50,
    },
    item: {
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 15,
    },
  });