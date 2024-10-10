import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import your welcome screens
import WelcomeScreen1 from '../../screens/welcome/Welcome1Screen';
import WelcomeScreen2 from '../../screens/welcome/Welcome2Screen';
import WelcomeScreen3 from '../../screens/welcome/Welcome3Screen';
import TermsOfUseScreen from '../../screens/TermsOfUseScreen';
import PrivacyPolicyScreen from '../../screens/PrivacyPolicyScreen';

export type WelcomeStackParamList = {
  Welcome1: undefined;
  Welcome2: undefined;
  Welcome3: undefined;
  TermsOfUse: undefined;
  PrivacyPolicy: undefined;
};

const WelcomeStack = createStackNavigator<WelcomeStackParamList>();

const WelcomeStackScreen: React.FC = () => (
  <WelcomeStack.Navigator screenOptions={{ headerShown: false }}>
    <WelcomeStack.Screen name="Welcome1" component={WelcomeScreen1}/>
    <WelcomeStack.Screen name="Welcome2" component={WelcomeScreen2}/>
    <WelcomeStack.Screen name="Welcome3" component={WelcomeScreen3}/>
    <WelcomeStack.Screen name={"TermsOfUse"} component={TermsOfUseScreen}/>
    <WelcomeStack.Screen name={"PrivacyPolicy"} component={PrivacyPolicyScreen}/>
  </WelcomeStack.Navigator>
);

export default WelcomeStackScreen;
