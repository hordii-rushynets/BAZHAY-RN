import React, { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, View } from 'react-native';
import Title from '../../components/ui/Title';
import { Formik } from 'formik';
import * as Yup from 'yup';
import authStyles from '../auth/styles'
import styles from '../wishCreating/styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../../contexts/AuthContext';
import { useLocalization } from '../../contexts/LocalizationContext';
import { RootStackParamList } from '../../components/RootNavigator';
import TextFieldInput from '../../components/ui/inputs/TextFieldInput';
import Loader from '../../components/ui/Loader';
import ScreenContainer from '../../components/ui/ScreenContainer';
import { AccountService } from '../auth/services';
import BackButton from '../../components/ui/buttons/BackButton';
import profileStyles from './styles';

type UpdateAboutScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UpdateAbout'>;

interface UpdateAboutScreenProps {
  navigation: UpdateAboutScreenNavigationProp;
}

function UpdateAboutScreen({ navigation }: UpdateAboutScreenProps) {
  const authContext = useAuth();
  const accountService = new AccountService();
  const { staticData } = useLocalization();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    description: Yup.string().required(),
  });

  const [ keyboardVisible, setKeyboardVisible ] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <ScreenContainer>
      {loading && <Loader />}
        <View style={profileStyles.profileUpdateTop}>
          <BackButton/>
        </View>
        <View style={authStyles.contentContainer}>
              {Platform.OS === "ios" ? 
              <KeyboardAvoidingView
                style={[{ flex: 1 }]}
                behavior={'position'}
                keyboardVerticalOffset={130}
              >
                <View style={styles.linkTitleContainer}>
                    <Title style={authStyles.title}>
                   {staticData.profile.updateAboutScreen.titleFirst} <Title bold={true}>{staticData.profile.updateAboutScreen.titleSecond}</Title>
                    </Title>
                </View>
                <Formik
                  initialValues={{ description: '' }}
                  validationSchema={validationSchema}
                  onSubmit={(values, { setErrors }) => {
                    setLoading(true);
                    accountService.userUpdate({ about_user: values.description.toLowerCase() }, authContext).then(success => {
                      setLoading(false);
                      if (success) {
                        navigation.navigate("UpdateProfile");
                      }
                    })
                  }}
                >
                  {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={authStyles.inputContainer}>
                        <TextFieldInput
                          placeholder={staticData.profile.updateAboutScreen.placeholder}
                          value={values.description}
                          error={errors.description}
                          onChange={handleChange('description')}
                          onSubmit={handleSubmit}
                          />
                    </View>
                  )}
                </Formik>
            </KeyboardAvoidingView> 
            : 
            <View
                style={[{ flex: 1 }, keyboardVisible ? styles.titleAndInputContainerWithKeyboard : {}]}
              >
                <View style={styles.linkTitleContainer}>
                    <Title style={authStyles.title}>
                    {staticData.profile.updateAboutScreen.titleFirst} <Title bold={true}>{staticData.profile.updateAboutScreen.titleSecond}</Title>
                    </Title>
                </View>
                <Formik
                  initialValues={{ description: '' }}
                  validationSchema={validationSchema}
                  onSubmit={(values, { setErrors }) => {
                    setLoading(true);
                    accountService.userUpdate({ about_user: values.description.toLowerCase() }, authContext).then(success => {
                      setLoading(false);
                      if (success) {
                        navigation.navigate("UpdateProfile");
                      }
                    })
                  }}
                >
                  {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={authStyles.inputContainer}>
                        <TextFieldInput
                          placeholder={staticData.profile.updateAboutScreen.placeholder}
                          value={values.description}
                          error={errors.description}
                          onChange={handleChange('description')}
                          onSubmit={handleSubmit}
                          />
                    </View>
                  )}
                </Formik>
            </View> 
            }
        </View>
    </ScreenContainer>
  );
};

export default UpdateAboutScreen;
