import React from 'react';
import ScreenContainer from '../../components/ui/ScreenContainer';
import { TouchableOpacity, View } from 'react-native';
import DesignedText from '../../components/ui/DesignedText';
import Title from '../../components/ui/Title';
import styles from '../auth/styles';
import OtpInput from '../../components/Auth/OtpInput';
import SubmitButton from '../../components/ui/buttons/SubmitButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useLocalization } from '../../contexts/LocalizationContext';
import { AccountService } from '../auth/services';
import { RootStackParamList } from '../../components/RootNavigator';
import { useAuth } from '../../contexts/AuthContext';

  type ProfileEmailConfirmationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProfileEmailConfirmation'>;
  type ProfileEmailConfirmationScreenRouteProp = RouteProp<RootStackParamList, 'ProfileEmailConfirmation'>;
  
  interface ProfileEmailConfirmationScreenProps {
    route: ProfileEmailConfirmationScreenRouteProp;
    navigation: ProfileEmailConfirmationScreenNavigationProp;
  }

function ProfileEmailConfirmationScreen({ navigation, route }: ProfileEmailConfirmationScreenProps) {
  const { email } = route.params;
  const accountService = new AccountService();
  const { staticData } = useLocalization();
  const { login } = useAuth();
  const authContext = useAuth();

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
                    <OtpInput email={email} isUpdating={true} onConfirm={(token) => { 
                        navigation.navigate("UpdateProfile") 
                    }}/>
                </View>
            </View>
            <View style={styles.otpScreenBottomContainer}>
                <DesignedText isUppercase={false} size={"small"} style={styles.bottomText}>
                {staticData.auth.emailConfirmationScreen.bottomText} {" "}
                    <TouchableOpacity onPress={() => {
                      accountService.updateEmail(email, authContext)
                    }}>
                      <DesignedText size="small" isUppercase={false} style={styles.underlined}>{staticData.auth.emailConfirmationScreen.sendAgainButton}</DesignedText>
                    </TouchableOpacity>
                </DesignedText>
                <SubmitButton 
                    onPress={() => {
                        navigation.navigate("UpdateEmail")
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

export default ProfileEmailConfirmationScreen;
