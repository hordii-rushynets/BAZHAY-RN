import React from 'react';
import { Path, Svg } from 'react-native-svg';

function UpDownArrow() {
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <Path d="M2 6.00065L4.66667 3.33398M4.66667 3.33398L7.33333 6.00065M4.66667 3.33398V12.6673" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M14.0013 10.0007L11.3346 12.6673M11.3346 12.6673L8.66797 10.0007M11.3346 12.6673V3.33398" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
};

export default UpDownArrow;
