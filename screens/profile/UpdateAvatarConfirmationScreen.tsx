import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import Title from '../../components/ui/Title';
import styles from '../auth/styles'
import generalStyles from '../../components/ui/generalStyles'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import { useLocalization } from '../../contexts/LocalizationContext';
import * as ImageManipulator from 'expo-image-manipulator';
import Loader from '../../components/ui/Loader';
import { AccountService } from '../auth/services';
import { RootStackParamList } from '../../components/RootNavigator';

type UpdateAvatarConfirmationScreenRouteProp = RouteProp<RootStackParamList, 'UpdateAvatarConfirmation'>;
type UpdateAvatarConfirmationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UpdateAvatarConfirmation'>;

interface UpdateAvatarConfirmationScreenProps {
  route: UpdateAvatarConfirmationScreenRouteProp;
  navigation: UpdateAvatarConfirmationScreenNavigationProp;
}

function UpdateAvatarConfirmationScreen({ route, navigation }: UpdateAvatarConfirmationScreenProps) {
  const { image } = route.params;
  const accountService = new AccountService();
  const authContext = useAuth();
  const { staticData } = useLocalization();

  const [ convertedImage, setConvertedImage ] = useState("");
  const [loading, setLoading] = useState(false);

  const loadImageSize = async (uri: string) => {
    const manipulatedImage = await ImageManipulator.manipulateAsync(
      uri,
      [{rotate: 360}],
      { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
    );
    setConvertedImage(manipulatedImage.uri);
  };

  useEffect(() => {
    loadImageSize(image);
  }, []);
  
  return (
    <TouchableOpacity onPress={
      async () => {
        if (convertedImage !== "") {
          setLoading(true);
          accountService.userPhotoUpdate(convertedImage, authContext).then(success => {
            setLoading(false);
            if (success) {
              navigation.navigate("UpdateProfile");
            }
          })
        }
      }
      } style={generalStyles.screenContainer}>
        {loading && <Loader />}
        <View style={generalStyles.centerContainer}>
            <Title style={styles.title}>
                {staticData.auth.avatarConfirmationScreen.title}
            </Title>
            <View style={styles.avatarImageContainer}>
              <Image source={ {uri: image} } style={styles.avatarImage}/>
            </View>
        </View>
    </TouchableOpacity>
  );
};

export default UpdateAvatarConfirmationScreen;
