import React from 'react';
import Title from '../../components/ui/Title';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenContainer from '../../components/ui/ScreenContainer';
import { MainStackParamList } from '../../components/navigationStacks/MainStackScreen';

type CommunityScreenNavigationProp = StackNavigationProp<MainStackParamList, 'Community'>;

interface CommunityScreenProps {
  navigation: CommunityScreenNavigationProp;
}

function CommunityScreen({ navigation }: CommunityScreenProps) {
  return (
    <ScreenContainer>
        <Title>Community</Title>
    </ScreenContainer>
  );
};

export default CommunityScreen;
