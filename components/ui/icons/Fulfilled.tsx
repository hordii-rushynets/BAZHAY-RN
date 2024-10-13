import React from 'react';
import { Path, Svg } from 'react-native-svg';

type FulfilledProps = {
  width?: number;
  height?: number;
}

function Fulfilled({width = 16, height = 16}: FulfilledProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
        <Path d="M8 0L8.45322 2.75156C8.85859 5.21255 10.7874 7.14141 13.2484 7.54678L16 8L13.2484 8.45322C10.7874 8.85859 8.85859 10.7874 8.45322 13.2484L8 16L7.54678 13.2484C7.14141 10.7874 5.21255 8.85859 2.75156 8.45322L0 8L2.75156 7.54678C5.21255 7.14141 7.14141 5.21255 7.54678 2.75156L8 0Z" fill="black"/>
    </Svg> 
  );
};

export default Fulfilled;
