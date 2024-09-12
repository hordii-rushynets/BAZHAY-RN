import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from '../../screens/profile/SettingsScreen';
import DeleteAccountScreen from '../../screens/profile/DeleteAccountScreen';

export type ProfileStackParamList = {
  Settings: undefined;
  DeleteAccount: undefined;
};

const ProfileStack = createStackNavigator<ProfileStackParamList>();

const ProfileStackScreen: React.FC = () => (
  <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
    <ProfileStack.Screen name="Settings" component={SettingsScreen}/>
    <ProfileStack.Screen name="DeleteAccount" component={DeleteAccountScreen} />
  </ProfileStack.Navigator>
);

export default ProfileStackScreen;
