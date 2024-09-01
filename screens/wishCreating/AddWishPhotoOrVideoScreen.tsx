import React from 'react';
import { View } from 'react-native';
import Title from '../../components/ui/Title';
import authStyles from '../auth/styles';
import styles from './styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../../contexts/AuthContext';
import { useLocalization } from '../../contexts/LocalizationContext';
import WishCreatingLayout from '../../components/WishCreating/WishCreatingLayout';
import { RootStackParamList } from '../../components/RootNavigator';
import SubmitButton from '../../components/ui/buttons/SubmitButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DesignedText from '../../components/ui/DesignedText';
import { useWishCreating } from '../../contexts/WishCreatingContext';

type AddWishPhotoOrVideoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddWishPhotoOrVideo'>;

interface AddWishPhotoOrVideoScreenProps {
  navigation: AddWishPhotoOrVideoScreenNavigationProp;
}

function AddWishPhotoOrVideoScreen({ navigation }: AddWishPhotoOrVideoScreenProps) {
  const { editingMode } = useWishCreating();
  const { staticData, localization } = useLocalization();

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
                <SubmitButton onPress={() => {}} width={localization === "en" ? 288 : 250} style={authStyles.galleryButton}>{staticData.wishCreating.addWishPhotoOrVideoScreen.cameraButton}</SubmitButton>
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
