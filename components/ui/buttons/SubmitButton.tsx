import React, { ReactNode } from 'react';
import { GestureResponderEvent, StyleProp, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import generalStyles from '../generalStyles'
import DesignedText from '../DesignedText';

type SubmitButtonProps = {
    children: ReactNode | string;
    onPress: (event: GestureResponderEvent) => void;
    width: number | "auto";
    height?: number;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

export default function SubmitButton({children, onPress, width, height = 40, style = null, textStyle = null} : SubmitButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={[generalStyles.submitButton, {width: width, height: height}, style]}>
      <DesignedText style={[generalStyles.submitButtonText, textStyle]}>{children}</DesignedText>
    </TouchableOpacity>
  );
}