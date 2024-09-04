import React, { ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import generalStyles from "./generalStyles"
import { StyleProp, ViewStyle } from 'react-native';

export default function ScreenContainer({ children, style = null } : { children: ReactNode, style?: StyleProp<ViewStyle> }) {
  return (
    <SafeAreaView style={[generalStyles.screenContainer, style]}>
        {children}
    </SafeAreaView>
  );
}