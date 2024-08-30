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
import { useLocalization } from '../../contexts/LocalizationContext';

type AccountFillNameScreenNavigationProp = StackNavigationProp<AccountFillingStackParamList, 'AccountFillName'>;

interface AccountFillNameScreenProps {
  navigation: AccountFillNameScreenNavigationProp;
}

function AccountFillNameScreen({ navigation }: AccountFillNameScreenProps) {
  const accountService = new AccountService();
  const authContext = useAuth();

  const { staticData } = useLocalization();

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(2, staticData.auth.accountFillNameScreen.minLengthError).max(20, staticData.auth.accountFillNameScreen.maxLengthError).required(staticData.auth.accountFillNameScreen.requiredError),
  });

  return (
    <AccountFillLayout index={0}>
        <View style={styles.contentContainer}>
            <View>
                <View style={styles.titleContainer}>
                    <Title style={styles.title}>
                      {staticData.auth.accountFillNameScreen.titleFirstPart} <Title bold={true}>{staticData.auth.accountFillNameScreen.titleBoldPart}</Title>?
                    </Title>
                    <DesignedText style={styles.titleSpan}>
                    {staticData.auth.accountFillNameScreen.titleSpan}
                    </DesignedText>
                </View>
                <Formik
                  initialValues={{ name: '' }}
                  validationSchema={validationSchema}
                  onSubmit={(values, { setErrors }) => {
                    accountService.userUpdate({ first_name: values.name.toLowerCase() }, authContext).then(success => {
                      if (success) {
                        navigation.navigate("Greeting", { name: values.name })
                      }
                      else {
                        setErrors({name: staticData.auth.accountFillNameScreen.unknownError})
                      }
                    });
                  }}
                >
                  {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.inputContainer}>
                        <TextInputWithArrow 
                          placeholder={staticData.auth.accountFillNameScreen.namePlaceholder}
                          value={values.name}
                          error={errors.name}
                          onChange={handleChange('name')}
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

export default AccountFillNameScreen;
