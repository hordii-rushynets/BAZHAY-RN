import React, { ReactNode, useState } from 'react';
import { NativeSyntheticEvent, TextInput, TextInputChangeEventData, TouchableOpacity, View } from "react-native";
import generalStyles from '../generalStyles'
import DesignedText from '../DesignedText';
import styles from '../generalStyles'
import ArrowRight from '../ArrowRight';

type TextInputWithArrowProps = {
    placeholder: string;
    value: string | undefined;
    onChange: (text: string) => void;
    onSubmit: () => void;
}

export default function TextInputWithArrow({ placeholder, value, onChange, onSubmit }: TextInputWithArrowProps) {
  const [isInFocus, setIsInFocus] = useState(false);

  return (
    <View style={styles.textInputWithArrowContainer}>
      <TextInput 
        style={[styles.textInputWithArrow, isInFocus ? styles.textInputWithArrowFocused : {}]}
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
      {isInFocus && <TouchableOpacity onPress={onSubmit}>
        <View style={styles.arrowContainer}>
          <ArrowRight />
        </View>
        </TouchableOpacity>}
    </View>
  );
}