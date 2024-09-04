import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BrandScreen from '../../screens/home/BrandScreen';
import ArticleScreen from '../../screens/home/ArticleScreen';

export type HomeStackParamList = {
    Brand: { slug: string };
    Article: { slug: string };
};

const HomeStack = createStackNavigator<HomeStackParamList>();

const HomeStackScreen: React.FC = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="Brand" component={BrandScreen}/>
    <HomeStack.Screen name="Article" component={ArticleScreen}/>
  </HomeStack.Navigator>
);

export default HomeStackScreen;
