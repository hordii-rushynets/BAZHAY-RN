import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Title from '../../components/ui/Title';
import styles from './styles'
import generalStyles from '../../components/ui/generalStyles'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import DesignedText from '../../components/ui/DesignedText';

type AccountFillEndingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AccountFillEnding'>;

interface AccountFillEndingScreenProps {
  navigation: AccountFillEndingScreenNavigationProp;
}

function AccountFillEndingScreen({ navigation }: AccountFillEndingScreenProps) {
  return (
    <TouchableOpacity onPress={() => {navigation.navigate("Home")}} style={generalStyles.screenContainer}>
        <View style={generalStyles.centerContainer}>
            <Title style={styles.title}>
                Виглядає класно, ____
            </Title>
            <DesignedText style={styles.accountConnectedText}>
            Більше налаштувань {"\n"}
            ти можеш додати у власному профілі
            </DesignedText>
        </View>
    </TouchableOpacity>
  );
};

export default AccountFillEndingScreen;
