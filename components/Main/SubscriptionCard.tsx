import React, { useState } from "react";
import { View } from "react-native";
import styles from "../../screens/main/styles"
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../RootNavigator";
import { useAuth } from "../../contexts/AuthContext";
import { Subscription } from "../../screens/main/interfaces";
import { UserSmallInfo } from "../UserSmallInfo";
import SubmitButton from "../ui/buttons/SubmitButton";
import { MainService } from "../../screens/main/services";
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useLocalization } from "../../contexts/LocalizationContext";

type SubscriptionCardProps = {
    subscription: Subscription;
    onSubscribtionUnsubscribe?: () => void;
}

type SubscriptionCardNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

export default function SubscriptionCard({ subscription, onSubscribtionUnsubscribe = () => {} }: SubscriptionCardProps) {
    const navigation = useNavigation<SubscriptionCardNavigationProp>();
    const mainService = new MainService();
    const authContext = useAuth();
    const { staticData } = useLocalization();
    const [buttonText, setButtonText] = useState(
        (subscription.user && subscription.user.is_subscribed) || 
        (subscription.subscribed_to && subscription.subscribed_to.is_subscribed) ? 
        staticData.main.subscriptionCard.unsubscribe :
        staticData.main.subscriptionCard.subscribe
    );

    return (
    <TouchableWithoutFeedback onPress={() => {
      const userId = subscription.user ? subscription.user.id : subscription.subscribed_to ? subscription.subscribed_to.id : undefined;
      navigation.navigate("CommunityProfile", { userId: userId })
    }}>
    <View style={styles.userInfoContainer} key={subscription.id}>
      {subscription.user && 
        <>
          <UserSmallInfo
            avatar={subscription.user.photo || ""} 
            name={subscription.user.first_name || ""}
            nickname={subscription.user.username || ""}
            size={"big"}
          />
          <TouchableWithoutFeedback><SubmitButton width={120} height={32} onPress={() => {
            if (subscription.user?.is_subscribed) {
              mainService.unsubscribe(subscription.user?.id || "", authContext).then(success => {
                if (success) {
                  setButtonText(staticData.main.subscriptionCard.subscribe);
                }
              });
            }
            else {
              mainService.subscribe(subscription.user?.id || "", authContext).then(success => {
                if (success) {
                  setButtonText(staticData.main.subscriptionCard.unsubscribe);
                }
              });
            }

          }} textStyle={{fontSize: 12, textTransform: "none"}}>{buttonText}</SubmitButton></TouchableWithoutFeedback>
        </>
      }
      {subscription.subscribed_to && 
        <>
          <UserSmallInfo 
            avatar={subscription.subscribed_to.photo || ""} 
            name={subscription.subscribed_to.first_name || ""}
            nickname={subscription.subscribed_to.username || ""}
            size={"big"}
          />
          <TouchableWithoutFeedback>
          <SubmitButton width={120} height={32} onPress={() => {
            if (subscription.subscribed_to?.is_subscribed) {
              mainService.unsubscribe(subscription.subscribed_to?.id || "", authContext).then(success => {
                if (success) {
                  setButtonText(staticData.main.subscriptionCard.subscribe);
                  onSubscribtionUnsubscribe();
                }
              });
            }
            else {
              mainService.subscribe(subscription.subscribed_to?.id || "", authContext).then(success => {
                if (success) {
                  setButtonText(staticData.main.subscriptionCard.unsubscribe);
                }
              });
            }
          }} textStyle={{fontSize: 12, textTransform: "none"}}>{buttonText}</SubmitButton></TouchableWithoutFeedback>
        </>
      }
    </View>
    </TouchableWithoutFeedback>
    );
  }