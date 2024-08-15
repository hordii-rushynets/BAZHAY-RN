import React from 'react';
import { View, StyleSheet } from 'react-native';

function ProgressBar({ index } : { index: number }) {
  return (
    <View style={styles.container}>
      {[...Array(3)].map((_, indx) => (
        <View key={indx} style={styles.line}/>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 104,
    height: 1,
    justifyContent: 'space-between'
  },
  line: {
    width: 104,
    height: 1,
    backgroundColor: '#000000'
  },
});

export default ProgressBar;
