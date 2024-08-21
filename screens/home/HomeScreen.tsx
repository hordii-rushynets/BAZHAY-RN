import React from 'react';
import Title from '../../components/ui/Title';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenContainer from '../../components/ui/ScreenContainer';
import { AppStackParamList } from '../../components/navigationStacks/AppStackScreen';

type HomeScreenNavigationProp = StackNavigationProp<AppStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <ScreenContainer>
        <Title>Home</Title>
    </ScreenContainer>
  );
};

export default HomeScreen;
