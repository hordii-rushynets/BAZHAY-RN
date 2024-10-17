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
import UpdateEmailScreen from '../../screens/profile/UpdateEmailScreen';
import ProfileEmailConfirmationScreen from '../../screens/profile/ProfileEmailConfirmation';
import ProfilePremiumScreen from '../../screens/profile/ProfilePremiumScreen';
import UpdateAddressScreen from '../../screens/profile/UpdateAddress';
import UpdatePostScreen from '../../screens/profile/UpdatePost';
import TechSupporOrFAQScreen from '../../screens/profile/TechSupportOrFAQScreen';
import FAQScreen from '../../screens/profile/FAQScreen';
import { Question, QuestionCategory } from '../../screens/profile/interfaces';
import FAQCategoryScreen from '../../screens/profile/FAQCategoryScreen';
import QuestionScreen from '../../screens/profile/QuestionScreen';
import TechSupportScreen from '../../screens/profile/TechSupportScreen';
import SupportCameraOrGalleryScreen from '../../screens/profile/SupportCameraOrGallery';
import TechFromGalleryScreen from '../../screens/profile/TechFromGallery';
import { FileInterface } from '../../screens/wishCreating/interfaces';
import TechFileConfirmationScreen from '../../screens/profile/TechFileConfirmation';

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
  UpdateEmail: undefined;
  ProfileEmailConfirmation: { email: string }
  ProfilePremium: undefined;
  UpdateAddress: undefined;
  UpdatePost: undefined;
  TechSupporOrFAQ: undefined;
  FAQ: undefined;
  FAQCategory: { category: QuestionCategory };
  Question: { question: Question, categoryTitle: string };
  TechSupport: undefined;
  SupportCameraOrGallery: undefined; 
  TechFromGallery: undefined;
  TechFileConfirmation: { file: FileInterface };
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
    <ProfileStack.Screen name="UpdateEmail" component={UpdateEmailScreen} />
    <ProfileStack.Screen name="ProfileEmailConfirmation" component={ProfileEmailConfirmationScreen}/>
    <ProfileStack.Screen name="ProfilePremium" component={ProfilePremiumScreen}/>
    <ProfileStack.Screen name="UpdateAddress" component={UpdateAddressScreen}/>
    <ProfileStack.Screen name="UpdatePost" component={UpdatePostScreen}/>
    <ProfileStack.Screen name="TechSupporOrFAQ" component={TechSupporOrFAQScreen}/>
    <ProfileStack.Screen name="FAQ" component={FAQScreen}/>
    <ProfileStack.Screen name="FAQCategory" component={FAQCategoryScreen}/>
    <ProfileStack.Screen name="Question" component={QuestionScreen}/>
    <ProfileStack.Screen name="TechSupport" component={TechSupportScreen} />
    <ProfileStack.Screen name="SupportCameraOrGallery" component={SupportCameraOrGalleryScreen} />
    <ProfileStack.Screen name="TechFromGallery" component={TechFromGalleryScreen} />
    <ProfileStack.Screen name="TechFileConfirmation" component={TechFileConfirmationScreen}/>
  </ProfileStack.Navigator>
);

export default ProfileStackScreen;
