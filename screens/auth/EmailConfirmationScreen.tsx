import React from 'react';
import ScreenContainer from '../../components/ui/ScreenContainer';
import { TouchableOpacity, View } from 'react-native';
import DesignedText from '../../components/ui/DesignedText';
import Title from '../../components/ui/Title';
import styles from './styles'
import OtpInput from './OtpInput';
import SubmitButton from '../../components/ui/buttons/SubmitButton';

function EmailConfirmationScreen() {
  return (
    <ScreenContainer>
        <View style={styles.contentContainer}>
            <View>
                <View style={styles.titleContainer}>
                    <Title style={styles.title}>
                      Надіслали тобі на електронну пошту <Title italic={true}>код</Title> для входу
                    </Title>
                    <DesignedText style={styles.titleSpan} size="small">
                    Про всяк випадок перевір вхідні та спам
                    </DesignedText>
                </View>
                <View style={styles.otpInputContainer}>
                    <OtpInput onSubmit={() => {}}/>
                </View>
            </View>
            <View style={styles.otpScreenBottomContainer}>
                <DesignedText isUppercase={false} size={"small"} style={styles.bottomText}>
                    Не отримав код? {" "}
                    <DesignedText size="small" isUppercase={false} style={styles.underlined}>Надіслати знову</DesignedText>
                </DesignedText>
                <SubmitButton 
                    onPress={() => {}} 
                    width={280} 
                    height={32} 
                    style={styles.emailChangeButton}
                    textStyle={styles.emailChangeButtonText}
                >Змінити електронну пошту</SubmitButton>
            </View>
        </View>
    </ScreenContainer>
  );
};

export default EmailConfirmationScreen;
