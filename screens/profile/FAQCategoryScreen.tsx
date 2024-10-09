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

type FAQCategoryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FAQCategory'>;
type FAQCategoryScreenRouteProp = RouteProp<RootStackParamList, 'FAQCategory'>;

interface FAQCategoryScreenProps {
  navigation: FAQCategoryScreenNavigationProp;
  route: FAQCategoryScreenRouteProp;
}

function FAQCategoryScreen({ navigation, route }: FAQCategoryScreenProps) {
  const { category } = route.params;
  const { staticData } = useLocalization();

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} style={{ overflow: "visible" }} contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={wishCreatingStyles.wishConfirmationTop}>
          <BackButton />
          <DesignedText italic={true} style={{ textAlign: "right" }}>{`${staticData.profile.faqCategoryScreen.faq}.\n${category.title}`}</DesignedText>
        </View>
        <View style={styles.settingsContainer}>
            <View style={styles.settingsBlockContainer}>
                {category.questions.map((question: Question, indx: number) => (
                    <ButtonWithArrow key={indx} onPress={() => { navigation.navigate("Question", { question: question, categoryTitle: category.title}) }} width="auto" showMoreThanOneLine={true} style={styles.questionButton}>{question.title}</ButtonWithArrow>
                ))}
            </View>
        </View>
      </ScrollView>
      <ButtonWithArrow onPress={() => { }} width="auto" showMoreThanOneLine={true} style={[styles.questionButton, styles.questionButtonBottom]}>{staticData.profile.faqCategoryScreen.supportButton}</ButtonWithArrow>
      <VersionBlock style={{ position: "absolute", bottom: 34 }}/>
    </ScreenContainer>
  );
};

export default FAQCategoryScreen;
