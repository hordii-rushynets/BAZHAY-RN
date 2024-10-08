
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
  showExit: boolean;
  setShowExit: (v: boolean) => void;
  exitAction: () => void;
  setExitAction: (action: () => void) => void;
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
    showExit: true,
    setShowExit: () => {},
    exitAction: () => {},
    setExitAction: () => {},
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
  const [exitAction, setExitAction] = useState(() => () => {});
  const [width, setWidth] = useState(280);
  const [showExit, setShowExit] = useState(true);

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
        exitAction,
        setExitAction,
        width, 
        setWidth,
        showExit,
        setShowExit
      }}
    >
      {children}
    </PopUpMessageContext.Provider>
  );
}

export function usePopUpMessageContext() {
  return useContext(PopUpMessageContext);
}
