import React, { useState } from 'react';
import { StyleProp, TextInput, TextStyle, TouchableOpacity, View } from "react-native";
import styles from '../generalStyles'
import ArrowRight from '../icons/ArrowRight';

type TextInputWithArrowProps = {
    placeholder: string;
    value: string | undefined;
    onChange: (text: string) => void;
    onSubmit: () => void;
    style?: StyleProp<TextStyle>;
}

export default function TextInputWithArrow({ placeholder, value, onChange, onSubmit, style = null }: TextInputWithArrowProps) {
  const [isInFocus, setIsInFocus] = useState(false);

  return (
    <View style={styles.textInputWithArrowContainer}>
      <TextInput 
        style={[styles.textInputWithArrow, style ? style : {}]}
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
      {(isInFocus || value) && <TouchableOpacity onPress={onSubmit}>
        <View style={styles.arrowContainer}>
          <ArrowRight />
        </View>
        </TouchableOpacity>}
    </View>
  );
}