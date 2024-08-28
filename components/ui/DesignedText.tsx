import React, { ReactNode } from 'react';
import { StyleProp, Text, TextStyle } from "react-native";

type DesignedTextProps = {
    children: ReactNode | string;
    size?: "small" | "medium" | "smallest";
    bold?: boolean;
    italic?: boolean;
    isUppercase?: boolean;
    style?: StyleProp<TextStyle>;
}

export default function DesignedText({children, size = "medium", bold = false, italic = false, isUppercase = true, style = null} : DesignedTextProps) {
  const customStyle: TextStyle = {
    fontFamily: "Inter-V",
    textTransform: isUppercase ? "uppercase" : "none",
    fontWeight: bold ? 700 : 500,
    fontStyle: italic ? "italic" : "normal",
    fontSize: size === "smallest" ? 8 : size === "small" ? 12 : 16,
  };

  return (
    <Text style={[customStyle, style]}>
      {children}
    </Text>
  );
}