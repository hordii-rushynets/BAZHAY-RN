import React from 'react';
import { View } from 'react-native';
import Layout from '../../components/Welcome/Layout';
import DesignedText from '../../components/ui/DesignedText';
import Title from '../../components/ui/Title';
import styles from "./styles"
import SubmitButton from '../../components/ui/buttons/SubmitButton';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WelcomeStackParamList } from '../../components/navigationStacks/WelcomeStackScreen';
import { useAuth } from '../../contexts/AuthContext';
import { useLocalization } from '../../contexts/LocalizationContext';
  
  type WelcomeScreenNavigationProp = StackNavigationProp<WelcomeStackParamList, 'Welcome3'>;
  
  interface WelcomeScreenProps {
    navigation: WelcomeScreenNavigationProp;
  }

function WelcomeScreen({ navigation } : WelcomeScreenProps) {
  const { completeWelcome } = useAuth();
  const { staticData } = useLocalization();

  return (
    <Layout index={2} displaySkip={false}>
      <View style={styles.textContainer}>
        <Title style={styles.title}>{staticData.welcome.welcome2screen.title}</Title>
      </View>
      <SubmitButton onPress={async () => {
        completeWelcome();
      }} width={200} style={styles.submitButton}>{staticData.welcome.welcome3screen.button}</SubmitButton>
    </Layout>
  );
};

export default WelcomeScreen;
