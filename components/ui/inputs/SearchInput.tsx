import React, { useState } from 'react';
import { Keyboard, StyleProp, TextInput, TextStyle, TouchableOpacity, View } from "react-native";
import styles from '../generalStyles'
import DesignedText from '../DesignedText';
import CrissCross from '../icons/CrissCross';
import Loupe from '../icons/Loupe';

type SearchInputProps = {
    placeholder: string;
    value: string | undefined;
    error: string | undefined;
    onChange: (text: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    style?: StyleProp<TextStyle>;
}

export default function SearchInput({ placeholder, value, error, onChange, onFocus = () => {}, onBlur = () => {}, style = null }: SearchInputProps) {
  const [isInFocus, setIsInFocus] = useState(false);

  return (
    <>
      <View style={styles.textInputWithArrowContainer}>
        <View style={[styles.textInputWithArrow, style ? style : {}]}>
            <View style={{alignSelf: "center"}}>
                <Loupe />
            </View>
            <TextInput 
              placeholder={placeholder}
              value={value}
              onChangeText={onChange}
              onFocus={() => {
                setIsInFocus(true);
                onFocus();
              }}
              onBlur={() => {
                setIsInFocus(false);
                onBlur();
              }}
            />
        </View>
        {(isInFocus || value) && <TouchableOpacity onPress={() => { setIsInFocus(false); Keyboard.dismiss(); onChange("") }} style={{alignSelf: "center"}}>
          <View>
            <CrissCross />
          </View>
          </TouchableOpacity>}
      </View>
      <DesignedText isUppercase={false} size={"small"} style={styles.textInputWithArrowError}>
          {error}
      </DesignedText>
    </>
  );
}