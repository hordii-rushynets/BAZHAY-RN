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
import { RootStackParamList } from '../../App';

type ChangeEmailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ChangeEmail'>;

interface ChangeEmailScreenProps {
  navigation: ChangeEmailScreenNavigationProp;
}


const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
  });

function ChangeEmailScreen({ navigation }: ChangeEmailScreenProps) {
  return (
    <ScreenContainer>
        <View style={styles.contentContainer}>
            <View>
                <View style={styles.titleContainer}>
                    <Title style={styles.title}>
                    <Title italic={true}>Зміни</Title>{"\n"} електронну адресу
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
                          placeholder={"Ввести електронну пошту"}
                          value={values.email}
                          onChange={handleChange('email')}
                          onSubmit={() => {
                            navigation.navigate("EmailConfirmation")
                          }}
                          />
                    </View>
                  )}
                </Formik>
            </View>
            <View style={styles.changeEmailScreenBottomContainer}>
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

export default ChangeEmailScreen;
