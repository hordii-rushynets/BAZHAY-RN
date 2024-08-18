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
import { RootStackParamList } from '../../App';

type AccountFillNameScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AccountFillName'>;

interface AccountFillNameScreenProps {
  navigation: AccountFillNameScreenNavigationProp;
}


const validationSchema = Yup.object().shape({
    name: Yup.string().min(2).max(20).required('Required'),
  });

function AccountFillNameScreen({ navigation }: AccountFillNameScreenProps) {
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
                  onSubmit={(values) => {
                    console.log(values);
                  }}
                >
                  {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.inputContainer}>
                        <TextInputWithArrow 
                          placeholder={"Напиши своє ім’я"}
                          value={values.name}
                          onChange={handleChange('name')}
                          onSubmit={() => {
                            navigation.navigate("Greeting", { name: values.name })
                          }}
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
