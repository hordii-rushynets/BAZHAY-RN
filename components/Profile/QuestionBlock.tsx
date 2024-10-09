import React from "react";
import styles from "../../screens/profile/styles";
import DesignedText from "../ui/DesignedText";
import { View } from "react-native";

type QuestionBlockProps = {
    title: string;
    textes: string[];
}

export function QuestionBlock({ title, textes }: QuestionBlockProps) {
  return (
    <View style={styles.questionBlock}>
      <DesignedText>{title}</DesignedText>
      {textes.map((text, indx) => (
        <DesignedText key={indx} size="small">{text}</DesignedText>
      ))}
    </View>
  );
}
