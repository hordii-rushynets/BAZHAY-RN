import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../components/RootNavigator';
import ScreenContainer from '../../components/ui/ScreenContainer';
import CrissCross from '../../components/ui/icons/CrissCross';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Title from '../../components/ui/Title';
import DesignStars from '../../components/ui/icons/DesignStars';
import BigLogo from '../../components/ui/icons/BigLogo';
import { View } from 'react-native';
import Checkmark from '../../components/ui/icons/Checkmark';
import DesignedText from '../../components/ui/DesignedText';
import styles from './styles';

type PremiumScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Premium'>;

interface PremiumScreenProps {
  navigation: PremiumScreenNavigationProp;
}

function PremiumScreen({ navigation }: PremiumScreenProps) {

  const premiumAdvantages = [
    "Створюй необмежену кількість бажань",
    "налаштовуй видимість бажань",
    "дивись, хто хоче виповнити твої бажання",
    "користуйся додатком без обмежень",
    "першим отримуй нові преміум-функції"
  ];

  return (
    <ScreenContainer>
        <TouchableOpacity onPress={ () => { navigation.goBack() } } style={styles.crissCross}>
            <View style={{width: 24, height: 24}}>
                <CrissCross />
            </View>
        </TouchableOpacity>
        <View style={styles.premiumDesignStars}>
            <DesignStars width={84} height={93}/>
        </View>
        <View style={styles.premiumContentContainer}>
            <View style={styles.premiumTitleContainer}>
                <Title><Title bold={true}>Преміум-</Title>підписка</Title>
                <BigLogo width={169} height={41}/>
            </View>
            <View style={styles.premiumAdvantagesContainer}>
                {premiumAdvantages.map((advantage, indx) => (
                    <View key={indx} style={styles.premiumAdvantage}>
                        <Checkmark />
                        <DesignedText size="small">{advantage}</DesignedText>
                    </View>
                ))}
            </View>
            <View style={styles.premiumButtonsContainer}>
                <View style={styles.premiumTryButtonContainer}>
                    <DesignedText style={styles.premiumTryButtonTitle}>Спробувати безкоштовно </DesignedText>
                    <DesignedText size="small" isUppercase={false} style={styles.premiumTryButtonSpan}>7-ми денний пробний період, потім 9,99 USD на рік (0,83 USD в місяць)</DesignedText>
                </View>
                <View style={styles.premiumMonthButtonContainer}>
                    <DesignedText>місяць</DesignedText>
                    <DesignedText size="small">2,99 USD</DesignedText>
                </View>
            </View>
        </View>
        <View style={styles.premiumBottomButtonsContainer}>
            <TouchableOpacity>
                <DesignedText size="small" isUppercase={false} style={styles.premiumBottonButton}>Відновити покупки</DesignedText>
            </TouchableOpacity>
            <TouchableOpacity>
                <DesignedText size="small" isUppercase={false} style={styles.premiumBottonButton}>Правила та умови</DesignedText>
            </TouchableOpacity>
        </View>
    </ScreenContainer>
  );
};

export default PremiumScreen;
