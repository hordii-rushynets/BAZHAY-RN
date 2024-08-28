import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Title from '../../components/ui/Title';
import styles from './styles'
import generalStyles from '../../components/ui/generalStyles'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { AccountFillingStackParamList } from '../../components/navigationStacks/AccountFillingStackScreen';
import { useLocalization } from '../../contexts/LocalizationContext';

type GreetingScreenRouteProp = RouteProp<AccountFillingStackParamList, 'Greeting'>;
type GreetingScreenNavigationProp = StackNavigationProp<AccountFillingStackParamList, 'Greeting'>;

interface GreetingScreenProps {
  route: GreetingScreenRouteProp;
  navigation: GreetingScreenNavigationProp;
}

function GreetingScreen({ route, navigation }: GreetingScreenProps) {
  const { name } = route.params;
  const { staticData } = useLocalization(); 

  return (
    <TouchableOpacity onPress={() => {navigation.navigate("AccountFillNickName")}} style={generalStyles.screenContainer}>
        <View style={generalStyles.centerContainer}>
            <Title style={styles.title}>
                {staticData.auth.greetingScreen.titleFirstPart} {"\n"} {staticData.auth.greetingScreen.titleSecondPart} {name}!
            </Title>
        </View>
    </TouchableOpacity>
  );
};

export default GreetingScreen;
