
import React, { createContext, useContext, useState } from "react";

export type PremiumButtonsContext = {
  onCancel: () => void;
  onGetPremium: () => void;
  setOnCancel: (action: () => void) => void;
  setOnGetPremium: (action: () => void) => void;
};

const defaultPremiumButtonsValues = {
    onCancel: () => {},
    onGetPremium: () => {},
    setOnCancel: () => {},
    setOnGetPremium: () => {},
};

const PremiumButtonsContext = createContext<PremiumButtonsContext>(defaultPremiumButtonsValues);

export type PremiumButtonsProviderProps = {
  children?: React.ReactNode;
};

export function PremiumButtonsProvider(props: PremiumButtonsProviderProps) {
  const { children } = props;
  const [onCancel, setOnCancel] = useState(() => () => {});
  const [onGetPremium, setOnGetPremium] = useState(() => () => {});

  return (
    <PremiumButtonsContext.Provider
      value={{
        onCancel,
        setOnCancel,
        onGetPremium,
        setOnGetPremium
      }}
    >
      {children}
    </PremiumButtonsContext.Provider>
  );
}

export function usePremiumButtonsContext() {
  return useContext(PremiumButtonsContext);
}
