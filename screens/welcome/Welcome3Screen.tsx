import React from 'react';
import { View } from 'react-native';
import Layout from '../../components/Welcome/Layout';
import DesignedText from '../../components/ui/DesignedText';
import Title from '../../components/ui/Title';
import styles from "./styles"
import SubmitButton from '../../components/ui/buttons/SubmitButton';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    Welcome3: undefined;
    Authentication: undefined;
  };
  
  type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome3'>;
  
  interface WelcomeScreenProps {
    navigation: WelcomeScreenNavigationProp;
  }

function WelcomeScreen({ navigation } : WelcomeScreenProps) {
  return (
    <Layout index={2}>
      <View style={styles.textContainer}>
        <Title style={styles.title}>Розповідь про додаток</Title>
      </View>
      <SubmitButton onPress={() => {navigation.navigate("Authentication")}} width={200} style={styles.submitButton}>Розпочати!</SubmitButton>
    </Layout>
  );
};

export default WelcomeScreen;
