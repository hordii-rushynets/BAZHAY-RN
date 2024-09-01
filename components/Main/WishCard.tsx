import React, { useEffect, useState } from "react";
import { Wish } from "../../screens/wishCreating/interfaces";
import { Image, TouchableOpacity, View } from "react-native";
import * as ImageManipulator from 'expo-image-manipulator';
import styles from "../../screens/main/styles"
import DesignedText from "../ui/DesignedText";
import BigLogo from "../ui/icons/BigLogo";
import DesignStars from "../ui/icons/DesignStars";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../RootNavigator";
import { useNavigation } from "@react-navigation/native";

type WishCardProps = {
    wish: Wish;
}

type WishCardNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

export default function WishCard({ wish }: WishCardProps) {
    const [ratio, setRatio] = useState(3/4);

    const navigation = useNavigation<WishCardNavigationProp>();

    const loadImageSize = async (uri: string) => {
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        uri,
        [{rotate: 360}],
        { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
      );
      setRatio(manipulatedImage.width/manipulatedImage.height);
    };

    useEffect(() => {
      if (wish.media) {
          loadImageSize(wish.media);
      }
    }, [wish.media]);

    return (
        <TouchableOpacity onPress={() => {navigation.navigate("Wish", { wishId: wish.id || "" })}}>
            <View style={[styles.wishCardImageContainer, { width: 164, aspectRatio: ratio }]} >
                {wish.media && <Image source={ {uri: wish.media} } style={styles.wishCardImage} resizeMode={"cover"}/>}
                <View style={styles.wishCardStarsContainer}>
                    <DesignStars width={72} height={80}/>
                </View>
            </View>
            <View style={styles.wishCardTitle}>
                <DesignedText size="small" numberOfLines={1} ellipsizeMode="tail" style={{flexShrink: 1}}>{wish.name || ""}</DesignedText>
                <DesignedText size="small"> {wish.price || ""} {wish.currency || ""}</DesignedText>
            </View>
        </TouchableOpacity>
    );
}