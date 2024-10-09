import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenContainer from '../../components/ui/ScreenContainer';
import { Image, View } from 'react-native';
import DesignedText from '../../components/ui/DesignedText';
import wishStyles from "../wishCreating/styles"
import BackButton from '../../components/ui/buttons/BackButton';
import { RootStackParamList } from '../../components/RootNavigator';
import Checkmark from '../../components/ui/icons/Checkmark';
import styles from "./styles";
import { useLocalization } from '../../contexts/LocalizationContext';
import { TouchableOpacity } from 'react-native-gesture-handler';

type ChangeLanguageScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ChangeLanguage'>;

interface ChangeLanguageScreenProps {
  navigation: ChangeLanguageScreenNavigationProp;
}

function ChangeLanguageScreen({ navigation }: ChangeLanguageScreenProps) {
  const { staticData, localization, setLocalization } = useLocalization();

  return (
    <ScreenContainer>
        <View style={wishStyles.wishConfirmationTop}>
          <BackButton/>
          <DesignedText italic={true}>{staticData.profile.changeLanguageScreen.title}</DesignedText>
        </View>
        <View style={styles.languagesContainer}>
            <TouchableOpacity onPress={() => { setLocalization("uk") }}>
                <View style={styles.languageContainer}>
                    <View style={styles.languageInfoContainer}>
                        <Image source={require("../../assets/UkraineFlag.png")} />
                        <DesignedText size="small">{staticData.profile.changeLanguageScreen.uk}</DesignedText>
                    </View>
                    {localization === "uk" && <Checkmark width={16} height={12}/>}
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setLocalization("en") }}>
                <View style={styles.languageContainer}>
                    <View style={styles.languageInfoContainer}>
                        <Image source={require("../../assets/BritainFlag.png")} />
                        <DesignedText size="small">{staticData.profile.changeLanguageScreen.en} </DesignedText>
                    </View>
                    {localization === "en" && <Checkmark width={16} height={12}/>}
                </View>
            </TouchableOpacity>
        </View>
    </ScreenContainer>
  );
};

export default ChangeLanguageScreen;
