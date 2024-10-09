import React, { useState } from "react";
import { View } from "react-native";
import styles from "../../screens/main/styles"
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../RootNavigator";
import { useAuth } from "../../contexts/AuthContext";
import { UserFields } from "../../screens/auth/interfaces";
import { UserSmallInfo } from "../UserSmallInfo";
import SubmitButton from "../ui/buttons/SubmitButton";
import { MainService } from "../../screens/main/services";
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useLocalization } from "../../contexts/LocalizationContext";

type UserCardProps = {
    user: UserFields;
    size?: "small" | "normal";
}

type UserCardNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

export default function UserCard({ user, size = "normal" }: UserCardProps) {
    const navigation = useNavigation<UserCardNavigationProp>(); 
    const { staticData } = useLocalization();
    const mainService = new MainService();
    const authContext = useAuth();
    const { isGuest } = useAuth();
    const [buttonText, setButtonText] = useState(
        (user.is_subscribed) ?
        staticData.main.subscriptionCard.unsubscribe :
        staticData.main.subscriptionCard.subscribe
    );

    return (
      <TouchableWithoutFeedback onPress={() => {navigation.navigate("CommunityProfile", { userId: user.id } )}}>
      <View style={styles.userInfoContainer}>
        <>
          <UserSmallInfo
            avatar={user.photo || ""} 
            name={user.first_name || ""}
            nickname={user.username || ""}
            size={size === "small" ? "small" : "big"}
          />
          <TouchableWithoutFeedback>
            {size !== "small" && !isGuest &&
              <SubmitButton width={120} height={32} onPress={() => {
                if (user.is_subscribed) {
                  mainService.unsubscribe(user.id || "", authContext).then(success => {
                    if (success) {
                      setButtonText(staticData.main.subscriptionCard.subscribe);
                    }
                  });
                }
                else {
                  mainService.subscribe(user.id || "", authContext).then(success => {
                    if (success) {
                      setButtonText(staticData.main.subscriptionCard.unsubscribe);
                    }
                  });
                }

              }} textStyle={{fontSize: 12, textTransform: "none"}}>{buttonText}</SubmitButton>
            }
          </TouchableWithoutFeedback>
        </>
    </View>
    </TouchableWithoutFeedback>);
  }