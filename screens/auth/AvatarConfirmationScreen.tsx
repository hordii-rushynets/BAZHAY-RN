import React, { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import Title from '../../components/ui/Title';
import styles from './styles'
import generalStyles from '../../components/ui/generalStyles'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { AccountFillingStackParamList } from '../../components/navigationStacks/AccountFillingStackScreen';
import { AccountService } from './services';
import { useAuth } from '../../contexts/AuthContext';
import { blobToBase64, getBlobFromUri } from '../../utils/helpers';
import { useLocalization } from '../../contexts/LocalizationContext';

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
  const { staticData } = useLocalization();
  
  return (
    <TouchableOpacity onPress={
      async () => {
        const photo = await getBlobFromUri(image);

        const base64 = await blobToBase64(photo);

        accountService.userPhotoUpdate(base64, authContext).then(success => {
          if (success) {
            navigation.navigate("AccountFillBirth");
          }
        })
      }
      } style={generalStyles.screenContainer}>
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

export default AvatarConfirmationScreen;
