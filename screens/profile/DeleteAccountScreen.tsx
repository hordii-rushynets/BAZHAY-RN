import React, { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenContainer from '../../components/ui/ScreenContainer';
import { RootStackParamList } from '../../components/RootNavigator';
import { View } from 'react-native';
import Title from '../../components/ui/Title';
import DesignedText from '../../components/ui/DesignedText';
import SubmitButton from '../../components/ui/buttons/SubmitButton';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAuth } from '../../contexts/AuthContext';
import { AccountService } from '../auth/services';
import Loader from '../../components/ui/Loader';
type DeleteAccountScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DeleteAccount'>;

interface DeleteAccountScreenProps {
  navigation: DeleteAccountScreenNavigationProp;
}

function DeleteAccountScreen({ navigation }: DeleteAccountScreenProps) {
  const authContext = useAuth();
  const accountService = new AccountService();
  const [loading, setLoading] = useState(false);

  return (
    <ScreenContainer>
      {loading && <Loader />}
      <View style={styles.deleteAccountContentContainer}>
        <View style={styles.deleteAccountTextContainer}>
            <Title style={styles.deleteAccountText}>Упевнений/а, що хочеш видалити акаунт?</Title>
            <DesignedText size="small" style={styles.deleteAccountText}>{"Нам тебе не вистачатиме! Будь ласка,\n розкажи нам, що ми можемо зробити, \nщоб покращити твій досвід\nкористування додатком."}</DesignedText>
        </View>
        <View style={styles.deleteAccountButtons}>
            <SubmitButton onPress={() => {navigation.goBack()}} width={"auto"} textStyle={{ fontSize: 12 }}>Продовжити використання Bazhay!</SubmitButton>
            <SubmitButton onPress={() => {}} width={"auto"} textStyle={{ fontSize: 12 }}>Напиши, що тобі не подобається</SubmitButton>
        </View>
      </View>
      <TouchableOpacity onPress={() => {
        setLoading(true);
        accountService.deleteUser(authContext).then(success => {
          setLoading(false);
            if (success) {
                authContext.logout();
            }
        }) 
      }}>
        <DesignedText isUppercase={false} style={styles.deleteButton}>Видалити мій акаунт</DesignedText>
      </TouchableOpacity>
    </ScreenContainer>
  );
};

export default DeleteAccountScreen;
