import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from '../../screens/profile/SettingsScreen';
import DeleteAccountScreen from '../../screens/profile/DeleteAccountScreen';
import { userType } from '../../screens/main/interfaces';
import CommunityScreen from '../../screens/main/CommunityScreen';
import ChangeLanguageScreen from '../../screens/profile/ChangeLanguageScreen';
import UpdateProfileScreen from '../../screens/profile/UpdateProfileScreen';
import UpdateNameScreen from '../../screens/profile/UpdateNameScreen';
import UpdateLastNameScreen from '../../screens/profile/UpdateLastNameScreen';
import UpdateNicknameScreen from '../../screens/profile/UpdateNicknameScreen';
import UpdateBirthScreen from '../../screens/profile/UpdateBirthScreen';
import UpdateAboutScreen from '../../screens/profile/UpdateAboutScreen';
import UpdateAvatarScreen from '../../screens/profile/UpdateAvatarScreen';
import AvatarFromGalleryScreen from '../../screens/profile/AvatarFromGalleryScreen';
import AvatarFromCameraScreen from '../../screens/profile/AvatarFromCameraScreen';
import UpdateAvatarConfirmationScreen from '../../screens/profile/UpdateAvatarConfirmationScreen';

export type ProfileStackParamList = {
  Settings: undefined;
  DeleteAccount: undefined;
  ProfileCommunity: { mode?: userType };
  ChangeLanguage: undefined;
  UpdateProfile: undefined;
  UpdateName: undefined;
  UpdateLastName: undefined;
  UpdateNickname: undefined;
  UpdateBirth: undefined;
  UpdateAbout: undefined;
  UpdateAvatar: { image: string };
  AvatarFromGallery: undefined;
  AvatarFromCamera: undefined;
  UpdateAvatarConfirmation: { image: string };
};

const ProfileStack = createStackNavigator<ProfileStackParamList>();

const ProfileStackScreen: React.FC = () => (
  <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
    <ProfileStack.Screen name="Settings" component={SettingsScreen}/>
    <ProfileStack.Screen name="DeleteAccount" component={DeleteAccountScreen} />
    <ProfileStack.Screen name="ProfileCommunity" component={CommunityScreen} />
    <ProfileStack.Screen name="ChangeLanguage" component={ChangeLanguageScreen} />
    <ProfileStack.Screen name="UpdateProfile" component={UpdateProfileScreen} />
    <ProfileStack.Screen name="UpdateName" component={UpdateNameScreen} />
    <ProfileStack.Screen name="UpdateLastName" component={UpdateLastNameScreen} />
    <ProfileStack.Screen name="UpdateNickname" component={UpdateNicknameScreen} />
    <ProfileStack.Screen name="UpdateBirth" component={UpdateBirthScreen} />
    <ProfileStack.Screen name="UpdateAbout" component={UpdateAboutScreen} />
    <ProfileStack.Screen name="UpdateAvatar" component={UpdateAvatarScreen} />
    <ProfileStack.Screen name="AvatarFromGallery" component={AvatarFromGalleryScreen} />
    <ProfileStack.Screen name="AvatarFromCamera" component={AvatarFromCameraScreen}/>
    <ProfileStack.Screen name="UpdateAvatarConfirmation" component={UpdateAvatarConfirmationScreen} />
  </ProfileStack.Navigator>
);

export default ProfileStackScreen;
