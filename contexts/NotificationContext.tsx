import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import config from '../config.json'
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Notification {
  button?: Button[];
  message_uk: string;
  message_en: string;
  is_button?: boolean;
}

export interface Button {
  request: {
    body: Object;
    url: string;
  };
  text_en: string;
  text_uk: string;
  response_ok_text: {
    ok_text_en: string,
    ok_text_uk: string
  },
  response_not_ok_text: {
    not_ok_text_en: string,
    not_ok_text_uk: string
  }
}

export interface NotificationContextData {
    notifications: Notification[];
    hasUnread: boolean;
    markAllAsRead: () => void;
    reconnect: () => void;
    sendNotification: (message: Notification) => void;
}

const NotificationContext = createContext<NotificationContextData | undefined>(undefined);

interface NotificationProviderProps {
    children: ReactNode;
  }

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [hasUnread, setHasUnread] = useState(false);
  const [reconnectToogle, setReconnectToogle] = useState(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('AccessToken').then(token => {
      const newSocket = new WebSocket(`ws://${config.apiUrl.split("/").at(-1)}/ws/notifications/?token=${token}`);

      newSocket.onopen = async () => {
        console.log('WebSocket підключено');
      };
  
      newSocket.onmessage = (event) => {
        const notification = JSON.parse(event.data);
        console.log('Message received through WebSocket:', notification.message);
        setNotifications((prev) => [...prev, notification.message]);
        setHasUnread(true);
      };
  
      newSocket.onerror = (error) => {
        console.log('WebSocket помилка:', error);
      };
  
      newSocket.onclose = () => {
        console.log('WebSocket закрито');
      };
  
      setSocket(newSocket);

      return () => {
        newSocket.close();
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

  const sendNotification = (message: Notification) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({
        message: message
      }));
      console.log('Message sent through WebSocket:', message);
    } else {
      console.log('WebSocket is not open');
    }
  };

  return (
    <NotificationContext.Provider value={{ notifications, hasUnread, markAllAsRead, reconnect, sendNotification }}>
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
