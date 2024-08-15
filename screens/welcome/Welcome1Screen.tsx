import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Layout from '../../components/Welcome/Layout';
import DesignedText from '../../components/ui/DesignedText';
import Title from '../../components/ui/Title';
import styles from "./styles"
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Welcome1: undefined;
  Welcome2: undefined;
  Welcome3: undefined;
};

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome1'>;

interface WelcomeScreenProps {
  navigation: WelcomeScreenNavigationProp;
}

function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  return (
    <Layout index={0}>
      <TouchableOpacity onPress={() => {navigation.navigate('Welcome2')}} style={{flex: 1}}>
        <View style={styles.textContainer}>
          <Title style={styles.title}>Ласкаво просимо до <Title bold={true}>Bazhay!</Title></Title>
          <DesignedText style={styles.text}>
            BAZHAY! ДОПОМОЖЕ ТОБІ 
            <DesignedText italic={true}> ОТРИМАТИ</DesignedText> 
            <DesignedText bold={true}> БАЖАНІ ПОДАРУНКИ</DesignedText>
            . ЯК?
          </DesignedText>
        </View>
      </TouchableOpacity>
    </Layout>
  );
};

export default WelcomeScreen;
