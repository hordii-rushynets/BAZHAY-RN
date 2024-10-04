import React, { useState } from 'react';
import { View } from 'react-native';
import Title from '../../components/ui/Title';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextInputWithArrow from '../../components/ui/inputs/TextInputWithArrow';
import styles from './styles'
import { StackNavigationProp } from '@react-navigation/stack';
import AccountFillLayout from '../../components/Auth/AccountFillLayout';
import { AccountFillingStackParamList } from '../../components/navigationStacks/AccountFillingStackScreen';
import { AccountService } from './services';
import { useAuth } from '../../contexts/AuthContext';
import { useLocalization } from '../../contexts/LocalizationContext';
import Loader from '../../components/ui/Loader';

type AccountFillNickNameScreenNavigationProp = StackNavigationProp<AccountFillingStackParamList, 'AccountFillNickName'>;

interface AccountFillNickNameScreenProps {
  navigation: AccountFillNickNameScreenNavigationProp;
}

function AccountFillNickNameScreen({ navigation }: AccountFillNickNameScreenProps) {
  const accountService = new AccountService();
  const authContext = useAuth();
  const [loading, setLoading] = useState(false);

  const { staticData } = useLocalization();

  const validationSchema = Yup.object().shape({
    nickname: Yup.string().min(2, staticData.auth.accountFillNickNameScreen.minLengthError).max(30, staticData.auth.accountFillNickNameScreen.maxLengthError).required(staticData.auth.accountFillNickNameScreen.requiredError),
  });

  return (
    <AccountFillLayout index={1}>
        {loading && <Loader />}
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
                        navigation.navigate("AccountFillAvatar");
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
    </AccountFillLayout>
  );
};

export default AccountFillNickNameScreen;
