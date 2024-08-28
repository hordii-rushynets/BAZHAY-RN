import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Layout from '../../components/Welcome/Layout';
import Title from '../../components/ui/Title';
import styles from "./styles"
import { StackNavigationProp } from '@react-navigation/stack';
import { WelcomeStackParamList } from '../../components/navigationStacks/WelcomeStackScreen';
import { useLocalization } from '../../contexts/LocalizationContext';
  
  type WelcomeScreenNavigationProp = StackNavigationProp<WelcomeStackParamList, 'Welcome2'>;
  
  interface WelcomeScreenProps {
    navigation: WelcomeScreenNavigationProp;
  }

function WelcomeScreen({ navigation } : WelcomeScreenProps) {
  const { staticData } = useLocalization();

  return (
    <Layout index={1}>
      <TouchableOpacity onPress={() => {navigation.navigate('Welcome3')}} style={{flex: 1}}>
        <View style={styles.textContainer}>
          <Title style={styles.title}>{staticData.welcome.welcome2screen.title}</Title>
        </View>
      </TouchableOpacity>
    </Layout>
  );
};

export default WelcomeScreen;
