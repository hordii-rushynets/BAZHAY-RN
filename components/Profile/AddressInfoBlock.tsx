import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import DesignedText from "../ui/DesignedText";
import { View } from "react-native";
import Info from "../ui/icons/Info";
import styles from "../../screens/profile/styles";

type AddressInfoBlockProps = {
    type: "address" | "post";
}

export function AddressInfoBlock({ type }: AddressInfoBlockProps) {
  const [ isOpen, setIsOpen ] = useState(false);

  return (
    <>
      <TouchableOpacity onPress={() => { setIsOpen(!isOpen) }}>
        <Info />
      </TouchableOpacity>
      {isOpen &&
          <View style={styles.infoBlockContainer}>
            <DesignedText size="small" style={{ textAlign: "center" }}>
              {type === "address" ? 
                "Ми поважаємо твоє право на конфіденційність та дотримуємось правил безпеки, саме тому всі особисті дані, вказані в адресі доставки інші користувачі можуть побачити тільки після запиту на дозвіл у тебе." : 
                "Ми поважаємо твоє право на конфіденційність та дотримуємось правил безпеки, саме тому всі особисті дані, вказані в адресі відділення пошти інші користувачі можуть побачити тільки після запиту на дозвіл у тебе."
              }
            </DesignedText>
          </View>
      }
    </>
  );
}
