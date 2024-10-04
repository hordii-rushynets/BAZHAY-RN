import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Title from '../../components/ui/Title';
import styles from './styles'
import generalStyles from '../../components/ui/generalStyles'
import { StackNavigationProp } from '@react-navigation/stack';
import { AccountFillingStackParamList } from '../../components/navigationStacks/AccountFillingStackScreen';
import { useLocalization } from '../../contexts/LocalizationContext';

type AccountFillMessageScreenNavigationProp = StackNavigationProp<AccountFillingStackParamList, 'AccountFillMessage'>;

interface AccountFillMessageScreenProps {
  navigation: AccountFillMessageScreenNavigationProp;
}

function AccountFillMessageScreen({ navigation }: AccountFillMessageScreenProps) {
  const { staticData } = useLocalization();

  return (
    <TouchableOpacity onPress={() => {navigation.navigate("AccountFillName")}} style={generalStyles.screenContainer}>
        <View style={generalStyles.centerContainer}>
            <Title style={styles.title}>
                {staticData.auth.accountFillMessageScreen.titleFirstPart}
                <Title bold={true}> {staticData.auth.accountFillMessageScreen.titleBoldPart}</Title> {staticData.auth.accountFillMessageScreen.titleCenterPart}
                <Title italic={true}>  {staticData.auth.accountFillMessageScreen.titleItalicPart}</Title>
            </Title>
        </View>
    </TouchableOpacity>
  );
};

export default AccountFillMessageScreen;
