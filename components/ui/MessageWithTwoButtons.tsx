import React, { ReactNode } from "react";
import { Dimensions, View } from "react-native";
import styles from "./generalStyles";
import SubmitButton from "./buttons/SubmitButton";

type MessageWithTwoButtonsProps = {
    text: ReactNode;
    onAccept: () => void;
    onCancel: () => void;
    acceptText?: string;
    cancelText?: string;
}

export function MessageWithTwoButtons({text, onAccept, onCancel, acceptText = "Так", cancelText = "Ні"}: MessageWithTwoButtonsProps) {
    return (
        <View style={styles.messageWithTwoButtonsContainer}>
            <View style={styles.messageWithTwoButtons}>
              {text}
              <View style={{flexDirection: "row", justifyContent: "center", gap: 16}}>
                  <SubmitButton onPress={onAccept} width={"auto"} height={32} style={{ minWidth: 88 }} textStyle={{ fontSize: 12 }}>{acceptText}</SubmitButton>
                  <SubmitButton onPress={onCancel} width={"auto"} height={32} style={{ minWidth: 88 }} textStyle={{ fontSize: 12 }}>{cancelText}</SubmitButton>
              </View>
            </View>
        </View>
    );
}
