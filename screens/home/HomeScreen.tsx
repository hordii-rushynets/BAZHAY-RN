import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Layout from '../../components/Welcome/Layout';
import DesignedText from '../../components/ui/DesignedText';
import Title from '../../components/ui/Title';
import { StackNavigationProp } from '@react-navigation/stack';
import DesignStars from '../../components/ui/icons/DesignStars';
import { RootStackParamList } from '../../App';
import ScreenContainer from '../../components/ui/ScreenContainer';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

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
