import React, { useCallback, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenContainer from '../../components/ui/ScreenContainer';
import { RootStackParamList } from '../../components/RootNavigator';
import ButtonWithArrow from '../../components/ui/buttons/ButtonWithArrow';
import Leave from '../../components/ui/icons/Leave';
import { useAuth } from '../../contexts/AuthContext';
import { View } from 'react-native';
import BackButton from '../../components/ui/buttons/BackButton';
import DesignedText from '../../components/ui/DesignedText';
import wishCreatingStyles from '../wishCreating/styles';
import styles from './styles';
import Profile from '../../components/ui/icons/Profile';
import Translate from '../../components/ui/icons/Translate';
import PremiumProfile from '../../components/ui/icons/PremiumProfile';
import TechSupport from '../../components/ui/icons/TechSupport';
import Heart from '../../components/ui/icons/Heart';
import ShortLogo from '../../components/ui/icons/ShortLogo';
import Upload from '../../components/ui/icons/Upload';
import Instagram from '../../components/ui/icons/Instagram';
import TikTok from '../../components/ui/icons/TikTok';
import PrivacyPolicy from '../../components/ui/icons/PrivacyPolicy';
import UsingTerms from '../../components/ui/icons/UsingTerms';
import BrokenHeart from '../../components/ui/icons/BrokenHeart';
import { ScrollView } from 'react-native-gesture-handler';
import SubmitButton from '../../components/ui/buttons/SubmitButton';
import { AccountService } from '../auth/services';
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../../components/ui/Loader';
import { useLocalization } from '../../contexts/LocalizationContext';
import { VersionBlock } from '../../components/Profile/VersionBlock';
import { openExternalLink } from '../../utils/helpers';

type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;

interface SettingsScreenProps {
  navigation: SettingsScreenNavigationProp;
}

function SettingsScreen({ navigation }: SettingsScreenProps) {
  const { logout } = useAuth();
  const { staticData } = useLocalization();
  const accountService = new AccountService();
  const authContext = useAuth();
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState<boolean | undefined>(false);

  useFocusEffect(
    useCallback(() => {
      accountService.getUser(authContext).then(user => {
        setIsPremium(user.is_premium);
        setLoading(false);
      });
    }, [])
  );

  return (
    <ScreenContainer>
      {loading && <Loader />}
      <ScrollView showsVerticalScrollIndicator={false} style={{ overflow: "visible" }}>
        <View style={wishCreatingStyles.wishConfirmationTop}>
          <BackButton />
          <DesignedText italic={true}>{staticData.profile.settingsScreen.title}</DesignedText>
        </View>
        <View style={styles.settingsContainer}>
          <View style={styles.settingsBlockContainer}>
            <DesignedText>{staticData.profile.settingsScreen.accountBlock}</DesignedText>
            <View style={styles.settingsButtonsContainer}>
              <ButtonWithArrow onPress={() => { navigation.navigate("UpdateProfile") }} width="auto" icon={<Profile width={16} height={16}/>}>{staticData.profile.settingsScreen.account}</ButtonWithArrow>
              <ButtonWithArrow onPress={() => { navigation.navigate("ChangeLanguage") }} width="auto" icon={<Translate />}>{staticData.profile.settingsScreen.language}</ButtonWithArrow>
              <ButtonWithArrow onPress={() => { navigation.navigate("ProfilePremium") }} width="auto" icon={<PremiumProfile />}>{staticData.profile.settingsScreen.premium}</ButtonWithArrow>
            </View>
          </View>
          {!isPremium && 
            <View style={styles.settingsBlockContainer}>
              <DesignedText style={styles.premiumAdvertText}>{staticData.profile.settingsScreen.premiumAdvert.titleFirstPart} <DesignedText bold={true}>{staticData.profile.settingsScreen.premiumAdvert.titleSecondPart}</DesignedText></DesignedText>
              <View style={{gap: 4}}>
                <DesignedText size="small" style={styles.premiumAdvertText}>{staticData.profile.settingsScreen.premiumAdvert.spanFirst}</DesignedText>
                <DesignedText size="small" isUppercase={false} style={styles.premiumAdvertText}>{staticData.profile.settingsScreen.premiumAdvert.spanSecond} </DesignedText>
              </View>
              <SubmitButton onPress={()=>{
                setLoading(true);
                accountService.tryPremium(authContext).then(success => {
                  if (success) {
                    setIsPremium(true);
                  }
                  setLoading(false);
                })
              }} width={240} height={32} style={styles.premiumAdvertButton} textStyle={{fontSize: 12}}>{staticData.profile.settingsScreen.premiumAdvert.button}</SubmitButton>
            </View>
          }
          <View style={styles.settingsBlockContainer}>
            <DesignedText>{staticData.profile.settingsScreen.contactUsBlock}</DesignedText>
            <View style={styles.settingsButtonsContainer}>
              <ButtonWithArrow onPress={() => { navigation.navigate("TechSupporOrFAQ") }} width="auto" icon={<TechSupport />}>{staticData.profile.settingsScreen.techSupport}</ButtonWithArrow>
              <ButtonWithArrow onPress={() => { }} width="auto" icon={<Heart />}>{staticData.profile.settingsScreen.becomeAmbassador}</ButtonWithArrow>
            </View>
          </View>
          <View style={styles.settingsBlockContainer}>
            <DesignedText>{staticData.profile.settingsScreen.aboutUsBlock}</DesignedText>
            <View style={styles.settingsButtonsContainer}>
              <ButtonWithArrow onPress={() => { }} width="auto" icon={<ShortLogo />}>{staticData.profile.settingsScreen.moreInfo}</ButtonWithArrow>
              <ButtonWithArrow onPress={() => { }} width="auto" icon={<Upload width={16} height={16}/>}>{staticData.profile.settingsScreen.share}</ButtonWithArrow>
              <ButtonWithArrow onPress={() => { openExternalLink("https://www.instagram.com/bazhay.app?igsh=MWxhcXNheHhuNTJlYw==") }} width="auto" icon={<Instagram />}>{staticData.profile.settingsScreen.instagram}</ButtonWithArrow>
              <ButtonWithArrow onPress={() => { openExternalLink("https://www.tiktok.com/@bazhay.app?_t=8pqhqBXKKwP&_r=1") }} width="auto" icon={<TikTok />}>{staticData.profile.settingsScreen.tikTok}</ButtonWithArrow>
            </View>
          </View>
          <View style={styles.settingsBlockContainer}>
            <DesignedText>{staticData.profile.settingsScreen.lawBlock}</DesignedText>
            <View style={styles.settingsButtonsContainer}>
              <ButtonWithArrow onPress={() => { navigation.navigate("PrivacyPolicy") }} width="auto" icon={<PrivacyPolicy />}>{staticData.profile.settingsScreen.privacyPolicy}</ButtonWithArrow>
              <ButtonWithArrow onPress={() => { navigation.navigate("TermsOfUse") }} width="auto" icon={<UsingTerms/>}>{staticData.profile.settingsScreen.termsOfUse}</ButtonWithArrow>
            </View>
          </View>
          <View style={styles.settingsButtonsContainer}>
            <ButtonWithArrow onPress={() => { logout() }} width="auto" icon={<Leave/>}>{staticData.profile.settingsScreen.exit}</ButtonWithArrow>
            <ButtonWithArrow onPress={() => { navigation.navigate("DeleteAccount") }} width="auto" icon={<BrokenHeart/>}>{staticData.profile.settingsScreen.deleteAccount}</ButtonWithArrow>
          </View>
        </View>
        <VersionBlock style={{ marginTop: 32 }}/>
      </ScrollView>
    </ScreenContainer>
  );
};

export default SettingsScreen;
