import React, { ReactNode, useState } from 'react';
import { NativeSyntheticEvent, TextInput, TextInputChangeEventData } from "react-native";
import generalStyles from '../../generalStyles'
import DesignedText from '../DesignedText';

type TextInputWithArrowProps = {
    placeholder: string;
    value: string | undefined;
    onChange: (text: string) => void;
}

export default function TextInputWithArrow({ placeholder, value, onChange }: TextInputWithArrowProps) {
  const [ioInFocus, setIsInFocus] = useState(false);

  return (
    <TextInput 
      placeholder={placeholder}
      value={value}
      onChangeText={onChange}
      onFocus={() => {
        setIsInFocus(true);
      }}
      onBlur={() => {
        setIsInFocus(false);
      }}
    />
  );
}