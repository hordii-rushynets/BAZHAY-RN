import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import DesignedText from '../DesignedText';
import ArrowDown from '../icons/ArrowDown';
import styles from '../generalStyles';

type DropDownInputProps = {
  options: string[],
  defaultValue: string,
  onChange: (value: string) => void
}

const DropDownInput = ({options, defaultValue, onChange}: DropDownInputProps) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleValueSelect = (value: string) => {
    setSelectedValue(value);
    onChange(value);
    toggleDropdown();
  };

  return (
    <View style={[styles.dropdownContainer, isDropdownVisible && styles.dropdownVisibleContiner]}>
      <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
        <DesignedText>{selectedValue}</DesignedText>
        <ArrowDown />
      </TouchableOpacity>
      {isDropdownVisible && options.map((value, indx) => {
        if (value === selectedValue) {
          return <></>
        }
        else {
          return (
            <TouchableOpacity key={indx} style={styles.dropdownItem} onPress={() => {handleValueSelect(value)}}>
              <DesignedText>{value}</DesignedText>
            </TouchableOpacity>
          );
        }
      })}
    </View>
  );
};

export default DropDownInput;
