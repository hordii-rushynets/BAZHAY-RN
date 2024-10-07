import React from 'react';
import { GestureResponderEvent, Image, StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";
import generalStyles from '../generalStyles';
import mainStyles from '../../../screens/main/styles';
import Pen from '../icons/Pen';
import BigProfile from '../icons/BigProfile';

type AvatarButtonProps = {
    onPress: (event: GestureResponderEvent) => void;
    url: string;
    style?: StyleProp<ViewStyle>;
}

export default function AvatarButton({onPress, url, style = null } : AvatarButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
        <View style={mainStyles.avatarContainer}>
            {url ? <Image source={ { uri: url } } style={mainStyles.avatar}/> : 
            <BigProfile />}
        </View>
        <View style={[generalStyles.imageButtonPen, {bottom: 0, right: 0, width: 40, height: 40}]}>
          <Pen width={18} height={18}/>
        </View>
    </TouchableOpacity>
  );
}