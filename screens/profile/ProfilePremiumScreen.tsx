import React, { useCallback, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenContainer from '../../components/ui/ScreenContainer';
import { View } from 'react-native';
import DesignedText from '../../components/ui/DesignedText';
import wishStyles from "../wishCreating/styles"
import BackButton from '../../components/ui/buttons/BackButton';
import { RootStackParamList } from '../../components/RootNavigator';
import { useLocalization } from '../../contexts/LocalizationContext';
import { AccountService } from '../auth/services';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import Loader from '../../components/ui/Loader';
import { PremiumMonthButton } from '../../components/WishCreating/PremiumMonthButton';
import { PremiumBottomButtons } from '../../components/WishCreating/PremiumBottomButtons';
import styles from './styles';
import { PremiumYearButton } from '../../components/Profile/PremiumYearButton';

type ProfilePremiumScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProfilePremium'>;

interface ProfilePremiumScreenProps {
  navigation: ProfilePremiumScreenNavigationProp;
}

function ProfilePremiumScreen({ navigation }: ProfilePremiumScreenProps) {
  const { staticData } = useLocalization();
  const accountService = new AccountService();
  const authContext = useAuth();
  const [isPremium, setIsPremium] = useState<boolean | undefined>(false);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      accountService.getUser(authContext).then(user => {
        setIsPremium(user.is_premium);
        setLoading(false);
      });
    }, [])
  );


  return (
    <ScreenContainer>
        {loading && <Loader />}
        <View style={wishStyles.wishConfirmationTop}>
          <BackButton/>
          <DesignedText italic={true}>{staticData.profile.profilePremiumScreen}</DesignedText>
        </View>
        {!isPremium && 
            <View style={styles.premiumButtonsContainer}>
                <PremiumYearButton onPress={() => {
                    setLoading(true);
                    accountService.becomePremium(authContext).then(success => {
                        if (success) {
                            setIsPremium(true);
                        }
                        setLoading(false);
                    })
                }}/>
                <PremiumMonthButton onPress={() => {
                    setLoading(true);
                    accountService.becomePremium(authContext).then(success => {
                        if (success) {
                            setIsPremium(true);
                        }
                        setLoading(false);
                    })
                }}/>
            </View>
        }
        <PremiumBottomButtons />
    </ScreenContainer>
  );
};

export default ProfilePremiumScreen;
