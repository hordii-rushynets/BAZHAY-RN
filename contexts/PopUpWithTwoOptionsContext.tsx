
import React, { createContext, ReactNode, useContext, useState } from "react";

export type PopUpWithTwoOptionsContext = {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  text: ReactNode;
  setText: (v: ReactNode) => void;
  cancelText: string;
  setCancelText: (v: string) => void;
  onCancel: () => void;
  setOnCancel: (action: () => void) => void;
  acceptText: string;
  setAcceptText: (v: string) => void;
  onAccept: () => void;
  setOnAccept: (action: () => void) => void;
};

const defaultPopUpWithTwoOptionsValues = {
    isOpen: false,
    setIsOpen: () => {},
    text: "",
    setText: () => {},
    cancelText: "",
    setCancelText: () => {},
    onCancel: () => {},
    setOnCancel: () => {},
    acceptText: "",
    setAcceptText: () => {},
    onAccept: () => {},
    setOnAccept: () => {}
};

const PopUpWithTwoOptionsContext = createContext<PopUpWithTwoOptionsContext>(defaultPopUpWithTwoOptionsValues);

export type PopUpWithTwoOptionsProviderProps = {
  children?: React.ReactNode;
};

export function PopUpWithTwoOptionsProvider(props: PopUpWithTwoOptionsProviderProps) {
  const { children } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [text, setText] = useState<ReactNode>(<></>);
  const [cancelText, setCancelText] = useState("");
  const [onCancel, setOnCancel] = useState(() => () => {});
  const [acceptText, setAcceptText] = useState("");
  const [onAccept, setOnAccept] = useState(() => () => {});

  return (
    <PopUpWithTwoOptionsContext.Provider
      value={{
        isOpen,
        setIsOpen,
        text,
        setText,
        cancelText,
        setCancelText,
        onCancel,
        setOnCancel,
        acceptText,
        setAcceptText,
        onAccept,
        setOnAccept
      }}
    >
      {children}
    </PopUpWithTwoOptionsContext.Provider>
  );
}

export function usePopUpWithTwoOptionsContext() {
  return useContext(PopUpWithTwoOptionsContext);
}
