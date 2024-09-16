import React from 'react';
import { View } from 'react-native';
import Title from '../../components/ui/Title';
import authStyles from '../auth/styles';
import styles from './styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { useLocalization } from '../../contexts/LocalizationContext';
import WishCreatingLayout from '../../components/WishCreating/WishCreatingLayout';
import { RootStackParamList } from '../../components/RootNavigator';
import SubmitButton from '../../components/ui/buttons/SubmitButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DesignedText from '../../components/ui/DesignedText';
import { useWishCreating } from '../../contexts/WishCreatingContext';
import * as ImagePicker from 'expo-image-picker';

type AddWishPhotoOrVideoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddWishPhotoOrVideo'>;

interface AddWishPhotoOrVideoScreenProps {
  navigation: AddWishPhotoOrVideoScreenNavigationProp;
}

function AddWishPhotoOrVideoScreen({ navigation }: AddWishPhotoOrVideoScreenProps) {
  const { editingMode } = useWishCreating();
  const { staticData, localization } = useLocalization();

  const takePhoto = async () => {
    // Ask for camera permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      return;
    }

    // Open the camera
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // Set to true if you want to allow cropping/editing
      quality: 1, // Set the quality of the image (1 is highest)
    });

    if (!result.canceled) {
      // If the user took a photo, set the photo URI to state
      const name = result.assets[0].uri.split("/").at(-1);
      const type = result.assets[0].mimeType?.split("/").at(-1) || result.assets[0].uri.split("/").at(-1)?.split(".").at(-1);
      navigation.navigate("ImageResize", { image: { name: name || "", type: type || "", uri: result.assets[0].uri } });
    }
  };

  return (
    <WishCreatingLayout index={1} link={editingMode ? "WishConfirmation" : "AddWishTitle"} editingMode={editingMode}>
        <View style={styles.contentPhotoOrVideoContainer}>
            <View>
                <View style={authStyles.titleAvatarContainer}>
                    <Title style={authStyles.title}>
                    {staticData.wishCreating.addWishPhotoOrVideoScreen.title}
                    </Title>
                </View>
                <SubmitButton onPress={() => {navigation.navigate("AddWishFromGallery")}} width={localization === "en" ? 288 : 250} style={authStyles.galleryButton}>{staticData.wishCreating.addWishPhotoOrVideoScreen.galleryButton}</SubmitButton>
                <SubmitButton onPress={() => {takePhoto()}} width={localization === "en" ? 288 : 250} style={authStyles.galleryButton}>{staticData.wishCreating.addWishPhotoOrVideoScreen.cameraButton}</SubmitButton>
            </View>
            {!editingMode && <TouchableOpacity onPress={() => {navigation.navigate("AddWishPrice")}} style={authStyles.addLaterButton}>
              <DesignedText isUppercase={false}>
              {staticData.wishCreating.addWishPhotoOrVideoScreen.skip}
              </DesignedText>
            </TouchableOpacity>}
        </View>
    </WishCreatingLayout>
  );
};

export default AddWishPhotoOrVideoScreen;
