import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Title from '../../components/ui/Title';
import styles from './styles'
import generalStyles from '../../components/ui/generalStyles'
import { StackNavigationProp } from '@react-navigation/stack';
import DesignedText from '../../components/ui/DesignedText';
import { AccountFillingStackParamList } from '../../components/navigationStacks/AccountFillingStackScreen';
import { useAuth } from '../../contexts/AuthContext';
import { AccountService } from './services';
import { useLocalization } from '../../contexts/LocalizationContext';
import { usePopUpMessageContext } from '../../contexts/PopUpMessageContext';

type AccountFillEndingScreenNavigationProp = StackNavigationProp<AccountFillingStackParamList, 'AccountFillEnding'>;

interface AccountFillEndingScreenProps {
  navigation: AccountFillEndingScreenNavigationProp;
}

function AccountFillEndingScreen({ navigation }: AccountFillEndingScreenProps) {
  const authContext = useAuth();
  const [name, setName] = useState("____");
  const accountService = new AccountService();

  useEffect(() => {
    accountService.getUser(authContext).then(userData => setName(userData?.first_name || "____"))
  })

  const { staticData } = useLocalization();
  const { setIsOpen, setText, setButtonText, setButtonAction, setShowExit } = usePopUpMessageContext();

  return (
    <TouchableOpacity onPress={() => {
        setText(staticData.auth.accountFillEndingScreen.startLearnMessage);
        setButtonText(staticData.auth.accountFillEndingScreen.startLearnButton);
        setShowExit(false);
        setButtonAction(() => () => {
          setText(staticData.auth.accountFillEndingScreen.endLearnMessage);
          setButtonText(staticData.auth.accountFillEndingScreen.endLearnButton);
          setButtonAction(() => () => { setShowExit(true); setIsOpen(false) });
        });
        setIsOpen(true);
        authContext.completeFillingAccount()
      }} style={generalStyles.screenContainer}>
        <View style={generalStyles.centerContainer}>
            <Title style={styles.title}>
                {staticData.auth.accountFillEndingScreen.title} {name}
            </Title>
            <DesignedText style={styles.accountConnectedText}>
            {staticData.auth.accountFillEndingScreen.spanFirst} {"\n"}
            {staticData.auth.accountFillEndingScreen.spanSecond}
            </DesignedText>
        </View>
    </TouchableOpacity>
  );
};

export default AccountFillEndingScreen;
