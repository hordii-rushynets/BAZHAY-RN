import React from "react";
import styles from "../../screens/wishCreating/styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import DesignedText from "../ui/DesignedText";
import { View } from "react-native";
import { useLocalization } from "../../contexts/LocalizationContext";

export function PremiumBottomButtons() {
  const { staticData } = useLocalization();

  return (
    <View style={styles.premiumBottomButtonsContainer}>
        <TouchableOpacity>
            <DesignedText size="small" isUppercase={false} style={styles.premiumBottonButton}>{staticData.wishCreating.premiumBottomButtons.first}</DesignedText>
        </TouchableOpacity>
        <TouchableOpacity>
            <DesignedText size="small" isUppercase={false} style={styles.premiumBottonButton}>{staticData.wishCreating.premiumBottomButtons.second}</DesignedText>
        </TouchableOpacity>
    </View>
  );
}
