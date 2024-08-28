import React from 'react';
import Title from '../../components/ui/Title';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenContainer from '../../components/ui/ScreenContainer';
import { MainStackParamList } from '../../components/navigationStacks/MainStackScreen';

type ProfileScreenNavigationProp = StackNavigationProp<MainStackParamList, 'Profile'>;

interface ProfileScreenProps {
  navigation: ProfileScreenNavigationProp;
}

function ProfileScreen({ navigation }: ProfileScreenProps) {
  return (
    <ScreenContainer>
        <Title>Profile</Title>
    </ScreenContainer>
  );
};

export default ProfileScreen;
