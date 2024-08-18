import React from 'react';
import { View } from 'react-native';
import styles from './generalStyles'

function ProgressBar({ index, n } : { index: number, n: number }) {
  return (
    <View style={styles.progressBarContainer}>
      {[...Array(n)].map((_, indx) => (
        indx <= index ? <View key={indx} style={[styles.line, styles.blackLine]}/> : <View key={indx} style={styles.line}/>
      ))}
    </View>
  );
};

export default ProgressBar;
