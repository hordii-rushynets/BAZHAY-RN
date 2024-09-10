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
import { useLocalization } from '../../contexts/LocalizationContext';

type AccountConnectedScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'AccountConnected'>;
type AccountConnectedScreenRouteProp = RouteProp<AuthStackParamList, 'AccountConnected'>;

interface AccountConnectedScreenProps {
  route: AccountConnectedScreenRouteProp;
  navigation: AccountConnectedScreenNavigationProp;
}

function AccountConnectedScreen({ route, navigation }: AccountConnectedScreenProps) {
  const { token } = route.params;
  const { login, setIsAccountFilled } = useAuth();
  const { staticData } = useLocalization();

  return (
    <TouchableOpacity onPress={() => { setIsAccountFilled(token.is_already_registered); login(token.access, token.refresh) }} style={generalStyles.screenContainer}>
        <View style={generalStyles.centerContainer}>
            <Title style={styles.title}>{staticData.auth.accountConnectedScreen.title}</Title>
            <DesignedText style={styles.accountConnectedText}>
            {staticData.auth.accountConnectedScreen.textFirstPart}
                <DesignedText bold={true}> {staticData.auth.accountConnectedScreen.textBoldPart}</DesignedText>{staticData.auth.accountConnectedScreen.textCenterPart}
                <DesignedText italic={true}> {staticData.auth.accountConnectedScreen.textFirstItalicPart} {"\n"} {staticData.auth.accountConnectedScreen.textSecondItalicPart}</DesignedText> {staticData.auth.accountConnectedScreen.textEndPart}
            </DesignedText>
        </View>
    </TouchableOpacity>
  );
};

export default AccountConnectedScreen;
