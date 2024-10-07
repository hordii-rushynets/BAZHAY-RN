import React, { useState } from 'react';
import { View } from 'react-native';
import Title from '../../components/ui/Title';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextInputWithArrow from '../../components/ui/inputs/TextInputWithArrow';
import styles from '../auth/styles'
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../../contexts/AuthContext';
import { useLocalization } from '../../contexts/LocalizationContext';
import Loader from '../../components/ui/Loader';
import { AccountService } from '../auth/services';
import { RootStackParamList } from '../../components/RootNavigator';
import ScreenContainer from '../../components/ui/ScreenContainer';
import BackButton from '../../components/ui/buttons/BackButton';
import profileStyles from './styles';

type UpdateNicknameScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UpdateNickname'>;

interface UpdateNicknameScreenProps {
  navigation: UpdateNicknameScreenNavigationProp;
}

function UpdateNicknameScreen({ navigation }: UpdateNicknameScreenProps) {
  const accountService = new AccountService();
  const authContext = useAuth();
  const [loading, setLoading] = useState(false);

  const { staticData } = useLocalization();

  const validationSchema = Yup.object().shape({
    nickname: Yup.string().min(2, staticData.auth.accountFillNickNameScreen.minLengthError).max(30, staticData.auth.accountFillNickNameScreen.maxLengthError).required(staticData.auth.accountFillNickNameScreen.requiredError),
  });

  return (
    <ScreenContainer>
        {loading && <Loader />}
        <View style={profileStyles.profileUpdateTop}>
          <BackButton />
        </View>
        <View style={styles.contentNickNameContainer}>
            <View>
                <View style={styles.titleNickNameContainer}>
                    <Title style={styles.title}>
                    {staticData.auth.accountFillNickNameScreen.titleFirstPart} <Title bold={true}>{staticData.auth.accountFillNickNameScreen.titleBoldPart}</Title>
                    </Title>
                </View>
                <Formik
                  initialValues={{ nickname: '' }}
                  validationSchema={validationSchema}
                  onSubmit={(values, { setErrors }) => {
                    setLoading(true);
                    accountService.userUpdate({ username: values.nickname.toLowerCase() }, authContext).then(success => {
                      setLoading(false);
                      if (success) {
                        navigation.navigate("UpdateProfile");
                      }
                      else {
                        setErrors({nickname: staticData.auth.accountFillNickNameScreen.unknownError})
                      }
                    });
                  }}
                >
                  {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.inputContainer}>
                        <TextInputWithArrow 
                          placeholder={staticData.auth.accountFillNickNameScreen.nickNamePlaceholder}
                          value={values.nickname}
                          error={errors.nickname}
                          onChange={handleChange('nickname')}
                          onSubmit={handleSubmit}
                          />
                    </View>
                  )}
                </Formik>
            </View>
        </View>
    </ScreenContainer>
  );
};

export default UpdateNicknameScreen;
