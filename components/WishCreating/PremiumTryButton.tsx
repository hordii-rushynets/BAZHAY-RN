import React from "react";
import styles from "../../screens/wishCreating/styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import DesignedText from "../ui/DesignedText";
import { View } from "react-native";

type PremiumTryButtonProps = {
    onPress: () => void;
}

export function PremiumTryButton({ onPress }: PremiumTryButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
        <View style={styles.premiumTryButtonContainer}>
            <DesignedText style={styles.premiumTryButtonTitle}>Спробувати безкоштовно </DesignedText>
            <DesignedText size="small" isUppercase={false} style={styles.premiumTryButtonSpan}>7-ми денний пробний період, потім 9,99 USD на рік (0,83 USD в місяць)</DesignedText>
        </View>
    </TouchableOpacity>
  );
}
