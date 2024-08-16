import React from 'react';
import ScreenContainer from '../../components/ui/ScreenContainer';
import { TouchableOpacity, View } from 'react-native';
import DesignedText from '../../components/ui/DesignedText';
import Title from '../../components/ui/Title';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextInputWithArrow from '../../components/ui/inputs/TextInputWithArrow';
import SocialLogin from '../../components/Auth/SocialLogin';
import styles from './styles'

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
  });

function AuthScreen() {
  return (
    <ScreenContainer>
        <View style={styles.contentContainer}>
            <View>
                <View style={styles.titleContainer}>
                    <Title style={styles.title}>
                      <Title italic={true}>Створи</Title>{'\n'} обліковий запис або <Title italic={true}>увійди</Title> до нього
                    </Title>
                    <DesignedText style={styles.titleSpan} size="small">
                    Зберігай свої дані в безпеці та використовуй на кількох пристроях
                    </DesignedText>
                </View>
                <Formik
                  initialValues={{ email: '' }}
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    console.log(values);
                  }}
                >
                  {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.inputContainer}>
                        <TextInputWithArrow 
                          placeholder={"Продовжити з електронною поштою"}
                          value={values.email}
                          onChange={handleChange('email')}
                          />
                    </View>
                  )}
                </Formik>
                <View style={styles.dividerContainer}>
                    <View style={styles.line}></View>
                    <DesignedText size="small" style={styles.dividerText}>або</DesignedText>
                    <View style={styles.line}></View>
                </View>
                <SocialLogin />
            </View>
            <View style={styles.bottomContainer}>
                <TouchableOpacity>
                    <DesignedText>
                        Продовжити як гість
                    </DesignedText>
                </TouchableOpacity>
                <DesignedText size="small">
                Натискаючи “Продовжити”, ти приймаєш Політику конфеденційності та Правила користування
                </DesignedText>
            </View>
        </View>
    </ScreenContainer>
  );
};

export default AuthScreen;
