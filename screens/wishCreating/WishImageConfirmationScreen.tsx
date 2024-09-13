import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import authStyles from "../auth/styles"
import styles from './styles';
import generalStyles from '../../components/ui/generalStyles'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import { useLocalization } from '../../contexts/LocalizationContext';
import { RootStackParamList } from '../../components/RootNavigator';
import * as ImageManipulator from 'expo-image-manipulator';
import Title from '../../components/ui/Title';
import { WishService } from './services';
import { useWishCreating } from '../../contexts/WishCreatingContext';

type WishImageConfirmationScreenRouteProp = RouteProp<RootStackParamList, 'WishImageConfirmation'>;
type WishImageConfirmationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'WishImageConfirmation'>;

interface WishImageConfirmationScreenProps {
  route: WishImageConfirmationScreenRouteProp;
  navigation: WishImageConfirmationScreenNavigationProp;
}

function WishImageConfirmationScreen({ route, navigation }: WishImageConfirmationScreenProps) {
  const { image, ratio } = route.params;
  const wishService = new WishService();
  const authContext = useAuth();
  const { wishId, editingMode } = useWishCreating();
  const { staticData } = useLocalization();

  const [ convertedImage, setConvertedImage ] = useState("");

  const loadImageSize = async (uri: string) => {
    const manipulatedImage = await ImageManipulator.manipulateAsync(
      uri,
      [{rotate: 360}],
      { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
    );
    setConvertedImage(manipulatedImage.uri);
  };

  useEffect(() => {
    loadImageSize(image.uri);
  }, []);

  return (
    <TouchableOpacity onPress={
        async () => {
          if (convertedImage !== "") {
            wishService.wishPhotoUpdate(convertedImage, image.name, ratio, wishId || "", authContext).then(success => {
              if (success) {
                  navigation.navigate(editingMode ? "WishConfirmation" :"AddWishPrice");
              }
            })
          }
        }
        } style={generalStyles.screenContainer}>
          <View style={generalStyles.centerContainer}>
              <Title style={[authStyles.title, { marginBottom: 16 }]}>
              {staticData.wishCreating.wishImageConfirmationScreen.title}
              </Title>
              <View style={[styles.editorImageContainer, { aspectRatio: ratio.width / ratio.height }]}>
                <Image source={ {uri: image.uri} } style={styles.editorImage}/>
              </View>
          </View>
      </TouchableOpacity>
  );
};

export default WishImageConfirmationScreen;
