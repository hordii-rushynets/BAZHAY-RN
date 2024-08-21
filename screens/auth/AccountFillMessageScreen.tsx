import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import DesignedText from '../../components/ui/DesignedText';
import Title from '../../components/ui/Title';
import styles from './styles'
import generalStyles from '../../components/ui/generalStyles'
import { StackNavigationProp } from '@react-navigation/stack';
import { AccountFillingStackParamList } from '../../components/navigationStacks/AccountFillingStackScreen';

type AccountFillMessageScreenNavigationProp = StackNavigationProp<AccountFillingStackParamList, 'AccountFillMessage'>;

interface AccountFillMessageScreenProps {
  navigation: AccountFillMessageScreenNavigationProp;
}

function AccountFillMessageScreen({ navigation }: AccountFillMessageScreenProps) {
  return (
    <TouchableOpacity onPress={() => {navigation.navigate("AccountFillName")}} style={generalStyles.screenContainer}>
        <View style={generalStyles.centerContainer}>
            <Title style={styles.title}>
                Перш, ніж ми розпочнемо, давай 
                <Title bold={true}> налаштуймо</Title> Bazhay! 
                <Title italic={true}>  для тебе</Title>
            </Title>
        </View>
    </TouchableOpacity>
  );
};

export default AccountFillMessageScreen;
