import React, { useState } from 'react';
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
import { PremiumBottomButtons } from '../../components/WishCreating/PremiumBottomButtons';
import { PremiumMonthButton } from '../../components/WishCreating/PremiumMonthButton';
import { PremiumTryButton } from '../../components/WishCreating/PremiumTryButton';
import { AccountService } from '../auth/services';
import { useAuth } from '../../contexts/AuthContext';
import Loader from '../../components/ui/Loader';
import { useLocalization } from '../../contexts/LocalizationContext';
import { RouteProp } from '@react-navigation/native';
import { usePremiumButtonsContext } from '../../contexts/PremiumButtonsContext';

type PremiumScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Premium'>;

interface PremiumScreenProps {
  navigation: PremiumScreenNavigationProp;
}

function PremiumScreen({ navigation }: PremiumScreenProps) {
  const { staticData } = useLocalization();
  const accountService = new AccountService();
  const authContext = useAuth();
  const [loading, setLoading] = useState(false);
  const { onCancel, onGetPremium } = usePremiumButtonsContext();

  return (
    <ScreenContainer>
        {loading && <Loader />}
        <TouchableOpacity onPress={ () => { 
            onCancel && onCancel();
            navigation.goBack() 
        } } style={[styles.crissCross]} // Add padding to increase touchable area
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <View style={{width: 100, height: 100, backgroundColor: "white", zIndex: 100}}>
                <CrissCross />
            </View>
        </TouchableOpacity>
        <View style={styles.premiumDesignStars}>
            <DesignStars width={84} height={93}/>
        </View>
        <View style={styles.premiumContentContainer}>
            <View style={styles.premiumTitleContainer}>
                <Title><Title bold={true}>{staticData.wishCreating.premiumScreen.titleFirst}</Title>{staticData.wishCreating.premiumScreen.titleSecond}</Title>
                <BigLogo width={169} height={41}/>
            </View>
            <View style={styles.premiumAdvantagesContainer}>
                {staticData.wishCreating.premiumScreen.premiumAdvantages.map((advantage: string, indx: number) => (
                    <View key={indx} style={styles.premiumAdvantage}>
                        <Checkmark />
                        <DesignedText size="small">{advantage}</DesignedText>
                    </View>
                ))}
            </View>
            <View style={styles.premiumButtonsContainer}>
                <PremiumTryButton onPress={() => {
                    setLoading(true);
                    accountService.tryPremium(authContext).then(success => {
                        if (success) {
                            onGetPremium && onGetPremium();
                            navigation.goBack();
                        }
                        setLoading(false);
                    })
                }}/>
                <PremiumMonthButton onPress={() => {
                    setLoading(true);
                    accountService.becomePremium(authContext).then(success => {
                        if (success) {
                            onGetPremium && onGetPremium();
                            navigation.goBack();
                        }
                        setLoading(false);
                    })
                }}/>
            </View>
        </View>
        <PremiumBottomButtons />
    </ScreenContainer>
  );
};

export default PremiumScreen;
