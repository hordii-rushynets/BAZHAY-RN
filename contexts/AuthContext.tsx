import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AccountService } from '../screens/auth/services';

export interface AuthContextData {
  isAuthenticated: boolean;
  hasSeenWelcome: boolean;
  isAccountFilled: boolean;
  checkAuth: () => Promise<void>;
  login: (access: string, refresh: string) => void;
  logout: () => void;
  refreshToken: () => void;
  completeWelcome: () => void;
  completeFillingAccount: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [hasSeenWelcome, setHasSeenWelcome] = useState<boolean>(false);
  const [isAccountFilled, setIsAccountFilled] = useState<boolean>(false);
  const accountService = new AccountService();

  const checkAuth = async () => {
    try {
      const seenWelcome = await AsyncStorage.getItem('hasSeenWelcome');
      setHasSeenWelcome(seenWelcome === 'true');
      const accountFilled = await AsyncStorage.getItem('accountFilled');
      setIsAccountFilled(accountFilled === 'true');
    } catch (error) {
      console.error('Failed to load welcome state:', error);
    }
  };

  const login = async (access: string, refresh: string) => {
    try {
      await AsyncStorage.setItem('AccessToken', access);
      await AsyncStorage.setItem('RefreshToken', refresh);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Failed to set authenticated state:', error);
    }
  };
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('AccessToken');
      await AsyncStorage.removeItem('RefreshToken');
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Failed to set authenticated state:', error);
    }
  };

  const refreshToken = async () => {
    const token = await AsyncStorage.getItem("RefreshToken");
    accountService.refreshToken(token || "").then(async tokens => {
      if (tokens.access === "") {
        logout();
        return
      }
      await AsyncStorage.setItem("AccessToken", tokens.access);
    })
  }

  const completeWelcome = async () => {
    try {
      await AsyncStorage.setItem('hasSeenWelcome', 'true');
      setHasSeenWelcome(true);
    } catch (error) {
      console.error('Failed to set welcome state:', error);
    }
  };

  const completeFillingAccount = async () => {
    try {
      await AsyncStorage.setItem('accountFilled', 'true');
      setIsAccountFilled(true);
    } catch (error) {
      console.error('Failed to set account filled:', error);
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, hasSeenWelcome, isAccountFilled, checkAuth, login, logout, refreshToken, completeWelcome, completeFillingAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
