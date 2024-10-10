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
import ListItem from '../components/ui/ListItem';

type PrivacyPolicyScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PrivacyPolicy'>;

interface PrivacyPolicyScreenProps {
  navigation: PrivacyPolicyScreenNavigationProp;
}

interface ContentBlock {
    title?: string;
    blocks: { isList?: boolean, text: string }[][];
}

function PrivacyPolicyScreen({ navigation }: PrivacyPolicyScreenProps) {
  const { staticData } = useLocalization();

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} style={{ overflow: "visible" }} contentContainerStyle={{ paddingBottom: 20, gap: 24 }}>
        <View style={wishCreatingStyles.wishConfirmationTop}>
          <BackButton />
          <DesignedText italic={true} style={{ textAlign: "right" }}>{staticData.privacyPolicyScreen.title}</DesignedText>
        </View>
        {staticData.privacyPolicyScreen.content.map((content: ContentBlock, indx: number) => (
            <View style={{ gap: 16 }} key={indx}>
                {content.title && <DesignedText>{content.title}</DesignedText>}
                {content.blocks.map((paragraph, indx) => (
                    <View key={indx}>
                        {paragraph.map((row, indx) => (
                            row.isList ? 
                            <ListItem size="small" text={row.text} key={indx}/> :
                            <DesignedText size="small" key={indx}>{row.text}</DesignedText>
                        ))}
                    </View>
                ))}
            </View>
        ))}
        <VersionBlock/>
      </ScrollView>
    </ScreenContainer>
  );
};

export default PrivacyPolicyScreen;
