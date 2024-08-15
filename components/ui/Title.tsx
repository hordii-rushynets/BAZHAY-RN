import React from 'react';
import { StyleProp, StyleSheetProperties, Text, TextStyle } from "react-native";

type TitleProps = {
    children: string;
    bold?: boolean;
    italic?: boolean;
    isLowercase?: boolean;
    style?: StyleProp<TextStyle>;
}

export default function Title({children, bold = false, italic = false, isLowercase = false, style = null} : TitleProps) {
  const customStyle: TextStyle = {
    fontFamily: "Inter-V",
    textTransform: isLowercase ? "lowercase" : "uppercase",
    fontWeight: bold ? "bold" : "normal",
    fontStyle: italic ? "italic" : "normal",
    fontSize: 24,
  };

  return (
    <Text style={[customStyle, style]}>
      {children}
    </Text>
  );
}