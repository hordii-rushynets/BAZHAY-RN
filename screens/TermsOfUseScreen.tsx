import React from 'react';
import { useLocalization } from '../contexts/LocalizationContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../components/RootNavigator';
import ScreenContainer from '../components/ui/ScreenContainer';
import { ScrollView, View } from 'react-native';
import { VersionBlock } from '../components/Profile/VersionBlock';
import BackButton from '../components/ui/buttons/BackButton';
import DesignedText from '../components/ui/DesignedText';
import wishCreatingStyles from "./wishCreating/styles";

type TermsOfUseScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TermsOfUse'>;

interface TermsOfUseScreenProps {
  navigation: TermsOfUseScreenNavigationProp;
}

interface ContentBlock {
    title?: string;
    textes: string[];
}

function TermsOfUseScreen({ navigation }: TermsOfUseScreenProps) {
  const { staticData } = useLocalization();

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} style={{ overflow: "visible" }} contentContainerStyle={{ paddingBottom: 20, gap: 24 }}>
        <View style={wishCreatingStyles.wishConfirmationTop}>
          <BackButton />
          <DesignedText italic={true} style={{ textAlign: "right" }}>{staticData.termsOfUseScreen.title}</DesignedText>
        </View>
        {staticData.termsOfUseScreen.content.map((block: ContentBlock, indx: number) => (
            <View style={{ gap: 16 }} key={indx}>
                {block.title && <DesignedText>{block.title}</DesignedText>}
                {block.textes.map((text, indx) => (
                    <DesignedText size="small" key={indx}>{text}</DesignedText>
                ))}
            </View>
        ))}
        <VersionBlock />
      </ScrollView>
    </ScreenContainer>
  );
};

export default TermsOfUseScreen;
