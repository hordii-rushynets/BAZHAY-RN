import React, { useCallback, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenContainer from '../../components/ui/ScreenContainer';
import { TouchableOpacity, View } from 'react-native';
import DesignedText from '../../components/ui/DesignedText';
import wishStyles from "../wishCreating/styles"
import BackButton from '../../components/ui/buttons/BackButton';
import { RootStackParamList } from '../../components/RootNavigator';
import { useLocalization } from '../../contexts/LocalizationContext';
import { AccountService } from '../auth/services';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import Loader from '../../components/ui/Loader';
import { PremiumMonthButton } from '../../components/WishCreating/PremiumMonthButton';
import { PremiumBottomButtons } from '../../components/WishCreating/PremiumBottomButtons';
import styles from './styles';
import { PremiumYearButton } from '../../components/Profile/PremiumYearButton';
import wishCreatingStyles from "../wishCreating/styles"
import Checkmark from '../../components/ui/icons/Checkmark';
import SubmitButton from '../../components/ui/buttons/SubmitButton';
import { QuestionBlock } from '../../components/Profile/QuestionBlock';
import { openExternalLink } from '../../utils/helpers';

type ProfilePremiumScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProfilePremium'>;

interface ProfilePremiumScreenProps {
  navigation: ProfilePremiumScreenNavigationProp;
}

function ProfilePremiumScreen({ navigation }: ProfilePremiumScreenProps) {
  const { staticData } = useLocalization();
  const accountService = new AccountService();
  const authContext = useAuth();
  const [isPremium, setIsPremium] = useState<boolean | undefined>(false);
  const [loading, setLoading] = useState(true);
  const [isYear, setIsYear] = useState(false);
  const [isTrial, setIsTrial] = useState(false);
  const [expiration, setExpiration] = useState("");

  useFocusEffect(
    useCallback(() => {
      accountService.getUser(authContext).then(user => {
        setIsPremium(user.is_premium);
        if (user.is_premium) {
          accountService.getPremium(authContext).then(premium => {
            setLoading(false);
            setIsYear(premium.is_an_annual_payment || false);
            setIsTrial(premium.is_trial_period || false);
            setExpiration(premium.expiration_date || "");
          })
        }
        else {
          setLoading(false);
        }
      });
    }, [isPremium])
  );

  const FAQCategory = {
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
  }

  return (
    <ScreenContainer>
        {loading && <Loader />}
        <View style={wishStyles.wishConfirmationTop}>
          <BackButton/>
          <DesignedText italic={true}>{staticData.profile.profilePremiumScreen.title}</DesignedText>
        </View>
        {!isPremium ? 
            <View style={styles.premiumButtonsContainer}>
                <PremiumYearButton onPress={() => {
                    setLoading(true);
                    accountService.becomePremium(true, authContext).then(success => {
                        if (success) {
                            setIsPremium(true);
                        }
                        setLoading(false);
                    })
                }}/>
                <PremiumMonthButton onPress={() => {
                    setLoading(true);
                    accountService.becomePremium(false, authContext).then(success => {
                        if (success) {
                            setIsPremium(true);
                        }
                        setLoading(false);
                    })
                }}/>
            </View>
          :
          <>
            <View style={{ gap: 24 }}>
              <DesignedText>{staticData.profile.profilePremiumScreen.titlePremium}</DesignedText>
              <View style={{ gap: 16 }}>
                  <DesignedText size="small">{staticData.profile.profilePremiumScreen.advantages}</DesignedText>
                  <View style={{ gap: 8 }}>
                    {staticData.wishCreating.premiumScreen.premiumAdvantages.map((advantage: string, indx: number) => (
                        <View key={indx} style={wishCreatingStyles.premiumAdvantage}>
                            <Checkmark />
                            <DesignedText size="small">{advantage}</DesignedText>
                        </View>
                    ))}
                  </View>
              </View>
              <DesignedText size="small" isUppercase={false}>
                {
                  isTrial ? `${staticData.profile.profilePremiumScreen.trialFirst} ${(new Date(expiration)).toLocaleDateString()} ${staticData.profile.profilePremiumScreen.trialSecond}` 
                  : isYear ? `${staticData.profile.profilePremiumScreen.year} ${(new Date(expiration)).toLocaleDateString()}` 
                    : `${staticData.profile.profilePremiumScreen.month} ${(new Date(expiration)).toLocaleDateString()}`
                
                }
              </DesignedText>
            </View>
            <View style={{ gap: 16, width: 300, alignSelf: "center", position: "absolute", bottom: 150}}>
              <SubmitButton onPress={() => { navigation.navigate("FAQCategory", { category: FAQCategory }) }} width="auto">{staticData.profile.profilePremiumScreen.questions}</SubmitButton>
              <SubmitButton onPress={() => { navigation.navigate("TechSupport") }} width="auto">{staticData.profile.profilePremiumScreen.techSupport}</SubmitButton>
          </View>
          </>
        }
        <PremiumBottomButtons />
    </ScreenContainer>
  );
};

export default ProfilePremiumScreen;
