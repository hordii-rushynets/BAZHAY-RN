import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { Text } from 'react-native';
import { Providers } from './components/Providers';
import RootNavigator from './components/RootNavigator';
import { useAuth } from './contexts/AuthContext';

export default function App() {
  return (
    <Providers>
      <RootNavigator />
    </Providers>
  );
}
