import React, { useState } from 'react';
import ScreenContainer from '../../components/ui/ScreenContainer';
import { TextInput, TouchableOpacity, View } from 'react-native';
import DesignedText from '../../components/ui/DesignedText';
import Title from '../../components/ui/Title';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextInputWithArrow from '../../components/ui/inputs/TextInputWithArrow';
import styles from './styles'
import generalStyles from '../../components/ui/generalStyles'
import { StackNavigationProp } from '@react-navigation/stack';
import AccountFillLayout from '../../components/Auth/AccountFillLayout';
import { RootStackParamList } from '../../App';
import DateTimePicker from '@react-native-community/datetimepicker';
import ArrowRight from '../../components/ui/icons/ArrowRight';
import CheckBox from '../../components/ui/inputs/CheckBox';
import SubmitButton from '../../components/ui/buttons/SubmitButton';

type AccountFillSexScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AccountFillSex'>;

interface AccountFillSexScreenProps {
  navigation: AccountFillSexScreenNavigationProp;
}

function AccountFillSexScreen({ navigation }: AccountFillSexScreenProps) {
  const [ sex, setSex ] = useState("");

  return (
    <AccountFillLayout index={4}>
        <View style={styles.contentContainer}>
            <View>
                <View style={styles.titleContainer}>
                    <Title style={styles.title}>
                      Вкажи свою <Title bold={true}>стать</Title>
                    </Title>
                </View>
            </View>
            <View style={styles.sexCheckBoxContainer}>
              <CheckBox checked={sex === "F"} onChange={() => { setSex("F"); }}>
                <DesignedText>Жінка</DesignedText>
              </CheckBox>
              <CheckBox checked={sex === "M"} onChange={() => { setSex("M"); }}>
                <DesignedText>чоловік</DesignedText>
              </CheckBox>
              <CheckBox checked={sex === "O"} onChange={() => { setSex("O"); }}>
                <DesignedText>не зазначати</DesignedText>
              </CheckBox>
            </View>
        </View>
        {sex !== "" && <SubmitButton onPress={() => {navigation.navigate("AccountFillEnding")}} width={200} style={styles.gridButton}>Готово</SubmitButton>}
    </AccountFillLayout>
  );
};

export default AccountFillSexScreen;
