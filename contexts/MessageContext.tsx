
import React, { createContext, useContext, useState } from "react";

export type MessageContext = {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  text: string;
  setText: (v: string) => void;
};

const defaultMessageValues = {
    isOpen: false,
    setIsOpen: () => {},
    text: "",
    setText: () => {},
};

const MessageContext = createContext<MessageContext>(defaultMessageValues);

export type MessageProviderProps = {
  children?: React.ReactNode;
};

export function MessageProvider(props: MessageProviderProps) {
  const { children } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [text, setText] = useState("");

  return (
    <MessageContext.Provider
      value={{
        isOpen,
        setIsOpen,
        text,
        setText,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}

export function useMessageContext() {
  return useContext(MessageContext);
}
