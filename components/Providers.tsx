import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { LocalizationProvider } from "../contexts/LocalizationContext";
import { WishCreatingProvider } from "../contexts/WishCreatingContext";
import { PopUpMessageProvider } from "../contexts/PopUpMessageContext";
import { NotificationProvider } from "../contexts/NotificationContext";
import { PopUpWithTwoOptionsProvider } from "../contexts/PopUpWithTwoOptionsContext";
import { MessageProvider } from "../contexts/MessageContext";
import { PremiumButtonsProvider } from "../contexts/PremiumButtonsContext";
import { SupportFileProvider } from "../contexts/SupportFileContext";

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
                  <PremiumButtonsProvider>
                    <SupportFileProvider>
                      {children}
                    </SupportFileProvider>
                  </PremiumButtonsProvider>
                </MessageProvider>
              </PopUpWithTwoOptionsProvider>
            </PopUpMessageProvider>
          </WishCreatingProvider>
        </LocalizationProvider>
      </AuthProvider>
    </NotificationProvider>
  );
}
