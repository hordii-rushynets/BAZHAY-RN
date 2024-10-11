import React, { useEffect, useRef } from "react";
import { useMessageContext } from "../contexts/MessageContext";
import { Animated, Easing } from "react-native";
import DesignedText from "./ui/DesignedText";
import styles from "./ui/generalStyles";

export function Message() {
  const { isOpen, text, setIsOpen } = useMessageContext();

    const animatedPosition = useRef(new Animated.Value(-200)).current;
    const animation = useRef<Animated.CompositeAnimation | null>(null); 
    useEffect(() => {
      animation.current = Animated.timing(animatedPosition, {
          toValue: 0,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
      })
      animation.current?.start()  
      setTimeout(() => {
          animation.current = Animated.timing(animatedPosition, {
              toValue: -200,
              duration: 500,
              easing: Easing.linear,
              useNativeDriver: true,
          })
          animation.current?.start(() => {
              setIsOpen(false);
          })
      }, 5000);
    }, [isOpen]); 

    return (
        isOpen && <Animated.View style={[styles.messageContainer, {transform: [{ translateY: animatedPosition }]}]}>
            <DesignedText size="small" style={{ textAlign: "center" }}>{text}</DesignedText>
        </Animated.View>
    );
}
