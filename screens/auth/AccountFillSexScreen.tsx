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
import { AccountService } from './services';
import { useAuth } from '../../contexts/AuthContext';
import { useLocalization } from '../../contexts/LocalizationContext';
import Loader from '../../components/ui/Loader';

type AccountFillSexScreenNavigationProp = StackNavigationProp<AccountFillingStackParamList, 'AccountFillSex'>;

interface AccountFillSexScreenProps {
  navigation: AccountFillSexScreenNavigationProp;
}

function AccountFillSexScreen({ navigation }: AccountFillSexScreenProps) {
  const [ sex, setSex ] = useState("");
  const accountService = new AccountService();
  const authContext = useAuth(); 
  const { staticData } = useLocalization();
  const [loading, setLoading] = useState(false);

  return (
    <AccountFillLayout index={4}>
        {loading && <Loader />}
        <View style={styles.contentContainer}>
            <View>
                <View style={styles.titleContainer}>
                    <Title style={styles.title}>
                     {staticData.auth.accountFillSexScreen.titleFirstPart} <Title bold={true}>{staticData.auth.accountFillSexScreen.titleBoldPart}</Title>
                    </Title>
                </View>
            </View>
            <View style={styles.sexCheckBoxContainer}>
              <CheckBox checked={sex === "F"} onChange={() => { setSex("F"); }}>
                <DesignedText>{staticData.auth.accountFillSexScreen.female}</DesignedText>
              </CheckBox>
              <CheckBox checked={sex === "M"} onChange={() => { setSex("M"); }}>
                <DesignedText>{staticData.auth.accountFillSexScreen.male}</DesignedText>
              </CheckBox>
              <CheckBox checked={sex === "O"} onChange={() => { setSex("O"); }}>
                <DesignedText>{staticData.auth.accountFillSexScreen.omit}</DesignedText>
              </CheckBox>
            </View>
        </View>
        {sex !== "" && <SubmitButton onPress={() => {
          setLoading(true);
          accountService.userUpdate({sex: sex}, authContext).then(success => {
            setLoading(false);
            if (success) {
              navigation.navigate("AccountFillEnding")
            }
          })
          }} width={200} style={styles.gridButton}>{staticData.auth.accountFillSexScreen.button}</SubmitButton>}
    </AccountFillLayout>
  );
};

export default AccountFillSexScreen;
