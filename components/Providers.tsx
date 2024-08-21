import React from "react";
import { AuthProvider } from "../contexts/AuthContext";

export type ContextProvidersProps = {
  children: React.ReactNode;
};

export function Providers(props: ContextProvidersProps) {
  const { children } = props;
  return (
    <AuthProvider>
        {children}
    </AuthProvider>
  );
}
