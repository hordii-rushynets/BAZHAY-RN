import React, { useState } from 'react';
import { StyleProp, TextInput, TextStyle, TouchableOpacity, View } from "react-native";
import styles from '../generalStyles'
import ArrowRight from '../icons/ArrowRight';
import DesignedText from '../DesignedText';

type TextFieldInputProps = {
    placeholder: string;
    value: string | undefined;
    error: string | undefined;
    onChange: (text: string) => void;
    onSubmit: () => void;
    numberOfLines?: number;
    style?: StyleProp<TextStyle>;
}

export default function TextFieldInput({ placeholder, value, error, numberOfLines = 6, onChange, onSubmit, style = null }: TextFieldInputProps) {
  const [isInFocus, setIsInFocus] = useState(false);

  return (
    <>
      <View style={styles.textFieldInputContainer}>
        <TextInput 
          style={[styles.textFieldInput, style ? style : {}]}
          placeholder={placeholder}
          value={value}
          multiline={true}
          numberOfLines={numberOfLines}
          onChangeText={onChange}
          onFocus={() => {
            setIsInFocus(true);
          }}
          onBlur={() => {
            setIsInFocus(false);
          }}
        />
        <View style={styles.textFieldInputBottomContainer}>
            <DesignedText isUppercase={false} size={"small"} style={styles.textInputWithArrowError}>
              {error}
            </DesignedText>
            {(isInFocus || value) && <TouchableOpacity onPress={onSubmit}>
              <View style={styles.arrowContainer}>
                <ArrowRight />
              </View>
              </TouchableOpacity>}
        </View>
      </View>
    </>
  );
}