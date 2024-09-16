import React from 'react';
import { Path, Svg } from 'react-native-svg';

function SmoothCorner() {
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <Path d="M8 0.195068L8.45322 2.87951C8.85859 5.28048 10.7874 7.1623 13.2484 7.55778L16 7.99995L13.2484 8.44212C10.7874 8.83759 8.85859 10.7194 8.45322 13.1204L8 15.8048L7.54678 13.1204C7.14141 10.7194 5.21255 8.83759 2.75156 8.44212L0 7.99995L2.75156 7.55778C5.21255 7.1623 7.14141 5.28048 7.54678 2.87951L8 0.195068Z" fill="black"/>
    </Svg>
  );
};

export default SmoothCorner;
