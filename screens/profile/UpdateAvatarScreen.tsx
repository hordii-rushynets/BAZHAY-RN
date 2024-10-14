import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import DesignedText from '../../components/ui/DesignedText';
import styles from '../auth/styles';
import { StackNavigationProp } from '@react-navigation/stack';
import SubmitButton from '../../components/ui/buttons/SubmitButton';
import { useLocalization } from '../../contexts/LocalizationContext';
import { RootStackParamList } from '../../components/RootNavigator';
import ScreenContainer from '../../components/ui/ScreenContainer';
import { RouteProp } from '@react-navigation/native';
import { Image } from 'react-native';
import BackButton from '../../components/ui/buttons/BackButton';
import profileStyles from './styles';
import { MessageWithTwoButtons } from '../../components/ui/MessageWithTwoButtons';
import { AccountService } from '../auth/services';
import { useAuth } from '../../contexts/AuthContext';
import Loader from '../../components/ui/Loader';

type UpdateAvatarScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UpdateAvatar'>;
type UpdateAvatarScreenRouteProp = RouteProp<RootStackParamList, "UpdateAvatar">;

interface UpdateAvatarScreenProps {
  navigation: UpdateAvatarScreenNavigationProp;
  route: UpdateAvatarScreenRouteProp;
}

function UpdateAvatarScreen({ navigation, route }: UpdateAvatarScreenProps) {
  const { staticData, localization } = useLocalization();
  const { image } = route.params;
  const [displayMessage, setDisplayMessage] = useState(false);
  const accountService = new AccountService();
  const authContext = useAuth();
  const [loading, setLoading] = useState(false);

  return (
    <ScreenContainer>
      {loading && <Loader />}
      {displayMessage && 
        <MessageWithTwoButtons 
          text={<DesignedText size="small" style={{ textAlign: 'center' }}>{staticData.profile.updateAvatarScreen.message}</DesignedText>}
          onAccept={() => {
            setLoading(true);
            accountService.deleteAvatar(authContext).then(success => {
              setLoading(false);
              if (success) {
                navigation.navigate("UpdateProfile")
              }
            })
          }}
          onCancel={() => {
            setDisplayMessage(false);
          }}
        />
      }
        <View style={profileStyles.profileUpdateTop}>
          <BackButton />
          <DesignedText italic={true}>{staticData.profile.updateAvatarScreen.title}</DesignedText>
        </View>
        <View style={profileStyles.centerContent}>
            <View style={styles.avatarImageContainer}>
              {image !== "" && <Image source={ {uri: image} } style={styles.avatarImage}/>}
            </View>
            <SubmitButton onPress={() => { navigation.navigate("AvatarFromGallery") }} width={localization === "en" ? 280 : 250} style={styles.galleryButton}>{staticData.auth.accountFillAvatarScreen.galleryButton}</SubmitButton>
            <SubmitButton onPress={() => { navigation.navigate("AvatarFromCamera") }} width={localization === "en" ? 280 : 250} style={styles.galleryButton}>{staticData.auth.accountFillAvatarScreen.cameraButton}</SubmitButton>
        </View>
        {image !== "" && <TouchableOpacity onPress={() => { 
          setDisplayMessage(true);
        }} style={styles.addLaterButton}>
          <DesignedText isUppercase={false} style={{ textDecorationLine: "underline", color: "#8A8A8A" }}>
          {staticData.profile.updateAvatarScreen.delete}
          </DesignedText>
        </TouchableOpacity>}
    </ScreenContainer>
  );
};

export default UpdateAvatarScreen;
