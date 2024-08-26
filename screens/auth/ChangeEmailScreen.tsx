import React from 'react';
import ScreenContainer from '../../components/ui/ScreenContainer';
import { TouchableOpacity, View } from 'react-native';
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
import { useLocalization } from '../../contexts/LocalizationContext';

type ChangeEmailScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'ChangeEmail'>;

interface ChangeEmailScreenProps {
  navigation: ChangeEmailScreenNavigationProp;
}

function ChangeEmailScreen({ navigation }: ChangeEmailScreenProps) {
  const accountService = new AccountService();
  const { staticData } = useLocalization();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email(staticData.auth.changeEmailScreen.emailError).required(staticData.auth.changeEmailScreen.requiredError),
  });

  return (
    <ScreenContainer>
        <View style={styles.contentContainer}>
            <View>
                <View style={styles.titleContainer}>
                    <Title style={styles.title}>
                    <Title italic={true}>{staticData.auth.changeEmailScreen.titleFirstPart}</Title>{"\n"} {staticData.auth.changeEmailScreen.titleSecondPart}
                    </Title>
                    <DesignedText style={styles.titleSpan} size="small">
                    {staticData.auth.changeEmailScreen.titleSpan}
                    </DesignedText>
                </View>
                <Formik
                  initialValues={{ email: '' }}
                  validationSchema={validationSchema}
                  onSubmit={(values, { setErrors }) => {
                    accountService.authenticate(values.email).then(success => {
                      if (success) {
                        navigation.navigate("EmailConfirmation", { email: values.email })
                      }
                      else {
                        setErrors({ email: staticData.auth.changeEmailScreen.emailError })
                      }
                    })
                  }}
                >
                  {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.inputContainer}>
                        <TextInputWithArrow 
                          placeholder={staticData.auth.changeEmailScreen.emailPlaceholder}
                          value={values.email}
                          error={errors.email}
                          onChange={handleChange('email')}
                          onSubmit={handleSubmit}
                          />
                    </View>
                  )}
                </Formik>
            </View>
            <View style={styles.changeEmailScreenBottomContainer}>
                <DesignedText size="small" isUppercase={false} style={styles.bottomText}>
                {staticData.auth.changeEmailScreen.bottomTextFirstPart} {'\n'} 
                <DesignedText size="small" isUppercase={false} style={styles.underlined}>{staticData.auth.changeEmailScreen.bottomTextPrivacyPolicy}</DesignedText> 
                {" "}{staticData.auth.changeEmailScreen.bottomTextAnd}{" "} 
                <DesignedText size="small" isUppercase={false} style={styles.underlined}>{staticData.auth.changeEmailScreen.bottomTextUsageRules}</DesignedText>
                </DesignedText>
            </View>
        </View>
    </ScreenContainer>
  );
};

export default ChangeEmailScreen;
