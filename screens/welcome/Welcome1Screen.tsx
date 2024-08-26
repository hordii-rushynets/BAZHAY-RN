import React from 'react';
import { TouchableOpacity, View } from 'react-native';
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

  return (
    <Layout index={0}>
      <TouchableOpacity onPress={() => {navigation.navigate('Welcome2')}} style={{flex: 1}}>
        <View style={styles.textContainer}>
          <Title style={styles.title}>{staticData.welcome.welcome1screen.titleFirstPart} <Title bold={true}>{staticData.welcome.welcome1screen.titleBoldPart}</Title></Title>
          <DesignedText style={styles.text}>
          {staticData.welcome.welcome1screen.textFirstPart} 
            <DesignedText italic={true}> {staticData.welcome.welcome1screen.textItalicPart} </DesignedText> 
            <DesignedText bold={true}> {staticData.welcome.welcome1screen.textBoldPart}</DesignedText>
            . {staticData.welcome.welcome1screen.textEndingPart}
          </DesignedText>
        </View>
        <View style={styles.starsContainer}>
          <DesignStars />
        </View>
      </TouchableOpacity>
    </Layout>
  );
};

export default WelcomeScreen;
