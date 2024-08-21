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

type AccountFillNameScreenNavigationProp = StackNavigationProp<AccountFillingStackParamList, 'AccountFillName'>;

interface AccountFillNameScreenProps {
  navigation: AccountFillNameScreenNavigationProp;
}


const validationSchema = Yup.object().shape({
    name: Yup.string().min(2, "Ім'я повинно містити не менше двох символів").max(20, "Ім'я повинно містити не більше двадцяти символів").required('Обов\'язково вкажіть ім\'я'),
  });

function AccountFillNameScreen({ navigation }: AccountFillNameScreenProps) {
  const accountService = new AccountService();
  const authContext = useAuth();

  return (
    <AccountFillLayout index={0}>
        <View style={styles.contentContainer}>
            <View>
                <View style={styles.titleContainer}>
                    <Title style={styles.title}>
                      Як тебе <Title bold={true}>звати</Title>?
                    </Title>
                    <DesignedText style={styles.titleSpan}>
                    Напиши своє ім’я - так друзі та близькі зможуть знайти тебе у Bazhay! 
                    </DesignedText>
                </View>
                <Formik
                  initialValues={{ name: '' }}
                  validationSchema={validationSchema}
                  onSubmit={(values, { setErrors }) => {
                    accountService.userUpdate({ first_name: values.name }, authContext).then(success => {
                      if (success) {
                        navigation.navigate("Greeting", { name: values.name })
                      }
                      else {
                        setErrors({name: "Упс, щось пішло не так"})
                      }
                    });
                  }}
                >
                  {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.inputContainer}>
                        <TextInputWithArrow 
                          placeholder={"Напиши своє ім’я"}
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
