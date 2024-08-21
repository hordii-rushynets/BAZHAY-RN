import React, { useState } from 'react';
import { View } from 'react-native';
import DesignedText from '../../components/ui/DesignedText';
import Title from '../../components/ui/Title';
import styles from './styles'
import { StackNavigationProp } from '@react-navigation/stack';
import AccountFillLayout from '../../components/Auth/AccountFillLayout';
import CheckBox from '../../components/ui/inputs/CheckBox';
import SubmitButton from '../../components/ui/buttons/SubmitButton';
import { AccountFillingStackParamList } from '../../components/navigationStacks/AccountFillingStackScreen';

type AccountFillSexScreenNavigationProp = StackNavigationProp<AccountFillingStackParamList, 'AccountFillSex'>;

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
