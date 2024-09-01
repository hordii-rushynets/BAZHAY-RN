import React, { useEffect, useState } from 'react';
import { GestureResponderEvent, Image, StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";
import generalStyles from '../generalStyles'
import * as ImageManipulator from 'expo-image-manipulator';
import Pen from '../icons/Pen';

type ImageButtonProps = {
    onPress: (event: GestureResponderEvent) => void;
    url: string;
    height: number;
    style?: StyleProp<ViewStyle>;
}

export default function ImageButton({onPress, url, height, style = null } : ImageButtonProps) {
  const [ratio, setRatio] = useState(9/16);

  const loadImageSize = async (uri: string) => {
    const manipulatedImage = await ImageManipulator.manipulateAsync(
      uri,
      [{rotate: 360}],
      { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
    );
    setRatio(manipulatedImage.width/manipulatedImage.height);
  };

  useEffect(() => {
    if (url) {
        loadImageSize(url);
    }
  }, [url]);

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