import React from 'react';
import { Path, Svg } from 'react-native-svg';

type NotFulfilledProps = {
  width?: number;
  height?: number;
}

function NotFulfilled({width = 16, height = 16}: NotFulfilledProps) {
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <Path d="M3.05236 8C5.54674 7.49869 7.49869 5.54673 8 3.05236C8.50131 5.54674 10.4533 7.49869 12.9476 8C10.4533 8.50131 8.50131 10.4533 8 12.9476C7.49869 10.4533 5.54674 8.50131 3.05236 8Z" stroke="black"/>
    </Svg>
  );
};

export default NotFulfilled;
