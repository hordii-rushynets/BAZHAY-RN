import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { LocalizationProvider } from "../contexts/LocalizationContext";
import { WishCreatingProvider } from "../contexts/WishCreatingContext";
import { PopUpMessageProvider } from "../contexts/PopUpMessageContext";

export type ContextProvidersProps = {
  children: React.ReactNode;
};

export function Providers(props: ContextProvidersProps) {
  const { children } = props;
  return (
    <AuthProvider>
      <LocalizationProvider>
        <WishCreatingProvider>
          <PopUpMessageProvider>
            {children}
          </PopUpMessageProvider>
        </WishCreatingProvider>
      </LocalizationProvider>
    </AuthProvider>
  );
}
