import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedProps, withTiming, Easing, withRepeat } from 'react-native-reanimated';
import styles from "./generalStyles";

const PATH_LENGTH = 477; // Довжина шляху з SVG

const AnimatedPath = Animated.createAnimatedComponent(Path);

const Loader = () => {
  const progress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: PATH_LENGTH * (1 - progress.value),
    };
  });

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(2, {
        duration: 2000,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, []);

  return (
    <View style={styles.loadingContainer}>
      <Svg width={140} height={140} viewBox="0 0 142 142">
        <AnimatedPath
          animatedProps={animatedProps}
          d="M71 6.15286 L74.0357 24.5826C77.7029 46.8469 95.1531 64.2971 117.417 67.9643L135.847 71L117.417 74.0357C95.1531 77.7029 77.7029 95.1531 74.0357 117.417L71 135.847L67.9643 117.417C64.2971 95.1531 46.8469 77.7029 24.5826 74.0357L6.15286 71L24.5826 67.9643C46.8469 64.2971 64.2971 46.8469 67.9643 24.5826 L67.9643 24.5826Z"
          stroke="#B70000"
          strokeWidth="2"
          strokeDasharray={PATH_LENGTH}
          fill="none"
        />
      </Svg>
    </View>
  );
};

export default Loader;
