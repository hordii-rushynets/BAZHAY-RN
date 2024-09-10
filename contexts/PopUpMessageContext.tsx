
import React, { createContext, useContext, useState } from "react";

export type PopUpMessageContext = {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  text: string;
  setText: (v: string) => void;
  buttonText: string;
  setButtonText: (v: string) => void;
  buttonAction: () => void;
  setButtonAction: (action: () => void) => void;
  width: number;
  setWidth: (v: number) => void;
};

const defaultPopUpMessageValues = {
    isOpen: false,
    setIsOpen: () => {},
    text: "",
    setText: () => {},
    buttonText: "",
    setButtonText: () => {},
    buttonAction: () => {},
    setButtonAction: () => {},
    width: 280,
    setWidth: () => {},
};

const PopUpMessageContext = createContext<PopUpMessageContext>(defaultPopUpMessageValues);

export type PopUpMessageProviderProps = {
  children?: React.ReactNode;
};

export function PopUpMessageProvider(props: PopUpMessageProviderProps) {
  const { children } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [text, setText] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [buttonAction, setButtonAction] = useState(() => () => {});
  const [width, setWidth] = useState(280);

  return (
    <PopUpMessageContext.Provider
      value={{
        isOpen,
        setIsOpen,
        text,
        setText,
        buttonText,
        setButtonText,
        buttonAction,
        setButtonAction,
        width, 
        setWidth
      }}
    >
      {children}
    </PopUpMessageContext.Provider>
  );
}

export function usePopUpMessageContext() {
  return useContext(PopUpMessageContext);
}
