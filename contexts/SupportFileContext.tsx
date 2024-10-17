
import React, { createContext, useContext, useState } from "react";
import { FileInterface } from "../screens/wishCreating/interfaces";

export type SupportFileContext = {
  file: FileInterface | undefined;
  setFile: (f: FileInterface | undefined) => void;
};

const defaultSupportFileValues = {
    file: undefined,
    setFile: () => {},
};

const SupportFileContext = createContext<SupportFileContext>(defaultSupportFileValues);

export type SupportFileProviderProps = {
  children?: React.ReactNode;
};

export function SupportFileProvider(props: SupportFileProviderProps) {
  const { children } = props;
  const [file, setFile] = useState<FileInterface | undefined>();

  return (
    <SupportFileContext.Provider
      value={{
        file, setFile
      }}
    >
      {children}
    </SupportFileContext.Provider>
  );
}

export function useSupportFileContext() {
  return useContext(SupportFileContext);
}
