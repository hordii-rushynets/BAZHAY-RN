import React from 'react';
import { Path, Svg } from 'react-native-svg';

type CopyProps = {
  width?: number;
  height?: number;
}

function Copy({width = 18, height = 18}: CopyProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 18 18" fill="none">
    <Path d="M2.69229 6H10.3077C11.2424 6 12 6.75776 12 7.69238V15.3078C12 16.2424 11.2424 17 10.3077 17H2.69229C1.75773 17 1 16.2424 1 15.3078V7.69238C1 6.75776 1.75773 6 2.69229 6Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
    <Path d="M14.4615 12H15.3077C15.7565 12 16.187 11.8218 16.5043 11.5043C16.8217 11.1869 17 10.7566 17 10.3078V2.69233C17 2.24354 16.8217 1.81302 16.5043 1.49571C16.187 1.1783 15.7565 1 15.3077 1H7.69239C7.24351 1 6.8131 1.1783 6.49569 1.49571C6.17829 1.81302 6 2.24354 6 2.69233V3.5384" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>
  );
};

export default Copy;
