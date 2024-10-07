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
import { UserFields } from '../auth/interfaces';
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

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
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
          <DesignedText italic={true}>акаунт</DesignedText>
        </View>
        <AvatarButton onPress={() => { navigation.navigate("UpdateAvatar", { image: user?.photo || "" }) }} url={user?.photo || ""} style={styles.profileUpdateAvatar}/>
        <ScrollView style={styles.updateProfileContent} contentContainerStyle={styles.updateProfileContentContainer}>
            <View style={styles.updateProfileBlockContainer}>
                <ProfileButtonWithArrow placeholder={"Твоя електронна пошта"} onPress={() => { navigation.navigate("UpdateEmail") }} width="auto">{user?.email || "Ел.пошта"}</ProfileButtonWithArrow>
            </View>
            <View style={styles.updateProfileBlockContainer}>
                <ProfileButtonWithArrow placeholder={"Як тебе звати?"} onPress={() => { navigation.navigate("UpdateName") }} width="auto">{user?.first_name || "Ім’я"}</ProfileButtonWithArrow>
                <ProfileButtonWithArrow placeholder={"Яке твоє прізвище?"} onPress={() => { navigation.navigate("UpdateLastName") }} width="auto">{user?.last_name || "Прізвище"}</ProfileButtonWithArrow>
                <ProfileButtonWithArrow placeholder={"Придумай собі нікнейм"} onPress={() => { navigation.navigate("UpdateNickname") }} width="auto">{`@${user?.username || "нікнейм"}`}</ProfileButtonWithArrow>
                <ProfileButtonWithArrow placeholder={"Яка твоя дата народження?"} onPress={() => { navigation.navigate("UpdateBirth") }} width="auto">{fromServerDateToFrontDate(user?.birthday || "ММ.ДД.РРРР")}</ProfileButtonWithArrow>
                <ProfileButtonWithArrow placeholder={"Напиши про себе"} onPress={() => { navigation.navigate("UpdateAbout") }} width="auto">{user?.about_user || "Текст про мене"}</ProfileButtonWithArrow>
            </View>
            <View style={styles.updateProfileBlockContainer}>
                <ProfileButtonWithArrow placeholder={"Твоя адреса для доставки подарунку"} onPress={() => {}} width="auto">{"Адреса"}</ProfileButtonWithArrow>
                <ProfileButtonWithArrow placeholder={"Адреса відділення пошти"} onPress={() => {}} width="auto">{"Нова пошта"}</ProfileButtonWithArrow>
            </View>
        </ScrollView>
    </ScreenContainer>
  );
};

export default UpdateProfileScreen;
