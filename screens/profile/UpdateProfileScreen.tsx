import React, { useCallback, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../components/RootNavigator';
import ScreenContainer from '../../components/ui/ScreenContainer';
import BackButton from '../../components/ui/buttons/BackButton';
import styles from "./styles";
import DesignedText from '../../components/ui/DesignedText';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useLocalization } from '../../contexts/LocalizationContext';
import Loader from '../../components/ui/Loader';
import { Address, Post, UserFields } from '../auth/interfaces';
import { AccountService } from '../auth/services';
import { useAuth } from '../../contexts/AuthContext';
import AvatarButton from '../../components/ui/buttons/AvatarButton';
import { ScrollView } from 'react-native-gesture-handler';
import ProfileButtonWithArrow from '../../components/ui/buttons/ProfileButtonWithArrow';
import { fromServerDateToFrontDate } from '../../utils/helpers';

type UpdateProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UpdateProfile'>;

interface UpdateProfileScreenProps {
  navigation: UpdateProfileScreenNavigationProp;
}

function UpdateProfileScreen({ navigation }: UpdateProfileScreenProps) {
  const { staticData } = useLocalization();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserFields>();
  const accountService = new AccountService();
  const authContext = useAuth();
  const [address, setAddress] = useState<Address>();
  const [post, setPost] = useState<Post>();

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      accountService.getPost(authContext).then(post => {
        setPost(post);
      })
      accountService.getAddress(authContext).then(address => {
        setAddress(address);
      })
      accountService.getUser(authContext).then(userData => {
        setUser(userData);
        setLoading(false);
      })
    }, [])
  );

  return (
    <ScreenContainer>
      {loading && <Loader />}
        <View style={styles.profileUpdateTop}>
          <BackButton/>
          <DesignedText italic={true}>{staticData.profile.updateProfileScreen.title}</DesignedText>
        </View>
        <AvatarButton onPress={() => { navigation.navigate("UpdateAvatar", { image: user?.photo || "" }) }} url={user?.photo || ""} style={styles.profileUpdateAvatar}/>
        <ScrollView style={styles.updateProfileContent} contentContainerStyle={styles.updateProfileContentContainer}>
            <View style={styles.updateProfileBlockContainer}>
                <ProfileButtonWithArrow placeholder={staticData.profile.updateProfileScreen.emailPlaceholder} onPress={() => { navigation.navigate("UpdateEmail") }} width="auto">{user?.email || staticData.profile.updateProfileScreen.email}</ProfileButtonWithArrow>
            </View>
            <View style={styles.updateProfileBlockContainer}>
                <ProfileButtonWithArrow placeholder={staticData.profile.updateProfileScreen.namePlaceholder} onPress={() => { navigation.navigate("UpdateName") }} width="auto">{user?.first_name || staticData.profile.updateProfileScreen.name}</ProfileButtonWithArrow>
                <ProfileButtonWithArrow placeholder={staticData.profile.updateProfileScreen.lastNamePlaceholder} onPress={() => { navigation.navigate("UpdateLastName") }} width="auto">{user?.last_name || staticData.profile.updateProfileScreen.lastName}</ProfileButtonWithArrow>
                <ProfileButtonWithArrow placeholder={staticData.profile.updateProfileScreen.nickNamePlaceholder} onPress={() => { navigation.navigate("UpdateNickname") }} width="auto">{`@${user?.username || staticData.profile.updateProfileScreen.nickName}`}</ProfileButtonWithArrow>
                <ProfileButtonWithArrow placeholder={staticData.profile.updateProfileScreen.birthPlaceholder} onPress={() => { navigation.navigate("UpdateBirth") }} width="auto">{fromServerDateToFrontDate(user?.birthday || staticData.profile.updateProfileScreen.birth)}</ProfileButtonWithArrow>
                <ProfileButtonWithArrow placeholder={staticData.profile.updateProfileScreen.aboutPlaceholder} onPress={() => { navigation.navigate("UpdateAbout") }} width="auto">{user?.about_user || staticData.profile.updateProfileScreen.about}</ProfileButtonWithArrow>
            </View>
            <View style={styles.updateProfileBlockContainer}>
                <ProfileButtonWithArrow placeholder={staticData.profile.updateProfileScreen.addressPlaceholder} onPress={() => { navigation.navigate("UpdateAddress") }} width="auto">{
                  address?.city && address?.country ?
                  `${address.city}, ${address.country}` : 
                  address?.city || address?.country ||
                  staticData.profile.updateProfileScreen.address
                }</ProfileButtonWithArrow>
                <ProfileButtonWithArrow placeholder={staticData.profile.updateProfileScreen.postPlaceholder} onPress={() => { navigation.navigate("UpdatePost") }} width="auto">{post?.post_service || staticData.profile.updateProfileScreen.post}</ProfileButtonWithArrow>
            </View>
        </ScrollView>
    </ScreenContainer>
  );
};

export default UpdateProfileScreen;
