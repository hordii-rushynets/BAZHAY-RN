import React from 'react';
import { Path, Rect, Svg } from 'react-native-svg';

function PlusInCircle() {
  return (
    <Svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <Rect x="0.75" y="0.75" width="38.5" height="38.5" rx="19.25" fill="white"/>
    <Rect x="0.75" y="0.75" width="38.5" height="38.5" rx="19.25" stroke="black" stroke-width="1.5"/>
    <Path d="M20 12V28" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
    <Path d="M12 20H28" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
    </Svg>
  );
};

export default PlusInCircle;
