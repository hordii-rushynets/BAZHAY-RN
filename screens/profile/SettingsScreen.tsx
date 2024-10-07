import React from 'react';
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
import Logo from '../../components/ui/icons/Logo';
import SubmitButton from '../../components/ui/buttons/SubmitButton';

type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;

interface SettingsScreenProps {
  navigation: SettingsScreenNavigationProp;
}

function SettingsScreen({ navigation }: SettingsScreenProps) {
  const { logout } = useAuth();

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} style={{ overflow: "visible" }}>
        <View style={wishCreatingStyles.wishConfirmationTop}>
          <BackButton />
          <DesignedText italic={true}>Налаштування</DesignedText>
        </View>
        <View style={styles.settingsContainer}>
          <View style={styles.settingsBlockContainer}>
            <DesignedText>Обліковий запис та додаток</DesignedText>
            <View style={styles.settingsButtonsContainer}>
              <ButtonWithArrow onPress={() => { navigation.navigate("UpdateProfile") }} width="auto" icon={<Profile width={16} height={16}/>}>Акаунт</ButtonWithArrow>
              <ButtonWithArrow onPress={() => { }} width="auto" icon={<Translate />}>Мова</ButtonWithArrow>
              <ButtonWithArrow onPress={() => { }} width="auto" icon={<PremiumProfile />}>преміум підписка</ButtonWithArrow>
            </View>
          </View>
          <View style={styles.settingsBlockContainer}>
            <DesignedText style={styles.premiumAdvertText}>спробуй <DesignedText bold={true}>Bazhay! преміум</DesignedText></DesignedText>
            <View style={{gap: 4}}>
              <DesignedText size="small" style={styles.premiumAdvertText}>Лише 0,80$ на місяць</DesignedText>
              <DesignedText size="small" isUppercase={false} style={styles.premiumAdvertText}>щороку передплата 10$ </DesignedText>
            </View>
            <SubmitButton onPress={()=>{}} width={240} height={32} style={styles.premiumAdvertButton} textStyle={{fontSize: 12}}>спробуй 7 днів безкоштовно</SubmitButton>
          </View>
          <View style={styles.settingsBlockContainer}>
            <DesignedText>напиши нам</DesignedText>
            <View style={styles.settingsButtonsContainer}>
              <ButtonWithArrow onPress={() => { }} width="auto" icon={<TechSupport />}>технічна підтримка</ButtonWithArrow>
              <ButtonWithArrow onPress={() => { }} width="auto" icon={<Heart />}>Стань нашим амбасадором</ButtonWithArrow>
            </View>
          </View>
          <View style={styles.settingsBlockContainer}>
            <DesignedText>Про нас</DesignedText>
            <View style={styles.settingsButtonsContainer}>
              <ButtonWithArrow onPress={() => { }} width="auto" icon={<ShortLogo />}>Більше про Bazhay!</ButtonWithArrow>
              <ButtonWithArrow onPress={() => { }} width="auto" icon={<Upload width={16} height={16}/>}>Поділитись Bazhay! з друзями</ButtonWithArrow>
              <ButtonWithArrow onPress={() => { }} width="auto" icon={<Instagram />}>слідкуй за нами в Instagram</ButtonWithArrow>
              <ButtonWithArrow onPress={() => { }} width="auto" icon={<TikTok />}>слідкуй за нами в Tik Tok</ButtonWithArrow>
            </View>
          </View>
          <View style={styles.settingsBlockContainer}>
            <DesignedText>Юридична інформація</DesignedText>
            <View style={styles.settingsButtonsContainer}>
              <ButtonWithArrow onPress={() => { }} width="auto" icon={<PrivacyPolicy />}>Політика конфеденційності</ButtonWithArrow>
              <ButtonWithArrow onPress={() => { }} width="auto" icon={<UsingTerms/>}>Правила користування</ButtonWithArrow>
            </View>
          </View>
          <View style={styles.settingsButtonsContainer}>
            <ButtonWithArrow onPress={() => { logout() }} width="auto" icon={<Leave/>}>Вийти</ButtonWithArrow>
            <ButtonWithArrow onPress={() => { navigation.navigate("DeleteAccount") }} width="auto" icon={<BrokenHeart/>}>видалити акаунт</ButtonWithArrow>
          </View>
        </View>
        <View style={styles.settingsBottomLogo}>
          <Logo width={160} height={46}/>
          <DesignedText isUppercase={false} size="small" style={styles.settingsBottomText}>Версія 1.1.1</DesignedText>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default SettingsScreen;
