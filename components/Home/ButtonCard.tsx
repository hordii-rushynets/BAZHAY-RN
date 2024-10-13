import React from "react";
import { Button, Notification, useNotifications } from "../../contexts/NotificationContext";
import { TouchableOpacity, View } from "react-native";
import DesignedText from "../ui/DesignedText";
import styles from "../../screens/home/styles";
import { useLocalization } from "../../contexts/LocalizationContext";
import { HomeService } from "../../screens/home/services";
import { useAuth } from "../../contexts/AuthContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../RootNavigator";
import { useNavigation } from "@react-navigation/native";
import { usePremiumButtonsContext } from "../../contexts/PremiumButtonsContext";

type NotificationsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Notifications'>;

type ButtonCardProps = {
    button?: Button;
    message?: Notification;
    isActive?: boolean;
}

export function ButtonCard({ button, isActive = true, message }: ButtonCardProps) {
  const { localization } = useLocalization();
  const homeService = new HomeService();
  const authContext = useAuth();
  const navigation = useNavigation<NotificationsScreenNavigationProp>();
  const { sendNotification } = useNotifications();
  const { setOnCancel, setOnGetPremium } = usePremiumButtonsContext();

  return isActive && button ? (
    <TouchableOpacity onPress={() => {
        homeService.buttonAction(button.request, authContext).then(result => {
          sendNotification({
            message_en: button.text_en,
            message_uk: button.text_uk,
            is_button: true
          });
          if (result.isForbidden) {
            setOnGetPremium(() => () => {
                sendNotification({
                  message_en: button.response_ok_text.ok_text_en,
                  message_uk: button.response_ok_text.ok_text_uk,
                  is_button: false
                });
            });
            setOnCancel(() => () => {
                sendNotification({
                  message_en: button.response_not_ok_text.not_ok_text_en,
                  message_uk: button.response_not_ok_text.not_ok_text_uk,
                  is_button: false,
                  button: [
                    {
                      ...button,
                      text_uk: "Спробувати ще",
                      text_en: "Try again",
                    },
                    {
                      text_uk: "Іншим разом",
                      text_en: "Another time",
                      request: {
                        url: "",
                        body: {
                          "":""
                        }
                      },
                      response_not_ok_text: {
                        not_ok_text_en: "",
                        not_ok_text_uk: ""
                      },
                      response_ok_text: {
                        ok_text_en: "",
                        ok_text_uk: ""
                      }
                    }
                  ]
                })
            });
            navigation.navigate("WishCreating", { screen: "Premium" })
          }
          else if (!result.isSuccess) {
            sendNotification({
              message_en: button.response_not_ok_text.not_ok_text_en,
              message_uk: button.response_not_ok_text.not_ok_text_uk,
              is_button: false
            });
          }
          else if (result.isSuccess) {
            if (button.response_ok_text.ok_text_en !== "" && button.response_ok_text.ok_text_uk !== "") {
              sendNotification({
                message_en: button.response_ok_text.ok_text_en,
                message_uk: button.response_ok_text.ok_text_uk,
                is_button: false
              });
            }
          }
        });
    }}>
        <View style={styles.buttonContainer}>
            <DesignedText isUppercase={false} style={styles.notificationMessage}>{button[`text_${localization}` as keyof Button] as string}</DesignedText>
        </View>
    </TouchableOpacity>
  ) : (
    message && 
    <View style={styles.buttonContainer}>
        <DesignedText isUppercase={false} style={styles.notificationMessage}>{message[(`message_${localization}` || `message`) as keyof Notification] as string}</DesignedText>
    </View>
  );
}
