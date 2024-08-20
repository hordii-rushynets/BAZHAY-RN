import React, { ReactNode, useState } from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";
import styles from '../generalStyles'
import Checkmark from '../icons/Checkmark';

type CheckBoxProps = {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    children?: ReactNode;
    style?: StyleProp<ViewStyle>;
}

export default function CheckBox({ checked = false, onChange, children, style = null }: CheckBoxProps) {
    const toggleCheckbox = () => {
      if (onChange) {
        onChange(!checked);
      }
    };
  
    return (
      <TouchableOpacity onPress={toggleCheckbox} style={[styles.checkBoxContainer, style ? style : {}]}>
        <View style={styles.checkbox}>
          {checked && <Checkmark />}
        </View>
        <View>
          {children}
        </View>
      </TouchableOpacity>
    );
  };