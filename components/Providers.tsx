import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { LocalizationProvider } from "../contexts/LocalizationContext";

export type ContextProvidersProps = {
  children: React.ReactNode;
};

export function Providers(props: ContextProvidersProps) {
  const { children } = props;
  return (
    <AuthProvider>
      <LocalizationProvider>
        {children}
      </LocalizationProvider>
    </AuthProvider>
  );
}
