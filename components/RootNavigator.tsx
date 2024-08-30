import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import MainStackScreen, { MainStackParamList } from './navigationStacks/MainStackScreen';
import AuthStackScreen from './navigationStacks/AuthStackScreen';
import AccountFillStackScreen from './navigationStacks/AccountFillingStackScreen';
import WelcomeStackScreen from './navigationStacks/WelcomeStackScreen';
import * as Font from 'expo-font';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import WishCreatingStackScreen, { WishCreatingStackParamList } from './navigationStacks/WishCreatingStackScreen';
import WishScreen from '../screens/WishScreen';

const loadFonts = async () => {
  await Font.loadAsync({
    'Inter-V': require('../assets/fonts/Inter-V.ttf'),
  });
};

export type RootStackParamList = {
  Main: undefined;
  WishCreating: {
    screen: keyof WishCreatingStackParamList;
    params?: WishCreatingStackParamList[keyof WishCreatingStackParamList];
  };
  Wish: { wishId: string; };
} & WishCreatingStackParamList & MainStackParamList

const Stack = createStackNavigator<RootStackParamList>();

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
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="Main"
              component={MainStackScreen}
            />
            <Stack.Screen
              name="WishCreating"
              component={WishCreatingStackScreen}
            />
            <Stack.Screen name={"Wish"} component={WishScreen}/>
          </Stack.Navigator>
            : <AccountFillStackScreen/> 
          : <AuthStackScreen /> 
        : <WelcomeStackScreen />
      }
    </NavigationContainer>
  );
};

export default RootNavigator;
