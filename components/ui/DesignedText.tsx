import React from 'react';
import { StyleProp, StyleSheetProperties, Text, TextStyle } from "react-native";

type DesignedTextProps = {
    children: string;
    size?: "small" | "medium";
    bold?: boolean;
    italic?: boolean;
    isLowercase?: boolean;
    style?: StyleProp<TextStyle>;
}

export default function DesignedText({children, size = "medium", bold = false, italic = false, isLowercase = false, style = null} : DesignedTextProps) {
  const customStyle: TextStyle = {
    fontFamily: "Inter-V",
    textTransform: isLowercase ? "lowercase" : "uppercase",
    fontWeight: bold ? "bold" : "normal",
    fontStyle: italic ? "italic" : "normal",
    fontSize: size === "small" ? 12 : 16,
  };

  return (
    <Text style={[customStyle, style]}>
      {children}
    </Text>
  );
}