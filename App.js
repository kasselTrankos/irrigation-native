import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WaterManager from '@ats-components/water-manager';

export default function App() {
  return (
    <View style={styles.container}>
      <WaterManager />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
