import React from "react";
import { Notification } from "../../contexts/NotificationContext";
import { View } from "react-native";
import WhiteLogo from "../ui/icons/WhiteLogo";
import DesignedText from "../ui/DesignedText";
import styles from "../../screens/home/styles";
import { useLocalization } from "../../contexts/LocalizationContext";

type NotificationCardProps = {
    notification: Notification;
}

export function NotificationCard({ notification }: NotificationCardProps) {
  const { localization } = useLocalization();

  return (
    <View style={styles.notificationContainer}>
        <View style={styles.notificationAvatarContainer}>
            <WhiteLogo />
        </View>
        <View style={styles.notificationMessageContainer}>
            <DesignedText isUppercase={false} style={styles.notificationMessage}>{notification[`message_${localization}` as keyof Notification] as string}</DesignedText>
        </View>
    </View>
  );
}
