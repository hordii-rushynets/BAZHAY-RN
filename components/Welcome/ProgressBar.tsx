import React from 'react';
import { View } from 'react-native';
import styles from '../../screens/welcome/styles'

function ProgressBar({ index } : { index: number }) {
  return (
    <View style={styles.progressBarContainer}>
      {[...Array(3)].map((_, indx) => (
        indx <= index ? <View key={indx} style={[styles.line, styles.blackLine]}/> : <View key={indx} style={styles.line}/>
      ))}
    </View>
  );
};

export default ProgressBar;
