import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import authStyles from "../auth/styles"
import styles from './styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useLocalization } from '../../contexts/LocalizationContext';
import { RootStackParamList } from '../../components/RootNavigator';
import ScreenContainer from '../../components/ui/ScreenContainer';
import SubmitButton from '../../components/ui/buttons/SubmitButton';
import BackButton from '../../components/ui/buttons/BackButton';
import DesignedText from '../../components/ui/DesignedText';
import * as ImageManipulator from 'expo-image-manipulator';

type ImageResizeScreenRouteProp = RouteProp<RootStackParamList, 'ImageResize'>;
type ImageResizeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ImageResize'>;

interface ImageResizeScreenProps {
  route: ImageResizeScreenRouteProp;
  navigation: ImageResizeScreenNavigationProp;
}

function ImageResizeScreen({ route, navigation }: ImageResizeScreenProps) {
  const { image } = route.params;
  const [position, setPosition] = useState<"horizontal" | "vertical">("vertical");
  const [scaling, setScaling] = useState<{width: number, height: number}>({width: 9, height: 16});
  const [imageSize, setImageSize] = useState<{width: number, height: number}>();
  const { staticData } = useLocalization();

  const loadImageSize = async (uri: string) => {
    const manipulatedImage = await ImageManipulator.manipulateAsync(
      uri,
      [{rotate: 360}],
      { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
    );
    setImageSize({width: manipulatedImage.width, height: manipulatedImage.height});
  };

  useEffect(() => {
    loadImageSize(image.uri);
  }, []);
  
  return (
    <ScreenContainer>
        <BackButton link={"AddWishFromGallery"}/>
        <View style={styles.editorContainer}>
            <View style={[styles.editorImageContainer, { aspectRatio: scaling.width / scaling.height }]} >
              <Image source={ {uri: image.uri} } style={styles.editorImage} resizeMode={"cover"}/>
            </View>
            <View style={styles.positionsContainer}>
                <TouchableOpacity style={[styles.position, position === "vertical" && styles.selectedPosition]} onPress={() => { setPosition("vertical") }}></TouchableOpacity>
                <TouchableOpacity style={[styles.position, position === "horizontal" && styles.selectedPosition, { transform: [{rotateZ: '90deg'}] }]} onPress={() => { setPosition("horizontal") }}></TouchableOpacity>
            </View>
            <View style={styles.scalesContainer}>
                {position === "vertical" ? <>
                    <TouchableOpacity onPress={() => { setScaling({width: 9, height: 16}); }} style={[styles.scale, scaling.width === 9 && scaling.height === 16 && styles.selectedScale]}><DesignedText size={"small"} style={scaling.width === 9 && scaling.height === 16 && styles.selectedScaleText}>9:16</DesignedText></TouchableOpacity>
                    <TouchableOpacity onPress={() => { setScaling({width: 3, height: 4}); }} style={[styles.scale, scaling.width === 3 && scaling.height === 4 && styles.selectedScale]}><DesignedText size={"small"} style={scaling.width === 3 && scaling.height === 4 && styles.selectedScaleText}>3:4</DesignedText></TouchableOpacity>
                </> : <TouchableOpacity onPress={() => { setScaling({width: 4, height: 3}); }}style={[styles.scale, scaling.width === 4 && scaling.height === 3 && styles.selectedScale]}><DesignedText size={"small"} style={scaling.width === 4 && scaling.height === 3 && styles.selectedScaleText}>4:3</DesignedText></TouchableOpacity>}
                <TouchableOpacity onPress={() => { setScaling({width: 1, height: 1}); }} style={[styles.scale, scaling.width === 1 && scaling.height === 1 && styles.selectedScale]}><DesignedText size={"small"} style={scaling.width === 1 && scaling.height === 1 && styles.selectedScaleText}>1:1</DesignedText></TouchableOpacity>
            </View>
        </View>
        <SubmitButton 
            onPress={
                async () => {
                  navigation.navigate("WishImageConfirmation", { image: image, ratio: { width: scaling.width, height: scaling.height } });
                }}
            width={200}
            style={authStyles.gridButton}
        >{staticData.wishCreating.imageResizeScreen.button}</SubmitButton>
    </ScreenContainer>
  );
};

export default ImageResizeScreen;
