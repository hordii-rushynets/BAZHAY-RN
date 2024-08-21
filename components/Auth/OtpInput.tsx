import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import DesignedText from '../ui/DesignedText';
import styles from '../../screens/auth/styles';
import generalStyles from '../ui/generalStyles'
import { AccountService } from '../../screens/auth/services';

const CELL_COUNT = 6;

type OtpInputProps = {
    email: string;
    onConfirm: (token: { access: string, refresh: string }) => void;
}

const OtpInput = ({ email, onConfirm }: OtpInputProps) => {
  const [value, setValue] = React.useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [ error, setError ] = useState<string | undefined>();

  const accountService = new AccountService();

  useEffect(() => {
    if (value.length === 6) {
        accountService.otpConfirm(email, value).then(token => {
          if (token.access !== "" && token.refresh !== "") {
            onConfirm({access: token.access, refresh: token.refresh});
          }
          else {
            setError("Код підтвердження не вірний");
          }
        })
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
      <DesignedText isUppercase={false} size={"small"} style={generalStyles.textInputWithArrowError}>
          {error}
      </DesignedText>
    </View>
  );
};

export default OtpInput;
