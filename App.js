import { StatusBar } from 'expo-status-bar';
import { Header } from 'react-native-elements'
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CircularSpinner} from './elements/circular-spìnner'

export default function App() {
  return (
    <View style={styles.container}>
      <Header 
       leftComponent={{ icon: 'menu', color: '#fff' }}
       centerComponent={{ text: 'IRRIGATION', style: { color: '#fff' } }}
       rightComponent={{ icon: 'home', color: '#fff' }}
       />
      <StatusBar style="auto" />
      <CircularSpinner
        opacity={1}
        backgroundColor="#ff0088"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
