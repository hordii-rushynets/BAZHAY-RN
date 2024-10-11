import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { LocalizationProvider } from "../contexts/LocalizationContext";
import { WishCreatingProvider } from "../contexts/WishCreatingContext";
import { PopUpMessageProvider } from "../contexts/PopUpMessageContext";
import { NotificationProvider } from "../contexts/NotificationContext";
import { PopUpWithTwoOptionsProvider } from "../contexts/PopUpWithTwoOptionsContext";
import { MessageProvider } from "../contexts/MessageContext";

export type ContextProvidersProps = {
  children: React.ReactNode;
};

export function Providers(props: ContextProvidersProps) {
  const { children } = props;
  return (
    <NotificationProvider>
      <AuthProvider>
        <LocalizationProvider>
          <WishCreatingProvider>
            <PopUpMessageProvider>
              <PopUpWithTwoOptionsProvider>
                <MessageProvider>
                  {children}
                </MessageProvider>
              </PopUpWithTwoOptionsProvider>
            </PopUpMessageProvider>
          </WishCreatingProvider>
        </LocalizationProvider>
      </AuthProvider>
    </NotificationProvider>
  );
}
