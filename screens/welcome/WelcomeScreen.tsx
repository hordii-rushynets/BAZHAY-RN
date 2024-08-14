import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  headerLines: {
    position: 'absolute',
    width: 343,
    height: 1,
    left: 16,
    top: 80,
    backgroundColor: '#000000',
  },
  skipText: {
    position: 'absolute',
    width: 71,
    height: 9,
    left: 289,
    top: 97,
    fontFamily: 'Inter-V',
    fontSize: 12,
    lineHeight: 15,
    textAlign: 'center',
    color: '#000000',
  },
  welcomeText: {
    position: 'absolute',
    width: 271,
    height: 46,
    fontFamily: 'Inter-V',
    fontSize: 24,
    lineHeight: 29,
    textAlign: 'center',
    color: '#000000',
  },
  descriptionText: {
    position: 'absolute',
    width: 277,
    height: 72,
    fontFamily: 'Inter-V',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: '#000000',
    textTransform: 'uppercase',
  },
  buttonContainer: {
    position: 'absolute',
    width: 200,
    height: 40,
    backgroundColor: '#D9D9D9',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    top: 708,
    left: '50%',
    marginLeft: -100,
  },
  buttonText: {
    color: '#000000',
  },
});

const WelcomeScreen: React.FC = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.headerLines} />
      <Text style={styles.skipText}>Пропустити</Text>
      <Text style={styles.welcomeText}>Ласкаво просимо до Bazhay!</Text>
      <Text style={styles.descriptionText}>BAZHAY! ДОПОМОЖЕ ТОБІ ОТРИМАТИ БАЖАНІ ПОДАРУНКИ. ЯК?</Text>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>ДАЛІ</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;
