import React, { ReactNode } from 'react';
import { GestureResponderEvent, StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import generalStyles from '../generalStyles'
import DesignedText from '../DesignedText';
import ArrowRight from '../icons/ArrowRight';

type ProfileButtonWithArrowProps = {
    children: ReactNode | string;
    placeholder: string;
    onPress: (event: GestureResponderEvent) => void;
    width: number | "auto";
    icon?: ReactNode;
    height?: number;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

export default function ProfileButtonWithArrow({children, placeholder, onPress, width, icon = undefined, height = 52, style = null, textStyle = null} : ProfileButtonWithArrowProps) {
  return (
    <TouchableOpacity onPress={onPress} style={[generalStyles.buttonWithArrow, {width: width, height: height}, style]}>
      <View style={generalStyles.profileButtonWithArrowText}>
        <DesignedText size="small" isUppercase={false} style={{ color: "#8A8A8A" }}>{placeholder}</DesignedText>
        <DesignedText size={"small"} style={[textStyle]} numberOfLines={1} ellipsizeMode="tail">{children}</DesignedText>
      </View>
      {icon ? 
        icon : 
        <ArrowRight/>
      }
    </TouchableOpacity>
  );
}