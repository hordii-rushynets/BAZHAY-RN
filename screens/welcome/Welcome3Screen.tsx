import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';
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

  const animatedOpacity1 = useRef(new Animated.Value(0)).current
  const animatedOpacity2 = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(animatedOpacity1, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: true
    }).start(() => {
      Animated.timing(animatedOpacity2, {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: true
      }).start()
    });
  }, []);

  return (
    <Layout index={2} displaySkip={false}>
      <View style={styles.secondTextContainer}>
        <Animated.View style={{ opacity: animatedOpacity1 }}>
            <DesignedText style={styles.text}>
              {staticData.welcome.welcome3screen.firstParagraph.start} <DesignedText italic={true}>{staticData.welcome.welcome3screen.firstParagraph.italic}</DesignedText> <DesignedText bold={true}>{staticData.welcome.welcome3screen.firstParagraph.bold}</DesignedText>
            </DesignedText>
          </Animated.View>
          <Animated.View style={{ opacity: animatedOpacity2 }}>
            <DesignedText style={styles.text}>
              {staticData.welcome.welcome3screen.secondParagraph.start} <DesignedText italic={true}>{staticData.welcome.welcome3screen.secondParagraph.italic}</DesignedText> {staticData.welcome.welcome3screen.secondParagraph.center} <DesignedText bold={true}>{staticData.welcome.welcome3screen.secondParagraph.bold}</DesignedText>
            </DesignedText>
          </Animated.View>
      </View>
      <SubmitButton onPress={async () => {
        completeWelcome();
      }} width={200} style={styles.submitButton}>{staticData.welcome.welcome3screen.button}</SubmitButton>
    </Layout>
  );
};

export default WelcomeScreen;
