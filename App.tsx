import React from 'react';
import { Providers } from './components/Providers';
import RootNavigator from './components/RootNavigator';

export default function App() {
  return (
    <Providers>
      <RootNavigator />
    </Providers>
  );
}
