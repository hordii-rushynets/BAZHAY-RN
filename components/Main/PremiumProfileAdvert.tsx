import React from "react";
import { View } from "react-native";
import DesignedText from "../ui/DesignedText";
import Logo from "../ui/icons/Logo";
import SubmitButton from "../ui/buttons/SubmitButton";
import styles from "../../screens/main/styles";
import { useLocalization } from "../../contexts/LocalizationContext";

export default function PremiumProfileAdvert() {
    const { staticData } = useLocalization();

    return (
        <View style={styles.premiumProfileAdvertContainer}>
            <DesignedText>{staticData.main.premiumProfileAdvert.titleFirstPart} <DesignedText italic={true} bold={true}>{staticData.main.premiumProfileAdvert.titleSecondPart}</DesignedText></DesignedText>
            <Logo />
            <DesignedText size="small" style={styles.premiumProfileAdvertText}>{staticData.main.premiumProfileAdvert.descriptionFirstPart} <DesignedText size="small" italic={true} style={styles.premiumProfileAdvertText}>{staticData.main.premiumProfileAdvert.descriptionItalicPart}</DesignedText>{staticData.main.premiumProfileAdvert.descriptionEndPart}</DesignedText>
            <SubmitButton onPress={() => {}} width={304} style={styles.premiumProfileAdvertButton} textStyle={styles.premiumProfileAdvertButtonText}>{staticData.main.premiumProfileAdvert.button}</SubmitButton>
            <DesignedText size="small" isUppercase={false} style={styles.premiumProfileAdvertText}>7{staticData.main.premiumProfileAdvert.bottomText}</DesignedText>
        </View>
    );
}