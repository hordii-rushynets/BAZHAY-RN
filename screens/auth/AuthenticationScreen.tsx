import React from 'react';
import ScreenContainer from '../../components/ui/ScreenContainer';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import DesignedText from '../../components/ui/DesignedText';
import Title from '../../components/ui/Title';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextInputWithArrow from '../../components/ui/inputs/TextInputWithArrow';
import SocialLogin from '../../components/Auth/SocialLogin';
import styles from './styles'
import DesignStars from '../../components/ui/icons/DesignStars';
import BigLogo from '../../components/ui/icons/BigLogo';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../components/navigationStacks/AuthStackScreen';
import { AccountService } from './services';
import { useAuth } from '../../contexts/AuthContext';
import * as Application from 'expo-application';
import { useLocalization } from '../../contexts/LocalizationContext';
import { usePopUpMessageContext } from '../../contexts/PopUpMessageContext';

type AuthScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Authentication'>;

interface AuthScreenProps {
  navigation: AuthScreenNavigationProp;
}

function AuthScreen({ navigation }: AuthScreenProps) {
  const accountService = new AccountService();

  const { login, completeFillingAccount } = useAuth();
  const { staticData } = useLocalization();
  const { setIsOpen, setText, setButtonText, setButtonAction, setWidth } = usePopUpMessageContext();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email(staticData.auth.authentificationScreen.emailError).required(staticData.auth.authentificationScreen.requiredError),
  });
 
  return (
    <ScreenContainer>
        <View style={styles.logoContainer}>
          <BigLogo width={110} height={30}/>
        </View>
        <View style={styles.starsContainer}>
          <DesignStars />
        </View>
        <View style={styles.contentContainer}>
            <View>
                <View style={styles.titleContainer}>
                    <Title style={styles.title}>
                      <Title italic={true}>{staticData.auth.authentificationScreen.titleFirstPart}</Title>{'\n'} {staticData.auth.authentificationScreen.titleCenterPart} <Title italic={true}>{staticData.auth.authentificationScreen.titleItalicPart}</Title> {staticData.auth.authentificationScreen.titleEndingPart}
                    </Title>
                    <DesignedText style={styles.titleSpan} size="small">
                    {staticData.auth.authentificationScreen.titleSpan}
                    </DesignedText>
                </View>
                <Formik
                  initialValues={{ email: '' }}
                  validationSchema={validationSchema}
                  onSubmit={(values, { setErrors }) => {
                    accountService.authenticate(values.email.toLowerCase()).then(success => {
                      if (success) {
                        navigation.navigate("EmailConfirmation", { email: values.email.toLowerCase() })
                      }
                      else {
                        setErrors({ email: staticData.auth.authentificationScreen.emailError })
                      }
                    })
                  }}
                >
                  {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.inputContainer}>
                        <TextInputWithArrow 
                          placeholder={staticData.auth.authentificationScreen.emailPlaceholder}
                          value={values.email}
                          error={errors.email}
                          onChange={handleChange('email')}
                          onSubmit={handleSubmit}
                          />
                    </View>
                  )}
                </Formik>
                <View style={styles.dividerContainer}>
                    <View style={styles.line}></View>
                    <DesignedText size="small" style={styles.dividerText}>{staticData.auth.authentificationScreen.or}</DesignedText>
                    <View style={styles.line}></View>
                </View>
                <SocialLogin />
            </View>
            <View style={styles.bottomContainer}>
                <TouchableOpacity onPress={async () => {

                  const id = Platform.OS === "ios" ? await Application.getIosIdForVendorAsync() : Application.getAndroidId()

                  accountService.authGuest(id || "").then(token => {
                    if (token.access !== "") {
                      setText("Ти увійшов(ла) як гість. Якщо вийдеш\n з системи або втратиш пристрій,\n на жаль, всі твої дані буде втрачено.");
                      setButtonText("Увійти в обліковий запис");
                      setWidth(343);
                      setButtonAction(() => () => {setIsOpen(false)});
                      setIsOpen(true);
                      completeFillingAccount()
                      login(token.access, token.refresh)
                    }
                  })
                }}>
                    <DesignedText style={styles.guestButton}>
                    {staticData.auth.authentificationScreen.guestButtonFirstPart} <DesignedText italic={true}>{staticData.auth.authentificationScreen.guestButtonItalicPart}</DesignedText>
                    </DesignedText>
                </TouchableOpacity>
                <DesignedText size="small" isUppercase={false} style={styles.bottomText}>
                {staticData.auth.authentificationScreen.bottomTextFirstPart} {'\n'} 
                <DesignedText size="small" isUppercase={false} style={styles.underlined}>{staticData.auth.authentificationScreen.bottomTextPrivacyPolicy}</DesignedText> 
                {" "}{staticData.auth.authentificationScreen.bottomTextAnd}{" "} 
                <DesignedText size="small" isUppercase={false} style={styles.underlined}>{staticData.auth.authentificationScreen.bottomTextUsageRules}</DesignedText>
                </DesignedText>
            </View>
        </View>
    </ScreenContainer>
  );
};

export default AuthScreen;
