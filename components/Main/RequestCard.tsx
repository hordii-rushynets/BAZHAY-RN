import React from "react";
import { TouchableOpacity, View } from "react-native";
import Loupe from "../ui/icons/Loupe";
import DesignedText from "../ui/DesignedText";
import styles from "../../screens/main/styles";

type RequestCardProps = {
    searchPrompt: string;
    request: string;
    onPress: () => void;
}

export default function RequestCard({ searchPrompt, request, onPress }: RequestCardProps) {
    const index = request.toLowerCase().indexOf(searchPrompt.toLowerCase());

    if (index === -1) {
      return (
        <TouchableOpacity onPress={onPress}>
          <View style={styles.requestContainer}>
            <Loupe />
            <DesignedText>{request}</DesignedText>
          </View>
        </TouchableOpacity>
      );
    }

    const beforeMatch = request.slice(0, index);
    const match = request.slice(index, index + searchPrompt.length);
    const afterMatch = request.slice(index + searchPrompt.length);

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.requestContainer}>
          <Loupe />
          <DesignedText>
            {beforeMatch}
            <DesignedText bold={true}>{match}</DesignedText>
            {afterMatch}
          </DesignedText>
        </View>
      </TouchableOpacity>
    );
  }