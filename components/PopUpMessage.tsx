import React from "react";
import { View } from "react-native";
import DesignedText from "./ui/DesignedText";
import styles from "../screens/styles";
import SubmitButton from "./ui/buttons/SubmitButton";
import { usePopUpMessageContext } from "../contexts/PopUpMessageContext";

export function PopUpMessage() {
  const { isOpen, text, buttonText, buttonAction, width } = usePopUpMessageContext();

  if (isOpen) {
    return (
      <View style={styles.popUpMessageContainer}>
          <View style={[styles.popUpMessage, { width: width }]}>
              <DesignedText size="small" style={styles.popUpMessageText}>
                  {text}
              </DesignedText>
              <SubmitButton onPress={buttonAction} width={"auto"} height={32} style={styles.popUpMessageButton} textStyle={styles.smallText}>{buttonText}</SubmitButton>
          </View>
      </View>
    );
  }
}
