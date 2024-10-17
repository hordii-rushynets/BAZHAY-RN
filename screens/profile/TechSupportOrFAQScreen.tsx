import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenContainer from '../../components/ui/ScreenContainer';
import { RootStackParamList } from '../../components/RootNavigator';
import ButtonWithArrow from '../../components/ui/buttons/ButtonWithArrow';
import { View } from 'react-native';
import BackButton from '../../components/ui/buttons/BackButton';
import DesignedText from '../../components/ui/DesignedText';
import wishCreatingStyles from '../wishCreating/styles';
import styles from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import { useLocalization } from '../../contexts/LocalizationContext';
import { VersionBlock } from '../../components/Profile/VersionBlock';

type TechSupporOrFAQScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TechSupporOrFAQ'>;

interface TechSupporOrFAQScreenProps {
  navigation: TechSupporOrFAQScreenNavigationProp;
}

function TechSupporOrFAQScreen({ navigation }: TechSupporOrFAQScreenProps) {
  const { staticData } = useLocalization();

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} style={{ overflow: "visible" }} contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={wishCreatingStyles.wishConfirmationTop}>
          <BackButton />
          <DesignedText italic={true}>{staticData.profile.techSupportOrFAQScreen.title}</DesignedText>
        </View>
        <View style={styles.settingsContainer}>
            <View style={styles.settingsBlockContainer}>
                <ButtonWithArrow onPress={() => { navigation.navigate("FAQ") }} width="auto">{staticData.profile.techSupportOrFAQScreen.questions}</ButtonWithArrow>
                <ButtonWithArrow onPress={() => { navigation.navigate("TechSupport") }} width="auto">{staticData.profile.techSupportOrFAQScreen.support}</ButtonWithArrow>
            </View>
        </View>
      </ScrollView>
      <VersionBlock style={{ position: "absolute", bottom: 34 }}/>
    </ScreenContainer>
  );
};

export default TechSupporOrFAQScreen;
