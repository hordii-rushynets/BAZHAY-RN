import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../../screens/home/HomeScreen';

export type AppStackParamList = {
    Home: undefined;
};

const AppStack = createStackNavigator<AppStackParamList>();

const AppStackScreen: React.FC = () => (
  <AppStack.Navigator screenOptions={{ headerShown: false }}>
    <AppStack.Screen name="Home" component={HomeScreen}/>
  </AppStack.Navigator>
);

export default AppStackScreen;
