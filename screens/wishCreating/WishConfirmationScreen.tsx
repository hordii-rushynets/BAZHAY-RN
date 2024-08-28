import React, { useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../../contexts/AuthContext';
import { RootStackParamList } from '../../components/RootNavigator';
import { WishService } from './services';
import { useWishCreating } from '../../contexts/WishCreatingContext';
import ScreenContainer from '../../components/ui/ScreenContainer';
import BackButton from '../../components/ui/buttons/BackButton';
import authStyles from "../auth/styles"
import DesignedText from '../../components/ui/DesignedText';
import SubmitButton from '../../components/ui/buttons/SubmitButton';
import { View } from 'react-native';

type WishConfirmationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'WishConfirmation'>;

interface WishConfirmationScreenProps {
  navigation: WishConfirmationScreenNavigationProp;
}

function WishConfirmationScreen({ navigation }: WishConfirmationScreenProps) {
  const wishService = new WishService();
  const authContext = useAuth();
  const { wishId } = useWishCreating();

  return (
    <ScreenContainer>
        <BackButton link={"AddWishVisibility"}/>
        <DesignedText italic={true}>Твоє бажання</DesignedText>
        <View>
            
        </View>
        <SubmitButton 
            onPress={() => {}}
            width={200}
            style={authStyles.gridButton}
        >Готово</SubmitButton>
    </ScreenContainer>
  );
};

export default WishConfirmationScreen;
