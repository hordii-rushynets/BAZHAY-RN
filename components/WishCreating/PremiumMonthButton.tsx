import React from "react";
import styles from "../../screens/wishCreating/styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import DesignedText from "../ui/DesignedText";
import { View } from "react-native";
import { useLocalization } from "../../contexts/LocalizationContext";

type PremiumMonthButtonProps = {
    onPress: () => void;
}

export function PremiumMonthButton({onPress}: PremiumMonthButtonProps) {
  const { staticData } = useLocalization();

  return (
    <TouchableOpacity onPress={onPress}>
        <View style={styles.premiumMonthButtonContainer}>
            <DesignedText>{staticData.wishCreating.premiumMonthButton}</DesignedText>
            <DesignedText size="small">2,99 USD</DesignedText>
        </View>
    </TouchableOpacity>
  );
}
