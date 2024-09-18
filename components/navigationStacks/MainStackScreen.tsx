import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../../screens/main/HomeScreen';
import SearchScreen from '../../screens/main/SearchScreen';
import ProfileScreen from '../../screens/main/ProfileScreen';
import CommunityScreen from '../../screens/main/CommunityScreen';
import { TabBar } from '../Main/TabBar';
import AddWishPopUp from '../WishCreating/AddWishPopUp';
import { userType } from '../../screens/main/interfaces';

export type MainStackParamList = {
    Home: undefined;
    Search: undefined;
    Center: undefined;
    Community: { mode?: userType };
    Profile: { userId?: string };
    CommunityProfile: { userId?: string };
};

const Tab = createBottomTabNavigator<MainStackParamList>();

const MainStackScreen: React.FC = () => {
  const [ showPopUp, setShowPopUp ] = useState(false);

  return (
  <>
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <TabBar {...props} setShowPopUp={setShowPopUp} showPopUp={showPopUp}/>}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Center" component={CenterFunc} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="CommunityProfile" component={ProfileScreen} options={{ unmountOnBlur: true }}/>
    </Tab.Navigator>
    {showPopUp && <AddWishPopUp />}
  </>
  );
};

export default MainStackScreen;

function CenterFunc() {
  return null;
};
