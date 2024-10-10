import React, { useEffect, useRef } from 'react';
import { Animated, Easing, TouchableOpacity, View } from 'react-native';
import Layout from '../../components/Welcome/Layout';
import styles from "./styles"
import { StackNavigationProp } from '@react-navigation/stack';
import { WelcomeStackParamList } from '../../components/navigationStacks/WelcomeStackScreen';
import { useLocalization } from '../../contexts/LocalizationContext';
import DesignedText from '../../components/ui/DesignedText';
  
  type WelcomeScreenNavigationProp = StackNavigationProp<WelcomeStackParamList, 'Welcome2'>;
  
  interface WelcomeScreenProps {
    navigation: WelcomeScreenNavigationProp;
  }

function WelcomeScreen({ navigation } : WelcomeScreenProps) {
  const { staticData } = useLocalization();

  const animatedOpacity1 = useRef(new Animated.Value(0)).current
  const animatedOpacity2 = useRef(new Animated.Value(0)).current
  const animatedOpacity3 = useRef(new Animated.Value(0)).current

  const animation1 = useRef<Animated.CompositeAnimation | null>(null);
  const animation2 = useRef<Animated.CompositeAnimation | null>(null);
  const animation3 = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    animation1.current = Animated.timing(animatedOpacity1, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    });

    animation2.current = Animated.timing(animatedOpacity2, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: true,
    });

    animation3.current = Animated.timing(animatedOpacity3, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    });

    animation1.current.start(() => {
      animation2.current?.start(() => {
        animation3.current?.start(() => {
            navigation.navigate("Welcome3");
        });
      });
    });
  }, []);

  return (
    <Layout index={1}>
      <TouchableOpacity onPress={() => {
        animation1.current?.stop();
        animation2.current?.stop();
        animation3.current?.stop();
        navigation.navigate('Welcome3')
      }} style={{flex: 1}}>
        <View style={styles.secondTextContainer}>
          <Animated.View style={{ opacity: animatedOpacity1 }}>
            <DesignedText style={styles.text}>
              {staticData.welcome.welcome2screen.firstParagraph.start} <DesignedText bold={true}>{staticData.welcome.welcome2screen.firstParagraph.bold}</DesignedText> {staticData.welcome.welcome2screen.firstParagraph.end}
            </DesignedText>
          </Animated.View>
          <Animated.View style={{ opacity: animatedOpacity2 }}>
            <DesignedText style={styles.text}>
              {staticData.welcome.welcome2screen.secondParagraph.start} <DesignedText italic={true}>{staticData.welcome.welcome2screen.secondParagraph.italic}</DesignedText> {staticData.welcome.welcome2screen.secondParagraph.center} <DesignedText italic={true}>{staticData.welcome.welcome2screen.secondParagraph.secondItalic}</DesignedText> {staticData.welcome.welcome2screen.secondParagraph.end}
            </DesignedText>
          </Animated.View>
          <Animated.View style={{ opacity: animatedOpacity3 }}>
            <DesignedText style={styles.text}>
            {staticData.welcome.welcome2screen.thirdParagraph.start} <DesignedText italic={true}>{staticData.welcome.welcome2screen.secondParagraph.italic}</DesignedText>
            </DesignedText>
          </Animated.View>
        </View>
      </TouchableOpacity>
    </Layout>
  );
};

export default WelcomeScreen;
