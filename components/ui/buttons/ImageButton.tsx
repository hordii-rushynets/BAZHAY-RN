import React from 'react';
import { GestureResponderEvent, Image, StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";
import generalStyles from '../generalStyles'
import Pen from '../icons/Pen';

type ImageButtonProps = {
    onPress: (event: GestureResponderEvent) => void;
    url: string;
    ratio: number;
    height: number;
    style?: StyleProp<ViewStyle>;
}

export default function ImageButton({onPress, ratio, url, height, style = null } : ImageButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={[generalStyles.imageButtonContainer, { height: height, aspectRatio: ratio }]}>
        <View style={generalStyles.imageButtonImageContainer} >
          {url && <Image source={ {uri: url} } style={generalStyles.imageButton} resizeMode={"cover"}/>}
        </View>
        <View style={generalStyles.imageButtonPen}>
          <Pen/>
        </View>
    </TouchableOpacity>
  );
}