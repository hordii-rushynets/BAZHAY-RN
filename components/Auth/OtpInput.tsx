import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import DesignedText from '../ui/DesignedText';
import styles from '../../screens/auth/styles';
import generalStyles from '../ui/generalStyles'
import { AccountService } from '../../screens/auth/services';
import { useLocalization } from '../../contexts/LocalizationContext';
import { useAuth } from '../../contexts/AuthContext';

const CELL_COUNT = 6;

type OtpInputProps = {
    email: string;
    onConfirm: (token: { access: string, refresh: string, is_already_registered: boolean }) => void;
    isUpdating?: boolean;
}

const OtpInput = ({ email, onConfirm, isUpdating = false }: OtpInputProps) => {
  const [value, setValue] = React.useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [ error, setError ] = useState<string | undefined>();

  const accountService = new AccountService();

  const { staticData } = useLocalization();
  const authContext = useAuth();

  useEffect(() => {
    if (value.length === 6) {
      if (isUpdating) {
        accountService.updateOtpConfirm(email, value, authContext).then(success => {
          if (success) {
            onConfirm({ access: "", refresh: "", is_already_registered: false });
          }
          else {
            setError(staticData.auth.otpInput.otpError);
          }
        })
      }
      else {
        accountService.otpConfirm(email, value).then(token => {
          if (token.access !== "" && token.refresh !== "") {
            onConfirm({access: token.access, refresh: token.refresh, is_already_registered: token.is_already_registered});
          }
          else {
            setError(staticData.auth.otpInput.otpError);
          }
        })
      }
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
