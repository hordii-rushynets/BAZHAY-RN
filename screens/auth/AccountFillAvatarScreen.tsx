import React, { useEffect, useState } from 'react';
import ScreenContainer from '../../components/ui/ScreenContainer';
import { TouchableHighlight, TouchableOpacity, View } from 'react-native';
import DesignedText from '../../components/ui/DesignedText';
import Title from '../../components/ui/Title';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextInputWithArrow from '../../components/ui/inputs/TextInputWithArrow';
import styles from './styles'
import { StackNavigationProp } from '@react-navigation/stack';
import AccountFillLayout from '../../components/Auth/AccountFillLayout';
import SubmitButton from '../../components/ui/buttons/SubmitButton';
import { AccountFillingStackParamList } from '../../components/navigationStacks/AccountFillingStackScreen';

type AccountFillAvatarScreenNavigationProp = StackNavigationProp<AccountFillingStackParamList, 'AccountFillAvatar'>;

interface AccountFillAvatarScreenProps {
  navigation: AccountFillAvatarScreenNavigationProp;
}


const validationSchema = Yup.object().shape({
    nickname: Yup.string().min(2).max(20).required('Required'),
  });

function AccountFillAvatarScreen({ navigation }: AccountFillAvatarScreenProps) {
  const [ isViewed, setIsViewed ] = useState(false);

  useEffect(() => {
    setIsViewed(true);
  }, [])

  return (
    <AccountFillLayout index={2}>
        <View style={styles.contentNickNameContainer}>
            <View>
                <View style={styles.titleAvatarContainer}>
                    <Title style={styles.title}>
                    Додай своє <Title bold={true}>фото</Title>
                    </Title>
                </View>
                <SubmitButton onPress={() => { navigation.navigate("ImageFromGallery") }} width={250} style={styles.galleryButton}>Вибрати в галереї</SubmitButton>
                <SubmitButton onPress={() => { navigation.navigate("ImageFromCamera") }} width={250} style={styles.galleryButton}>Зробити фото</SubmitButton>
            </View>
            <TouchableOpacity onPress={() => { navigation.navigate("AccountFillBirth") }} style={styles.addLaterButton}>
              <DesignedText isUppercase={false}>
                  Додати пізніше
              </DesignedText>
            </TouchableOpacity>
        </View>
    </AccountFillLayout>
  );
};

export default AccountFillAvatarScreen;
