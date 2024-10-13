import React from 'react';
import { Providers } from './components/Providers';
import RootNavigator from './components/RootNavigator';
import { PopUpMessage } from './components/PopUpMessage';
import { PopUpWithTwoOptions } from './components/PopUpWithTwoOptions';
import { Message } from './components/Message';

export default function App() {
  return (
    <Providers>
      <RootNavigator />
      <PopUpMessage />
      <PopUpWithTwoOptions />
      <Message />
    </Providers>
  );
}
