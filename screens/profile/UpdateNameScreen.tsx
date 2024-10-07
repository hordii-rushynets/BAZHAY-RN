import React, { useState } from 'react';
import { View } from 'react-native';
import DesignedText from '../../components/ui/DesignedText';
import Title from '../../components/ui/Title';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextInputWithArrow from '../../components/ui/inputs/TextInputWithArrow';
import styles from '../auth/styles';
import profileStyles from './styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../../contexts/AuthContext';
import { useLocalization } from '../../contexts/LocalizationContext';
import Loader from '../../components/ui/Loader';
import { AccountService } from '../auth/services';
import { RootStackParamList } from '../../components/RootNavigator';
import ScreenContainer from '../../components/ui/ScreenContainer';
import BackButton from '../../components/ui/buttons/BackButton';

type UpdateNameScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UpdateName'>;

interface UpdateNameScreenProps {
  navigation: UpdateNameScreenNavigationProp;
}

function UpdateNameScreen({ navigation }: UpdateNameScreenProps) {
  const accountService = new AccountService();
  const authContext = useAuth();
  const [loading, setLoading] = useState(false);

  const { staticData } = useLocalization();

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(2, staticData.auth.accountFillNameScreen.minLengthError).max(20, staticData.auth.accountFillNameScreen.maxLengthError).required(staticData.auth.accountFillNameScreen.requiredError),
  });

  return (
    <ScreenContainer>
        <View style={profileStyles.profileUpdateTop}>
          <BackButton/>
        </View>
        {loading && <Loader />}
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
                    setLoading(true);
                    accountService.userUpdate({ first_name: values.name.toLowerCase() }, authContext).then(success => {
                      setLoading(false);
                      if (success) {
                        navigation.navigate("UpdateProfile")
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
    </ScreenContainer>
  );
};

export default UpdateNameScreen;
