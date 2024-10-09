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
import { RouteProp } from '@react-navigation/native';
import { Question } from './interfaces';

type QuestionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Question'>;
type QuestionScreenRouteProp = RouteProp<RootStackParamList, 'Question'>;

interface QuestionScreenProps {
  navigation: QuestionScreenNavigationProp;
  route: QuestionScreenRouteProp;
}

function QuestionScreen({ navigation, route }: QuestionScreenProps) {
  const { question, categoryTitle } = route.params;
  const { staticData } = useLocalization();

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} style={{ overflow: "visible" }} contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={wishCreatingStyles.wishConfirmationTop}>
          <BackButton />
          <DesignedText italic={true} style={{ textAlign: "right" }}>{`${staticData.profile.faqCategoryScreen.faq}.\n${categoryTitle}`}</DesignedText>
        </View>
        {question.filling}
      </ScrollView>
      <VersionBlock style={{ position: "absolute", bottom: 34 }}/>
    </ScreenContainer>
  );
};

export default QuestionScreen;
