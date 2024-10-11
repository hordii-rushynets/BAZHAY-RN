import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import config from '../config.json'
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Notification {
  button: Button[];
  message_uk: string;
  message_en: string;
}

export interface Button {
  request: {
    body: Object;
    url: string;
  };
  text: string;
}

export interface NotificationContextData {
    notifications: Notification[];
    hasUnread: boolean;
    markAllAsRead: () => void;
    reconnect: () => void;
}

const NotificationContext = createContext<NotificationContextData | undefined>(undefined);

interface NotificationProviderProps {
    children: ReactNode;
  }

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [hasUnread, setHasUnread] = useState(false);
  const [reconnectToogle, setReconnectToogle] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('AccessToken').then(token => {
      const socket = new WebSocket(`ws://${config.apiUrl.split("/").at(-1)}/ws/notifications/?token=${token}`);

      socket.onopen = async () => {
        console.log('WebSocket підключено');
      };
  
      socket.onmessage = (event) => {
        const notification = JSON.parse(event.data);
        console.log(notification.message.button[0].request)
        setNotifications((prev) => [...prev, notification.message]);
        setHasUnread(true);
      };
  
      socket.onerror = (error) => {
        console.log('WebSocket помилка:', error);
      };
  
      socket.onclose = () => {
        console.log('WebSocket закрито');
      };
  
      return () => {
        socket.close();
      };
    });
  }, [reconnectToogle]);

  const reconnect = () => {
    setReconnectToogle(!reconnectToogle);
  }

  const markAllAsRead = () => {
    setNotifications([]);
    setHasUnread(false);
  };

  return (
    <NotificationContext.Provider value={{ notifications, hasUnread, markAllAsRead, reconnect }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextData => {
    const context = useContext(NotificationContext);
    if (!context) {
      throw new Error('useNotifications must be used within an NotificationProvider');
    }
    return context;
  };
