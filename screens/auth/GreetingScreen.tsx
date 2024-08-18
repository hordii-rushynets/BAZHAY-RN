import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Title from '../../components/ui/Title';
import styles from './styles'
import generalStyles from '../../components/ui/generalStyles'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Greeting: {name: string};
  AccountFillNickName: undefined;
};

type GreetingScreenRouteProp = RouteProp<RootStackParamList, 'Greeting'>;
type GreetingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Greeting'>;

interface GreetingScreenProps {
  route: GreetingScreenRouteProp;
  navigation: GreetingScreenNavigationProp;
}

function GreetingScreen({ route, navigation }: GreetingScreenProps) {
  const { name } = route.params;

  return (
    <TouchableOpacity onPress={() => {navigation.navigate("AccountFillNickName")}} style={generalStyles.screenContainer}>
        <View style={generalStyles.centerContainer}>
            <Title style={styles.title}>
                Приємно {"\n"} познайомитись, {name}!
            </Title>
        </View>
    </TouchableOpacity>
  );
};

export default GreetingScreen;
