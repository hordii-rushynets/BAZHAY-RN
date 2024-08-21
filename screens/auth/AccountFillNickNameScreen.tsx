import React from 'react';
import ScreenContainer from '../../components/ui/ScreenContainer';
import { TouchableOpacity, View } from 'react-native';
import DesignedText from '../../components/ui/DesignedText';
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

type AccountFillNickNameScreenNavigationProp = StackNavigationProp<AccountFillingStackParamList, 'AccountFillNickName'>;

interface AccountFillNickNameScreenProps {
  navigation: AccountFillNickNameScreenNavigationProp;
}


const validationSchema = Yup.object().shape({
    nickname: Yup.string().min(2, "Нік повинен містити не менше двох символів").max(30, "Нік повинен містити не більше тридцяти символів").required('Обов\'язково вкажіть нік'),
  });

function AccountFillNickNameScreen({ navigation }: AccountFillNickNameScreenProps) {
  const accountService = new AccountService();
  const authContext = useAuth();

  return (
    <AccountFillLayout index={1}>
        <View style={styles.contentNickNameContainer}>
            <View>
                <View style={styles.titleNickNameContainer}>
                    <Title style={styles.title}>
                    Придумай собі <Title bold={true}>нікнейм</Title>
                    </Title>
                </View>
                <Formik
                  initialValues={{ nickname: '' }}
                  validationSchema={validationSchema}
                  onSubmit={(values, { setErrors }) => {
                    accountService.userUpdate({ username: values.nickname }, authContext).then(success => {
                      if (success) {
                        navigation.navigate("AccountFillAvatar");
                      }
                      else {
                        setErrors({nickname: "Упс, щось пішло не так"})
                      }
                    });
                  }}
                >
                  {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.inputContainer}>
                        <TextInputWithArrow 
                          placeholder={"Напиши свій нікнейм"}
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
