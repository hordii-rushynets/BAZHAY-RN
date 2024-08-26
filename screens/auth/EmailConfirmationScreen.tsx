import React from 'react';
import ScreenContainer from '../../components/ui/ScreenContainer';
import { TouchableOpacity, View } from 'react-native';
import DesignedText from '../../components/ui/DesignedText';
import Title from '../../components/ui/Title';
import styles from './styles'
import OtpInput from '../../components/Auth/OtpInput';
import SubmitButton from '../../components/ui/buttons/SubmitButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../components/navigationStacks/AuthStackScreen';
import { RouteProp } from '@react-navigation/native';
import { AccountService } from './services';
import { useLocalization } from '../../contexts/LocalizationContext';

  type EmailConfirmationScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'EmailConfirmation'>;
  type EmailConfirmationScreenRouteProp = RouteProp<AuthStackParamList, 'EmailConfirmation'>;
  
  interface EmailConfirmationScreenProps {
    route: EmailConfirmationScreenRouteProp;
    navigation: EmailConfirmationScreenNavigationProp;
  }

function EmailConfirmationScreen({ navigation, route }: EmailConfirmationScreenProps) {
  const { email } = route.params;
  const accountService = new AccountService();
  const { staticData } = useLocalization();

  return (
    <ScreenContainer>
        <View style={styles.contentContainer}>
            <View>
                <View style={styles.titleContainer}>
                    <Title style={styles.title}>
                      {staticData.auth.emailConfirmationScreen.titleFirstPart} <Title italic={true}>{staticData.auth.emailConfirmationScreen.titleItalicPart}</Title> {staticData.auth.emailConfirmationScreen.titleEndingPart}
                    </Title>
                    <DesignedText style={styles.titleSpan} size="small">
                    {staticData.auth.emailConfirmationScreen.titleSpan}
                    </DesignedText>
                </View>
                <View style={styles.otpInputContainer}>
                    <OtpInput email={email} onConfirm={(token) => {navigation.navigate("AccountConnected", { token: token })}}/>
                </View>
            </View>
            <View style={styles.otpScreenBottomContainer}>
                <DesignedText isUppercase={false} size={"small"} style={styles.bottomText}>
                {staticData.auth.emailConfirmationScreen.bottomText} {" "}
                    <TouchableOpacity onPress={() => {
                      accountService.authenticate(email)
                    }}>
                      <DesignedText size="small" isUppercase={false} style={styles.underlined}>{staticData.auth.emailConfirmationScreen.sendAgainButton}</DesignedText>
                    </TouchableOpacity>
                </DesignedText>
                <SubmitButton 
                    onPress={() => {
                        navigation.navigate("ChangeEmail")
                    }} 
                    width={280} 
                    height={32} 
                    style={styles.emailChangeButton}
                    textStyle={styles.emailChangeButtonText}
                >{staticData.auth.emailConfirmationScreen.changeEmailButton}</SubmitButton>
            </View>
        </View>
    </ScreenContainer>
  );
};

export default EmailConfirmationScreen;
