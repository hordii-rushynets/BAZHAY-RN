import React from "react";
import { View } from "react-native";
import DesignedText from "../ui/DesignedText";
import Logo from "../ui/icons/Logo";
import SubmitButton from "../ui/buttons/SubmitButton";
import styles from "../../screens/main/styles";

export default function PremiumProfileAdvert() {
    return (
        <View style={styles.premiumProfileAdvertContainer}>
            <DesignedText>підпишись на <DesignedText italic={true} bold={true}>преміум</DesignedText></DesignedText>
            <Logo />
            <DesignedText size="small" style={styles.premiumProfileAdvertText}>Насолоджуйся усіма <DesignedText size="small" italic={true} style={styles.premiumProfileAdvertText}>преміум</DesignedText>-функціями та доступами. Спробуй тиждень безкоштовно</DesignedText>
            <SubmitButton onPress={() => {}} width={304} style={styles.premiumProfileAdvertButton} textStyle={styles.premiumProfileAdvertButtonText}>Спробувати безкоштовно</SubmitButton>
            <DesignedText size="small" isUppercase={false} style={styles.premiumProfileAdvertText}>7-ми денний пробний період, потім 9,99 USD на рік 0,83 USD в місяць</DesignedText>
        </View>
    );
}