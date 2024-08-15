import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Layout from '../../components/Welcome/Layout';
import DesignedText from '../../components/ui/DesignedText';
import Title from '../../components/ui/Title';
import styles from "./styles"

const WelcomeScreen: React.FC = () => {
  return (
    <Layout index={0}>
      <View style={styles.textContainer}>
        <Title style={styles.title}>Ласкаво просимо до <Title bold={true}>Bazhay!</Title></Title>
        <DesignedText style={styles.text}>
          BAZHAY! ДОПОМОЖЕ ТОБІ 
          <DesignedText italic={true}> ОТРИМАТИ</DesignedText> 
          <DesignedText bold={true}> БАЖАНІ ПОДАРУНКИ</DesignedText>
          . ЯК?
        </DesignedText>
      </View>
    </Layout>
  );
};

export default WelcomeScreen;
