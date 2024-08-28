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

type AddWishPhotoOrVideoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddWishPhotoOrVideo'>;

interface AddWishPhotoOrVideoScreenProps {
  navigation: AddWishPhotoOrVideoScreenNavigationProp;
}

function AddWishPhotoOrVideoScreen({ navigation }: AddWishPhotoOrVideoScreenProps) {
  const authContext = useAuth();

  const { staticData } = useLocalization();

  return (
    <WishCreatingLayout index={1} link={"AddWishTitle"}>
        <View style={styles.contentPhotoOrVideoContainer}>
            <View>
                <View style={authStyles.titleAvatarContainer}>
                    <Title style={authStyles.title}>
                    Додай фото або відео бажання
                    </Title>
                </View>
                <SubmitButton onPress={() => {navigation.navigate("AddWishFromGallery")}} width={250} style={authStyles.galleryButton}>Вибрати в галереї</SubmitButton>
                <SubmitButton onPress={() => {}} width={250} style={authStyles.galleryButton}>Зробити фото</SubmitButton>
            </View>
            <TouchableOpacity onPress={() => {navigation.navigate("AddWishPrice")}} style={authStyles.addLaterButton}>
              <DesignedText isUppercase={false}>
              Пропустити
              </DesignedText>
            </TouchableOpacity>
        </View>
    </WishCreatingLayout>
  );
};

export default AddWishPhotoOrVideoScreen;
