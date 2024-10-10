import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import your welcome screens
import AuthenticationScreen from '../../screens/auth/AuthenticationScreen'
import EmailConfirmationScreen from '../../screens/auth/EmailConfirmationScreen';
import ChangeEmailScreen from '../../screens/auth/ChangeEmailScreen';
import AccountConnectedScreen from '../../screens/auth/AccountConnectedScreen';
import TermsOfUseScreen from '../../screens/TermsOfUseScreen';
import PrivacyPolicyScreen from '../../screens/PrivacyPolicyScreen';

export type AuthStackParamList = {
    Authentication: undefined;
    AccountConnected: { token: { access: string, refresh: string, is_already_registered: boolean } };
    ChangeEmail: undefined;
    EmailConfirmation: {email: string};
    TermsOfUse: undefined;
    PrivacyPolicy: undefined;
};

const AuthStack = createStackNavigator<AuthStackParamList>();

const AuthStackScreen: React.FC = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Authentication" component={AuthenticationScreen}/>
    <AuthStack.Screen name="EmailConfirmation" component={EmailConfirmationScreen}/>
    <AuthStack.Screen name="ChangeEmail" component={ChangeEmailScreen}/>
    <AuthStack.Screen name="AccountConnected" component={AccountConnectedScreen}/>
    <AuthStack.Screen name={"TermsOfUse"} component={TermsOfUseScreen}/>
    <AuthStack.Screen name={"PrivacyPolicy"} component={PrivacyPolicyScreen}/>
  </AuthStack.Navigator>
);

export default AuthStackScreen;
