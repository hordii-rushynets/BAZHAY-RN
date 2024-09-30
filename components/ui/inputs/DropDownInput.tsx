import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import DesignedText from '../DesignedText';
import ArrowDown from '../icons/ArrowDown';
import styles from '../generalStyles';
import { ScrollView } from 'react-native-gesture-handler';

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
          {isDropdownVisible && <ScrollView style={{ maxHeight: 80 }} contentContainerStyle={{ gap: 8 }} persistentScrollbar={true}>
            {options.map((value, indx) => {
              if (value === selectedValue) {
                return <View key={indx}></View>
              }
              else {
                return (
                  <TouchableOpacity key={indx} style={styles.dropdownItem} onPress={() => {handleValueSelect(value)}}>
                    <DesignedText >{value}</DesignedText>
                  </TouchableOpacity>
                );
              }
            })}
          </ScrollView>}
    </View>
  );
};

export default DropDownInput;
