import React from 'react';
import { Path, Svg } from 'react-native-svg';

type CopySmallProps = {
  width?: number;
  height?: number;
}

function CopySmall({width = 14, height = 14}: CopySmallProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 14 14" fill="none">
    <Path d="M1.86339 5.06433H7.63839C8.34719 5.06433 8.92169 5.63803 8.92169 6.34563V12.1112C8.92169 12.8188 8.34719 13.3924 7.63839 13.3924H1.86339C1.15469 13.3924 0.580078 12.8188 0.580078 12.1112V6.34563C0.580078 5.63803 1.15469 5.06433 1.86339 5.06433Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
    <Path d="M11.489 8.90809H12.1307C12.471 8.90809 12.7975 8.77319 13.0381 8.53279C13.2788 8.29249 13.414 7.96669 13.414 7.62689V1.86123C13.414 1.52145 13.2788 1.1955 13.0381 0.955256C12.7975 0.714946 12.471 0.579956 12.1307 0.579956H6.35567C6.01527 0.579956 5.68887 0.714946 5.44817 0.955256C5.20747 1.1955 5.07227 1.52145 5.07227 1.86123V2.50179" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>
  );
};

export default CopySmall;
