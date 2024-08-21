import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import DesignedText from '../../components/ui/DesignedText';
import Title from '../../components/ui/Title';
import styles from './styles'
import generalStyles from '../../components/ui/generalStyles'
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../components/navigationStacks/AuthStackScreen';
import { RouteProp } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';

type AccountConnectedScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'AccountConnected'>;
type AccountConnectedScreenRouteProp = RouteProp<AuthStackParamList, 'AccountConnected'>;

interface AccountConnectedScreenProps {
  route: AccountConnectedScreenRouteProp;
  navigation: AccountConnectedScreenNavigationProp;
}

function AccountConnectedScreen({ route, navigation }: AccountConnectedScreenProps) {
  const { token } = route.params;
  const { login } = useAuth();

  return (
    <TouchableOpacity onPress={() => { login(token.access, token.refresh) }} style={generalStyles.screenContainer}>
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
