import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import your welcome screens
import AccountFillMessageScreen from '../../screens/auth/AccountFillMessageScreen';
import AccountFillNameScreen from '../../screens/auth/AccountFillNameScreen';
import GreetingScreen from '../../screens/auth/GreetingScreen';
import AccountFillNickNameScreen from '../../screens/auth/AccountFillNickNameScreen';
import AccountFillAvatarScreen from '../../screens/auth/AccountFillAvatarScreen';
import ImageFromGalleryScreen from '../../screens/auth/ImageFromGalleryScreen';
import AvatarConfirmationScreen from '../../screens/auth/AvatarConfirmationScreen';
import ImageFromCameraScreen from '../../screens/auth/ImageFromCameraScreen';
import AccountFillBirthScreen from '../../screens/auth/AccountFillBirthScreen';
import AccountFillSexScreen from '../../screens/auth/AccountFillSexScreen';
import AccountFillEndingScreen from '../../screens/auth/AccountFillEndingScreen';
import TermsOfUseScreen from '../../screens/TermsOfUseScreen';
import PrivacyPolicyScreen from '../../screens/PrivacyPolicyScreen';

export type AccountFillingStackParamList = {
    Greeting: {name: string};
    AccountFillName: undefined;
    AccountFillMessage: undefined;
    AccountFillNickName: undefined;
    AccountFillAvatar: undefined;
    ImageFromGallery: undefined;
    AvatarConfirmation: { image: string };
    ImageFromCamera: undefined;
    AccountFillBirth: undefined;
    AccountFillSex: undefined;
    AccountFillEnding: undefined;
    TermsOfUse: undefined;
    PrivacyPolicy: undefined;
};

const AccountFillingStack = createStackNavigator<AccountFillingStackParamList>();

const AccountFillingStackScreen: React.FC = () => (
  <AccountFillingStack.Navigator screenOptions={{ headerShown: false }}>
    <AccountFillingStack.Screen name="AccountFillMessage" component={AccountFillMessageScreen}/>
    <AccountFillingStack.Screen name="AccountFillName" component={AccountFillNameScreen}/>
    <AccountFillingStack.Screen name="Greeting" component={GreetingScreen}/>
    <AccountFillingStack.Screen name="AccountFillNickName" component={AccountFillNickNameScreen}/>
    <AccountFillingStack.Screen name="AccountFillAvatar" component={AccountFillAvatarScreen}/>
    <AccountFillingStack.Screen name="ImageFromGallery" component={ImageFromGalleryScreen}/>
    <AccountFillingStack.Screen name="AvatarConfirmation" component={AvatarConfirmationScreen}/>
    <AccountFillingStack.Screen name="ImageFromCamera" component={ImageFromCameraScreen}/>
    <AccountFillingStack.Screen name="AccountFillBirth" component={AccountFillBirthScreen}/>
    <AccountFillingStack.Screen name="AccountFillSex" component={AccountFillSexScreen}/>
    <AccountFillingStack.Screen name="AccountFillEnding" component={AccountFillEndingScreen}/>
    <AccountFillingStack.Screen name={"TermsOfUse"} component={TermsOfUseScreen}/>
    <AccountFillingStack.Screen name={"PrivacyPolicy"} component={PrivacyPolicyScreen}/>
  </AccountFillingStack.Navigator>
);

export default AccountFillingStackScreen;
