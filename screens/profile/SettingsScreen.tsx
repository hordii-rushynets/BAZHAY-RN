import React from 'react';
import Title from '../../components/ui/Title';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenContainer from '../../components/ui/ScreenContainer';
import { RootStackParamList } from '../../components/RootNavigator';
import ButtonWithArrow from '../../components/ui/buttons/ButtonWithArrow';
import Leave from '../../components/ui/icons/Leave';
import { useAuth } from '../../contexts/AuthContext';

type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;

interface SettingsScreenProps {
  navigation: SettingsScreenNavigationProp;
}

function SettingsScreen({ navigation }: SettingsScreenProps) {
    const { logout } = useAuth();

  return (
    <ScreenContainer>
        <ButtonWithArrow onPress={() => { logout() }} width="auto" icon={<Leave/>}>Вийти</ButtonWithArrow>
    </ScreenContainer>
  );
};

export default SettingsScreen;
