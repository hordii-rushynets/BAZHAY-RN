import React from "react";
import styles from "../../screens/wishCreating/styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import DesignedText from "../ui/DesignedText";
import { View } from "react-native";
import { useLocalization } from "../../contexts/LocalizationContext";

type PremiumYearButtonProps = {
    onPress: () => void;
}

export function PremiumYearButton({ onPress }: PremiumYearButtonProps) {
  const { staticData } = useLocalization();

  return (
    <TouchableOpacity onPress={onPress}>
        <View style={[styles.premiumTryButtonContainer, { flexDirection: "row", justifyContent: "space-between"}]}>
            <View>
                <DesignedText style={styles.premiumTryButtonTitle}>{staticData.profile.premiumYearButton.title} </DesignedText>
                <DesignedText size="small" isUppercase={false} style={styles.premiumTryButtonSpan}>{staticData.profile.premiumYearButton.span}</DesignedText>
            </View>
            <DesignedText style={styles.premiumTryButtonTitle}>{staticData.profile.premiumYearButton.price}</DesignedText>
        </View>
    </TouchableOpacity>
  );
}
