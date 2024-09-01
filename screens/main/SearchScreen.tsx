import React from 'react';
import Title from '../../components/ui/Title';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenContainer from '../../components/ui/ScreenContainer';
import { MainStackParamList } from '../../components/navigationStacks/MainStackScreen';

type SearchScreenNavigationProp = StackNavigationProp<MainStackParamList, 'Search'>;

interface SearchScreenProps {
  navigation: SearchScreenNavigationProp;
}

function SearchScreen({ navigation }: SearchScreenProps) {
  return (
    <ScreenContainer>
        <Title>Search</Title>
    </ScreenContainer>
  );
};

export default SearchScreen;
