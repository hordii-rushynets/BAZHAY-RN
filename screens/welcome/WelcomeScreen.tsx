import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Layout from '../../components/Welcome/Layout';
import DesignedText from '../../components/ui/DesignedText';
import Title from '../../components/ui/Title';

const WelcomeScreen: React.FC = () => {
  return (
    <Layout index={0}>
      <View>
        <Title>Ласкаво просимо до Bazhay!</Title>
        <DesignedText>BAZHAY! ДОПОМОЖЕ ТОБІ ОТРИМАТИ БАЖАНІ ПОДАРУНКИ. ЯК?</DesignedText>
      </View>
    </Layout>
  );
};

export default WelcomeScreen;
