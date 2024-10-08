import React from "react";
import styles from "../../screens/wishCreating/styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import DesignedText from "../ui/DesignedText";
import { View } from "react-native";

type PremiumMonthButtonProps = {
    onPress: () => void;
}

export function PremiumMonthButton({onPress}: PremiumMonthButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
        <View style={styles.premiumMonthButtonContainer}>
            <DesignedText>місяць</DesignedText>
            <DesignedText size="small">2,99 USD</DesignedText>
        </View>
    </TouchableOpacity>
  );
}
