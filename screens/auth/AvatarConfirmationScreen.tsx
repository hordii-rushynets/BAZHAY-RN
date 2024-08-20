import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import Title from '../../components/ui/Title';
import styles from './styles'
import generalStyles from '../../components/ui/generalStyles'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type AvatarConfirmationScreenRouteProp = RouteProp<RootStackParamList, 'AvatarConfirmation'>;
type AvatarConfirmationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AvatarConfirmation'>;

interface AvatarConfirmationScreenProps {
  route: AvatarConfirmationScreenRouteProp;
  navigation: AvatarConfirmationScreenNavigationProp;
}

function AvatarConfirmationScreen({ route, navigation }: AvatarConfirmationScreenProps) {
  const { image } = route.params;
  
  return (
    <TouchableOpacity onPress={() => {navigation.navigate("AccountFillBirth")}} style={generalStyles.screenContainer}>
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
