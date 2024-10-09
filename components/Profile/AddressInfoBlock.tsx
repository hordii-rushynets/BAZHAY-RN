import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import DesignedText from "../ui/DesignedText";
import { View } from "react-native";
import Info from "../ui/icons/Info";
import styles from "../../screens/profile/styles";
import { useLocalization } from "../../contexts/LocalizationContext";

type AddressInfoBlockProps = {
    type: "address" | "post";
}

export function AddressInfoBlock({ type }: AddressInfoBlockProps) {
  const [ isOpen, setIsOpen ] = useState(false);
  const { staticData } = useLocalization();

  return (
    <>
      <TouchableOpacity onPress={() => { setIsOpen(!isOpen) }}>
        <Info />
      </TouchableOpacity>
      {isOpen &&
          <View style={styles.infoBlockContainer}>
            <DesignedText size="small" style={{ textAlign: "center" }}>
              {type === "address" ? 
                staticData.profile.addressInfoBlock.address : 
                staticData.profile.addressInfoBlock.post
              }
            </DesignedText>
          </View>
      }
    </>
  );
}
