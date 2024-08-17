import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen1 from './screens/welcome/Welcome1Screen';
import WelcomeScreen2 from './screens/welcome/Welcome2Screen';
import WelcomeScreen3 from './screens/welcome/Welcome3Screen';
import AuthenticationScreen from './screens/auth/AuthenticationScreen'
import * as Font from 'expo-font';
import { Text } from 'react-native';
import EmailConfirmationScreen from './screens/auth/EmailConfirmationScreen';
import ChangeEmailScreen from './screens/auth/ChangeEmailScreen';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Inter-V': require('./assets/fonts/Inter-V.ttf'),
      });
      setFontsLoaded(true);
    };
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Welcome1" component={WelcomeScreen1} options={{ headerShown: false }}/>
        <Stack.Screen name="Welcome2" component={WelcomeScreen2} options={{ headerShown: false }}/>
        <Stack.Screen name="Welcome3" component={WelcomeScreen3} options={{ headerShown: false }}/>
        <Stack.Screen name="Authentication" component={AuthenticationScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="EmailConfirmation" component={EmailConfirmationScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ChangeEmail" component={ChangeEmailScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
