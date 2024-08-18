import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import DesignedText from '../../components/ui/DesignedText';
import Title from '../../components/ui/Title';
import styles from './styles'
import generalStyles from '../../components/ui/generalStyles'
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  AccountConnected: undefined;
  AccountFillMessage: undefined;
};

type AccountConnectedScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AccountConnected'>;

interface AccountConnectedScreenProps {
  navigation: AccountConnectedScreenNavigationProp;
}

function AccountConnectedScreen({ navigation }: AccountConnectedScreenProps) {
  return (
    <TouchableOpacity onPress={() => {navigation.navigate("AccountFillMessage")}} style={generalStyles.screenContainer}>
        <View style={generalStyles.centerContainer}>
            <Title style={styles.title}>Обліковий запис пов’язано!</Title>
            <DesignedText style={styles.accountConnectedText}>
                Тепер ти можеш запрошувати 
                <DesignedText bold={true}> друзів</DesignedText>, заходити з 
                <DesignedText italic={true}> різних {"\n"} пристроїв</DesignedText> у свій обліковий запис
            </DesignedText>
        </View>
    </TouchableOpacity>
  );
};

export default AccountConnectedScreen;
