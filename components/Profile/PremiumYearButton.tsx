import React from "react";
import styles from "../../screens/wishCreating/styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import DesignedText from "../ui/DesignedText";
import { View } from "react-native";

type PremiumYearButtonProps = {
    onPress: () => void;
}

export function PremiumYearButton({ onPress }: PremiumYearButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
        <View style={[styles.premiumTryButtonContainer, { flexDirection: "row", justifyContent: "space-between"}]}>
            <View>
                <DesignedText style={styles.premiumTryButtonTitle}>на рік </DesignedText>
                <DesignedText size="small" isUppercase={false} style={styles.premiumTryButtonSpan}>0,83 USD в місяць</DesignedText>
            </View>
            <DesignedText style={styles.premiumTryButtonTitle}>9,99 USD</DesignedText>
        </View>
    </TouchableOpacity>
  );
}
