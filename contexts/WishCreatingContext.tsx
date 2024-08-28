import React, { createContext, useState, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AccountService } from '../screens/auth/services';
import Constants from 'expo-constants';

export interface WishCreatingContextData {
  wishId: string | undefined;
  setWishId: (v: string | undefined) => void;
}

const WishCreatingContext = createContext<WishCreatingContextData | undefined>(undefined);

interface WishCreatingProviderProps {
  children: ReactNode;
}

export const WishCreatingProvider: React.FC<WishCreatingProviderProps> = ({ children }) => {
  const [wishId, setWishId] = useState<string | undefined>();

  return (
    <WishCreatingContext.Provider value={{ wishId, setWishId }}>
      {children}
    </WishCreatingContext.Provider>
  );
};

export const useWishCreating = (): WishCreatingContextData => {
  const context = useContext(WishCreatingContext);
  if (!context) {
    throw new Error('useWishCreating must be used within an AuthProvider');
  }
  return context;
};
