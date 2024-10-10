import React, { useState } from 'react';
import ScreenContainer from '../../components/ui/ScreenContainer';
import { TouchableOpacity, View } from 'react-native';
import DesignedText from '../../components/ui/DesignedText';
import Title from '../../components/ui/Title';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextInputWithArrow from '../../components/ui/inputs/TextInputWithArrow';
import styles from './styles'
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../components/navigationStacks/AuthStackScreen';
import { AccountService } from './services';
import { useLocalization } from '../../contexts/LocalizationContext';
import Loader from '../../components/ui/Loader';

type ChangeEmailScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'ChangeEmail'>;

interface ChangeEmailScreenProps {
  navigation: ChangeEmailScreenNavigationProp;
}

function ChangeEmailScreen({ navigation }: ChangeEmailScreenProps) {
  const accountService = new AccountService();
  const { staticData } = useLocalization();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email(staticData.auth.changeEmailScreen.emailError).required(staticData.auth.changeEmailScreen.requiredError),
  });

  return (
    <ScreenContainer>
      {loading && <Loader />}
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
                    setLoading(true);
                    accountService.authenticate(values.email.toLowerCase()).then(success => {
                      setLoading(false);
                      if (success) {
                        navigation.navigate("EmailConfirmation", { email: values.email.toLowerCase() })
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
                <TouchableOpacity onPress={() => { navigation.navigate("PrivacyPolicy") }}>
                  <DesignedText size="small" isUppercase={false} style={styles.underlined}>{staticData.auth.changeEmailScreen.bottomTextPrivacyPolicy}</DesignedText>
                </TouchableOpacity> 
                {" "}{staticData.auth.changeEmailScreen.bottomTextAnd}{" "} 
                <TouchableOpacity onPress={() => { navigation.navigate("TermsOfUse") }}>
                  <DesignedText size="small" isUppercase={false} style={styles.underlined}>{staticData.auth.changeEmailScreen.bottomTextUsageRules}</DesignedText>
                </TouchableOpacity>
                </DesignedText>
            </View>
        </View>
    </ScreenContainer>
  );
};

export default ChangeEmailScreen;
