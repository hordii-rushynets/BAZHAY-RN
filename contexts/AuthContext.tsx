import React, { createContext, useState, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AccountService } from '../screens/auth/services';
import config from "../config.json"

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

      const isAuth = await checkIfUserAuthenticated();
      setIsAuthenticated(isAuth);

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
    const accessToken = await AsyncStorage.getItem('AccessToken');
    const apiUrl = config.apiUrl
    const response = await fetch(`${apiUrl}/api/account/user/`, {
      method: 'PUT',
      body: JSON.stringify({
        is_already_registered: true
      }),
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${accessToken}`,
      }
    })

    if (response.ok) {
      setIsAccountFilled(true)
    }
  }

  async function checkIfUserAuthenticated(): Promise<boolean> {
      const accessToken = await AsyncStorage.getItem('AccessToken');
      const apiUrl = config.apiUrl
      let response = await fetch(`${apiUrl}/api/account/user/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      });
    
      if (response.status === 401) {
        await refreshToken();
        const newAccessToken = await AsyncStorage.getItem('AccessToken');
        response = await fetch(`${apiUrl}/api/account/user/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${newAccessToken}`,
        }
      });
      }

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setIsAccountFilled(data.is_already_registered)
      }
    
      return response.ok;
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
