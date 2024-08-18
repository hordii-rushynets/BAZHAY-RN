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

type AccountFillNickNameScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AccountFillNickName'>;

interface AccountFillNickNameScreenProps {
  navigation: AccountFillNickNameScreenNavigationProp;
}


const validationSchema = Yup.object().shape({
    nickname: Yup.string().min(2).max(20).required('Required'),
  });

function AccountFillNickNameScreen({ navigation }: AccountFillNickNameScreenProps) {
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
                  onSubmit={(values) => {
                    console.log(values);
                  }}
                >
                  {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.inputContainer}>
                        <TextInputWithArrow 
                          placeholder={"Напиши свій нікнейм"}
                          value={values.nickname}
                          onChange={handleChange('nickname')}
                          onSubmit={() => {
                            
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

export default AccountFillNickNameScreen;
