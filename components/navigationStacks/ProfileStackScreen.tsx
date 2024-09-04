import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from '../../screens/profile/SettingsScreen';

export type ProfileStackParamList = {
  Settings: undefined;
};

const ProfileStack = createStackNavigator<ProfileStackParamList>();

const ProfileStackScreen: React.FC = () => (
  <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
    <ProfileStack.Screen name="Settings" component={SettingsScreen}/>
  </ProfileStack.Navigator>
);

export default ProfileStackScreen;
