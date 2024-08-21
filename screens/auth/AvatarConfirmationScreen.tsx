import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import Title from '../../components/ui/Title';
import styles from './styles'
import generalStyles from '../../components/ui/generalStyles'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { AccountFillingStackParamList } from '../../components/navigationStacks/AccountFillingStackScreen';
import { AccountService } from './services';
import { useAuth } from '../../contexts/AuthContext';
import { getBlobFromUri } from '../../utils/helpers';

type AvatarConfirmationScreenRouteProp = RouteProp<AccountFillingStackParamList, 'AvatarConfirmation'>;
type AvatarConfirmationScreenNavigationProp = StackNavigationProp<AccountFillingStackParamList, 'AvatarConfirmation'>;

interface AvatarConfirmationScreenProps {
  route: AvatarConfirmationScreenRouteProp;
  navigation: AvatarConfirmationScreenNavigationProp;
}

function AvatarConfirmationScreen({ route, navigation }: AvatarConfirmationScreenProps) {
  const { image } = route.params;
  const accountService = new AccountService();
  const authContext = useAuth();
  
  return (
    <TouchableOpacity onPress={
      async () => {
        const photoForm = new FormData();

        const photo = await getBlobFromUri(image);

        photoForm.append("photo", photo, "userAvatar.jpg")

        // accountService.userPhotoUpdate(photoForm, authContext).then(success => {
        //   if (success) {
        //     navigation.navigate("AccountFillAvatar");
        //   }
        // })

        navigation.navigate("AccountFillAvatar");
      }
      } style={generalStyles.screenContainer}>
        <View style={generalStyles.centerContainer}>
            <Title style={styles.title}>
                Твоя аватарка
            </Title>
            <View style={styles.avatarImageContainer}>
              <Image source={ {uri: image} } style={styles.avatarImage}/>
            </View>
        </View>
    </TouchableOpacity>
  );
};

export default AvatarConfirmationScreen;
