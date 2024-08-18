import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import DesignedText from '../../components/ui/DesignedText';
import Title from '../../components/ui/Title';
import styles from './styles'
import generalStyles from '../../components/ui/generalStyles'
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  AccountFillMessage: undefined;
  EmailConfirmation: undefined;
};

type AccountFillMessageScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AccountFillMessage'>;

interface AccountFillMessageScreenProps {
  navigation: AccountFillMessageScreenNavigationProp;
}

function AccountFillMessageScreen({ navigation }: AccountFillMessageScreenProps) {
  return (
    <TouchableOpacity onPress={() => {}} style={generalStyles.screenContainer}>
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
