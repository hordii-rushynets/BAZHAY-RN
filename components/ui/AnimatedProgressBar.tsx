import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';
import styles from './generalStyles';

function AnimatedProgressBar({ index, n }: { index: number, n: number }) {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
      Animated.timing(animatedWidth, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
  }, [index]);

  return (
    <View style={styles.progressBarContainer}>
      {[...Array(n)].map((_, indx) => {
        if (indx === index) {
          return (
            <View key={indx} style={styles.line}>
                <Animated.View
                  style={[
                    styles.line,
                    {
                      backgroundColor: 'black',
                      width: animatedWidth.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', '100%'],
                      }),
                    },
                  ]}
                />
            </View>
          );
        } else {
          return (
            <View key={indx} style={indx < index ? [styles.line, styles.blackLine] : styles.line} />
          );
        }
      })}
    </View>
  );
}

export default AnimatedProgressBar;
