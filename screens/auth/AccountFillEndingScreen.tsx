import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Title from '../../components/ui/Title';
import styles from './styles'
import generalStyles from '../../components/ui/generalStyles'
import { StackNavigationProp } from '@react-navigation/stack';
import DesignedText from '../../components/ui/DesignedText';
import { AccountFillingStackParamList } from '../../components/navigationStacks/AccountFillingStackScreen';
import { useAuth } from '../../contexts/AuthContext';

type AccountFillEndingScreenNavigationProp = StackNavigationProp<AccountFillingStackParamList, 'AccountFillEnding'>;

interface AccountFillEndingScreenProps {
  navigation: AccountFillEndingScreenNavigationProp;
}

function AccountFillEndingScreen({ navigation }: AccountFillEndingScreenProps) {
  const { completeFillingAccount } = useAuth();

  return (
    <TouchableOpacity onPress={() => {completeFillingAccount()}} style={generalStyles.screenContainer}>
        <View style={generalStyles.centerContainer}>
            <Title style={styles.title}>
                Виглядає класно, ____
            </Title>
            <DesignedText style={styles.accountConnectedText}>
            Більше налаштувань {"\n"}
            ти можеш додати у власному профілі
            </DesignedText>
        </View>
    </TouchableOpacity>
  );
};

export default AccountFillEndingScreen;
