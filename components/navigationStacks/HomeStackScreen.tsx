import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BrandScreen from '../../screens/home/BrandScreen';
import ArticleScreen from '../../screens/home/ArticleScreen';
import NotificationsScreen from '../../screens/home/NotificationsScreen';

export type HomeStackParamList = {
    Brand: { slug: string };
    Article: { slug: string };
    Notifications: undefined;
};

const HomeStack = createStackNavigator<HomeStackParamList>();

const HomeStackScreen: React.FC = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="Brand" component={BrandScreen}/>
    <HomeStack.Screen name="Article" component={ArticleScreen}/>
    <HomeStack.Screen name="Notifications" component={NotificationsScreen}/>
  </HomeStack.Navigator>
);

export default HomeStackScreen;
