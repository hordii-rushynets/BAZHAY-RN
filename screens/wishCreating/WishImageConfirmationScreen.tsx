import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import authStyles from "../auth/styles"
import styles from './styles';
import generalStyles from '../../components/ui/generalStyles'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import { blobToBase64, getBlobFromUri } from '../../utils/helpers';
import { useLocalization } from '../../contexts/LocalizationContext';
import { RootStackParamList } from '../../components/RootNavigator';
import ScreenContainer from '../../components/ui/ScreenContainer';
import SubmitButton from '../../components/ui/buttons/SubmitButton';
import BackButton from '../../components/ui/buttons/BackButton';
import DesignedText from '../../components/ui/DesignedText';
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

  return (
    <TouchableOpacity onPress={
        async () => {
          const photo = await getBlobFromUri(image);
  
          const base64 = await blobToBase64(photo);
          wishService.wishUpdate({ media: base64 }, wishId || "", authContext).then(success => {
            if (success) {
                navigation.navigate(editingMode ? "WishConfirmation" :"AddWishPrice");
            }
          })
        }
        } style={generalStyles.screenContainer}>
          <View style={generalStyles.centerContainer}>
              <Title style={[authStyles.title, { marginBottom: 16 }]}>
              Зображення твого бажання
              </Title>
              <View style={[styles.editorImageContainer, { aspectRatio: ratio.width / ratio.height }]}>
                <Image source={ {uri: image} } style={styles.editorImage}/>
              </View>
          </View>
      </TouchableOpacity>
  );
};

export default WishImageConfirmationScreen;
