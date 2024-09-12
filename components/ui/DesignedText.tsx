import React, { ReactNode } from 'react';
import { StyleProp, Text, TextProps, TextStyle } from "react-native";

type DesignedTextProps = {
    children: ReactNode | string;
    size?: "small" | "medium" | "smallest";
    bold?: boolean;
    italic?: boolean;
    isUppercase?: boolean;
    style?: StyleProp<TextStyle>;
} & TextProps;

export default function DesignedText({children, size = "medium", bold = false, italic = false, isUppercase = true, style = null, ...props} : DesignedTextProps) {
  const customStyle: TextStyle = {
    fontFamily: (bold && italic) ? "Inter-BoldItalic" : 
                bold ? "Inter-Bold" :
                italic ? "Inter-Italic" : "Inter-Regular",
    textTransform: isUppercase ? "uppercase" : "none",
    fontWeight: bold ? 700 : 500,
    fontStyle: italic ? "italic" : "normal",
    fontSize: size === "smallest" ? 8 : size === "small" ? 12 : 16,
  };

  return (
    <Text style={[customStyle, style]} {...props}>
      {children}
    </Text>
  );
}