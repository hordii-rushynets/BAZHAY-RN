import React, { ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import generalStyles from "../generalStyles"

export default function ScreenContainer({ children } : { children: ReactNode }) {
  return (
    <SafeAreaView style={generalStyles.screenContainer}>
        {children}
    </SafeAreaView>
  );
}