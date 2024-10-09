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
import { useLocalization } from '../../contexts/LocalizationContext';
type DeleteAccountScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DeleteAccount'>;

interface DeleteAccountScreenProps {
  navigation: DeleteAccountScreenNavigationProp;
}

function DeleteAccountScreen({ navigation }: DeleteAccountScreenProps) {
  const authContext = useAuth();
  const accountService = new AccountService();
  const [loading, setLoading] = useState(false);
  const { staticData } = useLocalization();

  return (
    <ScreenContainer>
      {loading && <Loader />}
      <View style={styles.deleteAccountContentContainer}>
        <View style={styles.deleteAccountTextContainer}>
            <Title style={styles.deleteAccountText}>{staticData.profile.deleteAccountScreen.title}</Title>
            <DesignedText size="small" style={styles.deleteAccountText}>{staticData.profile.deleteAccountScreen.span}</DesignedText>
        </View>
        <View style={styles.deleteAccountButtons}>
            <SubmitButton onPress={() => {navigation.goBack()}} width={"auto"} textStyle={{ fontSize: 12 }}>{staticData.profile.deleteAccountScreen.continueButton}</SubmitButton>
            <SubmitButton onPress={() => {}} width={"auto"} textStyle={{ fontSize: 12 }}>{staticData.profile.deleteAccountScreen.reviewButton}</SubmitButton>
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
        <DesignedText isUppercase={false} style={styles.deleteButton}>{staticData.profile.deleteAccountScreen.deleteButton}</DesignedText>
      </TouchableOpacity>
    </ScreenContainer>
  );
};

export default DeleteAccountScreen;
