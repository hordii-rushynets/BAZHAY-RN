import React from "react";
import styles from "../../screens/wishCreating/styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import DesignedText from "../ui/DesignedText";
import { View } from "react-native";
import { useLocalization } from "../../contexts/LocalizationContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../RootNavigator";
import { useNavigation } from "@react-navigation/native";

type PremiumBottomNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

export function PremiumBottomButtons() {
  const { staticData } = useLocalization();
  const navigation = useNavigation<PremiumBottomNavigationProp>();

  return (
    <View style={styles.premiumBottomButtonsContainer}>
        <TouchableOpacity>
            <DesignedText size="small" isUppercase={false} style={styles.premiumBottonButton}>{staticData.wishCreating.premiumBottomButtons.first}</DesignedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate("TermsOfUse") }}>
            <DesignedText size="small" isUppercase={false} style={styles.premiumBottonButton}>{staticData.wishCreating.premiumBottomButtons.second}</DesignedText>
        </TouchableOpacity>
    </View>
  );
}
