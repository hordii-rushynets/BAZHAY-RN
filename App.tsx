import React from 'react';
import { Providers } from './components/Providers';
import RootNavigator from './components/RootNavigator';
import { PopUpMessage } from './components/PopUpMessage';

export default function App() {
  return (
    <Providers>
      <RootNavigator />
      <PopUpMessage />
    </Providers>
  );
}
