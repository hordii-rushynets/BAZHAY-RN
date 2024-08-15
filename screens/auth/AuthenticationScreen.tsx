import React from 'react';
import ScreenContainer from '../../components/ui/ScreenContainer';
import { TouchableOpacity, View } from 'react-native';
import DesignedText from '../../components/ui/DesignedText';
import Title from '../../components/ui/Title';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextInputWithArrow from '../../components/ui/inputs/TextInputWithArrow';
import SocialLogin from '../../components/Auth/SocialLogin';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
  });

function AuthScreen() {
  return (
    <ScreenContainer>
        <View>
            <View>
                <View>
                    <Title>
                    Створи обліковий запис або увійди до нього
                    </Title>
                    <DesignedText>
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
                    <View>
                        <TextInputWithArrow 
                          placeholder={"Продовжити з електронною поштою"}
                          value={values.email}
                          onChange={handleChange('email')}
                          />
                    </View>
                  )}
                </Formik>
                <View>
                    <View></View>
                    <DesignedText size="small">або</DesignedText>
                    <View></View>
                </View>
                <SocialLogin />
            </View>
            <View>
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
