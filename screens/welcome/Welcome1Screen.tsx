import React, { useEffect, useRef } from 'react';
import { Animated, Easing, TouchableOpacity, View } from 'react-native';
import Layout from '../../components/Welcome/Layout';
import DesignedText from '../../components/ui/DesignedText';
import Title from '../../components/ui/Title';
import styles from "./styles"
import { StackNavigationProp } from '@react-navigation/stack';
import DesignStars from '../../components/ui/icons/DesignStars';
import { WelcomeStackParamList } from '../../components/navigationStacks/WelcomeStackScreen';
import { useLocalization } from '../../contexts/LocalizationContext';

type WelcomeScreenNavigationProp = StackNavigationProp<WelcomeStackParamList, 'Welcome1'>;

interface WelcomeScreenProps {
  navigation: WelcomeScreenNavigationProp;
}

function WelcomeScreen({ navigation }: WelcomeScreenProps) {
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
            navigation.navigate("Welcome2");
        });
      });
    });
  }, []);

  return (
    <Layout index={0}>
      <TouchableOpacity onPress={() => {
        animation1.current?.stop();
        animation2.current?.stop();
        animation3.current?.stop();
        navigation.navigate('Welcome2')
      }} style={{flex: 1}}>
        <View style={styles.textContainer}>
          <Animated.View style={{ opacity: animatedOpacity1 }}>
            <Title style={[styles.title]}>
              {staticData.welcome.welcome1screen.titleFirstPart} 
              <Title bold={true}>{" "}{staticData.welcome.welcome1screen.titleBoldPart}</Title>
            </Title>
          </Animated.View>
          <Animated.View style={{ opacity: animatedOpacity2 }}>
            <DesignedText style={styles.text}>
            {staticData.welcome.welcome1screen.textFirstPart}  
              <DesignedText italic={true}> {staticData.welcome.welcome1screen.textItalicPart} </DesignedText> {staticData.welcome.welcome1screen.textSecondPart}
              <DesignedText bold={true}> {staticData.welcome.welcome1screen.textBoldPart}</DesignedText>
            </DesignedText>
          </Animated.View>
          <Animated.View style={{ opacity: animatedOpacity3 }}>
            <DesignedText style={styles.text}>{staticData.welcome.welcome1screen.textEndingPart}</DesignedText>
          </Animated.View>
        </View>
        <View style={styles.starsContainer}>
          <DesignStars />
        </View>
      </TouchableOpacity>
    </Layout>
  );
};

export default WelcomeScreen;
