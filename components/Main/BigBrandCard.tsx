import React from "react";
import { View } from "react-native";
import styles from "../../screens/main/styles"
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../RootNavigator";
import { UserSmallInfo } from "../UserSmallInfo";
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Brand } from "../../screens/main/interfaces";
import { useLocalization } from "../../contexts/LocalizationContext";

type BigBrandCardProps = {
    brand: Brand;
}

type BigBrandCardNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

export default function BigBrandCard({ brand }: BigBrandCardProps) {
    const navigation = useNavigation<BigBrandCardNavigationProp>(); 
    const { localization } = useLocalization();

    return (
      <TouchableWithoutFeedback onPress={() => {navigation.navigate("HomeScreens", { screen: "Brand", params: { slug: brand.slug } })}}>
      <View style={styles.userInfoContainer}>
        <>
          <UserSmallInfo
            avatar={brand.photo || ""} 
            name={brand[`name_${localization}` as keyof Brand] || ""}
            nickname={brand.nickname || ""}
            size={"small"}
          />
        </>
    </View>
    </TouchableWithoutFeedback>);
  }