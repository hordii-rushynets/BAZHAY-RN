import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from '../../screens/profile/SettingsScreen';
import DeleteAccountScreen from '../../screens/profile/DeleteAccountScreen';
import { userType } from '../../screens/main/interfaces';
import CommunityScreen from '../../screens/main/CommunityScreen';
import ChangeLanguageScreen from '../../screens/profile/ChangeLanguageScreen';

export type ProfileStackParamList = {
  Settings: undefined;
  DeleteAccount: undefined;
  ProfileCommunity: { mode?: userType };
  ChangeLanguage: undefined;
};

const ProfileStack = createStackNavigator<ProfileStackParamList>();

const ProfileStackScreen: React.FC = () => (
  <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
    <ProfileStack.Screen name="Settings" component={SettingsScreen}/>
    <ProfileStack.Screen name="DeleteAccount" component={DeleteAccountScreen} />
    <ProfileStack.Screen name="ProfileCommunity" component={CommunityScreen} />
    <ProfileStack.Screen name="ChangeLanguage" component={ChangeLanguageScreen} />
  </ProfileStack.Navigator>
);

export default ProfileStackScreen;
