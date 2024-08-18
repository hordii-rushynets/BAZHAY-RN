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
import AccountConnectedScreen from './screens/auth/AccountConnectedScreen';
import AccountFillMessageScreen from './screens/auth/AccountFillMessageScreen';
import AccountFillNameScreen from './screens/auth/AccountFillNameScreen';
import GreetingScreen from './screens/auth/GreetingScreen';
import AccountFillNickNameScreen from './screens/auth/AccountFillNickNameScreen';

export type RootStackParamList = {
  Welcome1: undefined;
  Welcome2: undefined;
  Welcome3: undefined;
  Authentication: undefined;
  Greeting: {name: string};
  AccountFillName: undefined;
  AccountConnected: undefined;
  AccountFillMessage: undefined;
  AccountFillNickName: undefined;
  ChangeEmail: undefined;
  EmailConfirmation: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

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
      <Stack.Navigator initialRouteName="Welcome1">
        <Stack.Screen name="Welcome1" component={WelcomeScreen1} options={{ headerShown: false }}/>
        <Stack.Screen name="Welcome2" component={WelcomeScreen2} options={{ headerShown: false }}/>
        <Stack.Screen name="Welcome3" component={WelcomeScreen3} options={{ headerShown: false }}/>
        <Stack.Screen name="Authentication" component={AuthenticationScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="EmailConfirmation" component={EmailConfirmationScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ChangeEmail" component={ChangeEmailScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="AccountConnected" component={AccountConnectedScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="AccountFillMessage" component={AccountFillMessageScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="AccountFillName" component={AccountFillNameScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="Greeting" component={GreetingScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="AccountFillNickName" component={AccountFillNickNameScreen} options={{ headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
