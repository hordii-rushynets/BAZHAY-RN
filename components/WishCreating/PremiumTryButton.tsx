import React from "react";
import styles from "../../screens/wishCreating/styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import DesignedText from "../ui/DesignedText";
import { View } from "react-native";
import { useLocalization } from "../../contexts/LocalizationContext";

type PremiumTryButtonProps = {
    onPress: () => void;
}

export function PremiumTryButton({ onPress }: PremiumTryButtonProps) {
  const { staticData } = useLocalization();

  return (
    <TouchableOpacity onPress={onPress}>
        <View style={styles.premiumTryButtonContainer}>
            <DesignedText style={styles.premiumTryButtonTitle}>{staticData.wishCreating.premiumTryButton.title} </DesignedText>
            <DesignedText size="small" isUppercase={false} style={styles.premiumTryButtonSpan}>{staticData.wishCreating.premiumTryButton.span}</DesignedText>
        </View>
    </TouchableOpacity>
  );
}
