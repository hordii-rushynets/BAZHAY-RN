import React from 'react';
import { Path, Svg } from 'react-native-svg';

function CrissCross() {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M6 5.99988L18 17.9999" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
    <Path d="M6 18L18 6" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
    </Svg>
  );
};

export default CrissCross;
