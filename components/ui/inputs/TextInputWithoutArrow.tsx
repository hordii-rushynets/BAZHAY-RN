import React, { useState } from 'react';
import { StyleProp, TextInput, TextStyle, View } from "react-native";
import styles from '../generalStyles'
import DesignedText from '../DesignedText';

type TextInputWithoutArrowProps = {
    placeholder: string;
    value: string | undefined;
    error: string | undefined;
    onChange: (text: string) => void;
    style?: StyleProp<TextStyle>;
}

export default function TextInputWithoutArrow({ placeholder, value, error, onChange, style = null }: TextInputWithoutArrowProps) {
  return (
    <>
      <View style={styles.textInputWithArrowContainer}>
        <TextInput 
          style={[styles.textInputWithArrow, style ? style : {}]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
        />
      </View>
      {error && <DesignedText isUppercase={false} size={"small"} style={styles.textInputWithArrowError}>
          {error}
      </DesignedText>}
    </>
  );
}