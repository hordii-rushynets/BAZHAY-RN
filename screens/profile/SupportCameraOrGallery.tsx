import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenContainer from '../../components/ui/ScreenContainer';
import { RootStackParamList } from '../../components/RootNavigator';
import { View } from 'react-native';
import BackButton from '../../components/ui/buttons/BackButton';
import wishCreatingStyles from '../wishCreating/styles';
import { useLocalization } from '../../contexts/LocalizationContext';
import SubmitButton from '../../components/ui/buttons/SubmitButton';
import * as ImagePicker from 'expo-image-picker';

type SupportCameraOrGalleryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SupportCameraOrGallery'>;

interface SupportCameraOrGalleryScreenProps {
  navigation: SupportCameraOrGalleryScreenNavigationProp;
}

function SupportCameraOrGalleryScreen({ navigation }: SupportCameraOrGalleryScreenProps) {
  const { staticData } = useLocalization();

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false, 
      quality: 1,
    });

    if (!result.canceled) {
      const name = result.assets[0].uri.split("/").at(-1);
      const type = result.assets[0].mimeType?.split("/").at(-1) || result.assets[0].uri.split("/").at(-1)?.split(".").at(-1);
      navigation.navigate("TechFileConfirmation", { file: { name: name || "", type: type || "", uri: result.assets[0].uri } });
    }
  };

  return (
    <ScreenContainer>
      <View style={{ paddingBottom: 20, height: "100%" }}>
        <View style={wishCreatingStyles.wishConfirmationTop}>
          <BackButton />
        </View>
        <View style={{ alignSelf: "center", marginVertical: "auto", width: "80%", gap: 16 }}>
            <SubmitButton onPress={() => { navigation.navigate("TechFromGallery") }} width="auto">{staticData.profile.supportCameraOrGalleryScreen.gallery}</SubmitButton>
            <SubmitButton onPress={() => { takePhoto() }} width="auto">{staticData.profile.supportCameraOrGalleryScreen.camera}</SubmitButton>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default SupportCameraOrGalleryScreen;
