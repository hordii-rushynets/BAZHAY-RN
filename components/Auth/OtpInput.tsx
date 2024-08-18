import React, { useEffect } from 'react';
import { View } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import DesignedText from '../ui/DesignedText';
import styles from '../../screens/auth/styles';

const CELL_COUNT = 6;

type OtpInputProps = {
    onSubmit: () => void;
}

const OtpInput = ({ onSubmit }: OtpInputProps) => {
  const [value, setValue] = React.useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    if (value.length === 6) {
        onSubmit();
    }
  }, [value]);

  return (
    <View style={styles.otpInputRoot}>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[styles.otpInputCellRoot, isFocused && styles.otpInputFocusCell]}>
            <DesignedText style={styles.otpInputCellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </DesignedText>
          </View>
        )}
      />
    </View>
  );
};

export default OtpInput;
