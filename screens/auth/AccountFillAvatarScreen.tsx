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
import { useLocalization } from '../../contexts/LocalizationContext';

type AccountFillAvatarScreenNavigationProp = StackNavigationProp<AccountFillingStackParamList, 'AccountFillAvatar'>;

interface AccountFillAvatarScreenProps {
  navigation: AccountFillAvatarScreenNavigationProp;
}

function AccountFillAvatarScreen({ navigation }: AccountFillAvatarScreenProps) {
  const { staticData } = useLocalization();

  return (
    <AccountFillLayout index={2}>
        <View style={styles.contentNickNameContainer}>
            <View>
                <View style={styles.titleAvatarContainer}>
                    <Title style={styles.title}>
                    {staticData.auth.accountFillAvatarScreen.titleFirstPart} <Title bold={true}>{staticData.auth.accountFillAvatarScreen.titleSecondPart}</Title>
                    </Title>
                </View>
                <SubmitButton onPress={() => { navigation.navigate("ImageFromGallery") }} width={250} style={styles.galleryButton}>{staticData.auth.accountFillAvatarScreen.galleryButton}</SubmitButton>
                <SubmitButton onPress={() => { navigation.navigate("ImageFromCamera") }} width={250} style={styles.galleryButton}>{staticData.auth.accountFillAvatarScreen.cameraButton}</SubmitButton>
            </View>
            <TouchableOpacity onPress={() => { navigation.navigate("AccountFillBirth") }} style={styles.addLaterButton}>
              <DesignedText isUppercase={false}>
                  {staticData.auth.accountFillAvatarScreen.skipButton}
              </DesignedText>
            </TouchableOpacity>
        </View>
    </AccountFillLayout>
  );
};

export default AccountFillAvatarScreen;
