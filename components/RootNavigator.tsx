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
import ProfileStackScreen, { ProfileStackParamList } from './navigationStacks/ProfileStackScreen';
import HomeStackScreen, { HomeStackParamList } from './navigationStacks/HomeStackScreen';
import TermsOfUseScreen from '../screens/TermsOfUseScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';

const loadFonts = async () => {
  await Font.loadAsync({
    'Inter-V': require('../assets/fonts/Inter-V.ttf'),
    'Inter-Regular': require('../assets/fonts/Inter-Regular.otf'),
    'Inter-Black': require('../assets/fonts/Inter-Black.otf'),
    'Inter-BlackItalic': require('../assets/fonts/Inter-BlackItalic.otf'),
    'Inter-Bold': require('../assets/fonts/Inter-Bold.otf'),
    'Inter-BoldItalic': require('../assets/fonts/Inter-BoldItalic.otf'),
    'Inter-ExtraBold': require('../assets/fonts/Inter-ExtraBold.otf'),
    'Inter-ExtraBoldItalic': require('../assets/fonts/Inter-ExtraBoldItalic.otf'),
    'Inter-ExtraLight': require('../assets/fonts/Inter-ExtraLight.otf'),
    'Inter-ExtraLightItalic': require('../assets/fonts/Inter-ExtraLightItalic.otf'),
    'Inter-Italic': require('../assets/fonts/Inter-Italic.otf'),
    'Inter-Light': require('../assets/fonts/Inter-Light.otf'),
    'Inter-LightItalic': require('../assets/fonts/Inter-LightItalic.otf'),
    'Inter-Medium': require('../assets/fonts/Inter-Medium.otf'),
    'Inter-MediumItalic': require('../assets/fonts/Inter-MediumItalic.otf'),
    'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.otf'),
    'Inter-SemiBoldItalic': require('../assets/fonts/Inter-SemiBoldItalic.otf'),
    'Inter-Thin': require('../assets/fonts/Inter-Thin.otf'),
    'Inter-ThinItalic': require('../assets/fonts/Inter-ThinItalic.otf'),
  });
};

export type RootStackParamList = {
  Main: undefined;
  WishCreating: {
    screen: keyof WishCreatingStackParamList;
    params?: WishCreatingStackParamList[keyof WishCreatingStackParamList];
  };
  HomeScreens: {
    screen: keyof HomeStackParamList;
    params?: HomeStackParamList[keyof HomeStackParamList];
  };
  ProfileScreens: {
    screen: keyof ProfileStackParamList;
    params?: ProfileStackParamList[keyof ProfileStackParamList];
  };
  Wish: { wishId: string; };
  TermsOfUse: undefined;
  PrivacyPolicy: undefined;
} & WishCreatingStackParamList & MainStackParamList & ProfileStackParamList & HomeStackParamList

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
            <Stack.Screen
              name="HomeScreens"
              component={HomeStackScreen}
            />
            <Stack.Screen
              name="ProfileScreens"
              component={ProfileStackScreen}
            />
            <Stack.Screen name={"Wish"} component={WishScreen}/>
            <Stack.Screen name={"TermsOfUse"} component={TermsOfUseScreen}/>
            <Stack.Screen name={"PrivacyPolicy"} component={PrivacyPolicyScreen}/>
          </Stack.Navigator>
            : <AccountFillStackScreen/> 
          : <AuthStackScreen /> 
        : <WelcomeStackScreen />
      }
    </NavigationContainer>
  );
};

export default RootNavigator;
