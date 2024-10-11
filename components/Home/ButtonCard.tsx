import React from "react";
import { Button, Notification } from "../../contexts/NotificationContext";
import { TouchableOpacity, View } from "react-native";
import WhiteLogo from "../ui/icons/WhiteLogo";
import DesignedText from "../ui/DesignedText";
import styles from "../../screens/home/styles";
import { useLocalization } from "../../contexts/LocalizationContext";
import { HomeService } from "../../screens/home/services";
import { useAuth } from "../../contexts/AuthContext";

type ButtonCardProps = {
    button: Button;
}

export function ButtonCard({ button }: ButtonCardProps) {
  const { localization } = useLocalization();
  const homeService = new HomeService();
  const authContext = useAuth();

  return (
    <TouchableOpacity onPress={() => {
        homeService.buttonAction(button.request, authContext);
    }}>
        <View style={styles.buttonContainer}>
            <DesignedText isUppercase={false} style={styles.notificationMessage}>{button.text}</DesignedText>
        </View>
    </TouchableOpacity>
  );
}
