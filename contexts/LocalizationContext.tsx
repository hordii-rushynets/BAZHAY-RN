import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import uk from "../locals/uk/data";
import en from "../locals/en/data";
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface LocalizationContextType {
  localization: string;
  setLocalization: (value: string) => void;
  staticData: any;
}

const translations = {
    "en": en,
    "uk": uk
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

interface LocalizationProviderProps {
  children: ReactNode;
}

export const LocalizationProvider = ({ children }: LocalizationProviderProps) => {
  const [localization, setLocalization] = useState<string>("");
  const [staticData, setStaticData] = useState<any>(uk);

  useEffect(() => {
    AsyncStorage.getItem("BAZHAYlocals").then(local => {
      const userLanguage = local || Localization.getLocales()[0].languageCode || "uk"
      setLocalization(userLanguage);
    })
  }, [])

  useEffect(() => {
    if (localization !== "") {
      AsyncStorage.setItem("BAZHAYlocals", localization)
  
      if (translations[localization as keyof typeof translations]) {
        setStaticData(translations[localization as keyof typeof translations]);
      }
    }
  }, [localization]);

  return (
    <LocalizationContext.Provider value={{ localization, setLocalization, staticData }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = (): LocalizationContextType => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used within an LocalizationProvider');
  }
  return context;
};
