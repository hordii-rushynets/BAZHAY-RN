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
import DesignStars from '../../components/ui/DesignStars';
import BigLogo from '../../components/ui/BigLogo';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Authentication: undefined;
  EmailConfirmation: undefined;
};

type AuthScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Authentication'>;

interface AuthScreenProps {
  navigation: AuthScreenNavigationProp;
}


const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
  });

function AuthScreen({ navigation }: AuthScreenProps) {
  return (
    <ScreenContainer>
        <View style={styles.logoContainer}>
          <BigLogo width={110} height={30}/>
        </View>
        <View style={styles.starsContainer}>
          <DesignStars />
        </View>
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
                          onSubmit={() => {
                            navigation.navigate("EmailConfirmation")
                          }}
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
                    <DesignedText style={styles.guestButton}>
                        Продовжити як <DesignedText italic={true}>гість</DesignedText>
                    </DesignedText>
                </TouchableOpacity>
                <DesignedText size="small" isUppercase={false} style={styles.bottomText}>
                Натискаючи “Продовжити”, ти приймаєш {'\n'} 
                <DesignedText size="small" isUppercase={false} style={styles.underlined}>Політику конфеденційності</DesignedText> 
                {" та "} 
                <DesignedText size="small" isUppercase={false} style={styles.underlined}>Правила користування</DesignedText>
                </DesignedText>
            </View>
        </View>
    </ScreenContainer>
  );
};

export default AuthScreen;
