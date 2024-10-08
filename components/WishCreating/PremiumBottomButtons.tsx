import React from "react";
import styles from "../../screens/wishCreating/styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import DesignedText from "../ui/DesignedText";
import { View } from "react-native";

export function PremiumBottomButtons() {
  return (
    <View style={styles.premiumBottomButtonsContainer}>
        <TouchableOpacity>
            <DesignedText size="small" isUppercase={false} style={styles.premiumBottonButton}>Відновити покупки</DesignedText>
        </TouchableOpacity>
        <TouchableOpacity>
            <DesignedText size="small" isUppercase={false} style={styles.premiumBottonButton}>Правила та умови</DesignedText>
        </TouchableOpacity>
    </View>
  );
}
