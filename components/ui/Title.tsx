import React, { ReactNode } from 'react';
import { StyleProp, Text, TextStyle } from "react-native";

type TitleProps = {
    children: ReactNode | string;
    bold?: boolean;
    italic?: boolean;
    isLowercase?: boolean;
    style?: StyleProp<TextStyle>;
}

export default function Title({children, bold = false, italic = false, isLowercase = false, style = null} : TitleProps) {
  const customStyle: TextStyle = {
    fontFamily: (bold && italic) ? "Inter-BoldItalic" : 
                bold ? "Inter-Bold" :
                italic ? "Inter-Italic" : "Inter-Regular",
    textTransform: isLowercase ? "lowercase" : "uppercase",
    fontWeight: bold ? 700 : 500,
    fontStyle: italic ? "italic" : "normal",
    fontSize: 24,
  };

  return (
    <Text style={[customStyle, style]}>
      {children}
    </Text>
  );
}