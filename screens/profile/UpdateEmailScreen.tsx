import React, { useState } from 'react';
import ScreenContainer from '../../components/ui/ScreenContainer';
import { View } from 'react-native';
import DesignedText from '../../components/ui/DesignedText';
import Title from '../../components/ui/Title';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextInputWithArrow from '../../components/ui/inputs/TextInputWithArrow';
import styles from '../auth/styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { useLocalization } from '../../contexts/LocalizationContext';
import Loader from '../../components/ui/Loader';
import { AccountService } from '../auth/services';
import { RootStackParamList } from '../../components/RootNavigator';
import { useAuth } from '../../contexts/AuthContext';
import BackButton from '../../components/ui/buttons/BackButton';
import profileStyles from './styles';

type UpdateEmailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UpdateEmail'>;

interface UpdateEmailScreenProps {
  navigation: UpdateEmailScreenNavigationProp;
}

function UpdateEmailScreen({ navigation }: UpdateEmailScreenProps) {
  const accountService = new AccountService();
  const { staticData } = useLocalization();
  const [loading, setLoading] = useState(false);
  const authContext = useAuth();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email(staticData.auth.changeEmailScreen.emailError).required(staticData.auth.changeEmailScreen.requiredError),
  });

  return (
    <ScreenContainer>
      {loading && <Loader />}
        <View style={profileStyles.profileUpdateTop}>
          <BackButton />
        </View>
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
                    accountService.updateEmail(values.email.toLowerCase(), authContext).then(success => {
                      setLoading(false);
                      if (success) {
                        navigation.navigate("ProfileEmailConfirmation", { email: values.email.toLowerCase() })
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
            <View style={{ position: "absolute", bottom: 20, alignSelf: "center" }}>
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

export default UpdateEmailScreen;
