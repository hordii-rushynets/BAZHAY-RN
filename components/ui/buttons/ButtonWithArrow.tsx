import React, { ReactNode } from 'react';
import { GestureResponderEvent, StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import generalStyles from '../generalStyles'
import DesignedText from '../DesignedText';
import ArrowRight from '../icons/ArrowRight';

type ButtonWithArrowProps = {
    children: ReactNode | string;
    onPress: (event: GestureResponderEvent) => void;
    width: number | "auto";
    showMoreThanOneLine?: boolean;
    icon?: ReactNode;
    height?: number;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

export default function ButtonWithArrow({children, onPress, width, showMoreThanOneLine = false, icon = <></>, height = 40, style = null, textStyle = null} : ButtonWithArrowProps) {
  return (
    <TouchableOpacity onPress={onPress} style={[generalStyles.buttonWithArrow, {width: width, height: height}, style]}>
      <View style={generalStyles.buttonWithArrowText}>
        {icon}
        <DesignedText size={"small"} style={[textStyle]} numberOfLines={!showMoreThanOneLine ? 1 : undefined} ellipsizeMode="tail">{children}</DesignedText>
      </View>
      <ArrowRight/>
    </TouchableOpacity>
  );
}