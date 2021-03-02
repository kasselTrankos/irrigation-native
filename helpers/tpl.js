import React from 'react';
import { View, Text } from 'react-native'
import { Button, Overlay } from 'react-native-elements'
import DatePicker from 'react-native-modern-datepicker'



// buttonsTpl :: (a -> b) -> ( a -> b ) -> React 
export const buttonsTpl = (pressAdd, pressClear) => (<View style={{
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent:'space-between'
  }}>
    <Button
      buttonStyle={{backgroundColor: '#33658a'}}
      containerStyle={{  marginBottom:5, width: '40%', marginLeft:'5%'}}
      onPress = {pressAdd}
      title="Add"
    />
    <Button
      buttonStyle={{backgroundColor: '#f26419'}}
      containerStyle={{  marginBottom: 5, width: '40%', marginRight: '5%'}}
      onPress = {pressClear}
      title="Clear"
    />
</View>)

export const modalTpl = (onSave, close) =>{ 
  let time = {};
  return (
  <Overlay ç
    isVisible={true}
    overlayStyle={{
    width: '80%',
    borderRadius: 30,
  }}
  onBackdropPress = {() => close()} 
  >
    <View
      style={{
        height:  250
      }}>
      <DatePicker
        style={{
          height: 150
        }}
        mode="time"
        minuteInterval={5}
        secondInterval={10} 
        onTimeChange={(t) => time = t} />
        <Button
          buttonStyle={{backgroundColor: '#5ca4a9'}}
          containerStyle={{  marginBottom:5, width: '40%', marginLeft:'30%', marginTop: 30}}
          onPress = {()=> onSave(time)}
          title="Save"
      />
    </View>
  </Overlay>)}