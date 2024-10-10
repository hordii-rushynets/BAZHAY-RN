import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenContainer from '../../components/ui/ScreenContainer';
import { RootStackParamList } from '../../components/RootNavigator';
import ButtonWithArrow from '../../components/ui/buttons/ButtonWithArrow';
import { TouchableOpacity, View } from 'react-native';
import BackButton from '../../components/ui/buttons/BackButton';
import DesignedText from '../../components/ui/DesignedText';
import wishCreatingStyles from '../wishCreating/styles';
import styles from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import { useLocalization } from '../../contexts/LocalizationContext';
import { VersionBlock } from '../../components/Profile/VersionBlock';
import { QuestionBlock } from '../../components/Profile/QuestionBlock';
import { openExternalLink } from '../../utils/helpers';

type FAQScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FAQ'>;

interface FAQScreenProps {
  navigation: FAQScreenNavigationProp;
}

function FAQScreen({ navigation }: FAQScreenProps) {
  const { staticData } = useLocalization();

  const categories = [
    {
        title: staticData.profile.faq[0].title,
        questions: [
            {
                title: staticData.profile.faq[0].questions[0].title,
                filling: <QuestionBlock title={staticData.profile.faq[0].questions[0].title} textes={staticData.profile.faq[0].questions[0].filling}/>
            },
            {
                title: staticData.profile.faq[0].questions[1].title,
                filling: <QuestionBlock title={staticData.profile.faq[0].questions[1].title} textes={staticData.profile.faq[0].questions[1].filling}/>
            },
            {
                title: staticData.profile.faq[0].questions[2].title,
                filling: <View style={styles.questionBlock}>
                          <DesignedText>{staticData.profile.faq[0].questions[2].title}</DesignedText>
                          <DesignedText size="small">{staticData.profile.faq[0].questions[2].filling[0]}</DesignedText>
                          <View>
                            <TouchableOpacity onPress={() => { openExternalLink("https://support.apple.com/") }}>
                                <DesignedText size="small" style={{ textDecorationLine: "underline" }}>{staticData.profile.faq[0].questions[2].filling[1]}</DesignedText>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { openExternalLink("https://support.google.com/googleplay") }}>
                                <DesignedText size="small" style={{ textDecorationLine: "underline" }}>{staticData.profile.faq[0].questions[2].filling[2]}</DesignedText>
                            </TouchableOpacity>
                          </View>
                        </View>
            },
            {
                title: staticData.profile.faq[0].questions[3].title,
                filling: <QuestionBlock title={staticData.profile.faq[0].questions[3].title} textes={ staticData.profile.faq[0].questions[3].filling}/>
            },
            {
                title: staticData.profile.faq[0].questions[4].title,
                filling: <QuestionBlock title={staticData.profile.faq[0].questions[4].title} textes={staticData.profile.faq[0].questions[4].filling}/>
            },
            {
                title: staticData.profile.faq[0].questions[5].title,
                filling: <QuestionBlock title={staticData.profile.faq[0].questions[5].title} textes={staticData.profile.faq[0].questions[5].filling}/>
            }
        ]
    },
    {
        title: staticData.profile.faq[1].title,
        questions: [
            {
                title: staticData.profile.faq[1].questions[0].title,
                filling: <QuestionBlock title={staticData.profile.faq[1].questions[0].title} textes={staticData.profile.faq[1].questions[0].filling}/>
            }
        ]
    },
    {
        title: staticData.profile.faq[2].title,
        questions: [
            {
                title: staticData.profile.faq[2].questions[0].title,
                filling: <View style={styles.questionBlock}>
                          <DesignedText>{staticData.profile.faq[2].questions[0].title}</DesignedText>
                          <DesignedText size="small">
                            {staticData.profile.faq[2].questions[0].filling[0]}
                            <TouchableOpacity onPress={() => { openExternalLink("https://forms.gle/4PnJdtPv2sye4NkG8") }}>
                                <DesignedText size="small" style={{ textDecorationLine: "underline", transform: [{translateY: 4}] }}>{staticData.profile.faq[2].questions[0].filling[1]}</DesignedText>
                            </TouchableOpacity>
                          </DesignedText>
                          <DesignedText size="small">{staticData.profile.faq[2].questions[0].filling[2]}</DesignedText>
                        </View>
            },
            {
                title: staticData.profile.faq[2].questions[1].title,
                filling: <QuestionBlock title={staticData.profile.faq[2].questions[1].title} textes={staticData.profile.faq[2].questions[1].filling}/>
            }
        ]
    }
  ]

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} style={{ overflow: "visible" }} contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={wishCreatingStyles.wishConfirmationTop}>
          <BackButton />
          <DesignedText italic={true}>{staticData.profile.faqCategoryScreen.faq}</DesignedText>
        </View>
        <View style={styles.settingsContainer}>
            <View style={styles.settingsBlockContainer}>
                {categories.map((category, indx) => (
                    <ButtonWithArrow key={indx} onPress={() => { navigation.navigate("FAQCategory", { category: category }) }} width="auto">{category.title}</ButtonWithArrow>
                ))}
            </View>
        </View>
      </ScrollView>
      <VersionBlock style={{ position: "absolute", bottom: 34 }}/>
    </ScreenContainer>
  );
};

export default FAQScreen;
