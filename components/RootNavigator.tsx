import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import AppStackScreen from './navigationStacks/AppStackScreen';
import AuthStackScreen from './navigationStacks/AuthStackScreen';
import AccountFillStackScreen from './navigationStacks/AccountFillingStackScreen';
import WelcomeStackScreen from './navigationStacks/WelcomeStackScreen';
import * as Font from 'expo-font';
import { Text } from 'react-native';

const loadFonts = async () => {
  await Font.loadAsync({
    'Inter-V': require('../assets/fonts/Inter-V.ttf'),
  });
};

const RootNavigator: React.FC = () => {
  const { isAuthenticated, hasSeenWelcome, isAccountFilled, checkAuth } = useAuth();
  const [appLoaded, setAppLoaded] = useState(false);

  useEffect(() => {
    const loadApp = async () => {
      loadFonts().then(() => 
        checkAuth().then(() => 
          setAppLoaded(true)));
    }

    loadApp();
  }, []);

  if (!appLoaded) {
    return <Text>Loading...</Text>
  }

  return (
    <NavigationContainer>
      {hasSeenWelcome ? 
        isAuthenticated ? 
          isAccountFilled ? 
            <AppStackScreen/> 
            : <AccountFillStackScreen/> 
          : <AuthStackScreen /> 
        : <WelcomeStackScreen />
      }
    </NavigationContainer>
  );
};

export default RootNavigator;
