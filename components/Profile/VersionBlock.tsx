import React from "react";
import styles from "../../screens/profile/styles";
import DesignedText from "../ui/DesignedText";
import { StyleProp, View, ViewStyle } from "react-native";
import { useLocalization } from "../../contexts/LocalizationContext";
import Logo from "../ui/icons/Logo";

type VersionBlockProps = {
    style?: StyleProp<ViewStyle>;
}

export function VersionBlock({ style = {} }: VersionBlockProps) {
  const { staticData } = useLocalization();

  return (
    <View style={[styles.settingsBottomLogo, style]}>
      <Logo width={160} height={46}/>
      <DesignedText isUppercase={false} size="small" style={styles.settingsBottomText}>{staticData.profile.settingsScreen.version} 1.1.1</DesignedText>
    </View>
  );
}
